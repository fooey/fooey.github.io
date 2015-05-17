'use strict';

const _ = require('lodash');


module.exports = function($win) {
    // let $nav2 = $('#navbar2');
    let $hamburger = $('#hamburger');

    const navHeight = 60;
    const hbBaseOffset = -50;

    $win.scroll(_.throttle(function() {
        const winScroll = $win.scrollTop();

        if (winScroll <= navHeight) {
            $hamburger.css({
                top: `${hbBaseOffset + winScroll}px`
            });
            // $nav2.css({
            //     bottom: `-${navHeight - winScroll}px`
            // });
        }
        else {
            $hamburger.css({
                top: `10px`
            });
            // $nav2.css({
            //     bottom: '0px'
            // });
        }

    }, 1000 / 60));

};