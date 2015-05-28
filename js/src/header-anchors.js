'use strict';


// prepend target links to headers
module.exports = (function() {
    $(':header[id], [id]:has(:header)').each((i, el) => {
        let $el = $(el);
        let id  = $el.attr('id');

        let $anchor = $(`<a class="anchor-link" href="#${id}"><i class="fa" /></a>`);
        let $header = ($el.is(':header'))
            ? $el
            : $el.find(':header:first');


        $header
            .addClass('anchor-target')
            .prepend($anchor);
    });
}());