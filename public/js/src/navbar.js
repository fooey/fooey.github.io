'use strict';

const _ = require('lodash');


module.exports = function($win) {
    let $nav = $('#navbar');
    const navHeight = $nav.height();

    let $nav2 = $('#navbar2')
        .addClass('navbar-fixed-bottom')
        .css({
            bottom: '-' + navHeight + 'px'
        });


    $win.scroll(_.throttle(function() {
        const winScroll = $win.scrollTop();

        if (winScroll <= navHeight) {
            $nav2
                .css({
                    bottom: '-' + (navHeight - winScroll) + 'px'
                });
        }
        else {
            $nav2
                .css({
                    bottom: '0px'
                });
        }

    }, 1000 / 60));

};