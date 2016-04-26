#!/usr/bin/env node
'use strict';

const argv = require('yargs').argv;

const bs = require('browser-sync').create();
const fs = require('fs-extra');
const path = require('path');
const shelljs = require('shelljs');

const TIM_DIR = path.join(process.cwd(), ".tim");

fs.removeSync(TIM_DIR);

if (!(argv.merge === false)) {
    console.log('Running with merges');
} else {
    console.log('Running without merges');
}

bs.watch(path.join(process.cwd(), "{www,merges}/**/*")).on("change", function () {
    // merge can be undefined, true or false, due to the --no-merge flag
    if (!(argv.merge === false)) {
        shelljs.exec(path.join(process.cwd(), 'node_modules/.bin/cordova'), 'prepare');
    }

    bs.reload();
});

if (!(argv.merge === false)) {
    bs.init({
        proxy: {
            target: "http://localhost:8000"
        },
        open: false
    }, serverReady);
} else {
    bs.init({
        server: {
            baseDir: "www"
        },
        open: false
    }, serverReady);
}

function serverReady(err, config) {
    fs.outputJson(path.join(TIM_DIR, 'tim.json'), config.options, function (err) {
        if (err) {
            console.log(err);
        }
    })
}

