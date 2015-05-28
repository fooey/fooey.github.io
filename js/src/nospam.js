'use strict';

function nospam(selector) {
    const addr = getAddr();

    $(selector).each((i, el) => {
        let $el = $(el);

        $el.replaceWith($('<a>', {
            href: (`mailto:${addr}`),
            html: $el.html(),
        }));
    });
}



function getAddr() {
    const src  = '@ jason rushton com .'.split(' ');
    const addr = [src[1], src[0], src[1], src[2], src[4], src[3]].join('');

    return addr;
}


module.exports = nospam;
