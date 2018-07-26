//////////////////////////////COMMON METHODS FOR ALL AD TYPES//////////////////////////////
var callbackFunction;           //Store the function reference for Ad Event Callback

function vdopiaLog(message) {
    if (true) {                 //Make it false to disable log
        console.log(message)
    }
}

function setAdRequestUserParams(age, birthDate, gender, maritalStatus,
                                ethnicity, dmaCode, postal, curPostal, latitude, longitude) {
    vdopiaLog("VdopiaPlugin.js: setAdRequestUserParams");

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        "VdopiaPlugin",
        ACTION_SET_USER_PARAMS,
        [{
         	"AGE":age,
         	"BIRTHDATE":birthDate,
         	"GENDER":gender,
         	"MARITALSTATUS":maritalStatus,
         	"ETHNICITY":ethnicity,
            "DMACODE":dmaCode,
            "POSTAL":postal,
            "CURPOSTAL":curPostal,
            "LATITUDE":latitude,
            "LONGITUDE":longitude
         }]
    );
}

function setAdRequestAppParams(appName, pubName, appDomain, pubDomain, storeUrl, iabCategory) {
    vdopiaLog("VdopiaPlugin.js: setAdRequestAppParams");

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        "VdopiaPlugin",
        ACTION_SET_APP_PARAMS,
        [{
         	"APPNAME":appName,
         	"PUBNAME":pubName,
         	"APPDOMAIN":appDomain,
         	"PUBDOMAIN":pubDomain,
         	"STOREURL":storeUrl,
            "IABCATEGORY":iabCategory
         }]
    );
}

//////////////////////////////INITIALIZE CHOCOLATE ADS SDK//////////////////////////////
var ACTION_CHOCOLATE_INIT = "CHOCOLATE_INIT";
function initializeChocolateSDK(apikey) {
    vdopiaLog("VdopiaPlugin.js:chocolateInit");

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        "VdopiaPlugin",
        ACTION_CHOCOLATE_INIT,
        [{"apikey":apikey}]
    );
}


function setTestModeEnabled(isEnabled, hashID) {
    vdopiaLog("VdopiaPlugin.js: setTestModeEnabled");

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        "VdopiaPlugin",
        ACTION_SET_TESTMODE_PARAMS,
        [{
         	"TESTMODE":isEnabled,
         	"HASHID":hashID
         }]
    );
}

//////////////////////////////SHOW INTERSTITIAL AD//////////////////////////////

var ACTION_PREFETCH_INTERSTITIAL_AD = "PREFETCH_INTERSTITIAL_AD";
var ACTION_LOAD_INTERSTITIAL_AD = "LOAD_INTERSTITIAL_AD";
var ACTION_SHOW_INTERSTITIAL_AD = "SHOW_INTERSTITIAL_AD";

var INTERSTITIAL_AD_LOADED = false;

registerInterstitialAdEvents();

function prefetchInterstitialAdFromSDK(apikey) {
    vdopiaLog("VdopiaPlugin.js:prefetchInterstitialAdFromSDK");

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        "VdopiaPlugin",
        ACTION_PREFETCH_INTERSTITIAL_AD,
        [{"apikey":apikey}]
    );
}

function loadInterstitialAdFromSDK(apikey) {
    vdopiaLog("VdopiaPlugin.js:loadInterstitialAdFromSDK");
    INTERSTITIAL_AD_LOADED = false;

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        "VdopiaPlugin",
        ACTION_LOAD_INTERSTITIAL_AD,
        [{"apikey":apikey}]
    );
}

function showInterstitialAdFromSDK() {
    vdopiaLog("VdopiaPlugin.js: showInterstitialAdFromSDK");

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        "VdopiaPlugin",
        ACTION_SHOW_INTERSTITIAL_AD,
        [{"apikey":""}]
    );
}

