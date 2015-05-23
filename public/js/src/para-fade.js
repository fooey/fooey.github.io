'use strict';


module.exports = function(scrollListeners, $container, $content) {
    if ($container && $content) {
        const contentTop    = $container.offset().top;
        const contentBottom = $container.offset().top + $container.outerHeight() + 1;


        scrollListeners.push(onScroll.bind(null, $content, contentTop, contentBottom));
    }
};



function onScroll ($content, contentTop, contentBottom) {
    const winScroll = window.pageYOffset || document.body.scrollTop;

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
}