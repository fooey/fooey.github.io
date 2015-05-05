(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// require('babel/polyfill');
var paraFade = require('./para-fade');

$(function () {
    require('./nospam')('.nospam-email-address');
    require('./header-anchors');
    require('./bootstrap-fixes');

    paraFade('#welcome', 'header');
});

},{"./bootstrap-fixes":2,"./header-anchors":3,"./nospam":4,"./para-fade":5}],2:[function(require,module,exports){
'use strict';

module.exports = (function () {})();

// // collapse the hamburger menu when something is clicked
// $('#navbar')
//  .on('click', '.navbar-collapse.in a', () => {
//    $('.navbar-toggle').click();
//  });

},{}],3:[function(require,module,exports){
'use strict';

// prepend target links to headers
module.exports = (function () {
    $(':header[id], [id]:has(:header)').each(function (i, el) {
        var $el = $(el);
        var id = $el.attr('id');

        var $anchor = $('<a href="#' + id + '"><i class="fa" /></a>');
        var $header = $el.is(':header') ? $el : $el.find(':header:first');

        $header.addClass('anchor-target').prepend($anchor);
    });
})();

},{}],4:[function(require,module,exports){
'use strict';

function nospam(selector) {
    var addr = getAddr();

    $(selector).each(function (i, el) {
        var $el = $(el);

        $el.replaceWith($('<a>', {
            href: 'mailto:' + addr,
            html: $el.html() }));
    });
}

function getAddr() {
    var src = '@ jason rushton com .'.split(' ');
    var addr = [src[1], src[0], src[1], src[2], src[4], src[3]].join('');

    return addr;
}

module.exports = nospam;

},{}],5:[function(require,module,exports){
(function (global){
'use strict';

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

module.exports = function (containerSelector, contentSelector) {
    var $container = $(containerSelector);
    var $content = $container.find(contentSelector);

    if ($container && $content) {
        (function () {
            var $win = $(window);
            var contentTop = $container.offset().top;
            var contentBottom = $container.offset().top + $container.outerHeight() + 1;

            $win.scroll(_.throttle(function () {
                var winScroll = $win.scrollTop();

                if (winScroll <= contentTop) {
                    $content.css({
                        position: '',
                        top: '',
                        opacity: 1 });
                } else {
                    var contentScrolled = winScroll - contentTop;
                    var opacity = (contentBottom - winScroll) / contentBottom;

                    $content.css({
                        position: 'relative',
                        top: contentScrolled / 2,
                        opacity: opacity });
                }
            }, 1000 / 60));
        })();
    }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9hcHAuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9ib290c3RyYXAtZml4ZXMuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9oZWFkZXItYW5jaG9ycy5qcyIsIkQ6L2luZXQvaGVyb2t1L0phc29uUnVzaHRvbi9wdWJsaWMvanMvc3JjL25vc3BhbS5qcyIsIkQ6L2luZXQvaGVyb2t1L0phc29uUnVzaHRvbi9wdWJsaWMvanMvc3JjL3BhcmEtZmFkZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7O0FBR2IsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztBQUV4QyxDQUFDLENBQUMsWUFBVztBQUNULFdBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQzdDLFdBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzVCLFdBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztBQUU3QixZQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ2xDLENBQUMsQ0FBQzs7O0FDWEgsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxPQUFPLEdBQUksQ0FBQSxZQUFXLEVBUTVCLENBQUEsRUFBRSxBQUFDLENBQUM7Ozs7Ozs7OztBQ1ZMLFlBQVksQ0FBQzs7O0FBSWIsTUFBTSxDQUFDLE9BQU8sR0FBSSxDQUFBLFlBQVc7QUFDekIsS0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBSztBQUNoRCxZQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFB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LGFBQWEsR0FBRyxTQUFTLENBQUEsR0FBSSxhQUFhLENBQUM7O0FBRXBFLDRCQUFRLENBQUMsR0FBRyxDQUFDO0FBQ1QsZ0NBQVEsRUFBRSxVQUFVO0FBQ3BCLDJCQUFHLEVBQU8sZUFBZSxHQUFHLENBQUM7QUFDN0IsK0JBQU8sRUFBRyxPQUFPLEVBQ3BCLENBQUMsQ0FBQztpQkFDTjthQUVKLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0tBQ2xCO0NBRUosQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyByZXF1aXJlKCdiYWJlbC9wb2x5ZmlsbCcpO1xyXG5jb25zdCBwYXJhRmFkZSA9IHJlcXVpcmUoJy4vcGFyYS1mYWRlJyk7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgcmVxdWlyZSgnLi9ub3NwYW0nKSgnLm5vc3BhbS1lbWFpbC1hZGRyZXNzJyk7XHJcbiAgICByZXF1aXJlKCcuL2hlYWRlci1hbmNob3JzJyk7XHJcbiAgICByZXF1aXJlKCcuL2Jvb3RzdHJhcC1maXhlcycpO1xyXG5cclxuICAgIHBhcmFGYWRlKCcjd2VsY29tZScsICdoZWFkZXInKTtcclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gLy8gY29sbGFwc2UgdGhlIGhhbWJ1cmdlciBtZW51IHdoZW4gc29tZXRoaW5nIGlzIGNsaWNrZWRcclxuICAgIC8vICQoJyNuYXZiYXInKVxyXG4gICAgLy8gIC5vbignY2xpY2snLCAnLm5hdmJhci1jb2xsYXBzZS5pbiBhJywgKCkgPT4ge1xyXG4gICAgLy8gICAgJCgnLm5hdmJhci10b2dnbGUnKS5jbGljaygpO1xyXG4gICAgLy8gIH0pO1xyXG5cclxufSgpKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuLy8gcHJlcGVuZCB0YXJnZXQgbGlua3MgdG8gaGVhZGVyc1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuICAgICQoJzpoZWFkZXJbaWRdLCBbaWRdOmhhcyg6aGVhZGVyKScpLmVhY2goKGksIGVsKSA9PiB7XHJcbiAgICAgICAgbGV0ICRlbCA9ICQoZWwpO1xyXG4gICAgICAgIGxldCBpZCAgPSAkZWwuYXR0cignaWQnKTtcclxuXHJcbiAgICAgICAgbGV0ICRhbmNob3IgPSAkKGA8YSBocmVmPVwiIyR7aWR9XCI+PGkgY2xhc3M9XCJmYVwiIC8+PC9hPmApO1xyXG4gICAgICAgIGxldCAkaGVhZGVyID0gKCRlbC5pcygnOmhlYWRlcicpKVxyXG4gICAgICAgICAgICA/ICRlbFxyXG4gICAgICAgICAgICA6ICRlbC5maW5kKCc6aGVhZGVyOmZpcnN0Jyk7XHJcblxyXG5cclxuICAgICAgICAkaGVhZGVyXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYW5jaG9yLXRhcmdldCcpXHJcbiAgICAgICAgICAgIC5wcmVwZW5kKCRhbmNob3IpO1xyXG4gICAgfSk7XHJcbn0oKSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gbm9zcGFtKHNlbGVjdG9yKSB7XHJcbiAgICBjb25zdCBhZGRyID0gZ2V0QWRkcigpO1xyXG5cclxuICAgICQoc2VsZWN0b3IpLmVhY2goKGksIGVsKSA9PiB7XHJcbiAgICAgICAgbGV0ICRlbCA9ICQoZWwpO1xyXG5cclxuICAgICAgICAkZWwucmVwbGFjZVdpdGgoJCgnPGE+Jywge1xyXG4gICAgICAgICAgICBocmVmOiAoYG1haWx0bzoke2FkZHJ9YCksXHJcbiAgICAgICAgICAgIGh0bWw6ICRlbC5odG1sKCksXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QWRkcigpIHtcclxuICAgIGNvbnN0IHNyYyAgPSAnQCBqYXNvbiBydXNodG9uIGNvbSAuJy5zcGxpdCgnICcpO1xyXG4gICAgY29uc3QgYWRkciA9IFtzcmNbMV0sIHNyY1swXSwgc3JjWzFdLCBzcmNbMl0sIHNyY1s0XSwgc3JjWzNdXS5qb2luKCcnKTtcclxuXHJcbiAgICByZXR1cm4gYWRkcjtcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbm9zcGFtO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb250YWluZXJTZWxlY3RvciwgY29udGVudFNlbGVjdG9yKSB7XHJcbiAgICBsZXQgJGNvbnRhaW5lciA9ICQoY29udGFpbmVyU2VsZWN0b3IpO1xyXG4gICAgbGV0ICRjb250ZW50ICAgPSAkY29udGFpbmVyLmZpbmQoY29udGVudFNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoJGNvbnRhaW5lciAmJiAkY29udGVudCkge1xyXG4gICAgICAgIGxldCAkd2luICAgICAgICAgICAgPSAkKHdpbmRvdyk7XHJcbiAgICAgICAgY29uc3QgY29udGVudFRvcCAgICA9ICRjb250YWluZXIub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRCb3R0b20gPSAkY29udGFpbmVyLm9mZnNldCgpLnRvcCArICRjb250YWluZXIub3V0ZXJIZWlnaHQoKSArIDE7XHJcblxyXG4gICAgICAgICR3aW4uc2Nyb2xsKF8udGhyb3R0bGUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpblNjcm9sbCA9ICR3aW4uc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luU2Nyb2xsIDw9IGNvbnRlbnRUb3ApIHtcclxuICAgICAgICAgICAgICAgICRjb250ZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcCAgICAgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5IDogMSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudFNjcm9sbGVkID0gd2luU2Nyb2xsIC0gY29udGVudFRvcDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wYWNpdHkgICAgICAgICA9IChjb250ZW50Qm90dG9tIC0gd2luU2Nyb2xsKSAvIGNvbnRlbnRCb3R0b207XHJcblxyXG4gICAgICAgICAgICAgICAgJGNvbnRlbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgICAgICAgICB0b3AgICAgIDogY29udGVudFNjcm9sbGVkIC8gMixcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5IDogb3BhY2l0eSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sIDEwMDAgLyA2MCkpO1xyXG4gICAgfVxyXG5cclxufTsiXX0=
