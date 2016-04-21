#!/usr/bin/env node
'use strict';

const argv = require('yargs').argv;

const bs = require('browser-sync').create();
const fs = require('fs-extra');
const path = require('path');
const shelljs = require('shelljs');

const TIM_DIR = path.join(process.cwd(), ".tim");

fs.removeSync(TIM_DIR);

bs.watch(path.join(process.cwd(), "{www,merges}/**/*")).on("change", function() {
    shelljs.exec(path.join(process.cwd(), 'node_modules/.bin/cordova') + ' prepare');
    bs.reload();
});

bs.init({
    proxy: {
        target: "http://localhost:8000"
    },
    open: false
}, function(err, config){
    fs.outputJson(path.join(TIM_DIR, 'tim.json'), config.options, function (err) {
        if (err) {
            console.log(err);
        }
    })
});
