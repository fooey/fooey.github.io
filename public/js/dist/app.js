(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

$(function () {
	require("./nospam")(".nospam-email-address");
	require("./header-anchors");
	require("./bootstrap-fixes");
});

},{"./bootstrap-fixes":2,"./header-anchors":3,"./nospam":4}],2:[function(require,module,exports){
"use strict";

// prepend target links to headers
module.exports = (function () {
	$("#navbar").on("click", ".navbar-collapse.in a", function () {
		$(".navbar-toggle").click();
	});
})();

},{}],3:[function(require,module,exports){
"use strict";

// prepend target links to headers
module.exports = (function () {
	$("[id]:has(:header)").each(function (i, el) {
		var $el = $(el);
		var id = $el.attr("id");

		var $header = $el.find(":header:first");
		var $anchor = $("<a href=\"#" + id + "\"><i class=\"fa\" /></a>");

		$header.addClass("anchor-target").prepend($anchor);
	});
})();

},{}],4:[function(require,module,exports){
"use strict";

function nospam(selector) {
	var addr = getAddr();

	$(selector).each(function (i, el) {
		var $el = $(el);

		$el.replaceWith($("<a>", {
			href: "mailto:" + addr,
			html: $el.html()
		}));
	});
}

function getAddr() {
	var src = "@ jason rushton com .".split(" ");
	var addr = [src[1], src[0], src[1], src[2], src[4], src[3]].join("");

	return addr;
}

module.exports = nospam;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9hcHAuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9ib290c3RyYXAtZml4ZXMuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9oZWFkZXItYW5jaG9ycy5qcyIsIkQ6L2luZXQvaGVyb2t1L0phc29uUnVzaHRvbi9wdWJsaWMvanMvc3JjL25vc3BhbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUEsQ0FBQyxDQUFDLFlBQVc7QUFDWixRQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUM3QyxRQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM1QixRQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztDQUM3QixDQUFDLENBQUM7Ozs7OztBQ0ZILE1BQU0sQ0FBQyxPQUFPLEdBQUksQ0FBQSxZQUFVO0FBQzNCLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFlBQU07QUFDdkQsR0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDNUIsQ0FBQyxDQUFDO0NBQ0gsQ0FBQSxFQUFFLEFBQUMsQ0FBQzs7Ozs7O0FDSkwsTUFBTSxDQUFDLE9BQU8sR0FBSSxDQUFBLFlBQVU7QUFDM0IsRUFBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBSztBQUN0QyxNQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEIsTUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFeEIsTUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN4QyxNQUFJLE9BQU8sR0FBRyxDQUFDLGlCQUFjLEVBQUUsK0JBQXlCLENBQUM7O0FBRXpELFNBQU8sQ0FDTCxRQUFRLENBQUMsZUFBZSxDQUFDLENBQ3pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztFQUNuQixDQUFDLENBQUM7Q0FDSCxDQUFBLEVBQUUsQUFBQyxDQUFDOzs7OztBQ2RMLFNBQVMsTUFBTSxDQUFDLFFBQVEsRUFBRTtBQUN6QixLQUFNLElBQUksR0FBRyxPQUFPLEVBQUUsQ0FBQzs7QUFFdkIsRUFBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxFQUFFLEVBQUs7QUFDM0IsTUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUVoQixLQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7QUFDeEIsT0FBSSxjQUFhLElBQUksQUFBRztBQUN4QixPQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRTtHQUNoQixDQUFDLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztDQUNIOztBQUlELFNBQVMsT0FBTyxHQUFHO0FBQ2xCLEtBQU0sR0FBRyxHQUFHLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQyxLQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUV2RSxRQUFPLElBQUksQ0FBQztDQUNaOztBQUdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblx0cmVxdWlyZSgnLi9ub3NwYW0nKSgnLm5vc3BhbS1lbWFpbC1hZGRyZXNzJyk7XHJcblx0cmVxdWlyZSgnLi9oZWFkZXItYW5jaG9ycycpO1xyXG5cdHJlcXVpcmUoJy4vYm9vdHN0cmFwLWZpeGVzJyk7XHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG4vLyBwcmVwZW5kIHRhcmdldCBsaW5rcyB0byBoZWFkZXJzXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XHJcblx0JCgnI25hdmJhcicpLm9uKCdjbGljaycsICcubmF2YmFyLWNvbGxhcHNlLmluIGEnLCAoKSA9PiB7XHJcblx0XHQkKFwiLm5hdmJhci10b2dnbGVcIikuY2xpY2soKTtcclxuXHR9KTtcclxufSgpKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuLy8gcHJlcGVuZCB0YXJnZXQgbGlua3MgdG8gaGVhZGVyc1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpe1xyXG5cdCQoJ1tpZF06aGFzKDpoZWFkZXIpJykuZWFjaCgoaSwgZWwpID0+IHtcclxuXHRcdGxldCAkZWwgPSAkKGVsKTtcclxuXHRcdGxldCBpZCA9ICRlbC5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdGxldCAkaGVhZGVyID0gJGVsLmZpbmQoJzpoZWFkZXI6Zmlyc3QnKTtcclxuXHRcdGxldCAkYW5jaG9yID0gJChgPGEgaHJlZj1cIiMke2lkfVwiPjxpIGNsYXNzPVwiZmFcIiAvPjwvYT5gKTtcclxuXHJcblx0XHQkaGVhZGVyXHJcblx0XHRcdC5hZGRDbGFzcygnYW5jaG9yLXRhcmdldCcpXHJcblx0XHRcdC5wcmVwZW5kKCRhbmNob3IpO1xyXG5cdH0pO1xyXG59KCkpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIG5vc3BhbShzZWxlY3Rvcikge1xyXG5cdGNvbnN0IGFkZHIgPSBnZXRBZGRyKCk7XHJcblxyXG5cdCQoc2VsZWN0b3IpLmVhY2goKGksIGVsKSA9PiB7XHJcblx0XHRsZXQgJGVsID0gJChlbCk7XHJcblxyXG5cdFx0JGVsLnJlcGxhY2VXaXRoKCQoJzxhPicsIHtcclxuXHRcdFx0aHJlZjogKGBtYWlsdG86JHthZGRyfWApLFxyXG5cdFx0XHRodG1sOiAkZWwuaHRtbCgpXHJcblx0XHR9KSk7XHJcblx0fSk7XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QWRkcigpIHtcclxuXHRjb25zdCBzcmMgPSAnQCBqYXNvbiBydXNodG9uIGNvbSAuJy5zcGxpdCgnICcpO1xyXG5cdGNvbnN0IGFkZHIgPSBbc3JjWzFdLCBzcmNbMF0sIHNyY1sxXSwgc3JjWzJdLCBzcmNbNF0sIHNyY1szXV0uam9pbignJyk7XHJcblxyXG5cdHJldHVybiBhZGRyO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBub3NwYW07Il19
