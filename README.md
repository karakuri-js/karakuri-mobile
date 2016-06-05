# Karakuri-mobile

React-Native App connecting to a Karakuri server

## Setup

```sh
npm install
npm install -g rnpm
rnpm link
```

## Building & running
```sh
npm start
react-native run-android # In another terminal
adb reverse tcp:8081 tcp:8081 # Necessary to run on a physical Android device
adb logcat *:S ReactNative:V ReactNativeJS:V # Get app logs
```

The app currently isn't iOS-ready.
