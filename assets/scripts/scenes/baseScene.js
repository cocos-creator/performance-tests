let config = require("config");
const utils = require("utils");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function (subScriptName) {
        this.isTesting = false;
        this.durationTimeArr = [];

        if (!config.IS_AUTO_TESTING) {
            this._createUI(subScriptName);
        }
    },

    startTest: function () {
        cc.warn("You should implement it in sub-class.");
    },

    endTest: function () {
        this.isTesting = false;
        this._calculateReuslt();
    },

    onClickClose: function () {
        this.isTesting = false;
        this.durationTimeArr = [];
        cc.director.loadScene("main");
    },

    onClickTest: function () {
        if (this.isTesting) {
            cc.warn("It is testing now...");
            return;
        }
        this.durationTimeArr = [];
        this.isTesting = true;
        if (!config.IS_AUTO_TESTING) {
            this.labelResult.getComponent(cc.Label).string = "testing...";
        }
        this.startTest();  
    },

    _createUI: function (subScriptName) {
        //title
        let testCaseInfo = config.TEST_CASE[config.CURRENT_CASE];
        let title = utils.createLabel(`${config.CURRENT_CASE + 1}. ${testCaseInfo.name}`);
        title.x = 0;
        title.y = 420;
        // title.zIndex = config.HIGHEST_ZINDEX;
        title.setSiblingIndex(config.HIGHEST_ZINDEX);
        title.parent = this.node;

        //test button
        cc.loader.loadRes("internal/default_btn_normal", cc.SpriteFrame, (err, spriteFrame) => {
            let testBtn = utils.createButton("Test", spriteFrame, this.node, subScriptName, "onClickTest");
            testBtn.parent = this.node;
            testBtn.x = -100;
            testBtn.y = 340;
            // testBtn.zIndex = config.HIGHEST_ZINDEX;
            testBtn.setSiblingIndex(config.HIGHEST_ZINDEX);
            let closeBtn = utils.createButton("Back", spriteFrame, this.node, subScriptName, "onClickClose");
            closeBtn.parent = this.node;
            closeBtn.x = 100;
            closeBtn.y = 340;
            // closeBtn.zIndex = config.HIGHEST_ZINDEX;
            closeBtn.setSiblingIndex(config.HIGHEST_ZINDEX);
        });

        //test result
        let result = utils.createLabel("", cc.Color.WHITE, 20);
        result.x = 0;
        result.y = -420;
        result.parent = this.node;
        // result.zIndex = config.HIGHEST_ZINDEX;
        result.setSiblingIndex(config.HIGHEST_ZINDEX);
        this.labelResult = result;
    },

    _calculateReuslt: function () {
        this.durationTimeArr = this.durationTimeArr.sort((a, b)=>{return a - b;});
        this.durationTimeArr = this.durationTimeArr.slice(Math.floor(this.durationTimeArr.length * 0.1), Math.floor(this.durationTimeArr.length * 0.9));
        let result = "result: "
        let maxValue = 0;
        let minValue = this.durationTimeArr[0];
        let avgValue = 0;
        let totalValue = 0;
        for (let i = 0; i < this.durationTimeArr.length; i++) {
            let value = this.durationTimeArr[i];
            if (value > maxValue) {
                maxValue = value;
            }
            if (value < minValue) {
                minValue = value;
            }
            totalValue += value;
        }
        maxValue = Math.round(maxValue);
        minValue = Math.round(minValue);
        avgValue = Math.round(totalValue / this.durationTimeArr.length);
        result += `max time: ${maxValue}, min time: ${minValue}, avg time: ${avgValue}`;
        if (config.IS_AUTO_TESTING) {
            let testCaseInfo = config.TEST_CASE[config.CURRENT_CASE];
            utils.setDataToLS({
                name: testCaseInfo.name,
                maxTime: maxValue,
                minTime: minValue,
                avgValue: avgValue
            });
            let urlArgs = utils.getUrlArgs();
            let curIndex = parseInt(urlArgs.caseIndex) || -1;   
            let nextAutoTestCaseIndex = utils.getNextAutoTestCaseIndex(parseInt(curIndex));
            if (nextAutoTestCaseIndex !== -1) {
                this.scheduleOnce(()=>{
                    window.location.replace(window.location.origin + window.location.pathname + "?autoTest=true&caseIndex=" + nextAutoTestCaseIndex);
                }, 1);
            }else {
                config.IS_AUTO_TESTING = false;
                cc.director.loadScene("end");
                let performanceData = utils.getDataFromLS();
                cc.log(performanceData);
                utils.post(config.AUTO_TEST_POST_URL, performanceData);
            }
        }else {
            this.labelResult.getComponent(cc.Label).string = result;
        }
    },
});
