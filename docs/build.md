# Build instructions

## 📌 Prerequisites

- Run:
  ```sh
  npm install
  ```
- Download google-services.json (Android) and GoogleService-Info.plist (iOS) from the Firebase console.

## iOS/Android Build

### Running the Native App

- iOS: `npx expo run:ios`
  - Xcode must be installed for this to run.
    - A simulator must be preconfigured in Xcode settings.
      - if no iOS versions are available, install the iOS runtime at `Xcode > Settings > Platforms`.
      - if the simulator download keeps failing you can download it from the developer website.
        - [Apple Developer](https://developer.apple.com/download/all/?q=Simulator%20Runtime)
        - `xcode-select -s /Applications/Xcode.app`
        - `xcodebuild -runFirstLaunch`
        - `xcrun simctl runtime add "~/Downloads/iOS_17.4_Simulator_Runtime.dmg"` (adapt the path to the downloaded file)
    - In addition, ensure Xcode Command Line Tools are installed using `xcode-select --install`.
  - Expo will require you to configure Xcode Signing. Follow the linked instructions. Error messages in Xcode related to the signing process can be safely ignored when installing on the iOS Simulator; Expo merely requires the profile to exist in order to install the app on the Simulator.
    - Make sure you do have a certificate: open Xcode > Settings > Accounts > (sign-in) > Manage Certificates > + > Apple Development > Done.
    - If you still encounter issues, try `rm -rf ios` before trying to build again (`yarn ios`)
- Android: `npx expo run:android`
  - Install "Android Studio"
    - Make sure you have the Android SDK installed (Android Studio > Tools > Android SDK).
      - In "SDK Platforms": "Android x" (where x is Android's current version).
      - In "SDK Tools": "Android SDK Build-Tools" and "Android Emulator" are required.
      - Add `export ANDROID_HOME=/Users/<your_username>/Library/Android/sdk` to your `.zshrc` or `.bashrc` (and restart your terminal).
    - Setup an emulator (Android Studio > Tools > Device Manager).
