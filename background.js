;(function(){
    var MEDIA_REGEX = /\b(screen|all)\b/;
    
    var parser = new CSSParser();
    
    function convertJsStyleSheet(originSheet, sheet){
        sheet = sheet || [];
        var rule, selector, styleList, style;
        for(var i = 0, len = originSheet.cssRules.length; i < len; i++){
            rule = originSheet.cssRules[i];
            if(rule.type === 1){//type == 1, 正常样式
                selector = rule.mSelectorText;
                styleList = {};
                for(var j = 0, slen = rule.declarations.length; j < slen; j++){
                    style = rule.declarations[j];
                    if(style.type === 1000){//正常的style
                        styleList[style.property] = style.valueText;
                    }else{
                        console.log('undo style type: ', style.type);
                    }
                }
                sheet.push({
                    selector: selector,
                    styleList: styleList
                });
            }else if(rule.type === 4 && MEDIA_REGEX.test(rule.media + '')){
                //type == 4 @media
                convertJsStyleSheet(rule, sheet);
            }else {
                //if(rule.type === 2){//@charset
                //if(rule.type === 3){//@import
                console.log('undo rule type: ', rule.type);
            }
        }
        return sheet;
    }
    
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
        //alert('request: ' + request.cssText);
        
        var cssText = request.cssText;
        var sheet = parser.parse(cssText, false, false);
        var response = {index: request.index};
        if(sheet){
            response.sheet = convertJsStyleSheet(sheet);
        }
        // console.log(response.sheet );
        // console.log('================================');
        sendResponse(response);
    });
    chrome.browserAction.onClicked.addListener(function(tab){
		chrome.tabs.insertCSS(null, {file: 'popup.css'});
        chrome.tabs.executeScript(null, {file: 'content.js'});
    });
    
})();