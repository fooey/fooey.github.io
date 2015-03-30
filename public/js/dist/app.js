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

		var $headers = $(":header", el);
		var $firstHeader = $($headers[0]);
		var $anchor = $("<a href=\"#" + id + "\"><i class=\"fa\"></i></a>");

		$firstHeader.addClass("target").prepend($anchor);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9hcHAuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9ib290c3RyYXAtZml4ZXMuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9oZWFkZXItYW5jaG9ycy5qcyIsIkQ6L2luZXQvaGVyb2t1L0phc29uUnVzaHRvbi9wdWJsaWMvanMvc3JjL25vc3BhbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUEsQ0FBQyxDQUFDLFlBQVc7QUFDWixRQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUM3QyxRQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM1QixRQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztDQUM3QixDQUFDLENBQUM7Ozs7OztBQ0ZILE1BQU0sQ0FBQyxPQUFPLEdBQUksQ0FBQSxZQUFVO0FBQzNCLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFlBQU07QUFDdkQsR0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDNUIsQ0FBQyxDQUFDO0NBQ0gsQ0FBQSxFQUFFLEFBQUMsQ0FBQzs7Ozs7O0FDSkwsTUFBTSxDQUFDLE9BQU8sR0FBSSxDQUFBLFlBQVU7QUFDM0IsRUFBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBSztBQUN0QyxNQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEIsTUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFeEIsTUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNoQyxNQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsTUFBSSxPQUFPLEdBQUcsQ0FBQyxpQkFBYyxFQUFFLGlDQUEyQixDQUFDOztBQUUzRCxjQUFZLENBQ1YsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUNsQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7RUFDbkIsQ0FBQyxDQUFDO0NBQ0gsQ0FBQSxFQUFFLEFBQUMsQ0FBQzs7Ozs7QUNmTCxTQUFTLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDekIsS0FBTSxJQUFJLEdBQUcsT0FBTyxFQUFFLENBQUM7O0FBRXZCLEVBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFLO0FBQzNCLE1BQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFaEIsS0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO0FBQ3hCLE9BQUksY0FBYSxJQUFJLEFBQUc7QUFDeEIsT0FBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUU7R0FDaEIsQ0FBQyxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7Q0FDSDs7QUFJRCxTQUFTLE9BQU8sR0FBRztBQUNsQixLQUFNLEdBQUcsR0FBRyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0MsS0FBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFdkUsUUFBTyxJQUFJLENBQUM7Q0FDWjs7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cdHJlcXVpcmUoJy4vbm9zcGFtJykoJy5ub3NwYW0tZW1haWwtYWRkcmVzcycpO1xyXG5cdHJlcXVpcmUoJy4vaGVhZGVyLWFuY2hvcnMnKTtcclxuXHRyZXF1aXJlKCcuL2Jvb3RzdHJhcC1maXhlcycpO1xyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuLy8gcHJlcGVuZCB0YXJnZXQgbGlua3MgdG8gaGVhZGVyc1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpe1xyXG5cdCQoJyNuYXZiYXInKS5vbignY2xpY2snLCAnLm5hdmJhci1jb2xsYXBzZS5pbiBhJywgKCkgPT4ge1xyXG5cdFx0JChcIi5uYXZiYXItdG9nZ2xlXCIpLmNsaWNrKCk7XHJcblx0fSk7XHJcbn0oKSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbi8vIHByZXBlbmQgdGFyZ2V0IGxpbmtzIHRvIGhlYWRlcnNcclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKXtcclxuXHQkKCdbaWRdOmhhcyg6aGVhZGVyKScpLmVhY2goKGksIGVsKSA9PiB7XHJcblx0XHRsZXQgJGVsID0gJChlbCk7XHJcblx0XHRsZXQgaWQgPSAkZWwuYXR0cignaWQnKTtcclxuXHJcblx0XHRsZXQgJGhlYWRlcnMgPSAkKCc6aGVhZGVyJywgZWwpO1xyXG5cdFx0bGV0ICRmaXJzdEhlYWRlciA9ICQoJGhlYWRlcnNbMF0pO1xyXG5cdFx0bGV0ICRhbmNob3IgPSAkKGA8YSBocmVmPVwiIyR7aWR9XCI+PGkgY2xhc3M9XCJmYVwiPjwvaT48L2E+YCk7XHJcblxyXG5cdFx0JGZpcnN0SGVhZGVyXHJcblx0XHRcdC5hZGRDbGFzcygndGFyZ2V0JylcclxuXHRcdFx0LnByZXBlbmQoJGFuY2hvcik7XHJcblx0fSk7XHJcbn0oKSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gbm9zcGFtKHNlbGVjdG9yKSB7XHJcblx0Y29uc3QgYWRkciA9IGdldEFkZHIoKTtcclxuXHJcblx0JChzZWxlY3RvcikuZWFjaCgoaSwgZWwpID0+IHtcclxuXHRcdGxldCAkZWwgPSAkKGVsKTtcclxuXHJcblx0XHQkZWwucmVwbGFjZVdpdGgoJCgnPGE+Jywge1xyXG5cdFx0XHRocmVmOiAoYG1haWx0bzoke2FkZHJ9YCksXHJcblx0XHRcdGh0bWw6ICRlbC5odG1sKClcclxuXHRcdH0pKTtcclxuXHR9KTtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRBZGRyKCkge1xyXG5cdGNvbnN0IHNyYyA9ICdAIGphc29uIHJ1c2h0b24gY29tIC4nLnNwbGl0KCcgJyk7XHJcblx0Y29uc3QgYWRkciA9IFtzcmNbMV0sIHNyY1swXSwgc3JjWzFdLCBzcmNbMl0sIHNyY1s0XSwgc3JjWzNdXS5qb2luKCcnKTtcclxuXHJcblx0cmV0dXJuIGFkZHI7XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5vc3BhbTsiXX0=
