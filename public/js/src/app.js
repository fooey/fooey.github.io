'use strict';

$(function() {

	$('#navbar').on('click', '.navbar-collapse.in a', () => {
		$(".navbar-toggle").click();
	});


	// prepend target links to headers
	$('[id]:has(:header)').each((i, el) => {
		let $el = $(el);
		let id = $el.attr('id');

		let $headers = $(':header', el);
		let $firstHeader = $($headers[0]);
		let $anchor = $(`<a href="#${id}"><i class="fa"></i></a>`);

		$firstHeader
			.addClass('target')
			.prepend($anchor);
	});


	require('./nospam')('.nospam-email-address');
});