#!/usr/bin/env node

var l = console.log,
        nagioscfg2json = require('nagioscfg2json'),
CACHE = '/var/spool/nagios/objects.cache';


var handle_json = function(json) {
    l(JSON.stringify(json));
};


nagioscfg2json.fromFile(CACHE, handle_json);
