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
	
	
	HTMLElement.prototype.css = function(style){
		var el = this;
		for(var i in style){
			el.style[i] = style[i];
		}
	}
	
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
	
	var getScrollTop = function(){
		return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	}
	
	var getScrollLeft = function(){
		return Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
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
	var parseCss = function(cssText){
		var list = [];
		var partList = cssText.split('}');//TODO @import 的兼容
		var item, part, selector, values;
		for(var i in partList){
			part = partList[i].trim();
			if(!part){
				continue;
			}
			part = part.split('{');
			selector = part[0].trim();
			values = part[1].trim();
			item = {
				selector: selector,
				style: {}
			};
			var p = /\s*(.+?):\s*(.+?);/g;
			var m;
			while(m = p.exec(values)){
				item.style[m[1]] = m[2];
			}
			list.push(item);
		}
		return list;
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
		}
		console.log(styleSheetList);
	}
	
	var downloadFile = function(url, id){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);//为了逻辑更简单点, 同步加载
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				context.styleSheetList[id] = {
					url: url,
					cssText: xhr.responseText
				};
			}
		}
		xhr.send();
	}
	var loadLinkStyleSheet = function(callback){
        var styleSheets = document.styleSheets;
        if(context.styleSheetList.length == styleSheets.length){
            callback && callback();
            return;
        }
        
		var originalCursor = document.body.style.cursor;
		document.body.style.cursor = 'wait';
		
		var styleSheetList = context.styleSheetList = [];
		styleSheetList[styleSheets.length - 1] = 0;
		var url;
		for(var i = 0, slen = styleSheets.length; i < slen; i++){
			sheet = styleSheets[i];
			if(sheet.ownerNode.constructor === HTMLStyleElement){//这是个style标签
				styleSheetList[i] = sheet.ownerNode.innerHTML;
			}else{/*  if(sheet.ownerNode.constructor === HTMLLinkElement) */
				//link 标签, 发请求下载css文件
				url = sheet.href.trim();//TODO url 路径检查
				if(url){
					downloadFile(url, i);
				}
				
			}
		}
		
		analysisStyleList();
		document.body.style.cursor = originalCursor;
		callback && callback();
	}
	
    var checkOverride = function(list, pro){
        for(var i in list){
            if(list[i].style[pro]){
                list[i].style[pro].isOverride = true;
            }
        }
    }
    
	var getComputedStyle = function(el){
        var styleSheetList = context.styleSheetList;
        var rules, rule, style, flag;
        var styleList = [];
        for(var i in styleSheetList){
            rules = styleSheetList[i].cssList;
            for(var j in rules){
                rule = rules[j];
                if(el.webkitMatchesSelector(rule.selector)){
                    style = {
                        selector: rule.selector,
                        style: {}
                    };
                    flag = false;
                    for(var h in rule.style){
                        flag = true;
                        style.style[h] = {
                            value: rule.style[h]
                        }
                        checkOverride(styleList, h);
                    }
                    if(flag){
                        styleList.push(style);
                    }
                }
            }
        }
        return styleList;
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
        
        console.log(styleList);
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
    
	this.start = function(){
        if(!this._isStart){
            this._isStart = true;
			loadLinkStyleSheet(function(){
				document.addEventListener('mouseover', onDocumentMouseOver, false);
				document.addEventListener('mousemove', onDocumentMouseMove, false);
			});
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
