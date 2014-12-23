$(function() {
	'use strict';

	var src = ['jason', 'rushton', 'com', '@', '.'];
	var addr = [src[0], src[3], src[0], src[1], src[4], src[2]].join('');

	$('.nospam-email-address').each(function(e) {
		$(this).replaceWith(
			$('<a>', {href: ('mailto:' + addr), html: $(this).html()})
		);
	});


	// $('.navbar-nav li')
	// 	.on('mouseenter', function(e) {
	// 		$(this).siblings().addClass('defocus');
	// 	})
	// 	.on('mouseleave', function(e) {
	// 		$(this).siblings().removeClass('defocus');
	// 	});

});
