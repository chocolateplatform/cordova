#chocolate_Interstitial Using Cordova Framework

Please install Cordova, android sdk, NDK and other requirements for creating cordova app. We are assuming all the required settings is done prior to the below steps. Please go through the cordova doc https://cordova.apache.org/docs/en/latest/ for more details on setting up cordova

Steps :

1. Create app using command : cordova create <appname>


2. For creating android project use the command :  cordova platform add android 

3. You can develop your project for android by creating new or editing existing HTML,JS,CSS files under platforms/android/assets/www/ folder

4. If you are creating an common project for many platforms we suggest you to develop the app first by creating files or editing existing files under src : prjectname/www/ and then add platform use the step No.2 command will be cordova platform . It will create folders for every platform like android. 

5. following the chocolate sdk documentation js libraries are added in the folder : platforms/android/assets/www/

6. add the Load and show ad methods in your js file. 

6. One the project : projectname/platforms/android in android studio. 

7. Add the dependencies as per chocolate SDK document in build.gradle

8. Build and Run the project . 