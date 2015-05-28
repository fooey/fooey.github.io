'use strict';

require('babel/polyfill');

const _     = require('lodash');

const navbar = require('./navbar');
const paraFade = require('./para-fade');


$(function() {

    $('.lightboxed').featherlight('image');


    require('./nospam')('.nospam-email-address');
    require('./header-anchors');
    require('./bootstrap-fixes');


    let $win  = $(window);
    let scrollListeners = [];


    navbar(scrollListeners);

    paraFade(scrollListeners, $('#welcome'), $('#welcome header'));


   $win.scroll(_.throttle(function() {
       scrollListeners.forEach(fn => fn());
    }, 1000 / 60));



    $('.img-lazy').each(function(){
        let $img = $(this);
        let src = $img.data('src');

        $(this).attr('src', src);
    });

});