function registerInterstitialAdEvents() {
    document.addEventListener('onInterstitialLoaded', function() {
        vdopiaLog("VdopiaPlugin.js:" + "onInterstitialLoaded");
        INTERSTITIAL_AD_LOADED = true;

        callbackFunction("onInterstitialLoaded");
    });

    document.addEventListener('onInterstitialFailed', function(data) {
        vdopiaLog("VdopiaPlugin.js:" + "onInterstitialFailed");
        INTERSTITIAL_AD_LOADED = false;

        callbackFunction("onInterstitialFailed");
    });

    document.addEventListener('onInterstitialShown', function() {
        vdopiaLog("VdopiaPlugin.js:" + "onInterstitialShown");

        callbackFunction("onInterstitialShown");
    });

    document.addEventListener('onInterstitialDismissed', function() {
        vdopiaLog("VdopiaPlugin.js:" + "onInterstitialDismissed");

        callbackFunction("onInterstitialDismissed");
    });

    document.addEventListener('onInterstitialClicked', function() {
        vdopiaLog("VdopiaPlugin.js:" + "onInterstitialClicked");

        callbackFunction("onInterstitialClicked");
    });
}

//////////////////////////////SHOW PREROLL AD//////////////////////////////

var ACTION_SHOW_PREROLL_AD = "SHOW_PREROLL_AD";
var ACTION_PREROLL_AD_EVENT = "PREROLL_AD_EVENT";

var PREROLL_AD_WIDTH;
var PREROLL_AD_HEIGHT;
var PREROLL_AD_CONTAINER;
var PREROLL_AD_VIDEO_ELEMENT;

var NO_OF_PARTNER = 0;
var TOTAL_FAILED_PARTNER = 0;

function showPrerollAdFromSDK(apikey, width, height, adDiv, videoElement) {
    vdopiaLog("VdopiaPlugin.js:" + apikey);

    PREROLL_AD_WIDTH = width;
    PREROLL_AD_HEIGHT = height;
    PREROLL_AD_CONTAINER = adDiv;
    PREROLL_AD_VIDEO_ELEMENT = videoElement;

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        "VdopiaPlugin",
        ACTION_SHOW_PREROLL_AD,
        [{"apikey":apikey, "width":PREROLL_AD_WIDTH, "height":PREROLL_AD_HEIGHT}]
    );
}

function prerollAdLoadedFromSDK(urls) {
    loadPrerollAdInDiv(urls);
}

function prerollAdFailedFromSDK(error) {
    callbackFunction("AdError");

    playMainContent();
}

function loadPrerollAdInDiv(urls) {
    urls = JSON.parse(urls);
    NO_OF_PARTNER = urls.length;
    TOTAL_FAILED_PARTNER = 0;

    for(var url in urls) {
        vdopiaLog("Url from SDK : " + urls[url]);

        if (urls[url].indexOf("caller=mpsdk") != -1) {
            vdopiaLog("VdopiaPlugin.js: Vdopia Player Starting");

            // URL FOR TESTING  :  "https://srv2.vdopia.com/adserver/html5/inwapads/?output=sdkvast&caller=mpsdk&adFormat=preroll&ak=a31006151c434a3205f10250f8676566&version=2.0&fullscreen=0&showClose=1&container=androidWebNot&sleepAfter=0&target_params=sex=Male|birthday=1988-01-21|age=27|maritalStatus=single|ethnicity=asian|postalcode=110096|currpostal=201301|dmacode=807|emailhash+5DF956EDA0E58FF2696E02D9A45A2414|geoType=2&adSize=[vdo_adSize]&adType=[vdo_adtype]&isExpandable=[vdo_expandable]&di=8f0da3f7-9a56-4ecd-a6a0-0b2ec1fe75f2&dimm=[vdo_dimm]&dims=[vdo_dims]&diim=[vdo_diim]&diis=[vdo_diis]&dium=[vdo_dium]&dius=[vdo_dius]&mraid=[vdo_mraid]&requester=Vdopia&dif=dpid&ua=Mozilla/5.0+(Linux;+Android+5.0;+Nexus+5+Build/LRX21O;+wv)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Version/4.0+Chrome/51.0.2704.81+Mobile+Safari/537.36&cb=1470724313&type=app&appDomain=vdopia.com&appBundle=chocolateApp&appName=VdopiaSampleApp&appStoreUrl=play.google.com&category=prerollad&dnt=1&pos=0&linearity=1&publisherdomain=vdopia.com&devicemodel=Nexus+5&deviceos=android&deviceosv=5.0",
            // PARTNER NAME, VAST URL, AD CONTAINER DIV, MAIN CONTENT VIDEO TAG, VIDEO DIV WIDTH, VIDEO DIV HEIGHT, FUNCTION TO GET EVENTS
            new sdk_chocolate(
                "chocolate",
                urls[url],
                PREROLL_AD_CONTAINER, PREROLL_AD_VIDEO_ELEMENT,
                300, 250,
                onAdEventVdopia);
        } else {
            vdopiaLog("VdopiaPlugin.js: IMA Player Starting");

            // URL FOR TESTING  :  "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=",
            // PARTNER NAME, VAST URL, AD CONTAINER DIV, MAIN CONTENT VIDEO TAG, VIDEO DIV WIDTH, VIDEO DIV HEIGHT,
            setupIMA(
                "google",
                urls[url],
                PREROLL_AD_CONTAINER, PREROLL_AD_VIDEO_ELEMENT,
                300, 250);
        }
    }
}

