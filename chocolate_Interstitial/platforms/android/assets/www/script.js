// JavaScript Documen
window.addEventListener("load",init,false)

function init(){


}

function Load(){
	
	document.getElementById("loadIntesrtitial").style.display="none";
	document.getElementById("adloading").style.display="block";
	console.log("Interstitial Ad Load");
    callbackFunction = InterstitialAdEvent;
     loadInterstitialAdFromSDK("0DqXTL");


        //APIKEY

	
}

function Show(){

 showInterstitialAdFromSDK();

}

function InterstitialAdEvent(message) {
console.log("Interstitial Ad Event ::: " + message);

	if (message === "onInterstitialLoaded") {

       console.log("onInterstitialLoaded");

       document.getElementById("adloading").style.display="none";
       document.getElementById("showInterstitial").style.display="block";

  }

    if (message === "onInterstitialShown") {

        console.log("onInterstitialShown");

   }

   if (message === "onInterstitialFailed") {

        console.log("onInterstitialLoaded");

   }

   if (message === "onInterstitialDismissed") {

        console.log("onInterstitialLoaded");

        reload();

     }
   if (message === "onInterstitialClicked") {
	   console.log("onInterstitialClicked");

    }

}

function reload(){
 document.getElementById("adloading").style.display="none";
       document.getElementById("showInterstitial").style.display="none";
        document.getElementById("loadIntesrtitial").style.display="block";


}


