'use strict';

// require('babel/polyfill');
const paraFade = require('./para-fade');

$(function() {
    require('./nospam')('.nospam-email-address');
    require('./header-anchors');
    require('./bootstrap-fixes');

    paraFade('#welcome', 'header');
});