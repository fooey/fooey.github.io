'use strict';

require('babel/polyfill');


$(function() {

    $('.lightboxed').featherlight('image');


    require('./nospam')('.nospam-email-address');
    require('./header-anchors');
    require('./bootstrap-fixes');


    let $win  = $(window);
    require('./navbar')($win);
    require('./para-fade')($win, '#welcome', 'header');

});