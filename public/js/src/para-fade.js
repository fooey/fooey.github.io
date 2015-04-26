'use strict';

const _ = require('lodash');


module.exports = function(containerSelector, contentSelector){
    var $container = $(containerSelector);
    var $content   = $container.find(contentSelector);

    if ($container && $content) {
        var $win          = $(window);
        var contentTop    = $container.offset().top;
        var contentBottom = $container.offset().top + $container.outerHeight() + 1;

        $win.scroll(_.throttle(function(){
            var winScroll = $win.scrollTop();

            if (winScroll <= contentTop) {
                $content.css({
                    position: '',
                    top     : '',
                    opacity : 1,
                });
            }
            else {
                var contentScrolled = winScroll - contentTop;
                var opacity         = (contentBottom - winScroll) / contentBottom;

                $content.css({
                    position: 'relative',
                    top     : contentScrolled/2,
                    opacity : opacity,
                });
            }

        }, 1000/60));
    }

};