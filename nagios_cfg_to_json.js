#!/usr/bin/env node

var l = console.log,
    async = require('async'),
        fs = require('fs'),
        FileHound = require('filehound'),
        nagioscfg2json = require('nagioscfg2json');

var CFG = '/etc/nagios/conf.d/vpnServers.cfg',
    NAGIOS_DIR = '/etc/nagios',
    CACHE = '/var/spool/nagios/objects.cache';


const files = FileHound.create()
    .paths(NAGIOS_DIR)
    .ext('cfg')
    .size('>16')
    .find();

files.then(function(files) {
files = [CACHE];
    async.map(files, function(file, _cb) {
        var R = {
            file: file,
            json: null,
            err: null,
        };
        try {
            nagioscfg2json.fromFile(file, function(json) {
                R.json = json;
                _cb(null, R);
            });
        } catch (e) {
            R.err = e;
            _cb(null, R);
        }
    }, function(errs, file_contents) {
        if (errs) throw errs;

  //      l(JSON.stringify(file_contents));
//        l(file_contents);
        l(file_contents[0].json.command);
        process.exit();

    });
});
