"use strict";
// require('babel/polyfill');

$(function() {
    require('./nospam')('.nospam-email-address');
    require('./header-anchors');
    require('./bootstrap-fixes');

    const paraFade = require('./para-fade');
    paraFade('#welcome', 'header');
});