;(function(window, document){

var STATUS = {
    UNINIT: 0,
    INITED: 1,
    RUNNING: 2
};

var WRAPER_ID = '__css_viewer_wraper__';
var POPUPBOX_ID = '__css_viewer_popupbox__';
var POPUPBOX_HTML_TEMPLATE = '<% for(var i = rules.length - 1; i >= 0; i--){ %><div class="__css_viewer_header"><%=rules[i].selector %></div><div class="__css_viewer_content"><% var styles = rules[i].style;var style;for(var s in styles){ var style = styles[s];%><div class="__css_viewer_item <%=style.isOverride ? "__css_viewer_item_override" : "" %>"><div class="__css_viewer_key"><%=s %></div><span class="__css_viewer_sign">: </span><div class="__css_viewer_value"><%=style.value %></div><span class="__css_viewer_sign">;</span></div><% } %></div><% } %>';

var tabId;

var enableIframe;

chrome.extension.sendRequest({type: 'method', param: {method: "getOption", key: 'enableIframe'}, tabId: tabId}, function(data){
    enableIframe = parseInt(data);
});
//****************************** tool ************************
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

var isIframe = function(){
    return window.top !== window;
}

var isViewerEnable = function(){
    if(isIframe()){
        return enableIframe === 1;
    }else{
        return true;
    }
}


var seed = 0;

var getUid = function(){
    return ++seed;
}

HTMLElement.prototype.css = function(style){
    var el = this;
    for(var i in style){
        el.style[i] = style[i];
    }
}

HTMLElement.prototype.show = function(){
    this.css({ display: 'block' });
}

HTMLElement.prototype.hide = function(){
    this.css({ display: 'none' });
}

HTMLElement.prototype.isShow = function(){
    return this.style.display !== 'none';
}

var NOT_SELECTOR_REGEX = /^\W+$/;
var isEmptySelector = function(selector){
    if(!selector/*  || NOT_SELECTOR_REGEX.test(selector) */){
        return true;
    }
    return false;
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
//****************************** view ************************
var viewer = {
    init: function(){
        //****************** wraper ******************
        var wraper = this.wraper = document.createElement('div');
        wraper.id = WRAPER_ID;
        document.body.appendChild(wraper);
        wraper.hide();
        //****************** popup ******************
        var popup = this.popup = document.createElement('div');
        popup.id = POPUPBOX_ID;
        document.body.appendChild(popup);
        popup.hide();
        popup.show = function(x, y){
            var top = y + 5;
            var left = x + 5;
            this.css({
                display: 'block'
            });
            var rect = this.getBoundingClientRect();
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
            this.css({
                top: top + 'px',
                left: left + 'px'
            });
        }
        //*****************************************
        this.onDocumentMouseOver = function(e){
            var target = e.target;
            var rect = target.getBoundingClientRect();
            var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
            wraper.css({
                'width': rect.width + 'px',
                'height': rect.height + 'px',
                'top': rect.top + scrollTop + 'px',
                'left': rect.left + scrollLeft + 'px',
                'display': 'block'
            });
            var styleList = styleSheet.getComputedStyle(target);
            if(styleList.length){
                var html = template(POPUPBOX_HTML_TEMPLATE, {rules: styleList});
                popup.innerHTML = html;
                popup.show(e.pageX, e.pageY);
                //TODO 隐藏其他iframe的面板
            }else{
                popup.hide();
            }
        }
        this.onDocumentMouseMove = function(e){
            if(popup.isShow()){
                popup.show(e.pageX , e.pageY );
                //TODO 隐藏其他iframe的框
            }
        }
        this.onDocumentKeydown = function(e){
            if(e.keyCode === 27){
                viewer.stop();
            }
        }
        this._status = STATUS.INITED;
    },
    getStatus: function(){
        return this._status || STATUS.UNINIT;
    },
    start: function(){
        if(!isViewerEnable()){
            return false;
        }
        if(this._status !== STATUS.RUNNING){
            document.body._oldCursor = document.body.style.cursor;
            document.body.style.cursor = 'wait';
            if(!this.getStatus()){
                this.init();
            }
            styleSheet.load();
            chrome.extension.sendRequest({type: 'event', param: {type: "ViewerStart"}, tabId: tabId});
        }
    },
    stop: function(){
        if(this._status === STATUS.RUNNING){
            this.stopCatch();
            chrome.extension.sendRequest({type: 'event', param: {type: "ViewerStop"}, tabId: tabId});
        }
    },
    startCatch: function(){
        this._status = STATUS.RUNNING;
        document.body.style.cursor = document.body._oldCursor;
        document.addEventListener('mouseover', this.onDocumentMouseOver, false);
        document.addEventListener('mousemove', this.onDocumentMouseMove, false);
        document.addEventListener('keydown', this.onDocumentKeydown, false);
    },
    stopCatch: function(){
        this._status = STATUS.INITED;
        this.wraper.hide();
        this.popup.hide();
        document.body.style.cursor = document.body._oldCursor;
        document.removeEventListener('mouseover', this.onDocumentMouseOver, false);
        document.removeEventListener('mousemove', this.onDocumentMouseMove, false);
        document.removeEventListener('keydown', this.onDocumentKeydown, false);
    }
}
//****************************** logic ************************
var styleSheet = {
    sheetMap: {},
    sheetSeq: [],
    check: function(){
        var missArr = [];
        for(var i = 0, ss, flag, item, index, id; ss = document.styleSheets[i]; i++){
            flag = false;
            for(var j = 0, s, index = 0; s = this.sheetSeq[j]; j++){
                s = this.sheetMap[s];
                index = j;
                if(s.el && s.el === ss.ownerNode){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                id = getUid();
                item = {
                    id: id,
                    el: ss.ownerNode
                };
                this.sheetSeq.splice(index + 1, 0, id);
                this.sheetMap[id] = item;
                if(ss.ownerNode.constructor === HTMLStyleElement){
                    item.type = 'style';
                    item.text = ss.ownerNode.innerHTML;
                }else{
                    item.type = 'link';
                    item.url = ss.href;
                }
                // missArr[id] = {
                    // type: item.type,
                    // url: item.url,
                    // text: item.text
                // };
                missArr.push({
                    id: id,
                    type: item.type,
                    url: item.url,
                    text: item.text
                });
            }
        
        }//end of: for document.styleSheets
        return missArr;
    },
    load: function(){
        var sheets = this.check();
        if(isEmptyObject(sheets)){
            viewer.startCatch();
        }else{//还有没转换的样式表
            chrome.extension.sendRequest({type: 'method', param: {method: "translateSheets", data: sheets}, tabId: tabId});
        }
    },
    eatData: function(sheets){
        for(var i = 0, s; s = sheets[i]; i++){
            this.sheetMap[s.id].text = s.text;
            this.sheetMap[s.id].sheet = s.sheet;
            var context = this;
            var eatImports = function(imports, pid){
                var index = context.sheetSeq.indexOf(pid);
                for(var j = 0, im, uid; im = imports[j]; j++){
                    uid = getUid();
                    im.id = uid;
                    context.sheetMap[uid] = im;
                    context.sheetSeq.splice(index, 0, uid);
                    index++;
                    if(im.imports){
                        eatImports(im.imports, uid);
                    }
                }
                
            }
            if(s.imports){
                eatImports(s.imports, s.id);
                // var index = this.sheetSeq.indexOf(s.id);
                // for(var j = 0, im, uid; im = s.imports[j]; j++){
                    // uid = getUid();
                    // im.id = uid;
                    // this.sheetMap[uid] = im;
                    // this.sheetSeq.splice(index, 0, uid);
                    // index++;
                // }
            }
        }
        viewer.startCatch();
    },
    getComputedStyle: function(el){
        var cpStyleList = [];
        for(var i = 0, s; s = this.sheetSeq[i]; i++){
            s = this.sheetMap[s];
            if(!s.sheet){
                continue;
            }
            for(var j = 0, rule, selector, style; rule = s.sheet[j]; j++){
                selector = clearSelector(rule.selector);
                if(isEmptySelector(selector)){
                    continue;
                }
try{
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
		var selfStyle = convertCssText(el.getAttribute('style'));
        selfStyle = convertStyle(cpStyleList, selfStyle);
        if(!isEmptyObject(selfStyle)){
            cpStyleList.push({
                selector: 'element.style',
                style: selfStyle
            });
        }
        return cpStyleList;
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////////
var handleMethod = function(param){
    switch(param.method){
        case 'queryStatus':
            return {status: viewer.getStatus()};
        case 'run':
            viewer.start();
            break;
        case 'stop':
            viewer.stop();
            break;
        case 'toggleRun':
            if(viewer.getStatus() == STATUS.RUNNING){
                viewer.stop();
            }else{
                viewer.start();
            }
            break;
        default:
            break;
    }
}

var handleData = function(param){
    switch(param.type){
        case 'StyleSheets':
            styleSheet.eatData(param.data);
            break;
        default:
            break;
    }
}

//////////////////////////////////////////////////////////////////////////////////
chrome.extension.onRequest.addListener(function(request, sender, callback){
    tabId = request.tabId;
    var result;
    if(request.type === 'method'){
        result = handleMethod(request.param);
    }else if(request.type === 'data'){
        result = handleData(request.param);
    }
    result = result || {};
    result.tabId = tabId;
    callback(result);
});


window.onerror = function(){
    viewer.stop();
}
    
//end coding
})(window, document);
//////////////////////////////////
