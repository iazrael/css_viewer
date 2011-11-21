
function CssViewer(){
    this._id = +new Date;
    this._isStart = false;
    
    this.onDocumentMouseOver = function(e){
        var target = e.target;
        var rect = target.getBoundingClientRect();
        var wraper = CssViewer.getWraper(true);
        wraper.innerHTML = CssViewer.getElementDesName(target);
        CssViewer.css(wraper, {
            'width': rect.width + 'px',
            'height': rect.height + 'px',
            'top': rect.top - 2 + 'px',
            'left': rect.left - 2 + 'px',
            'display': 'block'
        });
    }
}

CssViewer.prototype = {
    start: function(){
        if(!this._isStart){
            this._isStart = true;
            CssViewer.getDoc().addEventListener('mouseover', this.onDocumentMouseOver, false);
        }
    },
    stop: function(){
        if(this._isStart){
            this._isStart = false;
            CssViewer.removeWraper();
            CssViewer.getDoc().removeEventListener('mouseover', this.onDocumentMouseOver, false);
        }
    },
    isStart: function(){
        return this._isStart;
    }
}

CssViewer.css = function(el, style){
    for(var i in style){
        el.style[i] = style[i];
    }
}

CssViewer.getWraper = function(createFlag){
    var doc = CssViewer.getDoc();
    var wraper = doc.getElementById('__css_viewer_wraper__');
    if(!wraper && createFlag){
        wraper = doc.createElement('div');
        wraper.id = '__css_viewer_wraper__';
        wraper.style.cssText = 'pointer-events: none; position: absolute; display: none; border: red dotted 2px; color: red;';
        doc.body.appendChild(wraper);
    }
    return wraper;
}

CssViewer.removeWraper = function(){
    var wraper = CssViewer.getWraper();
    if(wraper){
        CssViewer.getDoc().body.removeChild(wraper);
    }
}
CssViewer.getElementDesName = function(el){
    if(el.id){
        return '#' + el.id;
    }else if(el.className){
        return el.className.replace(/([\w\-_]+)/g, '.$1');
    }else{
        return el.tagName;
    }
}

CssViewer.setWin = function(win){
    CssViewer.__win = win;
    CssViewer.__doc = win.document;
}

CssViewer.getWin = function(){
    return CssViewer.__win;
}

CssViewer.getDoc = function(){
    return CssViewer.__doc;
}

CssViewer.getViewer = function(){
    var win = CssViewer.getWin();
    var viewer = win.__css_viewer || (win.__css_viewer = new CssViewer());
    return viewer;
}

CssViewer.setWin(window);
var viewer = CssViewer.getViewer();
if(viewer.isStart()){
    viewer.stop();
}else{
    viewer.start();
}