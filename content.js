;(function(window, document){

function CssViewer(){

    this._isStart = false;
    this.styleSheetList = [];
    this.popupBoxShowing = false;
    var context = this;
    
	var WRAPER_ID = '__css_viewer_wraper__';
	var WRAPER_STYLE_TEXT = 'box-sizing: border-box; pointer-events: none; position: absolute; display: none; border: red dotted 2px; color: red; z-index: 2147483647; ';
	
	var POPUPBOX_ID = '__css_viewer_popupbox__';
	var POPUPBOX_CSS_STYLE = '';
	var POPUPBOX_HTML_TEMPLATE = '<% for(var i = rules.length - 1; i >= 0; i--){ %><div class="__css_viewer_header"><%=rules[i].selector %></div><div class="__css_viewer_content"><% var styles = rules[i].style;var style;for(var s in styles){ var style = styles[s];%><div class="__css_viewer_item <%=style.isOverride ? "__css_viewer_item_override" : "" %>"><div class="__css_viewer_key"><%=s %></div><span class="__css_viewer_sign">: </span><div class="__css_viewer_value"><%=style.value %></div><span class="__css_viewer_sign">;</span></div><% } %></div><% } %>';
	
	var templateCache = {};
	
    var template = function(str, data){
        var fn = !/\W/.test(str) ?
          templateCache[str] = templateCache[str] ||
            template(document.getElementById(str).innerHTML) :
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            "with(obj){p.push('" +
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");
        return data ? fn( data ) : fn;
    };
    
    var isEmptyObject = function(obj){
        for(var n in obj){
            return false;
        }
        return true;
    }
	
	
	
	//  匹配 @import之类的
	var META_REGEX = /@([^\-]*?)\s+([^{}]*?);/g;
	//  去掉 @-webkit-key-frames{... } 这类属性
	var KEY_FRAMES_REGEX = /@[^;.]*?{([^@.]*?{.*?})*}/g;
	// @media screen 这类
	var MEDIA_META_REGEX = /@[^{]+{([^\s;{}][^}]+?\s*{\s*.*?\s*})*?}/g;
	//匹配所有css类和style, 排除了@这类标识符
	var CLASS_STYLE_REGEX = /([^\s;{}][^}]+?)\s*{\s*(.*?)\s*}/g;
	//匹配所有key和值
	var KEY_VALUE_REGEX = /\s*(.+?):\s*(.+?)(;|$)/g;
	
	var BAD_STYLE_PREX = /^[*+_]/;
	
	var parseCss = function(cssText){
		var list = [];
		cssText = cssText.replace(KEY_FRAMES_REGEX, '')
			.replace(META_REGEX, '')//暂时把import这类去掉
			.replace(MEDIA_META_REGEX, '');//TODO ie expression....-_-||
		
		var styleReg = CLASS_STYLE_REGEX, styleMatch;
		var part, selector, values;
		while(styleMatch = styleReg.exec(cssText)){
			values = styleMatch[2].trim();
			if(!values){//空类不要
				continue;
			}
			selector = styleMatch[1].trim();
			if(BAD_STYLE_PREX.test(selector)){
				continue;
			}
			list.push({
				selector: selector,
				style: convertCssText(values)
			});
		}
		return list;
	}
	
    var convertCssText = function(cssText){
        var style = {},
			valueReg = KEY_VALUE_REGEX, valueMatch;
        while(valueMatch = valueReg.exec(cssText)){
            style[valueMatch[1]] = valueMatch[2];
        }
        return style;
    }
    
	var analysisStyleList = function(){
		var sheet;
        var styleSheetList = context.styleSheetList;
		for(var i = 0, len = styleSheetList.length; i < len; i++){
			sheet = styleSheetList[i];
			if(!sheet.url){
				sheet = styleSheetList[i] = {
					cssText: sheet
				}
				// console.log(sheet.cssText);
			}
            sheet.cssText = sheet.cssText.replace(/(\r?\n)/g, '').replace(/(\/\*.*?\*\/)/g, '');
			sheet.cssList = parseCss(sheet.cssText);
            sheet.styleList = context.parser.parse(sheet.cssText, false, false);
		}
		console.log(styleSheetList);
	}
	
    var onAllCssParseSuccess = function(){
        console.log('all done.');
        onStyleSheetReady();
    }
    
    var isAllCssHadParsed = function(){
        var styleSheetList = context.styleSheetList;
        for(var sheet, i = 0, len = styleSheetList.length; i < len; i++){
			sheet = styleSheetList[i];
			if(sheet.status > 0){
                return false;
			}
		}
        return true;
    }
    
    var onParseCssResponse = function(response){
        var styleSheetList = context.styleSheetList;
        var sheet = styleSheetList[response.index];
        sheet.status = 0;
        sheet.styleList = response.sheet;
        if(isAllCssHadParsed()){
            onAllCssParseSuccess();
        }
    }
    
    var onAllCssDownloadSuccess = function(){
        // console.log('onAllCssDownloadSuccess' ,context.styleSheetList);
        var styleSheetList = context.styleSheetList;
        for(var sheet, i = 0, len = styleSheetList.length; i < len; i++){
			sheet = styleSheetList[i];
			if(!sheet){
                styleSheetList[i] = {
                    status: -1
                };
				continue;
			}
            sheet.status = 1;
            chrome.extension.sendRequest({cssText: sheet.cssText, index: i}, onParseCssResponse);
            
		}
        
    }
    
    var isAllCssFileReady = function(){
        var styleSheetList = context.styleSheetList;
        for(var i = 0, len = styleSheetList.length; i < len; i++){
            // console.log('check index: ', i, styleSheetList[i]);
            // console.log('check styleSheetList[i]: ', styleSheetList[i]);
            if(typeof(styleSheetList[i]) == 'undefined'){
                return false;
            }
        }
        return true;
    }
    
	var downloadFile = function(url, index){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				context.styleSheetList[index] = {
					url: url,
					cssText: xhr.responseText
				};
                // console.log('index: ', index);
                if(isAllCssFileReady()){
                    onAllCssDownloadSuccess();
                }
			}
		}
		xhr.send(null);
	}
	var loadLinkStyleSheet = function(){
        var styleSheets = document.styleSheets;
		var styleSheetList = context.styleSheetList = [];
		styleSheetList[styleSheets.length - 1] = 0;
		var sheet, url, hasDownload = false;
		for(var i = 0, slen = styleSheets.length; i < slen; i++){
			sheet = styleSheets[i];
			if(sheet.ownerNode.constructor === HTMLStyleElement){//这是个style标签
				styleSheetList[i] = {
                    cssText: sheet.ownerNode.innerHTML
                };
			}else{/*  if(sheet.ownerNode.constructor === HTMLLinkElement) */
				//link 标签, 发请求下载css文件
				url = sheet.href.trim();//TODO url 路径检查
				if(url){
                    hasDownload = true;
					downloadFile(url, i);
				}else{
                    styleSheetList[i] = 0;
                }
			}
		}
        if(!hasDownload){
            onAllCssDownloadSuccess();
        }
	}
    
    var isStyleSheetNoChange = function(){//TODO 判断可以更智能点
        return context.styleSheetList.length == document.styleSheets.length;
    }
	
    var checkOverride = function(list, pro){
        for(var i in list){
            if(list[i].style[pro]){
                list[i].style[pro].isOverride = true;
            }
        }
    }
    
    var convertStyle = function(styleList, originStyle){
        var style = {};
        for(var h in originStyle){
            style[h] = {
                value: originStyle[h]
            }
            checkOverride(styleList, h);
        }
        return style;
    }
    
	var getComputedStyle = function(el){
        var styleSheetList = context.styleSheetList;
        var rule, style, flag;
        var cpStyleList = [];
        console.log(styleSheetList);
        for(var i in styleSheetList){
            for(var j in styleSheetList[i].styleList){
                rule = styleSheetList[i].styleList[j];
				try{
                if(el.webkitMatchesSelector(rule.selector)){
                    style = convertStyle(cpStyleList, rule.style);
                    if(!isEmptyObject(style)){
                        cpStyleList.push({
                            selector: rule.selector,
                            style: style
                        });
                    }
                }
				}catch(e){
				console.error('error:', i, j);
				console.error(rule);
				}
            }
        }
		var selfStyle = convertCssText(el.style.cssText);
        selfStyle = convertStyle(cpStyleList, selfStyle);
        if(!isEmptyObject(selfStyle)){
            cpStyleList.push({
                selector: '(element.style)',
                style: selfStyle
            });
        }
        return cpStyleList;
	}
	
	
    //**********************************************************************************************
    //  view
    //**********************************************************************************************
    
    HTMLElement.prototype.css = function(style){
		var el = this;
		for(var i in style){
			el.style[i] = style[i];
		}
	}
    
    var getScrollTop = function(){
		return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	}
	
	var getScrollLeft = function(){
		return Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
	}
    
    var getWraper = function(createFlag){
		var wraper = document.getElementById(WRAPER_ID);
		if(!wraper && createFlag){
			wraper = document.createElement('div');
			wraper.id = WRAPER_ID;
			wraper.style.cssText = WRAPER_STYLE_TEXT;
			document.body.appendChild(wraper);
		}
		return wraper;
	}
	
	var hideWraper = function(){
		var wraper = getWraper();
		if(wraper){
			wraper.css({display: 'none' });
		}
	}
	
	var getPopupBox = function(createFlag){
		var popup = document.getElementById(POPUPBOX_ID);
		if(!popup && createFlag){
			popup = document.createElement('div');
			popup.id = POPUPBOX_ID;
			document.body.appendChild(popup);
		}
		return popup;
	}
    
	var showPopupBox = function(x, y){
		var popup = getPopupBox();
        var top = y + 5;
        var left = x + 5;
		popup.css({
			// top: '-10000em',
			// left: '-10000em',
			display: 'block'
		});
        var rect = popup.getBoundingClientRect();
        var docWidth = document.documentElement.offsetWidth;
        var docHeight = document.documentElement.offsetHeight;
        if(rect.width + left >= docWidth){
            left = docWidth - rect.width - 5;
        }
        if(rect.height + top >= docHeight){//这里还有优化的地方
            top = docHeight - rect.height - 5;
        }
        if(left < 5){
            left = 5;
        }
        if(top < 5){
            top = 5;
        }
        popup.css({
            top: top + 'px',
			left: left + 'px'
		});
        context.popupBoxShowing = true;
	}
    
    var hidePopupBox = function(){
        var popup = getPopupBox();
        if(popup){
            popup.css({ display: 'none' });
        }
        context.popupBoxShowing = false;
    }
    
    var onDocumentMouseOver = function(e){
        var target = e.target;
        var rect = target.getBoundingClientRect();
        var wraper = getWraper(true);
		var scrollTop = getScrollTop();
		var scrollLeft = getScrollLeft();
        wraper.css({
            'width': rect.width + 'px',
            'height': rect.height + 'px',
            'top': rect.top + scrollTop + 'px',
            'left': rect.left + scrollLeft + 'px',
            'display': 'block'
        });
		var styleList = getComputedStyle(target);
        // console.log('element style:');
        // console.log(styleList);
        if(styleList.length){
            var popup = getPopupBox(true);
            var html = template(POPUPBOX_HTML_TEMPLATE, {rules: styleList});
            popup.innerHTML = html;
            showPopupBox(e.pageX, e.pageY);
        }else{
            hidePopupBox();
        }
    }
    var onDocumentMouseMove = function(e){
        if(context.popupBoxShowing){
            showPopupBox(e.pageX , e.pageY );
        }
    }
    
    var onStyleSheetReady = function(){
        document.addEventListener('mouseover', onDocumentMouseOver, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
    }
    
	this.start = function(){
        if(!this._isStart){
            this._isStart = true;
            if(isStyleSheetNoChange()){
                onStyleSheetReady();
            }else{
                loadLinkStyleSheet();
            }
        }
    }
	
	this.stop = function(){
        if(this._isStart){
            this._isStart = false;
            hideWraper();
            hidePopupBox();
            document.removeEventListener('mouseover', onDocumentMouseOver, false);
            document.removeEventListener('mousemove', onDocumentMouseMove, false);
        }
    }
    this.isStart = function(){
        return this._isStart;
    }
}

(function(){
	if(!window.getCssViewer){
		window.getCssViewer = function(){
			if(!window.__css_viewer){
				window.__css_viewer = new CssViewer();
			}
			return window.__css_viewer;
		}
	}
	var viewer = window.getCssViewer();
	if(viewer.isStart()){
		viewer.stop();
	}else{
		viewer.start();
	}
})();

//end coding
})(window, document);
//////////////////////////////////
