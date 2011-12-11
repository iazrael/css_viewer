;(function(){
var STATUS = {
    UNSUPPORT: -1,
    LOADING: 1,
    LOADED: 2,
    TRANSLATED: 3
};

var cacheMap = {};

//********************* tool ******************************
var seed = 0;

var getUid = function(){
    return ++seed;
}

var getOption = function(key){
    return localStorage[key];
}

//********************* ui ******************************

var setIconState = function(isRunning, tabId){
    if(isRunning){//正在运行, 改 icon
         chrome.browserAction.setIcon({path: 'icons/icon19_down.png', tabId: tabId});
         chrome.browserAction.setTitle({title : 'CSS Viewer(running)', tabId: tabId});
    }else{//改回默认
         chrome.browserAction.setIcon({path: 'icons/icon19.png', tabId: tabId});
         chrome.browserAction.setTitle({title : 'CSS Viewer', tabId: tabId});
    }
}

//***************************** logic ************************************************************
var MEDIA_REGEX = /\b(screen|all)\b/;
var BAD_PROPERTY_REGEX = /\bimportant\!/gi;
var BAD_PROPERTY_END_REGEX = /\binherit\b\s*}/gi;

var parser = new CSSParser();

var checkUrl = function(url){
    return  /^https?:\/\//.test(url.trim());
}
var getImportFile = function(value){
    var url = value.replace(/"|'/g, '')
        .replace(/url\((.*?)\)/,'$1');
    return url;
}
var mergeUrl = function(root, url){
    if(url.indexOf('//') === 0){
        var temp = root.split('//');
        root = temp[0];
    }else if(url.indexOf('/') === 0){
        var temp = root.split('//');
        root = temp[1].indexOf('/');
        root = temp[1].substr(0, root);
        root = temp[0] + '//' + root;
    }
    url = root + url;
    return url;
}
var getUrl = function(url, ret, tabId){
    var root;
    var sheets = cacheMap[tabId];
try{
    url = getImportFile(url);
    if(checkUrl(url)){
        return url;
    }else if(ret.url){
        root = ret.url.lastIndexOf('/');
        if(root === -1){
            root = ret.url;
        }else{
            root = ret.url.substr(0, root + 1);
        }
        url = mergeUrl(root, url);
        return url;
    }else{
        root = sheets.referUrl.lastIndexOf('/');
        root = sheets.referUrl.substr(0, root + 1);
        url = mergeUrl(root, url);
        return url;
    }
}catch(e){
    console.log('getUrl Error', url, ret.href, sheets.referUrl);
    return '';
}

}
var pretreatCssText = function(cssText){
    return cssText.replace(BAD_PROPERTY_REGEX, '!impartant')
        .replace(BAD_PROPERTY_END_REGEX, 'inherit;}');
}

var checkSheets = function(sheets){
    for(var i = 0, s; s = sheets[i]; i++){
        if(s.imports){
            if(!checkSheets(s.imports)){
                return false;
            }
        }
        if(s.status === STATUS.UNSUPPORT || s.status === STATUS.TRANSLATED){
            continue;
        }else{
            return false;
        }
    }
    return true;
}

var isAllCssTranslated = function(tabId){
    var sheets = cacheMap[tabId];
    return checkSheets(sheets);
}

var convertJsStyleSheet = function(originSheet, tabId, sheet, result){
    sheet = sheet || [];
    for(var i = 0, rule, styleList; rule = originSheet.cssRules[i]; i++){
        if(rule.type === 1){//type == 1, 正常样式
            styleList = {};
            for(var j = 0, style; style = rule.declarations[j]; j++){
                style = rule.declarations[j];
                if(style.type === 1000){//正常的style
                    styleList[style.property] = style.valueText;
                }else{
                    console.log('undo style type: ', style.type);
                }
            }
            sheet.push({
                selector: rule.mSelectorText,
                styleList: styleList
            });
        }else if(rule.type === 4 && MEDIA_REGEX.test(rule.media + '')){
            //type == 4 @media
            convertJsStyleSheet(rule, tabId, sheet, result);
        }else if(rule.type === 3 && MEDIA_REGEX.test(rule.media + '')){//@import
            var url = getUrl(rule.href, result, tabId);
            if(url && cacheMap[tabId].download[url] !== 1){
                var retItem = {
                    type: 'import',
                    url: url
                };
                result.imports = result.imports || [];
                result.imports.push(retItem);
                downloadCss(retItem, tabId);
            }
        }else {
            //if(rule.type === 2){//@charset
            console.log('undo rule type: ', rule.type);
        }
    }
    return sheet;
}

var translateSheet = function(originSheet, tabId){
    var cssText = pretreatCssText(originSheet.text);
    if(cssText.trim()){
        var sheet = parser.parse(cssText, false, false);
        originSheet.sheet = convertJsStyleSheet(sheet, tabId, null, originSheet);
    }
    originSheet.status = STATUS.TRANSLATED;
    
    if(isAllCssTranslated(tabId)){
        var sheets = cacheMap[tabId];
        chrome.tabs.sendRequest(tabId, {type: 'data', param: {type: 'StyleSheets', data: sheets}, tabId: tabId});
    }
}

var downloadCss = function(originSheet, tabId){
    originSheet.status = STATUS.LOADING;
    cacheMap[tabId].download[originSheet.url] = 1;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", originSheet.url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status != 200){
                originSheet.text = '';
                console.log(originSheet.url, xhr.status);
            }else{
                originSheet.text = xhr.responseText || '';
            }
            originSheet.status = STATUS.LOADED;
            translateSheet(originSheet, tabId);
        }
    }
    xhr.send(null);
}