function showPrerollAdInDiv(partner) {
    vdopiaLog("VdopiaPlugin.js: showPrerollAdInDiv for Winner " + partner);

    callbackFunction("AdLoaded");

    if (partner.toLowerCase() === "google") {
        if (playAds) {
            playAds();
        }
    } else {
        if (vdopiaEvent) {
            vdopiaEvent();
        }
    }
}

var vdopiaEvent;        //This variable is required to save the function which start the Ad after mediation
function onAdEventVdopia(event) {
    console.log("Preroll Event Fired : " + event.type);

    if (event.type == "AdLoaded") {
        vdopiaEvent = event.startAd;            //Save function to start the AD in above created variable
        prerollAdEventFromJSPlayer("chocolate", "AdLoaded");
    } else if (event.type == "AdError") {
        prerollAdEventFromJSPlayer("chocolate", "AdError");
    } else if (event.type == 'AdEnded') {
        prerollAdEventFromJSPlayer("chocolate", "AdEnded");
    } else if (event.type == 'AdClicked') {
        prerollAdEventFromJSPlayer("chocolate", "AdClicked");
    }
}

function prerollAdEventFromJSPlayer(partner, event) {
    vdopiaLog("VdopiaPlugin.js: prerollAdLoaded " + partner + " Event : " + event);

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Failed");
        },
        "VdopiaPlugin",
        ACTION_PREROLL_AD_EVENT,
        [{"partner":partner, "event":event}]
    );

    if (event === "AdError") {
        TOTAL_FAILED_PARTNER++;
        vdopiaLog("VdopiaPlugin.js: prerollAdFailed " + TOTAL_FAILED_PARTNER + " :: " + NO_OF_PARTNER);

        if (TOTAL_FAILED_PARTNER == NO_OF_PARTNER) {
            callbackFunction("AdError");
            playMainContent();
        }
    } else if (event === "AdClicked") {
        callbackFunction("AdClicked");
    } else if (event === "AdEnded") {
        callbackFunction("AdEnded");
        playMainContent();
    }
}

function playMainContent() {
    PREROLL_AD_CONTAINER.style.display = "none";

    PREROLL_AD_VIDEO_ELEMENT.load();
    PREROLL_AD_VIDEO_ELEMENT.play();
}

