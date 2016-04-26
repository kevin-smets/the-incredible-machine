#!/usr/bin/env node
'use strict';

module.exports = function (context) {
    if (context.opts.platforms.indexOf('android') < 0 && context.opts.platforms.indexOf('ios') < 0) {
        return;
    }

    const argv = require('yargs').argv,
        ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser,
        config = new ConfigParser('config.xml'),
        fs = context.requireCordovaModule('fs'),
        networkInterfaces = context.requireCordovaModule('os').networkInterfaces(),
        parser = require('xml2json');

    if (argv.livereload) {
        // Fetch the IP address
        var ip = '0.0.0.0';

        networkInterfaces.en0.forEach(function (networkInterface) {
            if (networkInterface.family === 'IPv4') {
                ip = networkInterface.address;
            }
        });

        // Modify the start page for the given platform(s)
        context.opts.platforms.forEach(function (platform) {
            var configPath = undefined;
            var urlEnd = platform + '/www/index.html';

            // --no-merge flag
            if (!(argv.merge === false)) {
                console.log('Running with merges');
            } else {
                console.log('Running without merges');
                urlEnd = 'index.html';
            }

            switch (platform) {
                case 'android':
                    configPath = './platforms/android/res/xml/config.xml';
                    break;
                case 'ios':
                    configPath = `./platforms/ios/${config.name()}/config.xml`;
                    break;
            }

            if (configPath) {
                var xml = fs.readFileSync(configPath);

                var json = JSON.parse(parser.toJson(xml));

                json.widget.content.src = `http://${ip}:3000/${urlEnd}`;
                console.log(`Content src for ${platform} set to ${json.widget.content.src}`);

                fs.writeFileSync(configPath, parser.toXml(json), 'utf8');
            }
        });
    }
};

