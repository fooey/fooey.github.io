'use strict';

require('babel/polyfill');

const _     = require('lodash');


$(function() {

    // 3rd party jquery plugins
    $('.lightboxed').featherlight('image');



    // create a throttledScroll event on the window limited to 30 calls per second

    let $win  = $(window);
    $win.scroll(_.throttle(
        $win.trigger.bind($win, 'throttledScroll'),
        1000 / 30
    ));



    // custom js modules

    require('./nospam')('.nospam-email-address');
    require('./header-anchors');
    // require('./bootstrap-fixes');

    require('./navbar')($win);
    require('./para-fade')($win, $('#welcome'), $('#welcome header'));


    $('.img-lazy').each(function() {
        let $el = $(this);
        let src = $el.data('src');

        $el.attr('src', src);
    });

});