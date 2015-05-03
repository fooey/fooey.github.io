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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9hcHAuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9ib290c3RyYXAtZml4ZXMuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9oZWFkZXItYW5jaG9ycy5qcyIsIkQ6L2luZXQvaGVyb2t1L0phc29uUnVzaHRvbi9wdWJsaWMvanMvc3JjL25vc3BhbS5qcyIsIkQ6L2luZXQvaGVyb2t1L0phc29uUnVzaHRvbi9wdWJsaWMvanMvc3JjL3BhcmEtZmFkZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7OztBQUliLENBQUMsQ0FBQyxZQUFXO0FBQ1QsV0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDN0MsV0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDNUIsV0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7O0FBRTdCLFFBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN4QyxZQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ2xDLENBQUMsQ0FBQzs7O0FDWEgsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxPQUFPLEdBQUksQ0FBQSxZQUFXLEVBUTVCLENBQUEsRUFBRSxBQUFDLENBQUM7Ozs7Ozs7OztBQ1ZMLFlBQVksQ0FBQzs7O0FBSWIsTUFBTSxDQUFDLE9BQU8sR0FBSSxDQUFBLFlBQVc7QUFDekIsS0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBSztBQUNoRCxZQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFB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LGFBQWEsR0FBRyxTQUFTLENBQUEsR0FBSSxhQUFhLENBQUM7O0FBRXBFLDRCQUFRLENBQUMsR0FBRyxDQUFDO0FBQ1QsZ0NBQVEsRUFBRSxVQUFVO0FBQ3BCLDJCQUFHLEVBQU8sZUFBZSxHQUFHLENBQUM7QUFDN0IsK0JBQU8sRUFBRyxPQUFPLEVBQ3BCLENBQUMsQ0FBQztpQkFDTjthQUVKLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0tBQ2xCO0NBRUosQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyByZXF1aXJlKCdiYWJlbC9wb2x5ZmlsbCcpO1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgIHJlcXVpcmUoJy4vbm9zcGFtJykoJy5ub3NwYW0tZW1haWwtYWRkcmVzcycpO1xyXG4gICAgcmVxdWlyZSgnLi9oZWFkZXItYW5jaG9ycycpO1xyXG4gICAgcmVxdWlyZSgnLi9ib290c3RyYXAtZml4ZXMnKTtcclxuXHJcbiAgICBjb25zdCBwYXJhRmFkZSA9IHJlcXVpcmUoJy4vcGFyYS1mYWRlJyk7XHJcbiAgICBwYXJhRmFkZSgnI3dlbGNvbWUnLCAnaGVhZGVyJyk7XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vIC8vIGNvbGxhcHNlIHRoZSBoYW1idXJnZXIgbWVudSB3aGVuIHNvbWV0aGluZyBpcyBjbGlja2VkXHJcbiAgICAvLyAkKCcjbmF2YmFyJylcclxuICAgIC8vICAub24oJ2NsaWNrJywgJy5uYXZiYXItY29sbGFwc2UuaW4gYScsICgpID0+IHtcclxuICAgIC8vICAgICQoJy5uYXZiYXItdG9nZ2xlJykuY2xpY2soKTtcclxuICAgIC8vICB9KTtcclxuXHJcbn0oKSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbi8vIHByZXBlbmQgdGFyZ2V0IGxpbmtzIHRvIGhlYWRlcnNcclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAkKCc6aGVhZGVyW2lkXSwgW2lkXTpoYXMoOmhlYWRlciknKS5lYWNoKChpLCBlbCkgPT4ge1xyXG4gICAgICAgIGxldCAkZWwgPSAkKGVsKTtcclxuICAgICAgICBsZXQgaWQgID0gJGVsLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgICAgIGxldCAkYW5jaG9yID0gJChgPGEgaHJlZj1cIiMke2lkfVwiPjxpIGNsYXNzPVwiZmFcIiAvPjwvYT5gKTtcclxuICAgICAgICBsZXQgJGhlYWRlciA9ICgkZWwuaXMoJzpoZWFkZXInKSlcclxuICAgICAgICAgICAgPyAkZWxcclxuICAgICAgICAgICAgOiAkZWwuZmluZCgnOmhlYWRlcjpmaXJzdCcpO1xyXG5cclxuXHJcbiAgICAgICAgJGhlYWRlclxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FuY2hvci10YXJnZXQnKVxyXG4gICAgICAgICAgICAucHJlcGVuZCgkYW5jaG9yKTtcclxuICAgIH0pO1xyXG59KCkpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIG5vc3BhbShzZWxlY3Rvcikge1xyXG4gICAgY29uc3QgYWRkciA9IGdldEFkZHIoKTtcclxuXHJcbiAgICAkKHNlbGVjdG9yKS5lYWNoKChpLCBlbCkgPT4ge1xyXG4gICAgICAgIGxldCAkZWwgPSAkKGVsKTtcclxuXHJcbiAgICAgICAgJGVsLnJlcGxhY2VXaXRoKCQoJzxhPicsIHtcclxuICAgICAgICAgICAgaHJlZjogKGBtYWlsdG86JHthZGRyfWApLFxyXG4gICAgICAgICAgICBodG1sOiAkZWwuaHRtbCgpLFxyXG4gICAgICAgIH0pKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEFkZHIoKSB7XHJcbiAgICBjb25zdCBzcmMgID0gJ0AgamFzb24gcnVzaHRvbiBjb20gLicuc3BsaXQoJyAnKTtcclxuICAgIGNvbnN0IGFkZHIgPSBbc3JjWzFdLCBzcmNbMF0sIHNyY1sxXSwgc3JjWzJdLCBzcmNbNF0sIHNyY1szXV0uam9pbignJyk7XHJcblxyXG4gICAgcmV0dXJuIGFkZHI7XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5vc3BhbTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGFpbmVyU2VsZWN0b3IsIGNvbnRlbnRTZWxlY3Rvcikge1xyXG4gICAgbGV0ICRjb250YWluZXIgPSAkKGNvbnRhaW5lclNlbGVjdG9yKTtcclxuICAgIGxldCAkY29udGVudCAgID0gJGNvbnRhaW5lci5maW5kKGNvbnRlbnRTZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCRjb250YWluZXIgJiYgJGNvbnRlbnQpIHtcclxuICAgICAgICBsZXQgJHdpbiAgICAgICAgICAgID0gJCh3aW5kb3cpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRUb3AgICAgPSAkY29udGFpbmVyLm9mZnNldCgpLnRvcDtcclxuICAgICAgICBjb25zdCBjb250ZW50Qm90dG9tID0gJGNvbnRhaW5lci5vZmZzZXQoKS50b3AgKyAkY29udGFpbmVyLm91dGVySGVpZ2h0KCkgKyAxO1xyXG5cclxuICAgICAgICAkd2luLnNjcm9sbChfLnRocm90dGxlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCB3aW5TY3JvbGwgPSAkd2luLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpblNjcm9sbCA8PSBjb250ZW50VG9wKSB7XHJcbiAgICAgICAgICAgICAgICAkY29udGVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICB0b3AgICAgIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSA6IDEsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRTY3JvbGxlZCA9IHdpblNjcm9sbCAtIGNvbnRlbnRUb3A7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcGFjaXR5ICAgICAgICAgPSAoY29udGVudEJvdHRvbSAtIHdpblNjcm9sbCkgLyBjb250ZW50Qm90dG9tO1xyXG5cclxuICAgICAgICAgICAgICAgICRjb250ZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wICAgICA6IGNvbnRlbnRTY3JvbGxlZCAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSA6IG9wYWNpdHksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCAxMDAwIC8gNjApKTtcclxuICAgIH1cclxuXHJcbn07Il19
