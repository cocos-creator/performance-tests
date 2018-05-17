const BackPackUI = require('BackPackUI');
const ShopUI = require('ShopUI');

const PanelType = cc.Enum({
    Home: -1,
    Shop: -1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        menuAnim: {
            default: null,
            type: cc.Animation
        },
        homeBtnGroups: {
            default: [],
            type: cc.Node
        },
        backPackUI: {
            default: null,
            type: BackPackUI
        },
        shopUI: ShopUI
    },

    // use this for initialization
    onLoad: function () {
        this.curPanel = PanelType.Home;
        this.menuAnim.play('menu_reset');
    },

    start: function () {
        this.backPackUI.init(this);
        this.shopUI.init(this, PanelType.Shop);
        this.scheduleOnce ( function() {
            this.menuAnim.play('menu_intro');
            this.showAllUI();
        }.bind(this), 0.5);
    },

    showAllUI: function () {
        this.gotoShop();
        this.homeBtnGroups[0].getChildByName("sub_btns").getComponent("SubBtnsUI").showSubBtns();
        this.node.parent.getChildByName("chargePanel").getComponent("ChargeUI").show();
        this.node.parent.getChildByName("backPack").getComponent("BackPackUI").show();

    },

    toggleHomeBtns: function (enable) {
        for (let i = 0; i < this.homeBtnGroups.length; ++i) {
            let group = this.homeBtnGroups[i];
            if (!enable) {
                group.pauseSystemEvents(true);
            } else {
                group.resumeSystemEvents(true);
            }
        }
    },

    gotoShop: function () {
        if (this.curPanel !== PanelType.Shop) {
            this.shopUI.show();
        }
    },

    gotoHome: function () {
        if (this.curPanel === PanelType.Shop) {
            this.shopUI.hide();
            this.curPanel = PanelType.Home;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