var translateSheets = function(sheets, tabId){
    sheets.download = {};
    cacheMap[tabId] = sheets;
    for(var i = 0, s; s = sheets[i]; i++){
        if(s.type == 'style'){
            translateSheet(s, tabId);
        }else if(checkUrl(s.url)){
            downloadCss(s, tabId);
        }else{
            s.status = STATUS.UNSUPPORT;
        }
    }
    _gaq.push(['_trackEvent', 'translate', 'count', '']);
}

////////////////////////// event //////////////////////////////////////////////////////////////////////

var handleEvent = function(event, tabId){
    switch(event.type){
        case 'ViewerStart':
            chrome.tabs.getSelected(null, function(tab) {
                if(tabId === tab.id){
                    setIconState(true, tabId);
                    _gaq.push(['_trackEvent', 'browserAction', 'run', 'run viewer']);
                }
            });
            break;
        case 'ViewerStop':
            chrome.tabs.getSelected(null, function(tab) {
                if(tabId === tab.id){
                    setIconState(false, tabId);
                    _gaq.push(['_trackEvent', 'browserAction', 'stop', 'stop viewer']);
                }
            });
            break;
        default:
            break;
    }
}

var handleMethod = function(param, tabId){
    switch(param.method){
        case 'translateSheets':
            param.data.referUrl = param.referUrl;
            translateSheets(param.data, tabId);
            break;
        case 'getOption':
            return getOption(param.key);
        default:
            break;
    }
}

////////////// for init //////////////////////////////

chrome.browserAction.onClicked.addListener(function(tab){
    if( tab.url.indexOf("https://chrome.google.com") === 0 || tab.url.indexOf("chrome://") === 0 ) {
        _gaq.push(['_trackEvent', 'browserAction', 'clicknotvalid', 'click below chrome store']);
        alert( "Sorry, it can't work at chrome store and extension pages." );
        return;
    }
    //_gaq.push(['_trackEvent', 'browserAction', 'click', 'a valid click']);
    chrome.tabs.sendRequest(tab.id, {type: 'method', param: {method: "toggleRun"}, tabId: tab.id});
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
    chrome.tabs.sendRequest(tabId, {type: 'method', param: {method: "queryStatus"}, tabId: tabId}, function(response) {
        if(tabId === response.tabId){
            setIconState(response.status === 2, tabId);
        }
    });
});

    
chrome.extension.onRequest.addListener(function(request, sender, callback){
    if(request.type === 'event'){
        handleEvent(request.param, request.tabId);
    }else if(request.type === 'method'){
        request.param.referUrl = sender.tab.url;
        var result = handleMethod(request.param, request.tabId);
        callback && callback(result);
    }
});


/*********** end **********/
})();