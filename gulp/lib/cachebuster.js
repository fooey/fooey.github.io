'use strict';

var fs = require('fs');
var path = require('path');


module.exports = function(filePath, urlPathname) {
    var hash = fs.statSync(filePath).mtime.getTime().toString(16);
    var pathname = path.dirname(urlPathname)
            + '/' + path.basename(urlPathname, path.extname(urlPathname))
            + '.~' + hash + '~' + path.extname(urlPathname);

    // console.log(hash, filePath, pathname);
    return {
        pathname: pathname,
    };
};