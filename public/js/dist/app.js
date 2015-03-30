(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

$(function () {

	$("#navbar").on("click", ".navbar-collapse.in a", function () {
		$(".navbar-toggle").click();
	});

	// prepend target links to headers
	$("[id]:has(:header)").each(function (i, el) {
		var $el = $(el);
		var id = $el.attr("id");

		var $headers = $(":header", el);
		var $firstHeader = $($headers[0]);
		var $anchor = $("<a href=\"#" + id + "\"><i class=\"fa\"></i></a>");

		$firstHeader.addClass("target").prepend($anchor);
	});

	require("./nospam")(".nospam-email-address");
});

},{"./nospam":2}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9hcHAuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vcHVibGljL2pzL3NyYy9ub3NwYW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBLENBQUMsQ0FBQyxZQUFXOztBQUVaLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFlBQU07QUFDdkQsR0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDNUIsQ0FBQyxDQUFDOzs7QUFJSCxFQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFLO0FBQ3RDLE1BQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQixNQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV4QixNQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLE1BQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxNQUFJLE9BQU8sR0FBRyxDQUFDLGlCQUFjLEVBQUUsaUNBQTJCLENBQUM7O0FBRTNELGNBQVksQ0FDVixRQUFRLENBQUMsUUFBUSxDQUFDLENBQ2xCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztFQUNuQixDQUFDLENBQUM7O0FBR0gsUUFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUM7Q0FDN0MsQ0FBQyxDQUFDOzs7OztBQ3ZCSCxTQUFTLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDekIsS0FBTSxJQUFJLEdBQUcsT0FBTyxFQUFFLENBQUM7O0FBRXZCLEVBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFLO0FBQzNCLE1BQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFaEIsS0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO0FBQ3hCLE9BQUksY0FBYSxJQUFJLEFBQUc7QUFDeEIsT0FBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUU7R0FDaEIsQ0FBQyxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7Q0FDSDs7QUFJRCxTQUFTLE9BQU8sR0FBRztBQUNsQixLQUFNLEdBQUcsR0FBRyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0MsS0FBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFdkUsUUFBTyxJQUFJLENBQUM7Q0FDWjs7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cclxuXHQkKCcjbmF2YmFyJykub24oJ2NsaWNrJywgJy5uYXZiYXItY29sbGFwc2UuaW4gYScsICgpID0+IHtcclxuXHRcdCQoXCIubmF2YmFyLXRvZ2dsZVwiKS5jbGljaygpO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0Ly8gcHJlcGVuZCB0YXJnZXQgbGlua3MgdG8gaGVhZGVyc1xyXG5cdCQoJ1tpZF06aGFzKDpoZWFkZXIpJykuZWFjaCgoaSwgZWwpID0+IHtcclxuXHRcdGxldCAkZWwgPSAkKGVsKTtcclxuXHRcdGxldCBpZCA9ICRlbC5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdGxldCAkaGVhZGVycyA9ICQoJzpoZWFkZXInLCBlbCk7XHJcblx0XHRsZXQgJGZpcnN0SGVhZGVyID0gJCgkaGVhZGVyc1swXSk7XHJcblx0XHRsZXQgJGFuY2hvciA9ICQoYDxhIGhyZWY9XCIjJHtpZH1cIj48aSBjbGFzcz1cImZhXCI+PC9pPjwvYT5gKTtcclxuXHJcblx0XHQkZmlyc3RIZWFkZXJcclxuXHRcdFx0LmFkZENsYXNzKCd0YXJnZXQnKVxyXG5cdFx0XHQucHJlcGVuZCgkYW5jaG9yKTtcclxuXHR9KTtcclxuXHJcblxyXG5cdHJlcXVpcmUoJy4vbm9zcGFtJykoJy5ub3NwYW0tZW1haWwtYWRkcmVzcycpO1xyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5mdW5jdGlvbiBub3NwYW0oc2VsZWN0b3IpIHtcclxuXHRjb25zdCBhZGRyID0gZ2V0QWRkcigpO1xyXG5cclxuXHQkKHNlbGVjdG9yKS5lYWNoKChpLCBlbCkgPT4ge1xyXG5cdFx0bGV0ICRlbCA9ICQoZWwpO1xyXG5cclxuXHRcdCRlbC5yZXBsYWNlV2l0aCgkKCc8YT4nLCB7XHJcblx0XHRcdGhyZWY6IChgbWFpbHRvOiR7YWRkcn1gKSxcclxuXHRcdFx0aHRtbDogJGVsLmh0bWwoKVxyXG5cdFx0fSkpO1xyXG5cdH0pO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEFkZHIoKSB7XHJcblx0Y29uc3Qgc3JjID0gJ0AgamFzb24gcnVzaHRvbiBjb20gLicuc3BsaXQoJyAnKTtcclxuXHRjb25zdCBhZGRyID0gW3NyY1sxXSwgc3JjWzBdLCBzcmNbMV0sIHNyY1syXSwgc3JjWzRdLCBzcmNbM11dLmpvaW4oJycpO1xyXG5cclxuXHRyZXR1cm4gYWRkcjtcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbm9zcGFtOyJdfQ==
