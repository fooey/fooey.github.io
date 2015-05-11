'use strict';

require('babel/polyfill');


$(function() {
    const paraFade = require('./para-fade');


    require('./nospam')('.nospam-email-address');
    require('./header-anchors');
    require('./bootstrap-fixes');

    paraFade('#welcome', 'header');
});