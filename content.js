;(function(window, document){

function CssViewer(){
    this._isStart = false;
    
	var WRAPER_ID = '__css_viewer_wraper__';
	var WRAPER_STYLE_TEXT = 'box-sizing: border-box; pointer-events: none; position: absolute; display: none; border: red dotted 2px; color: red; z-index: 2147483647; ';
	
	var POPUPBOX_ID = '__css_viewer_popupbox__';
	var POPUPBOX_CSS_STYLE = '';
	var POPUPBOX_HTML_TEMPLATE = '<% for(var i in rules){ %><div class="__css_viewer_header"><%=i %></div><div class="__css_viewer_content"><% var styles = rules[i].split(";");var param, index;for(var s in styles){ param = styles[s].trim();if(!param){continue;}index = param.indexOf(":");%><div class="__css_viewer_item"><div class="__css_viewer_key"><%=param.substring(0, index) %></div><div class="__css_viewer_value"><%=param.substring(index) %></div></div><% } %></div><% } %>';
	
	var templateCache = {};
	
	var styleSheetList;
	
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
	
	var parseCss = function(cssText){
		cssText = cssText.replace(/\/\*.*\*\//g, '');
		var list = [];
		var partList = cssText.split('}');
		var item, part, selector, values;
		for(var i in partList){
		// try{
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
			// }catch(e){
				// console.log(partList[i]);
			// }
		}
		return list;
	}
	
	var analysisStyleList = function(){
		var sheet;
		for(var i = 0, len = styleSheetList.length; i < len; i++){
			sheet = styleSheetList[i];
			if(!sheet.url){
				sheet = styleSheetList[i] = {
					cssText: sheet
				}
				// console.log(sheet.cssText);
			}
			sheet.cssList = parseCss(sheet.cssText);
		}
		console.log(styleSheetList);
	}
	
	var downloadFile = function(url, id){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);//为了逻辑更简单点, 同步加载
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				styleSheetList[id] = {
					url: url,
					cssText: xhr.responseText
				};
			}
		}
		xhr.send();
	}
	var loadLinkStyleSheet = function(callback){
		var originalCursor = document.body.style.cursor;
		document.body.style.cursor = 'wait';
		
		var styleSheets = document.styleSheets;
		styleSheetList = [];
		styleSheetList[styleSheets.length - 1] = 0;
		var url;
		for(var i = 0, slen = styleSheets.length; i < slen; i++){
			sheet = styleSheets[i];
			if(sheet.ownerNode.constructor === HTMLStyleElement){//这是个style标签
				styleSheetList[i] = sheet.ownerNode.innerHTML;
			}else{/*  if(sheet.ownerNode.constructor === HTMLLinkElement) */
				//link 标签, 发请求下载css文件
				url = sheet.href.trim();
				if(url){
					downloadFile(url, i);
				}
				
			}
		}
		
		analysisStyleList();
		document.body.style.cursor = originalCursor;
		callback && callback();
	}
	
	var getComputedStyle = function(el){
		var styleSheets = document.styleSheets,
			styleList = {}, 
			sheet, rules, rule, selector, style;
		for(var i = 0, slen = styleSheets.length; i < slen; i++){
			sheet = styleSheets[i];
			if(!sheet.rules){
				continue;
			}
			rules = sheet.rules;
			for(var j = 0, rlen = rules.length; j < rlen; j++){
				rule = rules[j];
				selector = rule.selectorText;
				if(el.webkitMatchesSelector(selector)){
					style = rule.style.cssText;
                    if(styleList[selector]){
                        styleList[selector] += style;
                    }else{
                        styleList[selector] = style;
                    }
				}
			}
		}
		return styleList;
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
	
    var popupBoxShowing = false;
    
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
        popupBoxShowing = true;
	}
    
    var hidePopupBox = function(){
        var popup = getPopupBox();
        if(popup){
            popup.css({ display: 'none' });
        }
        popupBoxShowing = false;
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
		var popup = getPopupBox(true);
		var html = template(POPUPBOX_HTML_TEMPLATE, {rules: styleList});
        if(html){
            popup.innerHTML = html;
            showPopupBox(e.pageX, e.pageY);
        }else{
            hidePopupBox();
        }
    }
	
    var onDocumentMouseMove = function(e){
        if(popupBoxShowing){
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
