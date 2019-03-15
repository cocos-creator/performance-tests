cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        this.scheduleOnce(()=>{
            window.location.replace(window.location.origin + window.location.pathname);
        }, 1.0);
    },
});
