'use strict';

module.exports = (function(){
    var $welcome = $('#welcome');
    if ($welcome) {
        var $win = $(window);
        var $header = $welcome.find('header');
        var offscreen = $welcome.offset().top + $welcome.outerHeight() + 1;

        $win.scroll(_.throttle(function(){
            var st = $win.scrollTop();
            var opacity = (offscreen - st) / offscreen;


            if (st === 0) {
                $header.css({
                    position: '',
                    top: '',
                    opacity: 1,
                });
            }
            else {
                $header.css({
                    position: 'relative',
                    top: st/3,
                    opacity: opacity,
                });
            }
        }, 1000/30));
    }
}());