(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
// require('babel/polyfill');

$(function () {
    require('./nospam')('.nospam-email-address');
    require('./header-anchors');
    require('./bootstrap-fixes');

    var paraFade = require('./para-fade');
    paraFade('#welcome', 'header');
});

},{"./bootstrap-fixes":2,"./header-anchors":3,"./nospam":4,"./para-fade":5}],2:[function(require,module,exports){
"use strict";

module.exports = (function () {})();

// // collapse the hamburger menu when something is clicked
// $('#navbar')
//  .on('click', '.navbar-collapse.in a', () => {
//    $(".navbar-toggle").click();
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
            html: $el.html()
        }));
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
    }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9hcHAuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9ib290c3RyYXAtZml4ZXMuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9oZWFkZXItYW5jaG9ycy5qcyIsIkQ6L2luZXQvaGVyb2t1L0phc29uUnVzaHRvbi9wdWJsaWMvanMvc3JjL25vc3BhbS5qcyIsIkQ6L2luZXQvaGVyb2t1L0phc29uUnVzaHRvbi9wdWJsaWMvanMvc3JjL3BhcmEtZmFkZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7O0FBR2IsQ0FBQyxDQUFDLFlBQVc7QUFDVCxXQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUM3QyxXQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM1QixXQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7QUFFN0IsUUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3hDLFlBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDbEMsQ0FBQyxDQUFDOzs7QUNWSCxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLE9BQU8sR0FBSSxDQUFBLFlBQVUsRUFRM0IsQ0FBQSxFQUFFLEFBQUMsQ0FBQzs7Ozs7Ozs7O0FDVkwsWUFBWSxDQUFDOzs7QUFJYixNQUFNLENBQUMsT0FBTyxHQUFJLENBQUEsWUFBVTtBQUN4QixLQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFLO0FBQ2hELFlBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFF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QUFHLFNBQVMsQ0FBQSxHQUFJLGFBQWEsQ0FBQzs7QUFFbEUsd0JBQVEsQ0FBQyxHQUFHLENBQUM7QUFDVCw0QkFBUSxFQUFFLFVBQVU7QUFDcEIsdUJBQUcsRUFBTyxlQUFlLEdBQUMsQ0FBQztBQUMzQiwyQkFBTyxFQUFHLE9BQU8sRUFDcEIsQ0FBQyxDQUFDO2FBQ047U0FFSixFQUFFLElBQUksR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2hCO0NBRUosQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gcmVxdWlyZSgnYmFiZWwvcG9seWZpbGwnKTtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICByZXF1aXJlKCcuL25vc3BhbScpKCcubm9zcGFtLWVtYWlsLWFkZHJlc3MnKTtcclxuICAgIHJlcXVpcmUoJy4vaGVhZGVyLWFuY2hvcnMnKTtcclxuICAgIHJlcXVpcmUoJy4vYm9vdHN0cmFwLWZpeGVzJyk7XHJcblxyXG4gICAgY29uc3QgcGFyYUZhZGUgPSByZXF1aXJlKCcuL3BhcmEtZmFkZScpO1xyXG4gICAgcGFyYUZhZGUoJyN3ZWxjb21lJywgJ2hlYWRlcicpO1xyXG59KTsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XHJcblxyXG4gIC8vIC8vIGNvbGxhcHNlIHRoZSBoYW1idXJnZXIgbWVudSB3aGVuIHNvbWV0aGluZyBpcyBjbGlja2VkXHJcbiAgLy8gJCgnI25hdmJhcicpXHJcbiAgLy8gIC5vbignY2xpY2snLCAnLm5hdmJhci1jb2xsYXBzZS5pbiBhJywgKCkgPT4ge1xyXG4gIC8vICAgICQoXCIubmF2YmFyLXRvZ2dsZVwiKS5jbGljaygpO1xyXG4gIC8vICB9KTtcclxuXHJcbn0oKSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cclxuLy8gcHJlcGVuZCB0YXJnZXQgbGlua3MgdG8gaGVhZGVyc1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpe1xyXG4gICAgJCgnOmhlYWRlcltpZF0sIFtpZF06aGFzKDpoZWFkZXIpJykuZWFjaCgoaSwgZWwpID0+IHtcclxuICAgICAgICBsZXQgJGVsID0gJChlbCk7XHJcbiAgICAgICAgbGV0IGlkICA9ICRlbC5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgICBsZXQgJGFuY2hvciA9ICQoYDxhIGhyZWY9XCIjJHtpZH1cIj48aSBjbGFzcz1cImZhXCIgLz48L2E+YCk7XHJcbiAgICAgICAgbGV0ICRoZWFkZXIgPSAoJGVsLmlzKCc6aGVhZGVyJykpXHJcbiAgICAgICAgICAgID8gJGVsXHJcbiAgICAgICAgICAgIDogJGVsLmZpbmQoJzpoZWFkZXI6Zmlyc3QnKTtcclxuXHJcblxyXG4gICAgICAgICRoZWFkZXJcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdhbmNob3ItdGFyZ2V0JylcclxuICAgICAgICAgICAgLnByZXBlbmQoJGFuY2hvcik7XHJcbiAgICB9KTtcclxufSgpKTsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmZ1bmN0aW9uIG5vc3BhbShzZWxlY3Rvcikge1xyXG4gICAgY29uc3QgYWRkciA9IGdldEFkZHIoKTtcclxuXHJcbiAgICAkKHNlbGVjdG9yKS5lYWNoKChpLCBlbCkgPT4ge1xyXG4gICAgICAgIGxldCAkZWwgPSAkKGVsKTtcclxuXHJcbiAgICAgICAgJGVsLnJlcGxhY2VXaXRoKCQoJzxhPicsIHtcclxuICAgICAgICAgICAgaHJlZjogKGBtYWlsdG86JHthZGRyfWApLFxyXG4gICAgICAgICAgICBodG1sOiAkZWwuaHRtbCgpXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QWRkcigpIHtcclxuICAgIGNvbnN0IHNyYyAgPSAnQCBqYXNvbiBydXNodG9uIGNvbSAuJy5zcGxpdCgnICcpO1xyXG4gICAgY29uc3QgYWRkciA9IFtzcmNbMV0sIHNyY1swXSwgc3JjWzFdLCBzcmNbMl0sIHNyY1s0XSwgc3JjWzNdXS5qb2luKCcnKTtcclxuXHJcbiAgICByZXR1cm4gYWRkcjtcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbm9zcGFtO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb250YWluZXJTZWxlY3RvciwgY29udGVudFNlbGVjdG9yKXtcclxuICAgIHZhciAkY29udGFpbmVyID0gJChjb250YWluZXJTZWxlY3Rvcik7XHJcbiAgICB2YXIgJGNvbnRlbnQgICA9ICRjb250YWluZXIuZmluZChjb250ZW50U2VsZWN0b3IpO1xyXG5cclxuICAgIGlmICgkY29udGFpbmVyICYmICRjb250ZW50KSB7XHJcbiAgICAgICAgdmFyICR3aW4gICAgICAgICAgPSAkKHdpbmRvdyk7XHJcbiAgICAgICAgdmFyIGNvbnRlbnRUb3AgICAgPSAkY29udGFpbmVyLm9mZnNldCgpLnRvcDtcclxuICAgICAgICB2YXIgY29udGVudEJvdHRvbSA9ICRjb250YWluZXIub2Zmc2V0KCkudG9wICsgJGNvbnRhaW5lci5vdXRlckhlaWdodCgpICsgMTtcclxuXHJcbiAgICAgICAgJHdpbi5zY3JvbGwoXy50aHJvdHRsZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgd2luU2Nyb2xsID0gJHdpbi5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5TY3JvbGwgPD0gY29udGVudFRvcCkge1xyXG4gICAgICAgICAgICAgICAgJGNvbnRlbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wICAgICA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgOiAxLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudFNjcm9sbGVkID0gd2luU2Nyb2xsIC0gY29udGVudFRvcDtcclxuICAgICAgICAgICAgICAgIHZhciBvcGFjaXR5ICAgICAgICAgPSAoY29udGVudEJvdHRvbSAtIHdpblNjcm9sbCkgLyBjb250ZW50Qm90dG9tO1xyXG5cclxuICAgICAgICAgICAgICAgICRjb250ZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wICAgICA6IGNvbnRlbnRTY3JvbGxlZC8yLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgOiBvcGFjaXR5LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSwgMTAwMC82MCkpO1xyXG4gICAgfVxyXG5cclxufTsiXX0=
