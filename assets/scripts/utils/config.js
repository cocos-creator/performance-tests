let config =  {};

/**
 * name: test case name.
 * scene: test case scene name.
 * args: global scene args, you can use it in the scene component.
 * auto: it's auto test or not.
 * desc: test case description.
 */
config.TEST_CASE = [
    { 
        name: "Bunny Test", 
        scene: "bunnyTest", 
        auto: false, 
    },
    { 
        name: "3D Model Test", 
        scene: "3DModelTest", 
        args: { 
            windows_chrome: { count: 100 },
            osx_chrome: { count: 100 },
            ios_safari: { count: 50 },
            ios_chrome: { count: 50 },
            android_chrome: { count: 50 },
            android_qq: {count: 50},
            default: { count: 50}
        },
        desc: '',
        auto: true, 
    },
    { 
        name: "3D Mesh Test", 
        scene: "3DMeshTest", 
        args: { 
            windows_chrome: { count: 2000 },
            osx_chrome: { count: 2000 },
            ios_safari: { count: 500 },
            ios_chrome: { count: 500 },
            android_chrome: { count: 500 },
            android_qq: {count: 500},
            default: { count: 500}
        },
        auto: true, 
    },
    {
        name: "Bunny Fixed Count Test",
        scene: "bunnyFixedCountTest",
        args: { 
            windows_chrome: { count: 5000 },
            osx_chrome: { count: 5000 },
            ios_safari: { count: 2600 },
            ios_chrome: { count: 2600 },
            android_chrome: { count: 1500 },
            android_qq: {count: 1500},
            default: { count: 5000}
        },
        auto: true,
    },
    { 
        name: "Prefab Bunny Test", 
        scene: "prefabBunnyTest", 
        auto: false,
    },
    {
        name: "Prefab Bunny Fixed Count Test",
        scene: "prefabBunnyFixedCountTest",
        args: {
            windows_chrome: { count: 5000 }, 
            osx_chrome: { count: 5000 },
            ios_safari: { count: 2600 },
            ios_chrome: { count: 2600 },
            android_chrome: { count: 1500 },
            android_qq: { count: 1500 },
            default: { count: 5000 }
        },
        auto: true,
    },
    {
        name: "Bunny Add/Remove Test",
        scene: "bunnyDynamicTest",
        args: { 
            windows_chrome: { totalCount: 5000, dynamicCount: 100 },
            osx_chrome: { totalCount: 5000, dynamicCount: 100 },
            ios_safari: { totalCount: 2500, dynamicCount: 100 },
            ios_chrome: { totalCount: 2500, dynamicCount: 100 },
            android_chrome: { totalCount: 1500, dynamicCount: 100 },
            android_qq: { totalCount: 1500, dynamicCount: 100 },
            default: { totalCount: 5000, dynamicCount: 100}
        },
        auto: false,
    },
    {
        name: "Bunny Transform Tree Test",
        scene: "bunnyTreeTest",
        args: {
            windows_chrome: { depth: 5, countPerDepth: 6 },
            osx_chrome: { depth: 5, countPerDepth: 6 },
            ios_safari: { depth: 4, countPerDepth: 6 },
            ios_chrome: { depth: 4, countPerDepth: 6 },
            android_chrome: { depth: 4, countPerDepth: 5 },
            android_qq: { depth: 4, countPerDepth: 5 },
            default: { depth: 5, countPerDepth: 6}
        },
        auto: true,
    },
    {
        name: "Bunny Active/Inactive Test",
        scene: "bunnyActiveTest",
        args: {
            windows_chrome: { depth: 5, countPerDepth: 6 },
            osx_chrome: { depth: 5, countPerDepth: 6 },
            ios_safari: { depth: 4, countPerDepth: 6 },
            ios_chrome: { depth: 4, countPerDepth: 6 },
            android_chrome: { depth: 4, countPerDepth: 5 },
            android_qq: { depth: 4, countPerDepth: 5 },
            default: { depth: 5, countPerDepth: 6 }
        },
        auto: true,
    },
    {
        name: "Bunny Transform Animation Test",
        scene: "bunnyTransformAnimationTest",
        args: {
            windows_chrome: { count: 5000 },
            osx_chrome: { count: 5000 },
            ios_safari: { count: 2600 },
            ios_chrome: { count: 2600 },
            android_chrome: { count: 1500 },
            android_qq: { count: 1500 },
            default: { count: 5000 }
        },
        auto: true,
    },
    {
        name: "Bunny Frame Animation Test",
        scene: "bunnyFrameAnimationTest",
        args: {
            windows_chrome: { count: 5000 },
            osx_chrome: { count: 5000 },
            ios_safari: { count: 3000 },
            ios_chrome: { count: 3000 },
            android_chrome: { count: 2000 },
            android_qq: { count: 2000 },
            default: { count: 5000 }
        },
        auto: true,
    },
    {
        name: "Bunny Transform Action Test",
        scene: "bunnyTransformActionTest",
        args: {
            windows_chrome: { count: 5000 },
            osx_chrome: { count: 5000 },
            ios_safari: { count: 2600 },
            ios_chrome: { count: 2600 },
            android_chrome: { count: 1500 },
            android_qq: { count: 1500 },
            default: { count: 5000 }
        },
        auto: true,
    },
    {
        name: "Load Prefab Test",
        scene: "loadPrefabTest",
        args: {
            windows_chrome: { count: 20 },
            osx_chrome: { count: 20 },
            ios_safari: { count: 20 },
            ios_chrome: { count: 20 },
            android_chrome: { count: 20 },
            android_qq: { count: 20 },
            default: { count: 20 }
        },
        auto: true,
    },
    {
        name: "UI Test",
        scene: "uiTest",
        auto: true,
    },
    {
        name: "Spine Test",
        scene: "spine",
        auto: true,
    },
];