//////////////////////////////SHOW REWARD AD//////////////////////////////
var ACTION_PREFETCH_REWARD_AD = "PREFETCH_REWARD_AD";
var ACTION_LOAD_REWARD_AD = "LOAD_REWARD_AD";
var ACTION_SHOW_REWARD_AD = "SHOW_REWARD_AD";
var ACTION_CHECK_REWARD_AD = "CHECK_REWARD_AD";

var ACTION_SET_USER_PARAMS = "SET_USER_PARAMS";
var ACTION_SET_APP_PARAMS = "SET_APP_PARAMS";
var ACTION_SET_TESTMODE_PARAMS = "SET_TESTMODE_PARAMS";

var REWARD_AD_LOADED = false;

registerRewardAdEvents();

function prefetchRewardAdFromSDK(apikey) {
    vdopiaLog("VdopiaPlugin.js:prefetchRewardAdFromSDK");

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        "VdopiaPlugin",
        ACTION_PREFETCH_REWARD_AD,
        [{"apikey":apikey}]
    );
}

function loadRewardAdFromSDK(apikey) {
    vdopiaLog("VdopiaPlugin.js:loadRewardAdFromSDK");

    REWARD_AD_LOADED = false;

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        "VdopiaPlugin",
        ACTION_LOAD_REWARD_AD,
        [{"apikey":apikey}]
    );
}

function showRewardAdFromSDK(secret, userid, rewardName, rewardAmount) {
    vdopiaLog("VdopiaPlugin.js: showRewardAdFromSDK");

    REWARD_AD_LOADED = false;

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js:" + "Success");
        },
        "VdopiaPlugin",
        ACTION_SHOW_REWARD_AD,
        [{
         	"SECRET":secret,
         	"USERID":userid,
         	"REWARDNAME":rewardName,
         	"REWARDAMOUNT":rewardAmount
         }]
    );
}

function checkRewardAdStatusFromSDK() {
    vdopiaLog("VdopiaPlugin.js: showRewardAdFromSDK");

    cordova.exec(
        function(result) {
            vdopiaLog("VdopiaPlugin.js: checkRewardAdStatus" + "Success");
            REWARD_AD_LOADED = true;
        },
        function(result) {
            vdopiaLog("VdopiaPlugin.js: checkRewardAdStatus" + "Failed");
            REWARD_AD_LOADED = false;
        },
        "VdopiaPlugin",
        ACTION_CHECK_REWARD_AD,
        [{"apikey":""}]
    );
}

function isRewardAdAvailable() {
    vdopiaLog("VdopiaPlugin.js: isRewardAdAvailable " + REWARD_AD_LOADED);
    return REWARD_AD_LOADED;
}

function registerRewardAdEvents() {
    document.addEventListener('onRewardedVideoLoaded', function() {
        vdopiaLog("VdopiaPlugin.js:" + "onRewardedVideoLoaded");
        REWARD_AD_LOADED = true;

        callbackFunction("onRewardedVideoLoaded");
    });

    document.addEventListener('onRewardedVideoFailed', function(data) {
        vdopiaLog("VdopiaPlugin.js:" + "onRewardedVideoFailed");
        REWARD_AD_LOADED = false;

        callbackFunction("onRewardedVideoFailed");
    });

    document.addEventListener('onRewardedVideoShown', function() {
        vdopiaLog("VdopiaPlugin.js:" + "onRewardedVideoShown");

        callbackFunction("onRewardedVideoShown");
    });

    document.addEventListener('onRewardedVideoShownError', function() {
        vdopiaLog("VdopiaPlugin.js:" + "onRewardedVideoShownError");

        callbackFunction("onRewardedVideoShownError");
    });

    document.addEventListener('onRewardedVideoDismissed', function() {
        vdopiaLog("VdopiaPlugin.js:" + "onRewardedVideoDismissed");

        callbackFunction("onRewardedVideoDismissed");
    });

    document.addEventListener('onRewardedVideoCompleted', function() {
        vdopiaLog("VdopiaPlugin.js:" + "onRewardedVideoCompleted");

        callbackFunction("onRewardedVideoCompleted");
    });
}
