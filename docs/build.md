# Build Instructions

## 📌 Prerequisites

- Run:
  ```sh
  npm install
  ```
- Download **google-services.json** (Android) and **GoogleService-Info.plist** (iOS) from the Firebase console.

---

## 🚀 iOS/Android Build

### **Prebuild Native Code (Required for Development Builds)**

```sh
npx expo prebuild
```

This updates the native code in the `ios/` and `android/` directories.

---

### **📱 iOS: Install Pods & Run App**

```sh
cd ios && pod install && cd ..
npx expo run:ios
```

- **Xcode must be installed**.
- **Simulator Setup in Xcode**:
  - Open **Xcode > Settings > Platforms**, and ensure **iOS Simulator Runtime** is installed.
  - If the simulator download fails, you can download it manually from:
    - [Apple Developer](https://developer.apple.com/download/all/?q=Simulator%20Runtime)
  - Run the following commands to install a downloaded simulator manually:
    ```sh
    xcode-select -s /Applications/Xcode.app
    xcodebuild -runFirstLaunch
    xcrun simctl runtime add "~/Downloads/iOS_17.4_Simulator_Runtime.dmg"
    ```
    _(Modify the path to match the downloaded file location.)_
- **Install Xcode Command Line Tools**:
  ```sh
  xcode-select --install
  ```
- **Xcode Signing Setup (Required by Expo)**
  - Open **Xcode > Settings > Accounts**.
  - Sign in and navigate to **Manage Certificates**.
  - Click **+** → Select **Apple Development** → Click **Done**.
  - If signing issues persist, try removing and rebuilding iOS:
    ```sh
    rm -rf ios && npm run ios
    ```

---

### **🤖 Android: Run App**

```sh
npx expo run:android
```

- **Install Android Studio**.
- **Set Up the Android SDK**:
  - Open **Android Studio > Tools > SDK Manager**.
  - **SDK Platforms**:
    - Install the latest **Android X** version.
  - **SDK Tools**:
    - Ensure **Android SDK Build-Tools** and **Android Emulator** are installed.
- **Set Up Environment Variables**:
  - Add the following lines to **\~/.zshrc** (if using Zsh) or **\~/.bashrc** (if using Bash):
    ```sh
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```
  - Restart your terminal:
    ```sh
    source ~/.zshrc  # Or source ~/.bashrc
    ```
- **Set Up an Emulator**:
  - Open **Android Studio > Tools > Device Manager**.
  - Create and configure an emulator.

---