config.setSceneArgs = function (testCaseInfo) {
    let args = null;
    if (testCaseInfo.args) {
        switch (cc.sys.os) {
            case cc.sys.OS_WINDOWS:
                switch (cc.sys.browserType) {
                    case cc.sys.BROWSER_TYPE_CHROME:
                        args = testCaseInfo.args.windows_chrome;
                        break;
                    default:
                        break;
                }
                break;
            case cc.sys.OS_OSX:
                switch (cc.sys.browserType) {
                    case cc.sys.BROWSER_TYPE_CHROME:
                        args = testCaseInfo.args.osx_chrome;
                        break;
                    default:
                        break;
                }
                break;
            case cc.sys.OS_IOS: 
                switch (cc.sys.browserType) {
                    case cc.sys.BROWSER_TYPE_SAFARI:
                        args = testCaseInfo.args.ios_safari;
                        break;
                    case cc.sys.BROWSER_TYPE_CHROME:
                        args = testCaseInfo.args.ios_chrome;
                        break;
                    default:
                        break;
                }
                break;
            case cc.sys.OS_ANDROID:
                switch (cc.sys.browserType) {
                    case cc.sys.BROWSER_TYPE_CHROME:
                        args = testCaseInfo.args.android_chrome;
                        break;
                    case cc.sys.BROWSER_TYPE_MOBILE_QQ:
                        args = testCaseInfo.args.android_qq;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        args = args || testCaseInfo.args.default;
    }
    config.SCENE_ARGS = args;
}

config.CURRENT_CASE = -1;

config.HIGHEST_ZINDEX = 65500;

config.SCENE_ARGS = null;

config.IS_AUTO_TESTING = false;

config.AUTO_CASE_CURSOR = 0;

config.AUTO_TEST_RESULT = {};

config.AUTO_TEST_POST_URL = "http://192.168.52.104:30000/upload_result";

module.exports = config;