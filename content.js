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
	
    var onAllCssParseSuccess = function(){
        // console.log('all done.');
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
        sheet.styleList = response.sheet || [];
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
    
    var getDownloadUrl = function(url){
        url = url.trim();
        if(/^https?:\/\//.test(url)){
            return url;
        }else{
            return '';
        }
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
				url = getDownloadUrl(sheet.href);//TODO url 路径检查
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
	
    var PROPERTY_SELECTOR_REGEX = /\[[^\[\]]*\]/g;
    var CLEAR_SELECTOR_REGEX = /(:[^,\/]+?)( |,|$)/g;
    var CLEAR_UNWANT_COMMA_REGEX = /(^,(\s*,)*)|((,\s*)*,\s*$)/g;
    var PROPERTY_SELECTOR_CACHE_REGEX = /{%(\d+?)%}/g;
    //清理选择器, 去掉伪类
    var clearSelector = function(selector){
        var count = 1, cache = {};
        selector = selector.trim().replace(PROPERTY_SELECTOR_REGEX, function(m){
            var id = count++;
            cache[id] = m;
            return '{%' + id + '%}';;
        });
        selector = selector.replace(CLEAR_SELECTOR_REGEX, '$2');
        selector = selector.replace(CLEAR_UNWANT_COMMA_REGEX, '');
        selector = selector.replace(PROPERTY_SELECTOR_CACHE_REGEX, function(m, s){
            return cache[s];
        });
        return selector.trim();
    }
    //匹配所有key和值
	var KEY_VALUE_REGEX = /\s*(.+?):\s*(.+?)(;|$)/g;
    var convertCssText = function(cssText){
        var style = {},
			valueReg = KEY_VALUE_REGEX, valueMatch;
        while(valueMatch = valueReg.exec(cssText)){
            style[valueMatch[1]] = valueMatch[2];
        }
        return style;
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
    var NOT_SELECTOR_REGEX = /^\W+$/;
    var isEmptySelector = function(selector){
        if(!selector/*  || NOT_SELECTOR_REGEX.test(selector) */){
            return true;
        }
        return false;
    }
	var getComputedStyle = function(el){
        var styleSheetList = context.styleSheetList;
        // console.log(styleSheetList);
        var rule, style, selector;
        var cpStyleList = [];
        for(var i in styleSheetList){
            for(var j in styleSheetList[i].styleList){
                rule = styleSheetList[i].styleList[j];
                selector = clearSelector(rule.selector);
                try{
                if(isEmptySelector(selector)){
                    continue;
                }
                if(el.webkitMatchesSelector(selector)){
                    style = convertStyle(cpStyleList, rule.styleList);
                    if(!isEmptyObject(style)){
                        cpStyleList.push({
                            selector: rule.selector,
                            style: style
                        });
                    }
                }
                }catch(e){
                    console.error(e, i, j, 'selector','[' + selector + ']');
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
        document.body.style.cursor = document.body._originCursor;
        document.addEventListener('mouseover', onDocumentMouseOver, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
    }
    
	this.start = function(){
        if(!this._isStart){
            this._isStart = true;
            if(isStyleSheetNoChange()){
                onStyleSheetReady();
            }else{
                //TODO 可以换成更优雅的
                document.body._originCursor = document.body.style.cursor;
                document.body.style.cursor = 'wait';
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
