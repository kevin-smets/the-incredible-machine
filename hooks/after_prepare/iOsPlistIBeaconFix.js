#!/usr/bin/env node
'use strict';

// Fixes https://github.com/petermetz/cordova-plugin-ibeacon/issues/212

module.exports = function (context) {
    // Only needs to run for iOS
    if (context.opts.platforms.indexOf('ios') < 0) {
        return;
    }

    // Cordova node modules
    const fs = context.requireCordovaModule('fs'),
        plist = context.requireCordovaModule('plist'),
        ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser,
        config = new ConfigParser('config.xml');

    const INFO_PLIST_PATH = `platforms/ios/${config.name()}/${config.name()}-Info.plist`;

    var xml = fs.readFileSync(INFO_PLIST_PATH, 'utf8'),
        plistObj = plist.parse(xml);

    if (!plistObj.UIBackgroundModes) {
        plistObj.UIBackgroundModes = ["location"];
    } else if (plistObj.UIBackgroundModes.indexOf("location") < 0) {
        plistObj.UIBackgroundModes.push("location");
    }

    console.log(`Enabled UIBackgroundModes are ${plistObj.UIBackgroundModes}`);

    xml = plist.build(plistObj);
    fs.writeFileSync(INFO_PLIST_PATH, xml);
};