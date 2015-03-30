'use strict';


// prepend target links to headers
module.exports = (function(){
	$('[id]:has(:header)').each((i, el) => {
		let $el = $(el);
		let id = $el.attr('id');

		let $headers = $(':header', el);
		let $firstHeader = $($headers[0]);
		let $anchor = $(`<a href="#${id}"><i class="fa"></i></a>`);

		$firstHeader
			.addClass('anchor-target')
			.prepend($anchor);
	});
}());