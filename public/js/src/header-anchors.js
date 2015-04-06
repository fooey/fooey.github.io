'use strict';


// prepend target links to headers
module.exports = (function(){
	$(':header[id], [id]:has(:header)').each((i, el) => {
		let $el = $(el);
		let id = $el.attr('id');

		let $header = ($el.is(':header'))
			? $el
			: $el.find(':header:first');

		let $anchor = $(`<a href="#${id}"><i class="fa" /></a>`);

		$header
			.addClass('anchor-target')
			.prepend($anchor);
	});
}());