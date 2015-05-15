'use strict';

const _ = require('lodash');


module.exports = function($win) {
    let $nav2 = $('#navbar2');
    const navHeight = $nav2.height();

    $win.scroll(_.throttle(function() {
        const winScroll = $win.scrollTop();

        if (winScroll <= navHeight) {
            $nav2.css({
                bottom: `-${navHeight - winScroll}px`
            });
        }
        else {
            $nav2.css({
                bottom: '0px'
            });
        }

    }, 1000 / 60));

};