;(function(window, document){

function CssViewer(){
    this._isStart = false;
    
	var WRAPER_ID = '__css_viewer_wraper__';
	var WRAPER_STYLE_TEXT = 'pointer-events: none; position: absolute; display: none; border: red dotted 2px; color: red; z-index: 2147483647; ';
	
	var POPUPBOX_ID = '__css_viewer_popupbox__';
	var POPUPBOX_CSS_STYLE = '';
	var POPUPBOX_HTML_TEMPLATE = '\
<% for(var i in rules){ %>\
	<div class="__css_viewer_header"><%=i %></div>\
	<div class="__css_viewer_content">\
		<% \
			var styles = rules[i].split(";");\
			var param, index;\
			for(var s in styles){ \
				param = styles[s].trim();\
				if(!param){\
					continue;\
				}\
				index = param.indexOf(":");\
		%>\
		<div class="__css_viewer_item">\
			<div class="__css_viewer_key"><%=param.substring(0, index) %></div>\
			<div class="__css_viewer_value"><%=param.substring(index) %></div>\
		</div>\
		<% } %>\
	</div>\
<% } %>';
	
	HTMLElement.prototype.css = function(style){
		var el = this;
		for(var i in style){
			el.style[i] = style[i];
		}
	}
	
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
	
	var getElementDesName = function(el){
		if(el.id){
			return '#' + el.id;
		}else if(el.className){
			return el.className.replace(/([\w\-_]+)/g, '.$1');
		}else{
			return el.tagName;
		}
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
	
	var getScrollTop = function(){
		return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	}
	
	var getScrollLeft = function(){
		return Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
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
		popup.css({
			top: y + 5 + 'px',
			left: x + 5 + 'px',
			display: 'block'
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
        // wraper.innerHTML = getElementDesName(target);
        wraper.css({
            'width': rect.width + 'px',
            'height': rect.height + 'px',
            'top': rect.top + scrollTop - 2 + 'px',
            'left': rect.left + scrollLeft - 2 + 'px',
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
            showPopupBox(e.pageX, e.pageY);
        }
    }
    
	this.start = function(){
        if(!this._isStart){
            this._isStart = true;
            document.addEventListener('mouseover', onDocumentMouseOver, false);
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            
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
