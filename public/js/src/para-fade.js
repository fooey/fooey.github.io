'use strict';

const _ = require('lodash');


module.exports = function(containerSelector, contentSelector) {
    let $container = $(containerSelector);
    let $content   = $container.find(contentSelector);

    if ($container && $content) {
        let $win            = $(window);
        const contentTop    = $container.offset().top;
        const contentBottom = $container.offset().top + $container.outerHeight() + 1;

        $win.scroll(_.throttle(function() {
            const winScroll = $win.scrollTop();

            if (winScroll <= contentTop) {
                $content.css({
                    position: '',
                    top     : '',
                    opacity : 1,
                });
            }
            else {
                const contentScrolled = winScroll - contentTop;
                const opacity         = (contentBottom - winScroll) / contentBottom;

                $content.css({
                    position: 'relative',
                    top     : contentScrolled / 2,
                    opacity : opacity,
                });
            }

        }, 1000 / 60));
    }

};