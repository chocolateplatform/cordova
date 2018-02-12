// Copyright 2013 Google Inc. All Rights Reserved.
// You may study, modify, and use this example for any purpose.
// Note that this example is provided "as is", WITHOUT WARRANTY
// of any kind either expressed or implied.
var partnerName,
    adsManager,
    adsLoader,
    adDisplayContainer,
    adContainer,
    intervalTimer,
    videoContent,
    vastTAG,
    adsRequest,
    adsRenderingSettings,
    _vwidth,
    _vheight;

function setupIMA(partner, vast, adDiv, videoElement, width, height) {
	partnerName = partner;

	vastTAG = vast;
	_vwidth = width;
	_vheight = height;

	adsManager = null;
	adsLoader = null;
	adsRequest = null;
	adsRenderingSettings = null;
	adDisplayContainer = null;

	adContainer = adDiv;
	videoContent = videoElement;

	initIMA();
}

function initIMA() {
	// To enable VPAID 2 JavaScript support, call the following method before initializing your
	google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

    // Create the ad display container.
	createAdDisplayContainer();

    // Create the adsLoader.
	createAdsLoader();
}

function createAdDisplayContainer() {
	// We assume the adContainer is the DOM id of the element that will house the ads.
	adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoContent);
}

function createAdsLoader() {
    // Create ads loader.
	adsLoader = new google.ima.AdsLoader(adDisplayContainer);

	var mode = google.ima.ImaSdkSettings.VpaidMode.INSECURE;
	adsLoader.getSettings().setVpaidMode(mode);
	adsLoader.getSettings().setAutoPlayAdBreaks(false);
	adsManager = null;

	// Listen and respond to ads loaded and error events.
	adsLoader.addEventListener(
		google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
		onAdsManagerLoaded,
		false);
	adsLoader.addEventListener(
		google.ima.AdErrorEvent.Type.AD_ERROR,
		onAdError,
		false);

	// Request video ads.
	adsRequest = new google.ima.AdsRequest();
	adsRequest.adTagUrl = vastTAG;

	// Specify the linear and nonlinear slot sizes. This helps the SDK to select the correct creative if multiple are returned.
	adsRequest.linearAdSlotWidth = _vwidth;
	adsRequest.linearAdSlotHeight = _vheight;
	adsRequest.nonLinearAdSlotWidth = _vwidth;
	adsRequest.nonLinearAdSlotHeight = _vheight;

	adsLoader.requestAds(adsRequest);
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
	// Get the ads manager.
	adsRenderingSettings = new google.ima.AdsRenderingSettings();
	adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    adsRenderingSettings.uiElements = [google.ima.ViewMode.FULLSCREEN];
	// videoContent should be set to the content video element.
	adsManager = adsManagerLoadedEvent.getAdsManager(videoContent, adsRenderingSettings);

	adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
	adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, onContentPauseRequested);
	adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, onContentResumeRequested);

	var events = [
		google.ima.AdEvent.Type.AD_BREAK_READY,
		google.ima.AdEvent.Type.AD_METADATA,
		google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
		google.ima.AdEvent.Type.CLICK,
		google.ima.AdEvent.Type.COMPLETE,
		google.ima.AdEvent.Type.DURATION_CHANGE,
		google.ima.AdEvent.Type.IMPRESSION,
		google.ima.AdEvent.Type.STARTED,
		google.ima.AdEvent.Type.FIRST_QUARTILE,
		google.ima.AdEvent.Type.MIDPOINT,
		google.ima.AdEvent.Type.THIRD_QUARTILE,
		google.ima.AdEvent.Type.LOADED,
		google.ima.AdEvent.Type.LINEAR_CHANGED,
		google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED,
		google.ima.AdEvent.Type.SKIPPED,
		google.ima.AdEvent.Type.USER_CLOSE,
		google.ima.AdEvent.Type.VOLUME_CHANGED,
		google.ima.AdEvent.Type.VOLUME_MUTED,
		google.ima.AdEvent.Type.PAUSED,
		google.ima.AdEvent.Type.RESUMED];

	for (var index in events) {
		adsManager.addEventListener(events[index], onAdEvent, false, this);
	}

    //prerollAdLoadedFromJSPlayer(partnerName);
    prerollAdEventFromJSPlayer(partnerName, "AdLoaded");
}

function onAdError(adErrorEvent) {
	try {
        adsManager.destroy();
    } catch (adError) {
    }

	//prerollAdFailedFromJSPlayer(partnerName);
	prerollAdEventFromJSPlayer(partnerName, "AdError");
}

function onAdEvent(adEvent) {
	var ad = adEvent.getAd();

	console.log("LOG EVENT : " + adEvent.type);

	switch (adEvent.type) {
        case google.ima.AdEvent.Type.LOADED:
            // This is the first event sent for an ad - it is possible to
            // determine whether the ad is a video ad or an overlay.
            if (!ad.isLinear()) {
                // Position AdDisplayContainer correctly for overlay. Use ad.width and ad.height.
                // videoContent.play();
                //prerollAdCompletedFromJSPlayer(partnerName);
                prerollAdEventFromJSPlayer(partnerName, "AdEnded");
            }
            break;
        case google.ima.AdEvent.Type.STARTED:
            // This event indicates the ad has started - the video player
            // can adjust the UI, for example display a pause button and
            // remaining time.
            if (ad.isLinear()) {
                // For a linear ad, a timer can be started to poll for the remaining time.
                intervalTimer = setInterval(
                        function () {
                        var remainingTime = adsManager.getRemainingTime();
                    },
                300); // every 300ms
            }
            break;
        case google.ima.AdEvent.Type.COMPLETE:
            // This event indicates the ad has finished - the video player
            // can perform appropriate UI actions, such as removing the timer for
            // remaining time detection.
            if (ad.isLinear()) {
                clearInterval(intervalTimer);
            }
            break;
        case google.ima.AdEvent.Type.CLICK:
            //prerollAdClickedFromJSPlayer(partnerName);
            prerollAdEventFromJSPlayer(partnerName, "AdClicked");
            break;
        default:
            break;
	}
}

function playAds() {
	// Initialize the container. Must be done via a user action on mobile devices.
	adDisplayContainer.initialize();

	videoContent.load();

	try {
		// Initialize the ads manager. Ad rules playlist will start at this time.
		adsManager.init(_vwidth, _vheight, google.ima.ViewMode.NORMAL);

		// Call play to start showing the ad. Single video and overlay ads will
		// start at this time; the call will be ignored for ad rules.
		adsManager.start();
	} catch (adError) {
	    console.log("Ad Error Event : adsManager init");
		// An error may be thrown if there was a problem with the VAST response.
		// videoContent.play();

		//prerollAdCompletedFromJSPlayer(partnerName);
		prerollAdEventFromJSPlayer(partnerName, "AdEnded");
	}
}

function onContentPauseRequested() {
	// videoContent.pause();
	// This function is where you should setup UI for showing ads (e.g.
	// display ad timer countdown, disable seeking etc.)
	// setupUIForAds();
}

function onContentResumeRequested() {
    //prerollAdCompletedFromJSPlayer(partnerName);
    prerollAdEventFromJSPlayer(partnerName, "AdEnded");

    // videoContent.play();

	// This function is where you should ensure that your UI is ready
	// to play content. It is the responsibility of the Publisher to
	// implement this function when necessary.
	// setupUIForContent();
}

// Wire UI element references and UI event listeners.
// init();
