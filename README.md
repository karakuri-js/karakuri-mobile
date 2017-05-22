# Karakuri-mobile

React-Native App connecting to a [Karakuri server](https://github.com/karakuri-js/karakuri-server)

## Setup

```sh
yarn
```

## Building & running
```sh
yarn start
react-native run-android # In another terminal
adb reverse tcp:8081 tcp:8081 # Necessary to run on a physical Android device
adb logcat *:S ReactNative:V ReactNativeJS:V # Get app logs
```

The app currently isn't iOS-ready.
