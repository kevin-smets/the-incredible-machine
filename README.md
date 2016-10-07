# T.I.M. - The Incredible Machine

### Hooks

The following Cordova hooks are provided by T.I.M.

```
<hook type="after_prepare" src="node_modules/the-incredible-machine/hooks/after_prepare/iOsPlistIBeaconFix.js" />
<hook type="after_prepare" src="node_modules/the-incredible-machine/hooks/after_prepare/liveReload.js" />
```

- iOsPlistIBeaconFix: adds "location" to the background modes of your iOS app if it's not added already. Required if you use iBeacon with WkWebView. [More info](https://github.com/petermetz/cordova-plugin-ibeacon/issues/212).
- liveReload: will enable live reload for Android and iOS

## Run T.I.M.

Files in `merges` and `www` are monitored for changes and will trigger the appropriate reloads. It's your responsibility to get them there :).

### Browser / desktop only

```
bin/tim [--no-merge]
```

TIM will serve you at **[localhost:3000](http://localhost:3000)**

BrowserSync is used as a proxy for live reloading and syncing events across browser instances.

--no-merge is explained below.

### Mobile devices or emulators

```
cordova prepare

cordova run android [--livereload] [--no-merge]
cordova run ios [--livereload] [--device] [--no-merge]
```

--livereload:

1. `npm start` needs to run actively
1. both devices need to be on the same network.

--no-merge

If you do not have any [platform specific files](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#using-merges-to-customize-each-platform), you can add this flag. This will speed up live reloading as it skips the `cordova generate` step.

You'll need to have started tim with this flag as well: `tim --no-merge`

--device

It's needed for iOS to deploy to a device instead of the simulator. You'll need to add a provisioning profile to your XCode project before you can do this.
