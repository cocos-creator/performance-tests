let utils = {};

// http request
utils.get = function (url, args) {
    //set arguments with <URL>?xxx=xxx&yyy=yyy
    url += "/";
    if (args) {
        url += "?";
        for (let key in args) {
            if (args.hasOwnProperty(key)) {
                let arg = key + "=" + args[key];
                url += arg + "&";
            }
        }
    }
    url = url.substring(0, url.length - 1);
    let xhr = cc.loader.getXMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = xhr.responseText;
            console.log(`Get 接收: ${response}`);
        }
    };
    xhr.send();
    console.log("Get 请求: " + url);
};

utils.post = function (url, args) {
    let data = JSON.stringify(args);
    let xhr = cc.loader.getXMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // let httpStatus = xhr.statusText;
            let response = xhr.responseText;
            console.log(`Post 接收: ${response}`);
        }
    };
    xhr.send(data);
    console.log("Post 请求: " + url);
};

utils.getUrlArgs = function GetRequest() {
    let url = location.search; //获取url中"?"符后的字串
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};

utils.clearLS = function () {
    cc.sys.localStorage.setItem("PerformanceData", JSON.stringify({}));
};

utils.setDataToLS = function (data) {
    if (data.os) {
        cc.sys.localStorage.setItem("PerformanceData", JSON.stringify(data));
    }else {
        let performanceData = cc.sys.localStorage.getItem("PerformanceData");
        performanceData = JSON.parse(performanceData);
        performanceData.data.push(data);
        cc.sys.localStorage.setItem("PerformanceData", JSON.stringify(performanceData));
    }
};

utils.getDataFromLS = function () {
    let performanceData = cc.sys.localStorage.getItem("PerformanceData");
    return JSON.parse(performanceData);
};

utils.getNextAutoTestCaseIndex = function (curIndex) {
    let config = require("config");
    let nextIndex = -1;
    for (let i = 0; i < config.TEST_CASE.length; i++) {
        if (i > curIndex) {
            let testCaseInfo = config.TEST_CASE[i];
            if (testCaseInfo.auto) {
                nextIndex = i;
                break;
            }    
        }
    }
    return nextIndex;
};

utils.createLabel = function (string, color, fontSize) {
    string = string || "";
    color = color || cc.Color.WHITE;
    fontSize = fontSize || 40;
    let labelNode = new cc.Node();
    labelNode.color = color;
    let labelComponent = labelNode.addComponent(cc.Label);
    labelComponent.lineHeight = fontSize = labelComponent.fontSize = fontSize;

    labelComponent.string = string;
    return labelNode;
};

utils.createButton = function (name, spriteFrame, target, componentName, handlerName) {
    let buttonNode = new cc.Node();
    let buttonComponent = buttonNode.addComponent(cc.Button);
    let eventHandler = new cc.Component.EventHandler();
    eventHandler.component = componentName;
    eventHandler.handler = handlerName;
    eventHandler.target = target;
    buttonComponent.clickEvents.push(eventHandler);
    buttonComponent.transition = cc.Button.Transition.SCALE;
    let spriteComponent = buttonNode.addComponent(cc.Sprite);
    spriteComponent.spriteFrame = spriteFrame;
    spriteComponent.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    spriteComponent.trim = true;
    let labelNode = this.createLabel(name, cc.Color.BLACK, 20);
    labelNode.parent = buttonNode;
    buttonNode.width = 100;
    buttonNode.height = 40;
    return buttonNode;
};

module.exports = utils;