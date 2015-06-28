(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

require('babel/polyfill');

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

$(function () {

    // 3rd party jquery plugins
    $('.lightboxed').featherlight('image');

    // create a throttledScroll event on the window limited to 30 calls per second

    var $win = $(window);
    $win.scroll(_.throttle($win.trigger.bind($win, 'throttledScroll'), 1000 / 30));

    // custom js modules

    require('./nospam')('.nospam-email-address');
    require('./header-anchors');
    // require('./bootstrap-fixes');

    require('./navbar')($win);
    require('./para-fade')($win, $('#welcome'), $('#welcome header'));

    $('.img-lazy').each(function () {
        var $el = $(this);
        var src = $el.data('src');

        $el.attr('src', src);
    });
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./header-anchors":2,"./navbar":3,"./nospam":4,"./para-fade":5,"babel/polyfill":99}],2:[function(require,module,exports){
'use strict';

// prepend target links to headers
module.exports = (function () {
    $(':header[id], [id]:has(:header)').each(function (i, el) {
        var $el = $(el);
        var id = $el.attr('id');

        var $anchor = $('<a class="anchor-link" href="#' + id + '"><i class="fa" /></a>');
        var $header = $el.is(':header') ? $el : $el.find(':header:first');

        $header.addClass('anchor-target').prepend($anchor);
    });
})();

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

var _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null);

module.exports = function ($win) {
    // let $nav2 = $('#navbar2');

    var navHeight = 60;
    var minWidth = 768;

    var $hamburger = $('#hamburger');
    var $toggle = $hamburger.find('.toggle');
    var $menu = $hamburger.find('.menu');

    var winWidth = window.innerWidth;
    var isVisible = false;

    $toggle.on('click', toggleToggler);
    $menu.on('click', hideMenu);

    function enableToggler(winScroll) {
        var isSmallWindow = winWidth < minWidth;
        var isWinScrolled = winScroll > navHeight;
        var shouldShow = isSmallWindow || isWinScrolled;

        if (!isVisible && shouldShow) {
            $toggle.addClass('enabled');
            isVisible = true;
        } else if (isVisible && !shouldShow) {
            $toggle.removeClass('enabled');
            isVisible = false;
        }
    }

    function toggleToggler() {
        var isEnabled = $menu.hasClass('enabled');

        if (isEnabled) {
            hideMenu();
        } else {
            showMenu();
        }
    }

    function showMenu() {
        $toggle.addClass('active');
        $menu.addClass('enabled');
    }

    function hideMenu() {
        $toggle.removeClass('active');
        $menu.removeClass('enabled');
    }

    function navSlider() {
        var winScroll = window.pageYOffset || document.body.scrollTop;

        enableToggler(winScroll);
    }

    $win.resize(_.throttle(function () {
        winWidth = window.innerWidth;

        navSlider();
    }, 1000 / 60));

    navSlider();

    $win.on('throttledScroll', navSlider);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
'use strict';

function nospam(selector) {
    var addr = getAddr();

    $(selector).each(function (i, el) {
        var $el = $(el);

        $el.replaceWith($('<a>', {
            href: 'mailto:' + addr,
            html: $el.html()
        }));
    });
}

function getAddr() {
    var src = '@ jason rushton com .'.split(' ');
    var addr = [src[1], src[0], src[1], src[2], src[4], src[3]].join('');

    return addr;
}

module.exports = nospam;

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function ($win, $container, $content) {
    if ($container && $content) {
        var contentTop = $container.offset().top;
        var contentBottom = $container.offset().top + $container.outerHeight() + 1;

        $win.on('throttledScroll', onScroll.bind(null, $content, contentTop, contentBottom));
    }
};

function onScroll($content, contentTop, contentBottom) {
    var winScroll = window.pageYOffset || document.body.scrollTop;

    if (winScroll <= contentTop) {
        $content.css({
            position: '',
            top: '',
            opacity: 1
        });
    } else {
        var contentScrolled = winScroll - contentTop;
        var opacity = (contentBottom - winScroll) / contentBottom;

        $content.css({
            position: 'relative',
            top: contentScrolled / 2,
            opacity: opacity
        });
    }
}

},{}],6:[function(require,module,exports){
(function (global){
"use strict";

var _toolsProtectJs2 = require("./tools/protect.js");

var _toolsProtectJs3 = _interopRequireDefault(_toolsProtectJs2);

require("core-js/shim");

require("regenerator/runtime");

_toolsProtectJs3["default"](module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (global._babelPolyfill) {
  throw new Error("only one instance of babel/polyfill is allowed");
}
global._babelPolyfill = true;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./tools/protect.js":7,"core-js/shim":96,"regenerator/runtime":97}],7:[function(require,module,exports){
(function (__dirname){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var root = _path2["default"].resolve(__dirname, "../../../");

exports["default"] = function (module) {
  if (module.parent && module.parent.filename.indexOf(root) !== 0) {
    throw new Error("Don't hotlink internal Babel files.");
  }
};

module.exports = exports["default"];
}).call(this,"/node_modules\\babel\\node_modules\\babel-core\\lib\\babel\\tools")

},{"path":100}],8:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var $ = require('./$');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = $.toObject($this)
      , length = $.toLength(O.length)
      , index  = $.toIndex(fromIndex, length)
      , value;
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index;
    } return !IS_INCLUDES && -1;
  };
};
},{"./$":29}],9:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var $   = require('./$')
  , ctx = require('./$.ctx');
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that){
    var O      = Object($.assertDefined($this))
      , self   = $.ES5Object(O)
      , f      = ctx(callbackfn, that, 3)
      , length = $.toLength(self.length)
      , index  = 0
      , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./$":29,"./$.ctx":17}],10:[function(require,module,exports){
var $ = require('./$');
function assert(condition, msg1, msg2){
  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
}
assert.def = $.assertDefined;
assert.fn = function(it){
  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
  return it;
};
assert.obj = function(it){
  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
assert.inst = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
module.exports = assert;
},{"./$":29}],11:[function(require,module,exports){
var $        = require('./$')
  , enumKeys = require('./$.enum-keys');
// 19.1.2.1 Object.assign(target, source, ...)
/* eslint-disable no-unused-vars */
module.exports = Object.assign || function assign(target, source){
/* eslint-enable no-unused-vars */
  var T = Object($.assertDefined(target))
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = $.ES5Object(arguments[i++])
      , keys   = enumKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
};
},{"./$":29,"./$.enum-keys":20}],12:[function(require,module,exports){
var $        = require('./$')
  , TAG      = require('./$.wks')('toStringTag')
  , toString = {}.toString;
function cof(it){
  return toString.call(it).slice(8, -1);
}
cof.classof = function(it){
  var O, T;
  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
};
cof.set = function(it, tag, stat){
  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
};
module.exports = cof;
},{"./$":29,"./$.wks":47}],13:[function(require,module,exports){
'use strict';
var $        = require('./$')
  , ctx      = require('./$.ctx')
  , safe     = require('./$.uid').safe
  , assert   = require('./$.assert')
  , forOf    = require('./$.for-of')
  , step     = require('./$.iter').step
  , $has     = $.has
  , set      = $.set
  , isObject = $.isObject
  , hide     = $.hide
  , isExtensible = Object.isExtensible || isObject
  , ID       = safe('id')
  , O1       = safe('O1')
  , LAST     = safe('last')
  , FIRST    = safe('first')
  , ITER     = safe('iter')
  , SIZE     = $.DESC ? safe('size') : 'size'
  , id       = 0;

function fastKey(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
}

function getEntry(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that[O1][index];
  // frozen object case
  for(entry = that[FIRST]; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
}

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      assert.inst(that, C, NAME);
      set(that, O1, $.create(null));
      set(that, SIZE, 0);
      set(that, LAST, undefined);
      set(that, FIRST, undefined);
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    require('./$.mix')(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that[FIRST] = that[LAST] = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that[O1][entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that[FIRST] == entry)that[FIRST] = next;
          if(that[LAST] == entry)that[LAST] = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments[1], 3)
          , entry;
        while(entry = entry ? entry.n : this[FIRST]){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if($.DESC)$.setDesc(C.prototype, 'size', {
      get: function(){
        return assert.def(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that[LAST] = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that[LAST],          // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that[FIRST])that[FIRST] = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that[O1][index] = entry;
    } return that;
  },
  getEntry: getEntry,
  // add .keys, .values, .entries, [@@iterator]
  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
  setIter: function(C, NAME, IS_MAP){
    require('./$.iter-define')(C, NAME, function(iterated, kind){
      set(this, ITER, {o: iterated, k: kind});
    }, function(){
      var iter  = this[ITER]
        , kind  = iter.k
        , entry = iter.l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
        // or finish the iteration
        iter.o = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
  }
};
},{"./$":29,"./$.assert":10,"./$.ctx":17,"./$.for-of":21,"./$.iter":28,"./$.iter-define":26,"./$.mix":31,"./$.uid":45}],14:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $def  = require('./$.def')
  , forOf = require('./$.for-of');
module.exports = function(NAME){
  $def($def.P, NAME, {
    toJSON: function toJSON(){
      var arr = [];
      forOf(this, false, arr.push, arr);
      return arr;
    }
  });
};
},{"./$.def":18,"./$.for-of":21}],15:[function(require,module,exports){
'use strict';
var $         = require('./$')
  , safe      = require('./$.uid').safe
  , assert    = require('./$.assert')
  , forOf     = require('./$.for-of')
  , $has      = $.has
  , isObject  = $.isObject
  , hide      = $.hide
  , isExtensible = Object.isExtensible || isObject
  , id        = 0
  , ID        = safe('id')
  , WEAK      = safe('weak')
  , LEAK      = safe('leak')
  , method    = require('./$.array-methods')
  , find      = method(5)
  , findIndex = method(6);
function findFrozen(store, key){
  return find(store.array, function(it){
    return it[0] === key;
  });
}
// fallback for frozen keys
function leakStore(that){
  return that[LEAK] || hide(that, LEAK, {
    array: [],
    get: function(key){
      var entry = findFrozen(this, key);
      if(entry)return entry[1];
    },
    has: function(key){
      return !!findFrozen(this, key);
    },
    set: function(key, value){
      var entry = findFrozen(this, key);
      if(entry)entry[1] = value;
      else this.array.push([key, value]);
    },
    'delete': function(key){
      var index = findIndex(this.array, function(it){
        return it[0] === key;
      });
      if(~index)this.array.splice(index, 1);
      return !!~index;
    }
  })[LEAK];
}

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      $.set(assert.inst(that, C, NAME), ID, id++);
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    require('./$.mix')(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return leakStore(this)['delete'](key);
        return $has(key, WEAK) && $has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return leakStore(this).has(key);
        return $has(key, WEAK) && $has(key[WEAK], this[ID]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    if(!isExtensible(assert.obj(key))){
      leakStore(that).set(key, value);
    } else {
      $has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that[ID]] = value;
    } return that;
  },
  leakStore: leakStore,
  WEAK: WEAK,
  ID: ID
};
},{"./$":29,"./$.array-methods":9,"./$.assert":10,"./$.for-of":21,"./$.mix":31,"./$.uid":45}],16:[function(require,module,exports){
'use strict';
var $     = require('./$')
  , $def  = require('./$.def')
  , BUGGY = require('./$.iter').BUGGY
  , forOf = require('./$.for-of')
  , species = require('./$.species')
  , assertInstance = require('./$.assert').inst;

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = $.g[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  function fixMethod(KEY){
    var fn = proto[KEY];
    require('./$.redef')(proto, KEY,
      KEY == 'delete' ? function(a){ return fn.call(this, a === 0 ? 0 : a); }
      : KEY == 'has' ? function has(a){ return fn.call(this, a === 0 ? 0 : a); }
      : KEY == 'get' ? function get(a){ return fn.call(this, a === 0 ? 0 : a); }
      : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
      : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  }
  if(!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    require('./$.mix')(C.prototype, methods);
  } else {
    var inst  = new C
      , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
      , buggyZero;
    // wrap for init collections from iterable
    if(!require('./$.iter-detect')(function(iter){ new C(iter); })){ // eslint-disable-line no-new
      C = wrapper(function(target, iterable){
        assertInstance(target, C, NAME);
        var that = new Base;
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    IS_WEAK || inst.forEach(function(val, key){
      buggyZero = 1 / key === -Infinity;
    });
    // fix converting -0 key to +0
    if(buggyZero){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    // + fix .add & .set for chaining
    if(buggyZero || chain !== inst)fixMethod(ADDER);
  }

  require('./$.cof').set(C, NAME);

  O[NAME] = C;
  $def($def.G + $def.W + $def.F * (C != Base), O);
  species(C);
  species($.core[NAME]); // for wrapper

  if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);

  return C;
};
},{"./$":29,"./$.assert":10,"./$.cof":12,"./$.def":18,"./$.for-of":21,"./$.iter":28,"./$.iter-detect":27,"./$.mix":31,"./$.redef":34,"./$.species":39}],17:[function(require,module,exports){
// Optional / simple context binding
var assertFunction = require('./$.assert').fn;
module.exports = function(fn, that, length){
  assertFunction(fn);
  if(~length && that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  } return function(/* ...args */){
      return fn.apply(that, arguments);
    };
};
},{"./$.assert":10}],18:[function(require,module,exports){
var $          = require('./$')
  , global     = $.g
  , core       = $.core
  , isFunction = $.isFunction
  , $redef     = require('./$.redef');
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
global.core = core;
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {}).prototype
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    if(type & $def.B && own)exp = ctx(out, global);
    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)$redef(target, key, out);
    // export
    if(exports[key] != out)$.hide(exports, key, exp);
    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
  }
}
module.exports = $def;
},{"./$":29,"./$.redef":34}],19:[function(require,module,exports){
var $        = require('./$')
  , document = $.g.document
  , isObject = $.isObject
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$":29}],20:[function(require,module,exports){
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getDesc    = $.getDesc
    , getSymbols = $.getSymbols;
  if(getSymbols)$.each.call(getSymbols(it), function(key){
    if(getDesc(it, key).enumerable)keys.push(key);
  });
  return keys;
};
},{"./$":29}],21:[function(require,module,exports){
var ctx  = require('./$.ctx')
  , get  = require('./$.iter').get
  , call = require('./$.iter-call');
module.exports = function(iterable, entries, fn, that){
  var iterator = get(iterable)
    , f        = ctx(fn, that, entries ? 2 : 1)
    , step;
  while(!(step = iterator.next()).done){
    if(call(iterator, f, step.value, entries) === false){
      return call.close(iterator);
    }
  }
};
},{"./$.ctx":17,"./$.iter":28,"./$.iter-call":25}],22:[function(require,module,exports){
module.exports = function($){
  $.FW   = true;
  $.path = $.g;
  return $;
};
},{}],23:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var $ = require('./$')
  , toString = {}.toString
  , getNames = $.getNames;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

function getWindowNames(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
}

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames($.toObject(it));
};
},{"./$":29}],24:[function(require,module,exports){
// Fast apply
// http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
  } return              fn.apply(that, args);
};
},{}],25:[function(require,module,exports){
var assertObject = require('./$.assert').obj;
function close(iterator){
  var ret = iterator['return'];
  if(ret !== undefined)assertObject(ret.call(iterator));
}
function call(iterator, fn, value, entries){
  try {
    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
  } catch(e){
    close(iterator);
    throw e;
  }
}
call.close = close;
module.exports = call;
},{"./$.assert":10}],26:[function(require,module,exports){
var $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , $               = require('./$')
  , cof             = require('./$.cof')
  , $iter           = require('./$.iter')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values'
  , Iterators       = $iter.Iterators;
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  $iter.create(Constructor, NAME, next);
  function createMethod(kind){
    function $$(that){
      return new Constructor(that, kind);
    }
    switch(kind){
      case KEYS: return function keys(){ return $$(this); };
      case VALUES: return function values(){ return $$(this); };
    } return function entries(){ return $$(this); };
  }
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = $.getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    cof.set(IteratorPrototype, TAG, true);
    // FF fix
    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
  }
  // Define iterator
  if($.FW || FORCE)$iter.set(proto, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = $.that;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod(KEYS),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
  }
};
},{"./$":29,"./$.cof":12,"./$.def":18,"./$.iter":28,"./$.redef":34,"./$.wks":47}],27:[function(require,module,exports){
var SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , SAFE_CLOSING    = false;
try {
  var riter = [7][SYMBOL_ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }
module.exports = function(exec){
  if(!SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[SYMBOL_ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[SYMBOL_ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":47}],28:[function(require,module,exports){
'use strict';
var $                 = require('./$')
  , cof               = require('./$.cof')
  , classof           = cof.classof
  , assert            = require('./$.assert')
  , assertObject      = assert.obj
  , SYMBOL_ITERATOR   = require('./$.wks')('iterator')
  , FF_ITERATOR       = '@@iterator'
  , Iterators         = require('./$.shared')('iterators')
  , IteratorPrototype = {};
// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
setIterator(IteratorPrototype, $.that);
function setIterator(O, value){
  $.hide(O, SYMBOL_ITERATOR, value);
  // Add iterator for FF iterator protocol
  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
}

module.exports = {
  // Safari has buggy iterators w/o `next`
  BUGGY: 'keys' in [] && !('next' in [].keys()),
  Iterators: Iterators,
  step: function(done, value){
    return {value: value, done: !!done};
  },
  is: function(it){
    var O      = Object(it)
      , Symbol = $.g.Symbol;
    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
      || SYMBOL_ITERATOR in O
      || $.has(Iterators, classof(O));
  },
  get: function(it){
    var Symbol = $.g.Symbol
      , getIter;
    if(it != undefined){
      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
        || it[SYMBOL_ITERATOR]
        || Iterators[classof(it)];
    }
    assert($.isFunction(getIter), it, ' is not iterable!');
    return assertObject(getIter.call(it));
  },
  set: setIterator,
  create: function(Constructor, NAME, next, proto){
    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
    cof.set(Constructor, NAME + ' Iterator');
  }
};
},{"./$":29,"./$.assert":10,"./$.cof":12,"./$.shared":38,"./$.wks":47}],29:[function(require,module,exports){
'use strict';
var global = typeof self != 'undefined' ? self : Function('return this')()
  , core   = {}
  , defineProperty = Object.defineProperty
  , hasOwnProperty = {}.hasOwnProperty
  , ceil  = Math.ceil
  , floor = Math.floor
  , max   = Math.max
  , min   = Math.min;
// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
var DESC = !!function(){
  try {
    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
var hide = createDefiner(1);
// 7.1.4 ToInteger
function toInteger(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
}
function desc(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
}
function simpleSet(object, key, value){
  object[key] = value;
  return object;
}
function createDefiner(bitmap){
  return DESC ? function(object, key, value){
    return $.setDesc(object, key, desc(bitmap, value));
  } : simpleSet;
}

function isObject(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
}
function isFunction(it){
  return typeof it == 'function';
}
function assertDefined(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
}

var $ = module.exports = require('./$.fw')({
  g: global,
  core: core,
  html: global.document && document.documentElement,
  // http://jsperf.com/core-js-isobject
  isObject:   isObject,
  isFunction: isFunction,
  that: function(){
    return this;
  },
  // 7.1.4 ToInteger
  toInteger: toInteger,
  // 7.1.15 ToLength
  toLength: function(it){
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  },
  toIndex: function(index, length){
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  },
  has: function(it, key){
    return hasOwnProperty.call(it, key);
  },
  create:     Object.create,
  getProto:   Object.getPrototypeOf,
  DESC:       DESC,
  desc:       desc,
  getDesc:    Object.getOwnPropertyDescriptor,
  setDesc:    defineProperty,
  setDescs:   Object.defineProperties,
  getKeys:    Object.keys,
  getNames:   Object.getOwnPropertyNames,
  getSymbols: Object.getOwnPropertySymbols,
  assertDefined: assertDefined,
  // Dummy, fix for not array-like ES3 string in es5 module
  ES5Object: Object,
  toObject: function(it){
    return $.ES5Object(assertDefined(it));
  },
  hide: hide,
  def: createDefiner(0),
  set: global.Symbol ? simpleSet : hide,
  each: [].forEach
});
/* eslint-disable no-undef */
if(typeof __e != 'undefined')__e = core;
if(typeof __g != 'undefined')__g = global;
},{"./$.fw":22}],30:[function(require,module,exports){
var $ = require('./$');
module.exports = function(object, el){
  var O      = $.toObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":29}],31:[function(require,module,exports){
var $redef = require('./$.redef');
module.exports = function(target, src){
  for(var key in src)$redef(target, key, src[key]);
  return target;
};
},{"./$.redef":34}],32:[function(require,module,exports){
var $            = require('./$')
  , assertObject = require('./$.assert').obj;
module.exports = function ownKeys(it){
  assertObject(it);
  var keys       = $.getNames(it)
    , getSymbols = $.getSymbols;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./$":29,"./$.assert":10}],33:[function(require,module,exports){
'use strict';
var $      = require('./$')
  , invoke = require('./$.invoke')
  , assertFunction = require('./$.assert').fn;
module.exports = function(/* ...pargs */){
  var fn     = assertFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = $.path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that    = this
      , _length = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !_length)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(_length > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"./$":29,"./$.assert":10,"./$.invoke":24}],34:[function(require,module,exports){
var $   = require('./$')
  , tpl = String({}.hasOwnProperty)
  , SRC = require('./$.uid').safe('src')
  , _toString = Function.toString;

function $redef(O, key, val, safe){
  if($.isFunction(val)){
    var base = O[key];
    $.hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));
    if(!('name' in val))val.name = key;
  }
  if(O === $.g){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    $.hide(O, key, val);
  }
}

// add fake Function#toString for correct work wrapped methods / constructors
// with methods similar to LoDash isNative
$redef(Function.prototype, 'toString', function toString(){
  return $.has(this, SRC) ? this[SRC] : _toString.call(this);
});

$.core.inspectSource = function(it){
  return _toString.call(it);
};

module.exports = $redef;
},{"./$":29,"./$.uid":45}],35:[function(require,module,exports){
'use strict';
module.exports = function(regExp, replace, isStatic){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(isStatic ? it : this).replace(regExp, replacer);
  };
};
},{}],36:[function(require,module,exports){
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],37:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var $      = require('./$')
  , assert = require('./$.assert');
function check(O, proto){
  assert.obj(O);
  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
}
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
    ? function(buggy, set){
        try {
          set = require('./$.ctx')(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
          set({}, []);
        } catch(e){ buggy = true; }
        return function setPrototypeOf(O, proto){
          check(O, proto);
          if(buggy)O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }()
    : undefined),
  check: check
};
},{"./$":29,"./$.assert":10,"./$.ctx":17}],38:[function(require,module,exports){
var $      = require('./$')
  , SHARED = '__core-js_shared__'
  , store  = $.g[SHARED] || ($.g[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$":29}],39:[function(require,module,exports){
var $       = require('./$')
  , SPECIES = require('./$.wks')('species');
module.exports = function(C){
  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
    configurable: true,
    get: $.that
  });
};
},{"./$":29,"./$.wks":47}],40:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var $ = require('./$');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String($.assertDefined(that))
      , i = $.toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$":29}],41:[function(require,module,exports){
// http://wiki.ecmascript.org/doku.php?id=strawman:string_padding
var $      = require('./$')
  , repeat = require('./$.string-repeat');

module.exports = function(that, minLength, fillChar, left){
  // 1. Let O be CheckObjectCoercible(this value).
  // 2. Let S be ToString(O).
  var S = String($.assertDefined(that));
  // 4. If intMinLength is undefined, return S.
  if(minLength === undefined)return S;
  // 4. Let intMinLength be ToInteger(minLength).
  var intMinLength = $.toInteger(minLength);
  // 5. Let fillLen be the number of characters in S minus intMinLength.
  var fillLen = intMinLength - S.length;
  // 6. If fillLen < 0, then throw a RangeError exception.
  // 7. If fillLen is +∞, then throw a RangeError exception.
  if(fillLen < 0 || fillLen === Infinity){
    throw new RangeError('Cannot satisfy string length ' + minLength + ' for string: ' + S);
  }
  // 8. Let sFillStr be the string represented by fillStr.
  // 9. If sFillStr is undefined, let sFillStr be a space character.
  var sFillStr = fillChar === undefined ? ' ' : String(fillChar);
  // 10. Let sFillVal be a String made of sFillStr, repeated until fillLen is met.
  var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));
  // truncate if we overflowed
  if(sFillVal.length > fillLen)sFillVal = left
    ? sFillVal.slice(sFillVal.length - fillLen)
    : sFillVal.slice(0, fillLen);
  // 11. Return a string made from sFillVal, followed by S.
  // 11. Return a String made from S, followed by sFillVal.
  return left ? sFillVal.concat(S) : S.concat(sFillVal);
};
},{"./$":29,"./$.string-repeat":42}],42:[function(require,module,exports){
'use strict';
var $ = require('./$');

module.exports = function repeat(count){
  var str = String($.assertDefined(this))
    , res = ''
    , n   = $.toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./$":29}],43:[function(require,module,exports){
'use strict';
var $      = require('./$')
  , ctx    = require('./$.ctx')
  , cof    = require('./$.cof')
  , invoke = require('./$.invoke')
  , cel    = require('./$.dom-create')
  , global             = $.g
  , isFunction         = $.isFunction
  , html               = $.html
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
function run(){
  var id = +this;
  if($.has(queue, id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
}
function listner(event){
  run.call(event.data);
}
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!isFunction(setTask) || !isFunction(clearTask)){
  setTask = function(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(isFunction(fn) ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(cof(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Modern browsers, skip implementation for WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is object
  } else if(global.addEventListener && isFunction(global.postMessage) && !global.importScripts){
    defer = function(id){
      global.postMessage(id, '*');
    };
    global.addEventListener('message', listner, false);
  // WebWorkers
  } else if(isFunction(MessageChannel)){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$":29,"./$.cof":12,"./$.ctx":17,"./$.dom-create":19,"./$.invoke":24}],44:[function(require,module,exports){
module.exports = function(exec){
  try {
    exec();
    return false;
  } catch(e){
    return true;
  }
};
},{}],45:[function(require,module,exports){
var sid = 0;
function uid(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
}
uid.safe = require('./$').g.Symbol || uid;
module.exports = uid;
},{"./$":29}],46:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./$.wks')('unscopables');
if(!(UNSCOPABLES in []))require('./$').hide(Array.prototype, UNSCOPABLES, {});
module.exports = function(key){
  [][UNSCOPABLES][key] = true;
};
},{"./$":29,"./$.wks":47}],47:[function(require,module,exports){
var global = require('./$').g
  , store  = require('./$.shared')('wks');
module.exports = function(name){
  return store[name] || (store[name] =
    global.Symbol && global.Symbol[name] || require('./$.uid').safe('Symbol.' + name));
};
},{"./$":29,"./$.shared":38,"./$.uid":45}],48:[function(require,module,exports){
var $                = require('./$')
  , cel              = require('./$.dom-create')
  , cof              = require('./$.cof')
  , $def             = require('./$.def')
  , invoke           = require('./$.invoke')
  , arrayMethod      = require('./$.array-methods')
  , IE_PROTO         = require('./$.uid').safe('__proto__')
  , assert           = require('./$.assert')
  , assertObject     = assert.obj
  , ObjectProto      = Object.prototype
  , html             = $.html
  , A                = []
  , _slice           = A.slice
  , _join            = A.join
  , classof          = cof.classof
  , has              = $.has
  , defineProperty   = $.setDesc
  , getOwnDescriptor = $.getDesc
  , defineProperties = $.setDescs
  , isFunction       = $.isFunction
  , isObject         = $.isObject
  , toObject         = $.toObject
  , toLength         = $.toLength
  , toIndex          = $.toIndex
  , IE8_DOM_DEFINE   = false
  , $indexOf         = require('./$.array-includes')(false)
  , $forEach         = arrayMethod(0)
  , $map             = arrayMethod(1)
  , $filter          = arrayMethod(2)
  , $some            = arrayMethod(3)
  , $every           = arrayMethod(4);

if(!$.DESC){
  try {
    IE8_DOM_DEFINE = defineProperty(cel('div'), 'x',
      {get: function(){ return 8; }}
    ).x == 8;
  } catch(e){ /* empty */ }
  $.setDesc = function(O, P, Attributes){
    if(IE8_DOM_DEFINE)try {
      return defineProperty(O, P, Attributes);
    } catch(e){ /* empty */ }
    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
    if('value' in Attributes)assertObject(O)[P] = Attributes.value;
    return O;
  };
  $.getDesc = function(O, P){
    if(IE8_DOM_DEFINE)try {
      return getOwnDescriptor(O, P);
    } catch(e){ /* empty */ }
    if(has(O, P))return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
  };
  $.setDescs = defineProperties = function(O, Properties){
    assertObject(O);
    var keys   = $.getKeys(Properties)
      , length = keys.length
      , i = 0
      , P;
    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
    return O;
  };
}
$def($def.S + $def.F * !$.DESC, 'Object', {
  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $.getDesc,
  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  defineProperty: $.setDesc,
  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
  defineProperties: defineProperties
});

  // IE 8- don't enum bug keys
var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
            'toLocaleString,toString,valueOf').split(',')
  // Additional keys for getOwnPropertyNames
  , keys2 = keys1.concat('length', 'prototype')
  , keysLen1 = keys1.length;

// Create object with `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = cel('iframe')
    , i      = keysLen1
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict.prototype[keys1[i]];
  return createDict();
};
function createGetKeys(names, length){
  return function(object){
    var O      = toObject(object)
      , i      = 0
      , result = []
      , key;
    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while(length > i)if(has(O, key = names[i++])){
      ~$indexOf(result, key) || result.push(key);
    }
    return result;
  };
}
function Empty(){}
$def($def.S, 'Object', {
  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  getPrototypeOf: $.getProto = $.getProto || function(O){
    O = Object(assert.def(O));
    if(has(O, IE_PROTO))return O[IE_PROTO];
    if(isFunction(O.constructor) && O instanceof O.constructor){
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  },
  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  create: $.create = $.create || function(O, /*?*/Properties){
    var result;
    if(O !== null){
      Empty.prototype = assertObject(O);
      result = new Empty();
      Empty.prototype = null;
      // add "__proto__" for Object.getPrototypeOf shim
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : defineProperties(result, Properties);
  },
  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
  // 19.1.2.17 / 15.2.3.8 Object.seal(O)
  seal: function seal(it){
    return it; // <- cap
  },
  // 19.1.2.5 / 15.2.3.9 Object.freeze(O)
  freeze: function freeze(it){
    return it; // <- cap
  },
  // 19.1.2.15 / 15.2.3.10 Object.preventExtensions(O)
  preventExtensions: function preventExtensions(it){
    return it; // <- cap
  },
  // 19.1.2.13 / 15.2.3.11 Object.isSealed(O)
  isSealed: function isSealed(it){
    return !isObject(it); // <- cap
  },
  // 19.1.2.12 / 15.2.3.12 Object.isFrozen(O)
  isFrozen: function isFrozen(it){
    return !isObject(it); // <- cap
  },
  // 19.1.2.11 / 15.2.3.13 Object.isExtensible(O)
  isExtensible: function isExtensible(it){
    return isObject(it); // <- cap
  }
});

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
$def($def.P, 'Function', {
  bind: function(that /*, args... */){
    var fn       = assert.fn(this)
      , partArgs = _slice.call(arguments, 1);
    function bound(/* args... */){
      var args   = partArgs.concat(_slice.call(arguments))
        , constr = this instanceof bound
        , ctx    = constr ? $.create(fn.prototype) : that
        , result = invoke(fn, args, ctx);
      return constr ? ctx : result;
    }
    if(fn.prototype)bound.prototype = fn.prototype;
    return bound;
  }
});

// Fix for not array-like ES3 string and DOM objects
if(!(0 in Object('z') && 'z'[0] == 'z')){
  $.ES5Object = function(it){
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
}

var buggySlice = true;
try {
  if(html)_slice.call(html);
  buggySlice = false;
} catch(e){ /* empty */ }

$def($def.P + $def.F * buggySlice, 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return _slice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

$def($def.P + $def.F * ($.ES5Object != Object), 'Array', {
  join: function join(){
    return _join.apply($.ES5Object(this), arguments);
  }
});

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
$def($def.S, 'Array', {
  isArray: function(arg){
    return cof(arg) == 'Array';
  }
});
function createArrayReduce(isRight){
  return function(callbackfn, memo){
    assert.fn(callbackfn);
    var O      = toObject(this)
      , length = toLength(O.length)
      , index  = isRight ? length - 1 : 0
      , i      = isRight ? -1 : 1;
    if(arguments.length < 2)for(;;){
      if(index in O){
        memo = O[index];
        index += i;
        break;
      }
      index += i;
      assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
    }
    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
      memo = callbackfn(memo, O[index], index, this);
    }
    return memo;
  };
}
$def($def.P, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: $.each = $.each || function forEach(callbackfn/*, that = undefined */){
    return $forEach(this, callbackfn, arguments[1]);
  },
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn/*, that = undefined */){
    return $map(this, callbackfn, arguments[1]);
  },
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn/*, that = undefined */){
    return $filter(this, callbackfn, arguments[1]);
  },
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn/*, that = undefined */){
    return $some(this, callbackfn, arguments[1]);
  },
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn/*, that = undefined */){
    return $every(this, callbackfn, arguments[1]);
  },
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: createArrayReduce(false),
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: createArrayReduce(true),
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(el /*, fromIndex = 0 */){
    return $indexOf(this, el, arguments[1]);
  },
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
    var O      = toObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, $.toInteger(fromIndex));
    if(index < 0)index = toLength(length + index);
    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
    return -1;
  }
});

// 21.1.3.25 / 15.5.4.20 String.prototype.trim()
$def($def.P, 'String', {trim: require('./$.replacer')(/^\s*([\s\S]*\S)?\s*$/, '$1')});

// 20.3.3.1 / 15.9.4.4 Date.now()
$def($def.S, 'Date', {now: function(){
  return +new Date;
}});

function lz(num){
  return num > 9 ? num : '0' + num;
}

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
// PhantomJS and old webkit had a broken Date implementation.
var date       = new Date(-5e13 - 1)
  , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
      && require('./$.throws')(function(){ new Date(NaN).toISOString(); }));
$def($def.P + $def.F * brokenDate, 'Date', {toISOString: function(){
  if(!isFinite(this))throw RangeError('Invalid time value');
  var d = this
    , y = d.getUTCFullYear()
    , m = d.getUTCMilliseconds()
    , s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
}});

if(classof(function(){ return arguments; }()) == 'Object')cof.classof = function(it){
  var tag = classof(it);
  return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
};
},{"./$":29,"./$.array-includes":8,"./$.array-methods":9,"./$.assert":10,"./$.cof":12,"./$.def":18,"./$.dom-create":19,"./$.invoke":24,"./$.replacer":35,"./$.throws":44,"./$.uid":45}],49:[function(require,module,exports){
'use strict';
var $       = require('./$')
  , $def    = require('./$.def')
  , toIndex = $.toIndex;
$def($def.P, 'Array', {
  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
  copyWithin: function copyWithin(target/* = 0 */, start /* = 0, end = @length */){
    var O     = Object($.assertDefined(this))
      , len   = $.toLength(O.length)
      , to    = toIndex(target, len)
      , from  = toIndex(start, len)
      , end   = arguments[2]
      , fin   = end === undefined ? len : toIndex(end, len)
      , count = Math.min(fin - from, len - to)
      , inc   = 1;
    if(from < to && to < from + count){
      inc  = -1;
      from = from + count - 1;
      to   = to   + count - 1;
    }
    while(count-- > 0){
      if(from in O)O[to] = O[from];
      else delete O[to];
      to   += inc;
      from += inc;
    } return O;
  }
});
require('./$.unscope')('copyWithin');
},{"./$":29,"./$.def":18,"./$.unscope":46}],50:[function(require,module,exports){
'use strict';
var $       = require('./$')
  , $def    = require('./$.def')
  , toIndex = $.toIndex;
$def($def.P, 'Array', {
  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
  fill: function fill(value /*, start = 0, end = @length */){
    var O      = Object($.assertDefined(this))
      , length = $.toLength(O.length)
      , index  = toIndex(arguments[1], length)
      , end    = arguments[2]
      , endPos = end === undefined ? length : toIndex(end, length);
    while(endPos > index)O[index++] = value;
    return O;
  }
});
require('./$.unscope')('fill');
},{"./$":29,"./$.def":18,"./$.unscope":46}],51:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var KEY    = 'findIndex'
  , $def   = require('./$.def')
  , forced = true
  , $find  = require('./$.array-methods')(6);
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$def($def.P + $def.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments[1]);
  }
});
require('./$.unscope')(KEY);
},{"./$.array-methods":9,"./$.def":18,"./$.unscope":46}],52:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var KEY    = 'find'
  , $def   = require('./$.def')
  , forced = true
  , $find  = require('./$.array-methods')(5);
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$def($def.P + $def.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments[1]);
  }
});
require('./$.unscope')(KEY);
},{"./$.array-methods":9,"./$.def":18,"./$.unscope":46}],53:[function(require,module,exports){
var $     = require('./$')
  , ctx   = require('./$.ctx')
  , $def  = require('./$.def')
  , $iter = require('./$.iter')
  , call  = require('./$.iter-call');
$def($def.S + $def.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = Object($.assertDefined(arrayLike))
      , mapfn   = arguments[1]
      , mapping = mapfn !== undefined
      , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
      , index   = 0
      , length, result, step, iterator;
    if($iter.is(O)){
      iterator = $iter.get(O);
      // strange IE quirks mode bug -> use typeof instead of isFunction
      result   = new (typeof this == 'function' ? this : Array);
      for(; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
      }
    } else {
      // strange IE quirks mode bug -> use typeof instead of isFunction
      result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
      for(; length > index; index++){
        result[index] = mapping ? f(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});
},{"./$":29,"./$.ctx":17,"./$.def":18,"./$.iter":28,"./$.iter-call":25,"./$.iter-detect":27}],54:[function(require,module,exports){
var $          = require('./$')
  , setUnscope = require('./$.unscope')
  , ITER       = require('./$.uid').safe('iter')
  , $iter      = require('./$.iter')
  , step       = $iter.step
  , Iterators  = $iter.Iterators;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , kind  = iter.k
    , index = iter.i++;
  if(!O || index >= O.length){
    iter.o = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');
},{"./$":29,"./$.iter":28,"./$.iter-define":26,"./$.uid":45,"./$.unscope":46}],55:[function(require,module,exports){
var $def = require('./$.def');
$def($def.S, 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , length = arguments.length
      // strange IE quirks mode bug -> use typeof instead of isFunction
      , result = new (typeof this == 'function' ? this : Array)(length);
    while(length > index)result[index] = arguments[index++];
    result.length = length;
    return result;
  }
});
},{"./$.def":18}],56:[function(require,module,exports){
require('./$.species')(Array);
},{"./$.species":39}],57:[function(require,module,exports){
var $             = require('./$')
  , HAS_INSTANCE  = require('./$.wks')('hasInstance')
  , FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(!$.isFunction(this) || !$.isObject(O))return false;
  if(!$.isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = $.getProto(O))if(this.prototype === O)return true;
  return false;
}});
},{"./$":29,"./$.wks":47}],58:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , NAME = 'name'
  , setDesc = $.setDesc
  , FunctionProto = Function.prototype;
// 19.2.4.2 name
NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
  configurable: true,
  get: function(){
    var match = String(this).match(/^\s*function ([^ (]*)/)
      , name  = match ? match[1] : '';
    $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
    return name;
  },
  set: function(value){
    $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
  }
});
},{"./$":29}],59:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.1 Map Objects
require('./$.collection')('Map', function(get){
  return function Map(){ return get(this, arguments[0]); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./$.collection":16,"./$.collection-strong":13}],60:[function(require,module,exports){
var Infinity = 1 / 0
  , $def  = require('./$.def')
  , E     = Math.E
  , pow   = Math.pow
  , abs   = Math.abs
  , exp   = Math.exp
  , log   = Math.log
  , sqrt  = Math.sqrt
  , ceil  = Math.ceil
  , floor = Math.floor
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);
function roundTiesToEven(n){
  return n + 1 / EPSILON - 1 / EPSILON;
}

// 20.2.2.28 Math.sign(x)
function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
}
// 20.2.2.5 Math.asinh(x)
function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
}
// 20.2.2.14 Math.expm1(x)
function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
}

$def($def.S, 'Math', {
  // 20.2.2.3 Math.acosh(x)
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
  },
  // 20.2.2.5 Math.asinh(x)
  asinh: asinh,
  // 20.2.2.7 Math.atanh(x)
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
  },
  // 20.2.2.9 Math.cbrt(x)
  cbrt: function cbrt(x){
    return sign(x = +x) * pow(abs(x), 1 / 3);
  },
  // 20.2.2.11 Math.clz32(x)
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - floor(log(x + 0.5) * Math.LOG2E) : 32;
  },
  // 20.2.2.12 Math.cosh(x)
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  },
  // 20.2.2.14 Math.expm1(x)
  expm1: expm1,
  // 20.2.2.16 Math.fround(x)
  fround: function fround(x){
    var $abs  = abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  },
  // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , len  = arguments.length
      , larg = 0
      , arg, div;
    while(i < len){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  },
  // 20.2.2.18 Math.imul(x, y)
  imul: function imul(x, y){
    var UInt16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UInt16 & xn
      , yl = UInt16 & yn;
    return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
  },
  // 20.2.2.20 Math.log1p(x)
  log1p: function log1p(x){
    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
  },
  // 20.2.2.21 Math.log10(x)
  log10: function log10(x){
    return log(x) / Math.LN10;
  },
  // 20.2.2.22 Math.log2(x)
  log2: function log2(x){
    return log(x) / Math.LN2;
  },
  // 20.2.2.28 Math.sign(x)
  sign: sign,
  // 20.2.2.30 Math.sinh(x)
  sinh: function sinh(x){
    return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
  },
  // 20.2.2.33 Math.tanh(x)
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  },
  // 20.2.2.34 Math.trunc(x)
  trunc: function trunc(it){
    return (it > 0 ? floor : ceil)(it);
  }
});
},{"./$.def":18}],61:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , isObject   = $.isObject
  , isFunction = $.isFunction
  , NUMBER     = 'Number'
  , $Number    = $.g[NUMBER]
  , Base       = $Number
  , proto      = $Number.prototype;
function toPrimitive(it){
  var fn, val;
  if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
  if(isFunction(fn = it.toString) && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to number");
}
function toNumber(it){
  if(isObject(it))it = toPrimitive(it);
  if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
    var binary = false;
    switch(it.charCodeAt(1)){
      case 66 : case 98  : binary = true;
      case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
    }
  } return +it;
}
if($.FW && !($Number('0o1') && $Number('0b1'))){
  $Number = function Number(it){
    return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
  };
  $.each.call($.DESC ? $.getNames(Base) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES6 (in case, if modules with ES6 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
    ).split(','), function(key){
      if($.has(Base, key) && !$.has($Number, key)){
        $.setDesc($Number, key, $.getDesc(Base, key));
      }
    }
  );
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./$.redef')($.g, NUMBER, $Number);
}
},{"./$":29,"./$.redef":34}],62:[function(require,module,exports){
var $     = require('./$')
  , $def  = require('./$.def')
  , abs   = Math.abs
  , floor = Math.floor
  , _isFinite = $.g.isFinite
  , MAX_SAFE_INTEGER = 0x1fffffffffffff; // pow(2, 53) - 1 == 9007199254740991;
function isInteger(it){
  return !$.isObject(it) && _isFinite(it) && floor(it) === it;
}
$def($def.S, 'Number', {
  // 20.1.2.1 Number.EPSILON
  EPSILON: Math.pow(2, -52),
  // 20.1.2.2 Number.isFinite(number)
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  },
  // 20.1.2.3 Number.isInteger(number)
  isInteger: isInteger,
  // 20.1.2.4 Number.isNaN(number)
  isNaN: function isNaN(number){
    return number != number;
  },
  // 20.1.2.5 Number.isSafeInteger(number)
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
  },
  // 20.1.2.6 Number.MAX_SAFE_INTEGER
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
  // 20.1.2.10 Number.MIN_SAFE_INTEGER
  MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
  // 20.1.2.12 Number.parseFloat(string)
  parseFloat: parseFloat,
  // 20.1.2.13 Number.parseInt(string, radix)
  parseInt: parseInt
});
},{"./$":29,"./$.def":18}],63:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');
$def($def.S, 'Object', {assign: require('./$.assign')});
},{"./$.assign":11,"./$.def":18}],64:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $def = require('./$.def');
$def($def.S, 'Object', {
  is: require('./$.same')
});
},{"./$.def":18,"./$.same":36}],65:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $def = require('./$.def');
$def($def.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.def":18,"./$.set-proto":37}],66:[function(require,module,exports){
var $        = require('./$')
  , $def     = require('./$.def')
  , isObject = $.isObject
  , toObject = $.toObject;
$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
, function(KEY, ID){
  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
    , forced = 0
    , method = {};
  method[KEY] = ID == 0 ? function freeze(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 1 ? function seal(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 2 ? function preventExtensions(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 3 ? function isFrozen(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 4 ? function isSealed(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 5 ? function isExtensible(it){
    return isObject(it) ? fn(it) : false;
  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
    return fn(toObject(it), key);
  } : ID == 7 ? function getPrototypeOf(it){
    return fn(Object($.assertDefined(it)));
  } : ID == 8 ? function keys(it){
    return fn(toObject(it));
  } : require('./$.get-names').get;
  try {
    fn('z');
  } catch(e){
    forced = 1;
  }
  $def($def.S + $def.F * forced, 'Object', method);
});
},{"./$":29,"./$.def":18,"./$.get-names":23}],67:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , tmp = {};
tmp[require('./$.wks')('toStringTag')] = 'z';
if(require('./$').FW && cof(tmp) != 'z'){
  require('./$.redef')(Object.prototype, 'toString', function toString(){
    return '[object ' + cof.classof(this) + ']';
  }, true);
}
},{"./$":29,"./$.cof":12,"./$.redef":34,"./$.wks":47}],68:[function(require,module,exports){
'use strict';
var $        = require('./$')
  , ctx      = require('./$.ctx')
  , cof      = require('./$.cof')
  , $def     = require('./$.def')
  , assert   = require('./$.assert')
  , forOf    = require('./$.for-of')
  , setProto = require('./$.set-proto').set
  , same     = require('./$.same')
  , species  = require('./$.species')
  , SPECIES  = require('./$.wks')('species')
  , RECORD   = require('./$.uid').safe('record')
  , PROMISE  = 'Promise'
  , global   = $.g
  , process  = global.process
  , isNode   = cof(process) == 'process'
  , asap     = process && process.nextTick || require('./$.task').set
  , P        = global[PROMISE]
  , isFunction     = $.isFunction
  , isObject       = $.isObject
  , assertFunction = assert.fn
  , assertObject   = assert.obj
  , Wrapper;

function testResolve(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
}

var useNative = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = isFunction(P) && isFunction(P.resolve) && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && $.DESC){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
function isPromise(it){
  return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
}
function sameConstructor(a, b){
  // library wrapper special case
  if(!$.FW && a === P && b === Wrapper)return true;
  return same(a, b);
}
function getConstructor(C){
  var S = assertObject(C)[SPECIES];
  return S != undefined ? S : C;
}
function isThenable(it){
  var then;
  if(isObject(it))then = it.then;
  return isFunction(then) ? then : false;
}
function notify(record){
  var chain = record.c;
  // strange IE + webpack dev server bug - use .call(global)
  if(chain.length)asap.call(global, function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    function run(react){
      var cb = ok ? react.ok : react.fail
        , ret, then;
      try {
        if(cb){
          if(!ok)record.h = true;
          ret = cb === true ? value : cb(value);
          if(ret === react.P){
            react.rej(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(ret)){
            then.call(ret, react.res, react.rej);
          } else react.res(ret);
        } else react.rej(value);
      } catch(err){
        react.rej(err);
      }
    }
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
  });
}
function isUnhandled(promise){
  var record = promise[RECORD]
    , chain  = record.a || record.c
    , i      = 0
    , react;
  if(record.h)return false;
  while(chain.length > i){
    react = chain[i++];
    if(react.fail || !isUnhandled(react.P))return false;
  } return true;
}
function $reject(value){
  var record = this
    , promise;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  setTimeout(function(){
    // strange IE + webpack dev server bug - use .call(global)
    asap.call(global, function(){
      if(isUnhandled(promise = record.p)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(global.console && console.error){
          console.error('Unhandled promise rejection', value);
        }
      }
      record.a = undefined;
    });
  }, 1);
  notify(record);
}
function $resolve(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(then = isThenable(value)){
      // strange IE + webpack dev server bug - use .call(global)
      asap.call(global, function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
}

// constructor polyfill
if(!useNative){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    assertFunction(executor);
    var record = {
      p: assert.inst(this, P, PROMISE),       // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false                                // <- handled rejection
    };
    $.hide(this, RECORD, record);
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.mix')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var S = assertObject(assertObject(this).constructor)[SPECIES];
      var react = {
        ok:   isFunction(onFulfilled) ? onFulfilled : true,
        fail: isFunction(onRejected)  ? onRejected  : false
      };
      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
        react.res = assertFunction(res);
        react.rej = assertFunction(rej);
      });
      var record = this[RECORD];
      record.c.push(react);
      if(record.a)record.a.push(react);
      if(record.s)notify(record);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

// export
$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
cof.set(P, PROMISE);
species(P);
species(Wrapper = $.core[PROMISE]);

// statics
$def($def.S + $def.F * !useNative, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    return new (getConstructor(this))(function(res, rej){ rej(r); });
  }
});
$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    return isPromise(x) && sameConstructor(x.constructor, this)
      ? x : new this(function(res){ res(x); });
  }
});
$def($def.S + $def.F * !(useNative && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C      = getConstructor(this)
      , values = [];
    return new C(function(res, rej){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        C.resolve(promise).then(function(value){
          results[index] = value;
          --remaining || res(results);
        }, rej);
      });
      else res(results);
    });
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C = getConstructor(this);
    return new C(function(res, rej){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(res, rej);
      });
    });
  }
});
},{"./$":29,"./$.assert":10,"./$.cof":12,"./$.ctx":17,"./$.def":18,"./$.for-of":21,"./$.iter-detect":27,"./$.mix":31,"./$.same":36,"./$.set-proto":37,"./$.species":39,"./$.task":43,"./$.uid":45,"./$.wks":47}],69:[function(require,module,exports){
var $         = require('./$')
  , $def      = require('./$.def')
  , setProto  = require('./$.set-proto')
  , $iter     = require('./$.iter')
  , ITERATOR  = require('./$.wks')('iterator')
  , ITER      = require('./$.uid').safe('iter')
  , step      = $iter.step
  , assert    = require('./$.assert')
  , isObject  = $.isObject
  , getProto  = $.getProto
  , $Reflect  = $.g.Reflect
  , _apply    = Function.apply
  , assertObject = assert.obj
  , _isExtensible = Object.isExtensible || isObject
  , _preventExtensions = Object.preventExtensions
  // IE TP has broken Reflect.enumerate
  , buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));

function Enumerate(iterated){
  $.set(this, ITER, {o: iterated, k: undefined, i: 0});
}
$iter.create(Enumerate, 'Object', function(){
  var iter = this[ITER]
    , keys = iter.k
    , key;
  if(keys == undefined){
    iter.k = keys = [];
    for(key in iter.o)keys.push(key);
  }
  do {
    if(iter.i >= keys.length)return step(1);
  } while(!((key = keys[iter.i++]) in iter.o));
  return step(0, key);
});

var reflect = {
  // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(target, thisArgument, argumentsList);
  },
  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
  construct: function construct(target, argumentsList /*, newTarget*/){
    var proto    = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype
      , instance = $.create(isObject(proto) ? proto : Object.prototype)
      , result   = _apply.call(target, instance, argumentsList);
    return isObject(result) ? result : instance;
  },
  // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
  defineProperty: function defineProperty(target, propertyKey, attributes){
    assertObject(target);
    try {
      $.setDesc(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  },
  // 26.1.4 Reflect.deleteProperty(target, propertyKey)
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = $.getDesc(assertObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  },
  // 26.1.6 Reflect.get(target, propertyKey [, receiver])
  get: function get(target, propertyKey/*, receiver*/){
    var receiver = arguments.length < 3 ? target : arguments[2]
      , desc = $.getDesc(assertObject(target), propertyKey), proto;
    if(desc)return $.has(desc, 'value')
      ? desc.value
      : desc.get === undefined
        ? undefined
        : desc.get.call(receiver);
    return isObject(proto = getProto(target))
      ? get(proto, propertyKey, receiver)
      : undefined;
  },
  // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return $.getDesc(assertObject(target), propertyKey);
  },
  // 26.1.8 Reflect.getPrototypeOf(target)
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(assertObject(target));
  },
  // 26.1.9 Reflect.has(target, propertyKey)
  has: function has(target, propertyKey){
    return propertyKey in target;
  },
  // 26.1.10 Reflect.isExtensible(target)
  isExtensible: function isExtensible(target){
    return _isExtensible(assertObject(target));
  },
  // 26.1.11 Reflect.ownKeys(target)
  ownKeys: require('./$.own-keys'),
  // 26.1.12 Reflect.preventExtensions(target)
  preventExtensions: function preventExtensions(target){
    assertObject(target);
    try {
      if(_preventExtensions)_preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  },
  // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
  set: function set(target, propertyKey, V/*, receiver*/){
    var receiver = arguments.length < 4 ? target : arguments[3]
      , ownDesc  = $.getDesc(assertObject(target), propertyKey)
      , existingDescriptor, proto;
    if(!ownDesc){
      if(isObject(proto = getProto(target))){
        return set(proto, propertyKey, V, receiver);
      }
      ownDesc = $.desc(0);
    }
    if($.has(ownDesc, 'value')){
      if(ownDesc.writable === false || !isObject(receiver))return false;
      existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
      existingDescriptor.value = V;
      $.setDesc(receiver, propertyKey, existingDescriptor);
      return true;
    }
    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
  }
};
// 26.1.14 Reflect.setPrototypeOf(target, proto)
if(setProto)reflect.setPrototypeOf = function setPrototypeOf(target, proto){
  setProto.check(target, proto);
  try {
    setProto.set(target, proto);
    return true;
  } catch(e){
    return false;
  }
};

$def($def.G, {Reflect: {}});

$def($def.S + $def.F * buggyEnumerate, 'Reflect', {
  // 26.1.5 Reflect.enumerate(target)
  enumerate: function enumerate(target){
    return new Enumerate(assertObject(target));
  }
});

$def($def.S, 'Reflect', reflect);
},{"./$":29,"./$.assert":10,"./$.def":18,"./$.iter":28,"./$.own-keys":32,"./$.set-proto":37,"./$.uid":45,"./$.wks":47}],70:[function(require,module,exports){
var $       = require('./$')
  , cof     = require('./$.cof')
  , $RegExp = $.g.RegExp
  , Base    = $RegExp
  , proto   = $RegExp.prototype
  , re      = /a/g
  // "new" creates a new object
  , CORRECT_NEW = new $RegExp(re) !== re
  // RegExp allows a regex with flags as the pattern
  , ALLOWS_RE_WITH_FLAGS = function(){
    try {
      return $RegExp(re, 'i') == '/a/i';
    } catch(e){ /* empty */ }
  }();
if($.FW && $.DESC){
  if(!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS){
    $RegExp = function RegExp(pattern, flags){
      var patternIsRegExp  = cof(pattern) == 'RegExp'
        , flagsIsUndefined = flags === undefined;
      if(!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)return pattern;
      return CORRECT_NEW
        ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags)
        : new Base(patternIsRegExp ? pattern.source : pattern
          , patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
    };
    $.each.call($.getNames(Base), function(key){
      key in $RegExp || $.setDesc($RegExp, key, {
        configurable: true,
        get: function(){ return Base[key]; },
        set: function(it){ Base[key] = it; }
      });
    });
    proto.constructor = $RegExp;
    $RegExp.prototype = proto;
    require('./$.redef')($.g, 'RegExp', $RegExp);
  }
  // 21.2.5.3 get RegExp.prototype.flags()
  if(/./g.flags != 'g')$.setDesc(proto, 'flags', {
    configurable: true,
    get: require('./$.replacer')(/^.*\/(\w*)$/, '$1')
  });
}
require('./$.species')($RegExp);
},{"./$":29,"./$.cof":12,"./$.redef":34,"./$.replacer":35,"./$.species":39}],71:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.2 Set Objects
require('./$.collection')('Set', function(get){
  return function Set(){ return get(this, arguments[0]); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":16,"./$.collection-strong":13}],72:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $at  = require('./$.string-at')(false);
$def($def.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./$.def":18,"./$.string-at":40}],73:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , cof  = require('./$.cof')
  , $def = require('./$.def')
  , toLength = $.toLength;

// should throw error on regex
$def($def.P + $def.F * !require('./$.throws')(function(){ 'q'.endsWith(/./); }), 'String', {
  // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    if(cof(searchString) == 'RegExp')throw TypeError();
    var that = String($.assertDefined(this))
      , endPosition = arguments[1]
      , len = toLength(that.length)
      , end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    searchString += '';
    return that.slice(end - searchString.length, end) === searchString;
  }
});
},{"./$":29,"./$.cof":12,"./$.def":18,"./$.throws":44}],74:[function(require,module,exports){
var $def    = require('./$.def')
  , toIndex = require('./$').toIndex
  , fromCharCode = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res = []
      , len = arguments.length
      , i   = 0
      , code;
    while(len > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./$":29,"./$.def":18}],75:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , cof  = require('./$.cof')
  , $def = require('./$.def');

$def($def.P, 'String', {
  // 21.1.3.7 String.prototype.includes(searchString, position = 0)
  includes: function includes(searchString /*, position = 0 */){
    if(cof(searchString) == 'RegExp')throw TypeError();
    return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
  }
});
},{"./$":29,"./$.cof":12,"./$.def":18}],76:[function(require,module,exports){
var set   = require('./$').set
  , $at   = require('./$.string-at')(true)
  , ITER  = require('./$.uid').safe('iter')
  , $iter = require('./$.iter')
  , step  = $iter.step;

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  set(this, ITER, {o: String(iterated), i: 0});
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , index = iter.i
    , point;
  if(index >= O.length)return step(1);
  point = $at(O, index);
  iter.i += point.length;
  return step(0, point);
});
},{"./$":29,"./$.iter":28,"./$.iter-define":26,"./$.string-at":40,"./$.uid":45}],77:[function(require,module,exports){
var $    = require('./$')
  , $def = require('./$.def');

$def($def.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl = $.toObject(callSite.raw)
      , len = $.toLength(tpl.length)
      , sln = arguments.length
      , res = []
      , i   = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < sln)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"./$":29,"./$.def":18}],78:[function(require,module,exports){
var $def = require('./$.def');

$def($def.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./$.string-repeat')
});
},{"./$.def":18,"./$.string-repeat":42}],79:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , cof  = require('./$.cof')
  , $def = require('./$.def');

// should throw error on regex
$def($def.P + $def.F * !require('./$.throws')(function(){ 'q'.startsWith(/./); }), 'String', {
  // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
  startsWith: function startsWith(searchString /*, position = 0 */){
    if(cof(searchString) == 'RegExp')throw TypeError();
    var that  = String($.assertDefined(this))
      , index = $.toLength(Math.min(arguments[1], that.length));
    searchString += '';
    return that.slice(index, index + searchString.length) === searchString;
  }
});
},{"./$":29,"./$.cof":12,"./$.def":18,"./$.throws":44}],80:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $        = require('./$')
  , setTag   = require('./$.cof').set
  , uid      = require('./$.uid')
  , shared   = require('./$.shared')
  , $def     = require('./$.def')
  , $redef   = require('./$.redef')
  , keyOf    = require('./$.keyof')
  , enumKeys = require('./$.enum-keys')
  , assertObject = require('./$.assert').obj
  , ObjectProto = Object.prototype
  , DESC     = $.DESC
  , has      = $.has
  , $create  = $.create
  , getDesc  = $.getDesc
  , setDesc  = $.setDesc
  , desc     = $.desc
  , $names   = require('./$.get-names')
  , getNames = $names.get
  , toObject = $.toObject
  , $Symbol  = $.g.Symbol
  , setter   = false
  , TAG      = uid('tag')
  , HIDDEN   = uid('hidden')
  , _propertyIsEnumerable = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols = shared('symbols')
  , useNative = $.isFunction($Symbol);

var setSymbolDesc = DESC ? function(){ // fallback for old Android
  try {
    return $create(setDesc({}, HIDDEN, {
      get: function(){
        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
      }
    }))[HIDDEN] || setDesc;
  } catch(e){
    return function(it, key, D){
      var protoDesc = getDesc(ObjectProto, key);
      if(protoDesc)delete ObjectProto[key];
      setDesc(it, key, D);
      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
    };
  }
}() : setDesc;

function wrap(tag){
  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
  DESC && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, desc(1, value));
    }
  });
  return sym;
}

function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = $create(D, {enumerable: desc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
}
function defineProperties(it, P){
  assertObject(it);
  var keys = enumKeys(P = toObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)defineProperty(it, key = keys[i++], P[key]);
  return it;
}
function create(it, P){
  return P === undefined ? $create(it) : defineProperties($create(it), P);
}
function propertyIsEnumerable(key){
  var E = _propertyIsEnumerable.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
}
function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
}
function getOwnPropertyNames(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
}
function getOwnPropertySymbols(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
}

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments[0]));
  };
  $redef($Symbol.prototype, 'toString', function(){
    return this[TAG];
  });

  $.create     = create;
  $.setDesc    = defineProperty;
  $.getDesc    = getOwnPropertyDescriptor;
  $.setDescs   = defineProperties;
  $.getNames   = $names.get = getOwnPropertyNames;
  $.getSymbols = getOwnPropertySymbols;

  if($.DESC && $.FW)$redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
    'species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), function(it){
    var sym = require('./$.wks')(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  }
);

setter = true;

$def($def.G + $def.W, {Symbol: $Symbol});

$def($def.S, 'Symbol', symbolStatics);

$def($def.S + $def.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: getOwnPropertySymbols
});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setTag($.g.JSON, 'JSON', true);
},{"./$":29,"./$.assert":10,"./$.cof":12,"./$.def":18,"./$.enum-keys":20,"./$.get-names":23,"./$.keyof":30,"./$.redef":34,"./$.shared":38,"./$.uid":45,"./$.wks":47}],81:[function(require,module,exports){
'use strict';
var $         = require('./$')
  , weak      = require('./$.collection-weak')
  , leakStore = weak.leakStore
  , ID        = weak.ID
  , WEAK      = weak.WEAK
  , has       = $.has
  , isObject  = $.isObject
  , isExtensible = Object.isExtensible || isObject
  , tmp       = {};

// 23.3 WeakMap Objects
var $WeakMap = require('./$.collection')('WeakMap', function(get){
  return function WeakMap(){ return get(this, arguments[0]); };
}, {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      if(!isExtensible(key))return leakStore(this).get(key);
      if(has(key, WEAK))return key[WEAK][this[ID]];
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
}, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  $.each.call(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    require('./$.redef')(proto, key, function(a, b){
      // store frozen objects on leaky map
      if(isObject(a) && !isExtensible(a)){
        var result = leakStore(this)[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./$":29,"./$.collection":16,"./$.collection-weak":15,"./$.redef":34}],82:[function(require,module,exports){
'use strict';
var weak = require('./$.collection-weak');

// 23.4 WeakSet Objects
require('./$.collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments[0]); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./$.collection":16,"./$.collection-weak":15}],83:[function(require,module,exports){
'use strict';
var $def      = require('./$.def')
  , $includes = require('./$.array-includes')(true);
$def($def.P, 'Array', {
  // https://github.com/domenic/Array.prototype.includes
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments[1]);
  }
});
require('./$.unscope')('includes');
},{"./$.array-includes":8,"./$.def":18,"./$.unscope":46}],84:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
require('./$.collection-to-json')('Map');
},{"./$.collection-to-json":14}],85:[function(require,module,exports){
// https://gist.github.com/WebReflection/9353781
var $       = require('./$')
  , $def    = require('./$.def')
  , ownKeys = require('./$.own-keys');

$def($def.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O      = $.toObject(object)
      , result = {};
    $.each.call(ownKeys(O), function(key){
      $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
    });
    return result;
  }
});
},{"./$":29,"./$.def":18,"./$.own-keys":32}],86:[function(require,module,exports){
// http://goo.gl/XkBrjD
var $    = require('./$')
  , $def = require('./$.def');
function createObjectToArray(isEntries){
  return function(object){
    var O      = $.toObject(object)
      , keys   = $.getKeys(O)
      , length = keys.length
      , i      = 0
      , result = Array(length)
      , key;
    if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
    else while(length > i)result[i] = O[keys[i++]];
    return result;
  };
}
$def($def.S, 'Object', {
  values:  createObjectToArray(false),
  entries: createObjectToArray(true)
});
},{"./$":29,"./$.def":18}],87:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $def = require('./$.def');
$def($def.S, 'RegExp', {
  escape: require('./$.replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&', true)
});

},{"./$.def":18,"./$.replacer":35}],88:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
require('./$.collection-to-json')('Set');
},{"./$.collection-to-json":14}],89:[function(require,module,exports){
// https://github.com/mathiasbynens/String.prototype.at
'use strict';
var $def = require('./$.def')
  , $at  = require('./$.string-at')(true);
$def($def.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./$.def":18,"./$.string-at":40}],90:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $pad = require('./$.string-pad');
$def($def.P, 'String', {
  lpad: function lpad(n){
    return $pad(this, n, arguments[1], true);
  }
});
},{"./$.def":18,"./$.string-pad":41}],91:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $pad = require('./$.string-pad');
$def($def.P, 'String', {
  rpad: function rpad(n){
    return $pad(this, n, arguments[1], false);
  }
});
},{"./$.def":18,"./$.string-pad":41}],92:[function(require,module,exports){
// JavaScript 1.6 / Strawman array statics shim
var $       = require('./$')
  , $def    = require('./$.def')
  , $Array  = $.core.Array || Array
  , statics = {};
function setStatics(keys, length){
  $.each.call(keys.split(','), function(key){
    if(length == undefined && key in $Array)statics[key] = $Array[key];
    else if(key in [])statics[key] = require('./$.ctx')(Function.call, [][key], length);
  });
}
setStatics('pop,reverse,shift,keys,values,entries', 1);
setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
           'reduce,reduceRight,copyWithin,fill,turn');
$def($def.S, 'Array', statics);
},{"./$":29,"./$.ctx":17,"./$.def":18}],93:[function(require,module,exports){
require('./es6.array.iterator');
var $           = require('./$')
  , Iterators   = require('./$.iter').Iterators
  , ITERATOR    = require('./$.wks')('iterator')
  , ArrayValues = Iterators.Array
  , NL          = $.g.NodeList
  , HTC         = $.g.HTMLCollection
  , NLProto     = NL && NL.prototype
  , HTCProto    = HTC && HTC.prototype;
if($.FW){
  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
}
Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;
},{"./$":29,"./$.iter":28,"./$.wks":47,"./es6.array.iterator":54}],94:[function(require,module,exports){
var $def  = require('./$.def')
  , $task = require('./$.task');
$def($def.G + $def.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./$.def":18,"./$.task":43}],95:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var $         = require('./$')
  , $def      = require('./$.def')
  , invoke    = require('./$.invoke')
  , partial   = require('./$.partial')
  , navigator = $.g.navigator
  , MSIE      = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
function wrap(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      $.isFunction(fn) ? fn : Function(fn)
    ), time);
  } : set;
}
$def($def.G + $def.B + $def.F * MSIE, {
  setTimeout:  wrap($.g.setTimeout),
  setInterval: wrap($.g.setInterval)
});
},{"./$":29,"./$.def":18,"./$.invoke":24,"./$.partial":33}],96:[function(require,module,exports){
require('./modules/es5');
require('./modules/es6.symbol');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.object.statics-accept-primitives');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.number.constructor');
require('./modules/es6.number.statics');
require('./modules/es6.math');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.iterator');
require('./modules/es6.array.species');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.regexp');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.reflect');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.lpad');
require('./modules/es7.string.rpad');
require('./modules/es7.regexp.escape');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.to-array');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/js.array.statics');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/$').core;

},{"./modules/$":29,"./modules/es5":48,"./modules/es6.array.copy-within":49,"./modules/es6.array.fill":50,"./modules/es6.array.find":52,"./modules/es6.array.find-index":51,"./modules/es6.array.from":53,"./modules/es6.array.iterator":54,"./modules/es6.array.of":55,"./modules/es6.array.species":56,"./modules/es6.function.has-instance":57,"./modules/es6.function.name":58,"./modules/es6.map":59,"./modules/es6.math":60,"./modules/es6.number.constructor":61,"./modules/es6.number.statics":62,"./modules/es6.object.assign":63,"./modules/es6.object.is":64,"./modules/es6.object.set-prototype-of":65,"./modules/es6.object.statics-accept-primitives":66,"./modules/es6.object.to-string":67,"./modules/es6.promise":68,"./modules/es6.reflect":69,"./modules/es6.regexp":70,"./modules/es6.set":71,"./modules/es6.string.code-point-at":72,"./modules/es6.string.ends-with":73,"./modules/es6.string.from-code-point":74,"./modules/es6.string.includes":75,"./modules/es6.string.iterator":76,"./modules/es6.string.raw":77,"./modules/es6.string.repeat":78,"./modules/es6.string.starts-with":79,"./modules/es6.symbol":80,"./modules/es6.weak-map":81,"./modules/es6.weak-set":82,"./modules/es7.array.includes":83,"./modules/es7.map.to-json":84,"./modules/es7.object.get-own-property-descriptors":85,"./modules/es7.object.to-array":86,"./modules/es7.regexp.escape":87,"./modules/es7.set.to-json":88,"./modules/es7.string.at":89,"./modules/es7.string.lpad":90,"./modules/es7.string.rpad":91,"./modules/js.array.statics":92,"./modules/web.dom.iterable":93,"./modules/web.immediate":94,"./modules/web.timers":95}],97:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);

    generator._invoke = makeInvokeMethod(
      innerFn, self || null,
      new Context(tryLocsList || [])
    );

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {
            result.value = unwrapped;
            return result;
          }, invokeThrow);
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      var enqueueResult =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(function() {
          return invoke(method, arg);
        }) : new Promise(function(resolve) {
          resolve(invoke(method, arg));
        });

      // Avoid propagating enqueueResult failures to Promises returned by
      // later invocations of the iterator, and call generator.return() to
      // allow the generator a chance to clean up.
      previousPromise = enqueueResult["catch"](invokeReturn);

      return enqueueResult;
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            delete context.sent;
          }

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset();
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function() {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      // Pre-initialize at least 20 temporary variables to enable hidden
      // class optimizations for simple generators.
      for (var tempIndex = 0, tempName;
           hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20;
           ++tempIndex) {
        this[tempName] = null;
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":101}],98:[function(require,module,exports){
module.exports = require("./lib/babel/polyfill");

},{"./lib/babel/polyfill":6}],99:[function(require,module,exports){
module.exports = require("babel-core/polyfill");

},{"babel-core/polyfill":98}],100:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":101}],101:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vanMvc3JjL2FwcC5qcyIsIkQ6L2luZXQvaGVyb2t1L0phc29uUnVzaHRvbi9qcy9zcmMvaGVhZGVyLWFuY2hvcnMuanMiLCJEOi9pbmV0L2hlcm9rdS9KYXNvblJ1c2h0b24vanMvc3JjL25hdmJhci5qcyIsIkQ6L2luZXQvaGVyb2t1L0phc29uUnVzaHRvbi9qcy9zcmMvbm9zcGFtLmpzIiwiRDovaW5ldC9oZXJva3UvSmFzb25SdXNodG9uL2pzL3NyYy9wYXJhLWZhZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbGliL2JhYmVsL3BvbHlmaWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL2xpYi9iYWJlbC90b29scy9wcm90ZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuYXJyYXktbWV0aG9kcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuYXNzZXJ0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmNvZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi1zdHJvbmcuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmNvbGxlY3Rpb24tdG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi13ZWFrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jb2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jdHguanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmRlZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZW51bS1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5mb3Itb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmZ3LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5nZXQtbmFtZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmludm9rZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXRlci1jYWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLml0ZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5rZXlvZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQubWl4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5vd24ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucGFydGlhbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucmVkZWYuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnJlcGxhY2VyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zYW1lLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zZXQtcHJvdG8uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnNoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctcGFkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctcmVwZWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50YXNrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50aHJvd3MuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnVpZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQudW5zY29wZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQud2tzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM1LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmNvcHktd2l0aGluLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbGwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkub2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnN0YXRpY3MuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnN0YXRpY3MtYWNjZXB0LXByaW1pdGl2ZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnNldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuY29kZS1wb2ludC1hdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZW5kcy13aXRoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmF3LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnN0YXJ0cy13aXRoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLW1hcC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLXNldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5hcnJheS5pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5tYXAudG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QudG8tYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVnZXhwLmVzY2FwZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zZXQudG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcuYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLmxwYWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnJwYWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9qcy5hcnJheS5zdGF0aWNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5pbW1lZGlhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudGltZXJzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsL25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL3NoaW0uanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvcG9seWZpbGwuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvcG9seWZpbGwuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSxZQUFZLENBQUM7O0FBRWIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7O0FBRTFCLElBQU0sQ0FBQyxHQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFHaEMsQ0FBQyxDQUFDLFlBQVc7OztBQUdULEtBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7QUFNdkMsUUFBSSxJQUFJLEdBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLEVBQzFDLElBQUksR0FBRyxFQUFFLENBQ1osQ0FBQyxDQUFDOzs7O0FBTUgsV0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDN0MsV0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7OztBQUc1QixXQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsV0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7QUFHbEUsS0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFXO0FBQzNCLFlBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQixZQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUUxQixXQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztLQUN4QixDQUFDLENBQUM7Q0FFTixDQUFDLENBQUM7Ozs7O0FDekNILFlBQVksQ0FBQzs7O0FBSWIsTUFBTSxDQUFDLE9BQU8sR0FBSSxDQUFBLFlBQVc7QUFDekIsS0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBSztBQUNoRCxZQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEIsWUFBSSxFQUFFLEdBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFekIsWUFBSSxPQUFPLEdBQUcsQ0FBQyxvQ0FBa0MsRUFBRSw0QkFBeUIsQ0FBQztBQUM3RSxZQUFJLE9BQU8sR0FBRyxBQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQzFCLEdBQUcsR0FDSCxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUdoQyxlQUFPLENBQ0YsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUN6QixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekIsQ0FBQyxDQUFDO0NBQ04sQ0FBQSxFQUFFLEFBQUMsQ0FBQzs7OztBQ25CTCxZQUFZLENBQUM7O0FBRWIsSUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUc1QixNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVMsSUFBSSxFQUFFOzs7QUFHNUIsUUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLFFBQU0sUUFBUSxHQUFJLEdBQUcsQ0FBQzs7QUFFdEIsUUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2pDLFFBQUksT0FBTyxHQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUMsUUFBSSxLQUFLLEdBQVEsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFMUMsUUFBSSxRQUFRLEdBQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUNyQyxRQUFJLFNBQVMsR0FBTSxLQUFLLENBQUM7O0FBRXpCLFdBQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ25DLFNBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztBQUc1QixhQUFTLGFBQWEsQ0FBQyxTQUFTLEVBQUU7QUFDOUIsWUFBTSxhQUFhLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUMxQyxZQUFNLGFBQWEsR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzVDLFlBQU0sVUFBVSxHQUFJLGFBQWEsSUFBSSxhQUFhLENBQUM7O0FBRW5ELFlBQUksQ0FBQyxTQUFTLElBQUksVUFBVSxFQUFFO0FBQzFCLG1CQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVCLHFCQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3BCLE1BQ0ksSUFBSSxTQUFTLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDL0IsbUJBQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IscUJBQVMsR0FBRyxLQUFLLENBQUM7U0FDckI7S0FDSjs7QUFHRCxhQUFTLGFBQWEsR0FBRztBQUNyQixZQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUU1QyxZQUFJLFNBQVMsRUFBRTtBQUNYLG9CQUFRLEVBQUUsQ0FBQztTQUNkLE1BQ0k7QUFDRCxvQkFBUSxFQUFFLENBQUM7U0FDZDtLQUNKOztBQUVELGFBQVMsUUFBUSxHQUFHO0FBQ2hCLGVBQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDM0IsYUFBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM3Qjs7QUFFRCxhQUFTLFFBQVEsR0FBRztBQUNoQixlQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlCLGFBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDaEM7O0FBSUQsYUFBUyxTQUFTLEdBQUc7QUFDakIsWUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7QUFFaEUscUJBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM1Qjs7QUFLRCxRQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBVTtBQUM3QixnQkFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7O0FBRTdCLGlCQUFTLEVBQUUsQ0FBQztLQUNmLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRWYsYUFBUyxFQUFFLENBQUM7O0FBRVosUUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLENBQUMsQ0FBQztDQUN6QyxDQUFDOzs7OztBQy9FRixZQUFZLENBQUM7O0FBRWIsU0FBUyxNQUFNLENBQUMsUUFBUSxFQUFFO0FBQ3RCLFFBQU0sSUFBSSxHQUFHLE9BQU8sRUFBRSxDQUFDOztBQUV2QixLQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBSztBQUN4QixZQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRWhCLFdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtBQUNyQixnQkFBSSxjQUFhLElBQUksQUFBRztBQUN4QixnQkFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUU7U0FDbkIsQ0FBQyxDQUFDLENBQUM7S0FDUCxDQUFDLENBQUM7Q0FDTjs7QUFJRCxTQUFTLE9BQU8sR0FBRztBQUNmLFFBQU0sR0FBRyxHQUFJLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoRCxRQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUV2RSxXQUFPLElBQUksQ0FBQztDQUNmOztBQUdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOzs7QUN6QnhCLFlBQVksQ0FBQzs7QUFHYixNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVMsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7QUFDbEQsUUFBSSxVQUFVLElBQUksUUFBUSxFQUFFO0FBQ3hCLFlBQU0sVUFBVSxHQUFNLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7QUFDOUMsWUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztBQUc3RSxZQUFJLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztLQUN4RjtDQUNKLENBQUM7O0FBSUYsU0FBUyxRQUFRLENBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUU7QUFDcEQsUUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7QUFFaEUsUUFBSSxTQUFTLElBQUksVUFBVSxFQUFFO0FBQ3pCLGdCQUFRLENBQUMsR0FBRyxDQUFDO0FBQ1Qsb0JBQVEsRUFBRSxFQUFFO0FBQ1osZUFBRyxFQUFPLEVBQUU7QUFDWixtQkFBTyxFQUFHLENBQUM7U0FDZCxDQUFDLENBQUM7S0FDTixNQUNJO0FBQ0QsWUFBTSxlQUFlLEdBQUcsU0FBUyxHQUFHLFVBQVUsQ0FBQztBQUMvQyxZQUFNLE9BQU8sR0FBVyxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUEsR0FBSSxhQUFhLENBQUM7O0FBRXBFLGdCQUFRLENBQUMsR0FBRyxDQUFDO0FBQ1Qsb0JBQVEsRUFBRSxVQUFVO0FBQ3BCLGVBQUcsRUFBTyxlQUFlLEdBQUcsQ0FBQztBQUM3QixtQkFBTyxFQUFHLE9BQU87U0FDcEIsQ0FBQyxDQUFDO0tBQ047Q0FDSjs7OztBQ25DRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0bkJBO0FBQ0E7O0FDREE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJ2JhYmVsL3BvbHlmaWxsJyk7XHJcblxyXG5jb25zdCBfICAgICA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gM3JkIHBhcnR5IGpxdWVyeSBwbHVnaW5zXHJcbiAgICAkKCcubGlnaHRib3hlZCcpLmZlYXRoZXJsaWdodCgnaW1hZ2UnKTtcclxuXHJcblxyXG5cclxuICAgIC8vIGNyZWF0ZSBhIHRocm90dGxlZFNjcm9sbCBldmVudCBvbiB0aGUgd2luZG93IGxpbWl0ZWQgdG8gMzAgY2FsbHMgcGVyIHNlY29uZFxyXG5cclxuICAgIGxldCAkd2luICA9ICQod2luZG93KTtcclxuICAgICR3aW4uc2Nyb2xsKF8udGhyb3R0bGUoXHJcbiAgICAgICAgJHdpbi50cmlnZ2VyLmJpbmQoJHdpbiwgJ3Rocm90dGxlZFNjcm9sbCcpLFxyXG4gICAgICAgIDEwMDAgLyAzMFxyXG4gICAgKSk7XHJcblxyXG5cclxuXHJcbiAgICAvLyBjdXN0b20ganMgbW9kdWxlc1xyXG5cclxuICAgIHJlcXVpcmUoJy4vbm9zcGFtJykoJy5ub3NwYW0tZW1haWwtYWRkcmVzcycpO1xyXG4gICAgcmVxdWlyZSgnLi9oZWFkZXItYW5jaG9ycycpO1xyXG4gICAgLy8gcmVxdWlyZSgnLi9ib290c3RyYXAtZml4ZXMnKTtcclxuXHJcbiAgICByZXF1aXJlKCcuL25hdmJhcicpKCR3aW4pO1xyXG4gICAgcmVxdWlyZSgnLi9wYXJhLWZhZGUnKSgkd2luLCAkKCcjd2VsY29tZScpLCAkKCcjd2VsY29tZSBoZWFkZXInKSk7XHJcblxyXG5cclxuICAgICQoJy5pbWctbGF6eScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRlbCA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IHNyYyA9ICRlbC5kYXRhKCdzcmMnKTtcclxuXHJcbiAgICAgICAgJGVsLmF0dHIoJ3NyYycsIHNyYyk7XHJcbiAgICB9KTtcclxuXHJcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG4vLyBwcmVwZW5kIHRhcmdldCBsaW5rcyB0byBoZWFkZXJzXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnOmhlYWRlcltpZF0sIFtpZF06aGFzKDpoZWFkZXIpJykuZWFjaCgoaSwgZWwpID0+IHtcclxuICAgICAgICBsZXQgJGVsID0gJChlbCk7XHJcbiAgICAgICAgbGV0IGlkICA9ICRlbC5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgICBsZXQgJGFuY2hvciA9ICQoYDxhIGNsYXNzPVwiYW5jaG9yLWxpbmtcIiBocmVmPVwiIyR7aWR9XCI+PGkgY2xhc3M9XCJmYVwiIC8+PC9hPmApO1xyXG4gICAgICAgIGxldCAkaGVhZGVyID0gKCRlbC5pcygnOmhlYWRlcicpKVxyXG4gICAgICAgICAgICA/ICRlbFxyXG4gICAgICAgICAgICA6ICRlbC5maW5kKCc6aGVhZGVyOmZpcnN0Jyk7XHJcblxyXG5cclxuICAgICAgICAkaGVhZGVyXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYW5jaG9yLXRhcmdldCcpXHJcbiAgICAgICAgICAgIC5wcmVwZW5kKCRhbmNob3IpO1xyXG4gICAgfSk7XHJcbn0oKSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHdpbikge1xyXG4gICAgLy8gbGV0ICRuYXYyID0gJCgnI25hdmJhcjInKTtcclxuXHJcbiAgICBjb25zdCBuYXZIZWlnaHQgPSA2MDtcclxuICAgIGNvbnN0IG1pbldpZHRoICA9IDc2ODtcclxuXHJcbiAgICBsZXQgJGhhbWJ1cmdlciA9ICQoJyNoYW1idXJnZXInKTtcclxuICAgIGxldCAkdG9nZ2xlICAgID0gJGhhbWJ1cmdlci5maW5kKCcudG9nZ2xlJyk7XHJcbiAgICBsZXQgJG1lbnUgICAgICA9ICRoYW1idXJnZXIuZmluZCgnLm1lbnUnKTtcclxuXHJcbiAgICBsZXQgd2luV2lkdGggICAgID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICBsZXQgaXNWaXNpYmxlICAgID0gZmFsc2U7XHJcblxyXG4gICAgJHRvZ2dsZS5vbignY2xpY2snLCB0b2dnbGVUb2dnbGVyKTtcclxuICAgICRtZW51Lm9uKCdjbGljaycsIGhpZGVNZW51KTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gZW5hYmxlVG9nZ2xlcih3aW5TY3JvbGwpIHtcclxuICAgICAgICBjb25zdCBpc1NtYWxsV2luZG93ID0gd2luV2lkdGggPCBtaW5XaWR0aDtcclxuICAgICAgICBjb25zdCBpc1dpblNjcm9sbGVkID0gd2luU2Nyb2xsID4gbmF2SGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHNob3VsZFNob3cgID0gaXNTbWFsbFdpbmRvdyB8fCBpc1dpblNjcm9sbGVkO1xyXG5cclxuICAgICAgICBpZiAoIWlzVmlzaWJsZSAmJiBzaG91bGRTaG93KSB7XHJcbiAgICAgICAgICAgICR0b2dnbGUuYWRkQ2xhc3MoJ2VuYWJsZWQnKTtcclxuICAgICAgICAgICAgaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaXNWaXNpYmxlICYmICFzaG91bGRTaG93KSB7XHJcbiAgICAgICAgICAgICR0b2dnbGUucmVtb3ZlQ2xhc3MoJ2VuYWJsZWQnKTtcclxuICAgICAgICAgICAgaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVUb2dnbGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9ICRtZW51Lmhhc0NsYXNzKCdlbmFibGVkJyk7XHJcblxyXG4gICAgICAgIGlmIChpc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgaGlkZU1lbnUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNob3dNZW51KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dNZW51KCkge1xyXG4gICAgICAgICR0b2dnbGUuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICRtZW51LmFkZENsYXNzKCdlbmFibGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZU1lbnUoKSB7XHJcbiAgICAgICAgJHRvZ2dsZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoJ2VuYWJsZWQnKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIG5hdlNsaWRlcigpIHtcclxuICAgICAgICBjb25zdCB3aW5TY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XHJcblxyXG4gICAgICAgIGVuYWJsZVRvZ2dsZXIod2luU2Nyb2xsKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAkd2luLnJlc2l6ZShfLnRocm90dGxlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgbmF2U2xpZGVyKCk7XHJcbiAgICB9LCAxMDAwIC8gNjApKTtcclxuXHJcbiAgICBuYXZTbGlkZXIoKTtcclxuXHJcbiAgICAkd2luLm9uKCd0aHJvdHRsZWRTY3JvbGwnLCBuYXZTbGlkZXIpO1xyXG59OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIG5vc3BhbShzZWxlY3Rvcikge1xyXG4gICAgY29uc3QgYWRkciA9IGdldEFkZHIoKTtcclxuXHJcbiAgICAkKHNlbGVjdG9yKS5lYWNoKChpLCBlbCkgPT4ge1xyXG4gICAgICAgIGxldCAkZWwgPSAkKGVsKTtcclxuXHJcbiAgICAgICAgJGVsLnJlcGxhY2VXaXRoKCQoJzxhPicsIHtcclxuICAgICAgICAgICAgaHJlZjogKGBtYWlsdG86JHthZGRyfWApLFxyXG4gICAgICAgICAgICBodG1sOiAkZWwuaHRtbCgpLFxyXG4gICAgICAgIH0pKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEFkZHIoKSB7XHJcbiAgICBjb25zdCBzcmMgID0gJ0AgamFzb24gcnVzaHRvbiBjb20gLicuc3BsaXQoJyAnKTtcclxuICAgIGNvbnN0IGFkZHIgPSBbc3JjWzFdLCBzcmNbMF0sIHNyY1sxXSwgc3JjWzJdLCBzcmNbNF0sIHNyY1szXV0uam9pbignJyk7XHJcblxyXG4gICAgcmV0dXJuIGFkZHI7XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5vc3BhbTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHdpbiwgJGNvbnRhaW5lciwgJGNvbnRlbnQpIHtcclxuICAgIGlmICgkY29udGFpbmVyICYmICRjb250ZW50KSB7XHJcbiAgICAgICAgY29uc3QgY29udGVudFRvcCAgICA9ICRjb250YWluZXIub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRCb3R0b20gPSAkY29udGFpbmVyLm9mZnNldCgpLnRvcCArICRjb250YWluZXIub3V0ZXJIZWlnaHQoKSArIDE7XHJcblxyXG5cclxuICAgICAgICAkd2luLm9uKCd0aHJvdHRsZWRTY3JvbGwnLCBvblNjcm9sbC5iaW5kKG51bGwsICRjb250ZW50LCBjb250ZW50VG9wLCBjb250ZW50Qm90dG9tKSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIG9uU2Nyb2xsICgkY29udGVudCwgY29udGVudFRvcCwgY29udGVudEJvdHRvbSkge1xyXG4gICAgY29uc3Qgd2luU2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG5cclxuICAgIGlmICh3aW5TY3JvbGwgPD0gY29udGVudFRvcCkge1xyXG4gICAgICAgICRjb250ZW50LmNzcyh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnJyxcclxuICAgICAgICAgICAgdG9wICAgICA6ICcnLFxyXG4gICAgICAgICAgICBvcGFjaXR5IDogMSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRTY3JvbGxlZCA9IHdpblNjcm9sbCAtIGNvbnRlbnRUb3A7XHJcbiAgICAgICAgY29uc3Qgb3BhY2l0eSAgICAgICAgID0gKGNvbnRlbnRCb3R0b20gLSB3aW5TY3JvbGwpIC8gY29udGVudEJvdHRvbTtcclxuXHJcbiAgICAgICAgJGNvbnRlbnQuY3NzKHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgIHRvcCAgICAgOiBjb250ZW50U2Nyb2xsZWQgLyAyLFxyXG4gICAgICAgICAgICBvcGFjaXR5IDogb3BhY2l0eSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3Rvb2xzUHJvdGVjdEpzMiA9IHJlcXVpcmUoXCIuL3Rvb2xzL3Byb3RlY3QuanNcIik7XG5cbnZhciBfdG9vbHNQcm90ZWN0SnMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9vbHNQcm90ZWN0SnMyKTtcblxucmVxdWlyZShcImNvcmUtanMvc2hpbVwiKTtcblxucmVxdWlyZShcInJlZ2VuZXJhdG9yL3J1bnRpbWVcIik7XG5cbl90b29sc1Byb3RlY3RKczNbXCJkZWZhdWx0XCJdKG1vZHVsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5pZiAoZ2xvYmFsLl9iYWJlbFBvbHlmaWxsKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIm9ubHkgb25lIGluc3RhbmNlIG9mIGJhYmVsL3BvbHlmaWxsIGlzIGFsbG93ZWRcIik7XG59XG5nbG9iYWwuX2JhYmVsUG9seWZpbGwgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxudmFyIF9wYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5cbnZhciBfcGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXRoKTtcblxudmFyIHJvb3QgPSBfcGF0aDJbXCJkZWZhdWx0XCJdLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uLy4uLy4uL1wiKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gIGlmIChtb2R1bGUucGFyZW50ICYmIG1vZHVsZS5wYXJlbnQuZmlsZW5hbWUuaW5kZXhPZihyb290KSAhPT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkRvbid0IGhvdGxpbmsgaW50ZXJuYWwgQmFiZWwgZmlsZXMuXCIpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9ICQudG9PYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9ICQudG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9ICQudG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4O1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwiLy8gMCAtPiBBcnJheSNmb3JFYWNoXG4vLyAxIC0+IEFycmF5I21hcFxuLy8gMiAtPiBBcnJheSNmaWx0ZXJcbi8vIDMgLT4gQXJyYXkjc29tZVxuLy8gNCAtPiBBcnJheSNldmVyeVxuLy8gNSAtPiBBcnJheSNmaW5kXG4vLyA2IC0+IEFycmF5I2ZpbmRJbmRleFxudmFyICQgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY3R4ID0gcmVxdWlyZSgnLi8kLmN0eCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUWVBFKXtcbiAgdmFyIElTX01BUCAgICAgICAgPSBUWVBFID09IDFcbiAgICAsIElTX0ZJTFRFUiAgICAgPSBUWVBFID09IDJcbiAgICAsIElTX1NPTUUgICAgICAgPSBUWVBFID09IDNcbiAgICAsIElTX0VWRVJZICAgICAgPSBUWVBFID09IDRcbiAgICAsIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDZcbiAgICAsIE5PX0hPTEVTICAgICAgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KXtcbiAgICB2YXIgTyAgICAgID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCgkdGhpcykpXG4gICAgICAsIHNlbGYgICA9ICQuRVM1T2JqZWN0KE8pXG4gICAgICAsIGYgICAgICA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKVxuICAgICAgLCBsZW5ndGggPSAkLnRvTGVuZ3RoKHNlbGYubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSAwXG4gICAgICAsIHJlc3VsdCA9IElTX01BUCA/IEFycmF5KGxlbmd0aCkgOiBJU19GSUxURVIgPyBbXSA6IHVuZGVmaW5lZFxuICAgICAgLCB2YWwsIHJlcztcbiAgICBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpe1xuICAgICAgdmFsID0gc2VsZltpbmRleF07XG4gICAgICByZXMgPSBmKHZhbCwgaW5kZXgsIE8pO1xuICAgICAgaWYoVFlQRSl7XG4gICAgICAgIGlmKElTX01BUClyZXN1bHRbaW5kZXhdID0gcmVzOyAgICAgICAgICAgIC8vIG1hcFxuICAgICAgICBlbHNlIGlmKHJlcylzd2l0Y2goVFlQRSl7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWw7ICAgICAgICAgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHJlc3VsdC5wdXNoKHZhbCk7ICAgICAgICAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZihJU19FVkVSWSlyZXR1cm4gZmFsc2U7ICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XG4gIH07XG59OyIsInZhciAkID0gcmVxdWlyZSgnLi8kJyk7XG5mdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLCBtc2cxLCBtc2cyKXtcbiAgaWYoIWNvbmRpdGlvbil0aHJvdyBUeXBlRXJyb3IobXNnMiA/IG1zZzEgKyBtc2cyIDogbXNnMSk7XG59XG5hc3NlcnQuZGVmID0gJC5hc3NlcnREZWZpbmVkO1xuYXNzZXJ0LmZuID0gZnVuY3Rpb24oaXQpe1xuICBpZighJC5pc0Z1bmN0aW9uKGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuYXNzZXJ0Lm9iaiA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoISQuaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbmFzc2VydC5pbnN0ID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSl0aHJvdyBUeXBlRXJyb3IobmFtZSArIFwiOiB1c2UgdGhlICduZXcnIG9wZXJhdG9yIVwiKTtcbiAgcmV0dXJuIGl0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gYXNzZXJ0OyIsInZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZW51bUtleXMgPSByZXF1aXJlKCcuLyQuZW51bS1rZXlzJyk7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHZhciBUID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCh0YXJnZXQpKVxuICAgICwgbCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGkgPSAxO1xuICB3aGlsZShsID4gaSl7XG4gICAgdmFyIFMgICAgICA9ICQuRVM1T2JqZWN0KGFyZ3VtZW50c1tpKytdKVxuICAgICAgLCBrZXlzICAgPSBlbnVtS2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKVRba2V5ID0ga2V5c1tqKytdXSA9IFNba2V5XTtcbiAgfVxuICByZXR1cm4gVDtcbn07IiwidmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBUQUcgICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKVxuICAsIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5mdW5jdGlvbiBjb2YoaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufVxuY29mLmNsYXNzb2YgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBUO1xuICByZXR1cm4gaXQgPT0gdW5kZWZpbmVkID8gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogJ051bGwnXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVCA6IGNvZihPKTtcbn07XG5jb2Yuc2V0ID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICEkLmhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkkLmhpZGUoaXQsIFRBRywgdGFnKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGNvZjsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGN0eCAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgc2FmZSAgICAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZVxuICAsIGFzc2VydCAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgZm9yT2YgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzdGVwICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyJykuc3RlcFxuICAsICRoYXMgICAgID0gJC5oYXNcbiAgLCBzZXQgICAgICA9ICQuc2V0XG4gICwgaXNPYmplY3QgPSAkLmlzT2JqZWN0XG4gICwgaGlkZSAgICAgPSAkLmhpZGVcbiAgLCBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgSUQgICAgICAgPSBzYWZlKCdpZCcpXG4gICwgTzEgICAgICAgPSBzYWZlKCdPMScpXG4gICwgTEFTVCAgICAgPSBzYWZlKCdsYXN0JylcbiAgLCBGSVJTVCAgICA9IHNhZmUoJ2ZpcnN0JylcbiAgLCBJVEVSICAgICA9IHNhZmUoJ2l0ZXInKVxuICAsIFNJWkUgICAgID0gJC5ERVNDID8gc2FmZSgnc2l6ZScpIDogJ3NpemUnXG4gICwgaWQgICAgICAgPSAwO1xuXG5mdW5jdGlvbiBmYXN0S2V5KGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoISRoYXMoaXQsIElEKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IGlkIHRvIGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIGlkXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG9iamVjdCBpZFxuICAgIGhpZGUoaXQsIElELCArK2lkKTtcbiAgLy8gcmV0dXJuIG9iamVjdCBpZCB3aXRoIHByZWZpeFxuICB9IHJldHVybiAnTycgKyBpdFtJRF07XG59XG5cbmZ1bmN0aW9uIGdldEVudHJ5KHRoYXQsIGtleSl7XG4gIC8vIGZhc3QgY2FzZVxuICB2YXIgaW5kZXggPSBmYXN0S2V5KGtleSksIGVudHJ5O1xuICBpZihpbmRleCAhPT0gJ0YnKXJldHVybiB0aGF0W08xXVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IoZW50cnkgPSB0aGF0W0ZJUlNUXTsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgaWYoZW50cnkuayA9PSBrZXkpcmV0dXJuIGVudHJ5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIGFzc2VydC5pbnN0KHRoYXQsIEMsIE5BTUUpO1xuICAgICAgc2V0KHRoYXQsIE8xLCAkLmNyZWF0ZShudWxsKSk7XG4gICAgICBzZXQodGhhdCwgU0laRSwgMCk7XG4gICAgICBzZXQodGhhdCwgTEFTVCwgdW5kZWZpbmVkKTtcbiAgICAgIHNldCh0aGF0LCBGSVJTVCwgdW5kZWZpbmVkKTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVxdWlyZSgnLi8kLm1peCcpKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0W08xXSwgZW50cnkgPSB0aGF0W0ZJUlNUXTsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYoZW50cnkucCllbnRyeS5wID0gZW50cnkucC5uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmldO1xuICAgICAgICB9XG4gICAgICAgIHRoYXRbRklSU1RdID0gdGhhdFtMQVNUXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0W08xXVtlbnRyeS5pXTtcbiAgICAgICAgICBlbnRyeS5yID0gdHJ1ZTtcbiAgICAgICAgICBpZihwcmV2KXByZXYubiA9IG5leHQ7XG4gICAgICAgICAgaWYobmV4dCluZXh0LnAgPSBwcmV2O1xuICAgICAgICAgIGlmKHRoYXRbRklSU1RdID09IGVudHJ5KXRoYXRbRklSU1RdID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0W0xBU1RdID09IGVudHJ5KXRoYXRbTEFTVF0gPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdLCAzKVxuICAgICAgICAgICwgZW50cnk7XG4gICAgICAgIHdoaWxlKGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhpc1tGSVJTVF0pe1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoJC5ERVNDKSQuc2V0RGVzYyhDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBhc3NlcnQuZGVmKHRoaXNbU0laRV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSlcbiAgICAgICwgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYoZW50cnkpe1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdFtMQVNUXSA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXRbTEFTVF0sICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYoIXRoYXRbRklSU1RdKXRoYXRbRklSU1RdID0gZW50cnk7XG4gICAgICBpZihwcmV2KXByZXYubiA9IGVudHJ5O1xuICAgICAgdGhhdFtTSVpFXSsrO1xuICAgICAgLy8gYWRkIHRvIGluZGV4XG4gICAgICBpZihpbmRleCAhPT0gJ0YnKXRoYXRbTzFdW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgLy8gYWRkIC5rZXlzLCAudmFsdWVzLCAuZW50cmllcywgW0BAaXRlcmF0b3JdXG4gIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgc2V0SXRlcjogZnVuY3Rpb24oQywgTkFNRSwgSVNfTUFQKXtcbiAgICByZXF1aXJlKCcuLyQuaXRlci1kZWZpbmUnKShDLCBOQU1FLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gICAgICBzZXQodGhpcywgSVRFUiwge286IGl0ZXJhdGVkLCBrOiBraW5kfSk7XG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBpdGVyICA9IHRoaXNbSVRFUl1cbiAgICAgICAgLCBraW5kICA9IGl0ZXIua1xuICAgICAgICAsIGVudHJ5ID0gaXRlci5sO1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZighaXRlci5vIHx8ICEoaXRlci5sID0gZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiBpdGVyLm9bRklSU1RdKSl7XG4gICAgICAgIC8vIG9yIGZpbmlzaCB0aGUgaXRlcmF0aW9uXG4gICAgICAgIGl0ZXIubyA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHN0ZXAoMSk7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGVudHJ5LmspO1xuICAgICAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcbiAgICAgIHJldHVybiBzdGVwKDAsIFtlbnRyeS5rLCBlbnRyeS52XSk7XG4gICAgfSwgSVNfTUFQID8gJ2VudHJpZXMnIDogJ3ZhbHVlcycgLCAhSVNfTUFQLCB0cnVlKTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGRlZiAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBmb3JPZiA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSl7XG4gICRkZWYoJGRlZi5QLCBOQU1FLCB7XG4gICAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKXtcbiAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgIGZvck9mKHRoaXMsIGZhbHNlLCBhcnIucHVzaCwgYXJyKTtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgc2FmZSAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmVcbiAgLCBhc3NlcnQgICAgPSByZXF1aXJlKCcuLyQuYXNzZXJ0JylcbiAgLCBmb3JPZiAgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCAkaGFzICAgICAgPSAkLmhhc1xuICAsIGlzT2JqZWN0ICA9ICQuaXNPYmplY3RcbiAgLCBoaWRlICAgICAgPSAkLmhpZGVcbiAgLCBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgaWQgICAgICAgID0gMFxuICAsIElEICAgICAgICA9IHNhZmUoJ2lkJylcbiAgLCBXRUFLICAgICAgPSBzYWZlKCd3ZWFrJylcbiAgLCBMRUFLICAgICAgPSBzYWZlKCdsZWFrJylcbiAgLCBtZXRob2QgICAgPSByZXF1aXJlKCcuLyQuYXJyYXktbWV0aG9kcycpXG4gICwgZmluZCAgICAgID0gbWV0aG9kKDUpXG4gICwgZmluZEluZGV4ID0gbWV0aG9kKDYpO1xuZnVuY3Rpb24gZmluZEZyb3plbihzdG9yZSwga2V5KXtcbiAgcmV0dXJuIGZpbmQoc3RvcmUuYXJyYXksIGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gaXRbMF0gPT09IGtleTtcbiAgfSk7XG59XG4vLyBmYWxsYmFjayBmb3IgZnJvemVuIGtleXNcbmZ1bmN0aW9uIGxlYWtTdG9yZSh0aGF0KXtcbiAgcmV0dXJuIHRoYXRbTEVBS10gfHwgaGlkZSh0aGF0LCBMRUFLLCB7XG4gICAgYXJyYXk6IFtdLFxuICAgIGdldDogZnVuY3Rpb24oa2V5KXtcbiAgICAgIHZhciBlbnRyeSA9IGZpbmRGcm96ZW4odGhpcywga2V5KTtcbiAgICAgIGlmKGVudHJ5KXJldHVybiBlbnRyeVsxXTtcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24oa2V5KXtcbiAgICAgIHJldHVybiAhIWZpbmRGcm96ZW4odGhpcywga2V5KTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICB2YXIgZW50cnkgPSBmaW5kRnJvemVuKHRoaXMsIGtleSk7XG4gICAgICBpZihlbnRyeSllbnRyeVsxXSA9IHZhbHVlO1xuICAgICAgZWxzZSB0aGlzLmFycmF5LnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICB9LFxuICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgICAgdmFyIGluZGV4ID0gZmluZEluZGV4KHRoaXMuYXJyYXksIGZ1bmN0aW9uKGl0KXtcbiAgICAgICAgcmV0dXJuIGl0WzBdID09PSBrZXk7XG4gICAgICB9KTtcbiAgICAgIGlmKH5pbmRleCl0aGlzLmFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZXR1cm4gISF+aW5kZXg7XG4gICAgfVxuICB9KVtMRUFLXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKXtcbiAgICB2YXIgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGhhdCwgaXRlcmFibGUpe1xuICAgICAgJC5zZXQoYXNzZXJ0Lmluc3QodGhhdCwgQywgTkFNRSksIElELCBpZCsrKTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVxdWlyZSgnLi8kLm1peCcpKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4zLjMuMiBXZWFrTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuNC4zLjMgV2Vha1NldC5wcm90b3R5cGUuZGVsZXRlKHZhbHVlKVxuICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIGlmKCFpc09iamVjdChrZXkpKXJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIWlzRXh0ZW5zaWJsZShrZXkpKXJldHVybiBsZWFrU3RvcmUodGhpcylbJ2RlbGV0ZSddKGtleSk7XG4gICAgICAgIHJldHVybiAkaGFzKGtleSwgV0VBSykgJiYgJGhhcyhrZXlbV0VBS10sIHRoaXNbSURdKSAmJiBkZWxldGUga2V5W1dFQUtdW3RoaXNbSURdXTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4zLjMuNCBXZWFrTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuNC4zLjQgV2Vha1NldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KXtcbiAgICAgICAgaWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighaXNFeHRlbnNpYmxlKGtleSkpcmV0dXJuIGxlYWtTdG9yZSh0aGlzKS5oYXMoa2V5KTtcbiAgICAgICAgcmV0dXJuICRoYXMoa2V5LCBXRUFLKSAmJiAkaGFzKGtleVtXRUFLXSwgdGhpc1tJRF0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIGlmKCFpc0V4dGVuc2libGUoYXNzZXJ0Lm9iaihrZXkpKSl7XG4gICAgICBsZWFrU3RvcmUodGhhdCkuc2V0KGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkaGFzKGtleSwgV0VBSykgfHwgaGlkZShrZXksIFdFQUssIHt9KTtcbiAgICAgIGtleVtXRUFLXVt0aGF0W0lEXV0gPSB2YWx1ZTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBsZWFrU3RvcmU6IGxlYWtTdG9yZSxcbiAgV0VBSzogV0VBSyxcbiAgSUQ6IElEXG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBCVUdHWSA9IHJlcXVpcmUoJy4vJC5pdGVyJykuQlVHR1lcbiAgLCBmb3JPZiA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsIHNwZWNpZXMgPSByZXF1aXJlKCcuLyQuc3BlY2llcycpXG4gICwgYXNzZXJ0SW5zdGFuY2UgPSByZXF1aXJlKCcuLyQuYXNzZXJ0JykuaW5zdDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihOQU1FLCB3cmFwcGVyLCBtZXRob2RzLCBjb21tb24sIElTX01BUCwgSVNfV0VBSyl7XG4gIHZhciBCYXNlICA9ICQuZ1tOQU1FXVxuICAgICwgQyAgICAgPSBCYXNlXG4gICAgLCBBRERFUiA9IElTX01BUCA/ICdzZXQnIDogJ2FkZCdcbiAgICAsIHByb3RvID0gQyAmJiBDLnByb3RvdHlwZVxuICAgICwgTyAgICAgPSB7fTtcbiAgZnVuY3Rpb24gZml4TWV0aG9kKEtFWSl7XG4gICAgdmFyIGZuID0gcHJvdG9bS0VZXTtcbiAgICByZXF1aXJlKCcuLyQucmVkZWYnKShwcm90bywgS0VZLFxuICAgICAgS0VZID09ICdkZWxldGUnID8gZnVuY3Rpb24oYSl7IHJldHVybiBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7IH1cbiAgICAgIDogS0VZID09ICdoYXMnID8gZnVuY3Rpb24gaGFzKGEpeyByZXR1cm4gZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpOyB9XG4gICAgICA6IEtFWSA9PSAnZ2V0JyA/IGZ1bmN0aW9uIGdldChhKXsgcmV0dXJuIGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTsgfVxuICAgICAgOiBLRVkgPT0gJ2FkZCcgPyBmdW5jdGlvbiBhZGQoYSl7IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTsgcmV0dXJuIHRoaXM7IH1cbiAgICAgIDogZnVuY3Rpb24gc2V0KGEsIGIpeyBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSwgYik7IHJldHVybiB0aGlzOyB9XG4gICAgKTtcbiAgfVxuICBpZighJC5pc0Z1bmN0aW9uKEMpIHx8ICEoSVNfV0VBSyB8fCAhQlVHR1kgJiYgcHJvdG8uZm9yRWFjaCAmJiBwcm90by5lbnRyaWVzKSl7XG4gICAgLy8gY3JlYXRlIGNvbGxlY3Rpb24gY29uc3RydWN0b3JcbiAgICBDID0gY29tbW9uLmdldENvbnN0cnVjdG9yKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpO1xuICAgIHJlcXVpcmUoJy4vJC5taXgnKShDLnByb3RvdHlwZSwgbWV0aG9kcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGluc3QgID0gbmV3IENcbiAgICAgICwgY2hhaW4gPSBpbnN0W0FEREVSXShJU19XRUFLID8ge30gOiAtMCwgMSlcbiAgICAgICwgYnVnZ3laZXJvO1xuICAgIC8vIHdyYXAgZm9yIGluaXQgY29sbGVjdGlvbnMgZnJvbSBpdGVyYWJsZVxuICAgIGlmKCFyZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgbmV3IEMoaXRlcik7IH0pKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICAgIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRhcmdldCwgaXRlcmFibGUpe1xuICAgICAgICBhc3NlcnRJbnN0YW5jZSh0YXJnZXQsIEMsIE5BTUUpO1xuICAgICAgICB2YXIgdGhhdCA9IG5ldyBCYXNlO1xuICAgICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgIH0pO1xuICAgICAgQy5wcm90b3R5cGUgPSBwcm90bztcbiAgICAgIHByb3RvLmNvbnN0cnVjdG9yID0gQztcbiAgICB9XG4gICAgSVNfV0VBSyB8fCBpbnN0LmZvckVhY2goZnVuY3Rpb24odmFsLCBrZXkpe1xuICAgICAgYnVnZ3laZXJvID0gMSAvIGtleSA9PT0gLUluZmluaXR5O1xuICAgIH0pO1xuICAgIC8vIGZpeCBjb252ZXJ0aW5nIC0wIGtleSB0byArMFxuICAgIGlmKGJ1Z2d5WmVybyl7XG4gICAgICBmaXhNZXRob2QoJ2RlbGV0ZScpO1xuICAgICAgZml4TWV0aG9kKCdoYXMnKTtcbiAgICAgIElTX01BUCAmJiBmaXhNZXRob2QoJ2dldCcpO1xuICAgIH1cbiAgICAvLyArIGZpeCAuYWRkICYgLnNldCBmb3IgY2hhaW5pbmdcbiAgICBpZihidWdneVplcm8gfHwgY2hhaW4gIT09IGluc3QpZml4TWV0aG9kKEFEREVSKTtcbiAgfVxuXG4gIHJlcXVpcmUoJy4vJC5jb2YnKS5zZXQoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRkZWYoJGRlZi5HICsgJGRlZi5XICsgJGRlZi5GICogKEMgIT0gQmFzZSksIE8pO1xuICBzcGVjaWVzKEMpO1xuICBzcGVjaWVzKCQuY29yZVtOQU1FXSk7IC8vIGZvciB3cmFwcGVyXG5cbiAgaWYoIUlTX1dFQUspY29tbW9uLnNldEl0ZXIoQywgTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQztcbn07IiwiLy8gT3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYXNzZXJ0RnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYXNzZXJ0JykuZm47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhc3NlcnRGdW5jdGlvbihmbik7XG4gIGlmKH5sZW5ndGggJiYgdGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH0gcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn07IiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgPSAkLmdcbiAgLCBjb3JlICAgICAgID0gJC5jb3JlXG4gICwgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvblxuICAsICRyZWRlZiAgICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKTtcbmZ1bmN0aW9uIGN0eChmbiwgdGhhdCl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufVxuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRkZWYuRiA9IDE7ICAvLyBmb3JjZWRcbiRkZWYuRyA9IDI7ICAvLyBnbG9iYWxcbiRkZWYuUyA9IDQ7ICAvLyBzdGF0aWNcbiRkZWYuUCA9IDg7ICAvLyBwcm90b1xuJGRlZi5CID0gMTY7IC8vIGJpbmRcbiRkZWYuVyA9IDMyOyAvLyB3cmFwXG5mdW5jdGlvbiAkZGVmKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHBcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xuICAgICwgaXNQcm90byAgPSB0eXBlICYgJGRlZi5QXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xuICAgICAgICA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pLnByb3RvdHlwZVxuICAgICwgZXhwb3J0cyAgPSBpc0dsb2JhbCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICBpZihpc0dsb2JhbClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gISh0eXBlICYgJGRlZi5GKSAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBpZih0eXBlICYgJGRlZi5CICYmIG93billeHAgPSBjdHgob3V0LCBnbG9iYWwpO1xuICAgIGVsc2UgZXhwID0gaXNQcm90byAmJiBpc0Z1bmN0aW9uKG91dCkgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYodGFyZ2V0ICYmICFvd24pJHJlZGVmKHRhcmdldCwga2V5LCBvdXQpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmKGV4cG9ydHNba2V5XSAhPSBvdXQpJC5oaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihpc1Byb3RvKShleHBvcnRzLnByb3RvdHlwZSB8fCAoZXhwb3J0cy5wcm90b3R5cGUgPSB7fSkpW2tleV0gPSBvdXQ7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gJGRlZjsiLCJ2YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGRvY3VtZW50ID0gJC5nLmRvY3VtZW50XG4gICwgaXNPYmplY3QgPSAkLmlzT2JqZWN0XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsInZhciAkID0gcmVxdWlyZSgnLi8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGtleXMgICAgICAgPSAkLmdldEtleXMoaXQpXG4gICAgLCBnZXREZXNjICAgID0gJC5nZXREZXNjXG4gICAgLCBnZXRTeW1ib2xzID0gJC5nZXRTeW1ib2xzO1xuICBpZihnZXRTeW1ib2xzKSQuZWFjaC5jYWxsKGdldFN5bWJvbHMoaXQpLCBmdW5jdGlvbihrZXkpe1xuICAgIGlmKGdldERlc2MoaXQsIGtleSkuZW51bWVyYWJsZSlrZXlzLnB1c2goa2V5KTtcbiAgfSk7XG4gIHJldHVybiBrZXlzO1xufTsiLCJ2YXIgY3R4ICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGdldCAgPSByZXF1aXJlKCcuLyQuaXRlcicpLmdldFxuICAsIGNhbGwgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCl7XG4gIHZhciBpdGVyYXRvciA9IGdldChpdGVyYWJsZSlcbiAgICAsIGYgICAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBzdGVwO1xuICB3aGlsZSghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpe1xuICAgIGlmKGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpID09PSBmYWxzZSl7XG4gICAgICByZXR1cm4gY2FsbC5jbG9zZShpdGVyYXRvcik7XG4gICAgfVxuICB9XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJCl7XG4gICQuRlcgICA9IHRydWU7XG4gICQucGF0aCA9ICQuZztcbiAgcmV0dXJuICQ7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcclxudmFyICQgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgdG9TdHJpbmcgPSB7fS50b1N0cmluZ1xyXG4gICwgZ2V0TmFtZXMgPSAkLmdldE5hbWVzO1xyXG5cclxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xyXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xyXG5cclxuZnVuY3Rpb24gZ2V0V2luZG93TmFtZXMoaXQpe1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gZ2V0TmFtZXMoaXQpO1xyXG4gIH0gY2F0Y2goZSl7XHJcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzLmdldCA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xyXG4gIGlmKHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nKXJldHVybiBnZXRXaW5kb3dOYW1lcyhpdCk7XHJcbiAgcmV0dXJuIGdldE5hbWVzKCQudG9PYmplY3QoaXQpKTtcclxufTsiLCIvLyBGYXN0IGFwcGx5XG4vLyBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gICAgY2FzZSA1OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTsiLCJ2YXIgYXNzZXJ0T2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpLm9iajtcbmZ1bmN0aW9uIGNsb3NlKGl0ZXJhdG9yKXtcbiAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgaWYocmV0ICE9PSB1bmRlZmluZWQpYXNzZXJ0T2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG59XG5mdW5jdGlvbiBjYWxsKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYXNzZXJ0T2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICB9IGNhdGNoKGUpe1xuICAgIGNsb3NlKGl0ZXJhdG9yKTtcbiAgICB0aHJvdyBlO1xuICB9XG59XG5jYWxsLmNsb3NlID0gY2xvc2U7XG5tb2R1bGUuZXhwb3J0cyA9IGNhbGw7IiwidmFyICRkZWYgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRyZWRlZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZicpXG4gICwgJCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjb2YgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCAkaXRlciAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcicpXG4gICwgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgRkZfSVRFUkFUT1IgICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgID0gJ3ZhbHVlcydcbiAgLCBJdGVyYXRvcnMgICAgICAgPSAkaXRlci5JdGVyYXRvcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFKXtcbiAgJGl0ZXIuY3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgZnVuY3Rpb24gY3JlYXRlTWV0aG9kKGtpbmQpe1xuICAgIGZ1bmN0aW9uICQkKHRoYXQpe1xuICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGF0LCBraW5kKTtcbiAgICB9XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gJCQodGhpcyk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJCQodGhpcyk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gJCQodGhpcyk7IH07XG4gIH1cbiAgdmFyIFRBRyAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBwcm90byAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCBfbmF0aXZlICA9IHByb3RvW1NZTUJPTF9JVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsIF9kZWZhdWx0ID0gX25hdGl2ZSB8fCBjcmVhdGVNZXRob2QoREVGQVVMVClcbiAgICAsIG1ldGhvZHMsIGtleTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZihfbmF0aXZlKXtcbiAgICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSAkLmdldFByb3RvKF9kZWZhdWx0LmNhbGwobmV3IEJhc2UpKTtcbiAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgY29mLnNldChJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAvLyBGRiBmaXhcbiAgICBpZigkLkZXICYmICQuaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpJGl0ZXIuc2V0KEl0ZXJhdG9yUHJvdG90eXBlLCAkLnRoYXQpO1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigkLkZXIHx8IEZPUkNFKSRpdGVyLnNldChwcm90bywgX2RlZmF1bHQpO1xuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IF9kZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSAkLnRoYXQ7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICAgICAgICA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKEtFWVMpLFxuICAgICAgdmFsdWVzOiAgREVGQVVMVCA9PSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZChWQUxVRVMpLFxuICAgICAgZW50cmllczogREVGQVVMVCAhPSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRSlmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKSRyZWRlZihwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZGVmKCRkZWYuUCArICRkZWYuRiAqICRpdGVyLkJVR0dZLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxufTsiLCJ2YXIgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HICAgID0gZmFsc2U7XG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bU1lNQk9MX0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIGlmKCFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbU1lNQk9MX0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHNhZmUgPSB0cnVlOyB9O1xuICAgIGFycltTWU1CT0xfSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGNvZiAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgY2xhc3NvZiAgICAgICAgICAgPSBjb2YuY2xhc3NvZlxuICAsIGFzc2VydCAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgYXNzZXJ0T2JqZWN0ICAgICAgPSBhc3NlcnQub2JqXG4gICwgU1lNQk9MX0lURVJBVE9SICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBGRl9JVEVSQVRPUiAgICAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEl0ZXJhdG9ycyAgICAgICAgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpKCdpdGVyYXRvcnMnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxuc2V0SXRlcmF0b3IoSXRlcmF0b3JQcm90b3R5cGUsICQudGhhdCk7XG5mdW5jdGlvbiBzZXRJdGVyYXRvcihPLCB2YWx1ZSl7XG4gICQuaGlkZShPLCBTWU1CT0xfSVRFUkFUT1IsIHZhbHVlKTtcbiAgLy8gQWRkIGl0ZXJhdG9yIGZvciBGRiBpdGVyYXRvciBwcm90b2NvbFxuICBpZihGRl9JVEVSQVRPUiBpbiBbXSkkLmhpZGUoTywgRkZfSVRFUkFUT1IsIHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgQlVHR1k6ICdrZXlzJyBpbiBbXSAmJiAhKCduZXh0JyBpbiBbXS5rZXlzKCkpLFxuICBJdGVyYXRvcnM6IEl0ZXJhdG9ycyxcbiAgc3RlcDogZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICAgIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xuICB9LFxuICBpczogZnVuY3Rpb24oaXQpe1xuICAgIHZhciBPICAgICAgPSBPYmplY3QoaXQpXG4gICAgICAsIFN5bWJvbCA9ICQuZy5TeW1ib2w7XG4gICAgcmV0dXJuIChTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IEZGX0lURVJBVE9SKSBpbiBPXG4gICAgICB8fCBTWU1CT0xfSVRFUkFUT1IgaW4gT1xuICAgICAgfHwgJC5oYXMoSXRlcmF0b3JzLCBjbGFzc29mKE8pKTtcbiAgfSxcbiAgZ2V0OiBmdW5jdGlvbihpdCl7XG4gICAgdmFyIFN5bWJvbCA9ICQuZy5TeW1ib2xcbiAgICAgICwgZ2V0SXRlcjtcbiAgICBpZihpdCAhPSB1bmRlZmluZWQpe1xuICAgICAgZ2V0SXRlciA9IGl0W1N5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3IgfHwgRkZfSVRFUkFUT1JdXG4gICAgICAgIHx8IGl0W1NZTUJPTF9JVEVSQVRPUl1cbiAgICAgICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbiAgICB9XG4gICAgYXNzZXJ0KCQuaXNGdW5jdGlvbihnZXRJdGVyKSwgaXQsICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAgIHJldHVybiBhc3NlcnRPYmplY3QoZ2V0SXRlci5jYWxsKGl0KSk7XG4gIH0sXG4gIHNldDogc2V0SXRlcmF0b3IsXG4gIGNyZWF0ZTogZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQsIHByb3RvKXtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSAkLmNyZWF0ZShwcm90byB8fCBJdGVyYXRvclByb3RvdHlwZSwge25leHQ6ICQuZGVzYygxLCBuZXh0KX0pO1xuICAgIGNvZi5zZXQoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKClcbiAgLCBjb3JlICAgPSB7fVxuICAsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gICwgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eVxuICAsIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yXG4gICwgbWF4ICAgPSBNYXRoLm1heFxuICAsIG1pbiAgID0gTWF0aC5taW47XG4vLyBUaGUgZW5naW5lIHdvcmtzIGZpbmUgd2l0aCBkZXNjcmlwdG9ycz8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eS5cbnZhciBERVNDID0gISFmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gMjsgfX0pLmEgPT0gMjtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufSgpO1xudmFyIGhpZGUgPSBjcmVhdGVEZWZpbmVyKDEpO1xuLy8gNy4xLjQgVG9JbnRlZ2VyXG5mdW5jdGlvbiB0b0ludGVnZXIoaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn1cbmZ1bmN0aW9uIGRlc2MoYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufVxuZnVuY3Rpb24gc2ltcGxlU2V0KG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59XG5mdW5jdGlvbiBjcmVhdGVEZWZpbmVyKGJpdG1hcCl7XG4gIHJldHVybiBERVNDID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gJC5zZXREZXNjKG9iamVjdCwga2V5LCBkZXNjKGJpdG1hcCwgdmFsdWUpKTtcbiAgfSA6IHNpbXBsZVNldDtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoaXQpe1xuICByZXR1cm4gaXQgIT09IG51bGwgJiYgKHR5cGVvZiBpdCA9PSAnb2JqZWN0JyB8fCB0eXBlb2YgaXQgPT0gJ2Z1bmN0aW9uJyk7XG59XG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZChpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn1cblxudmFyICQgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5mdycpKHtcbiAgZzogZ2xvYmFsLFxuICBjb3JlOiBjb3JlLFxuICBodG1sOiBnbG9iYWwuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAvLyBodHRwOi8vanNwZXJmLmNvbS9jb3JlLWpzLWlzb2JqZWN0XG4gIGlzT2JqZWN0OiAgIGlzT2JqZWN0LFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICB0aGF0OiBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvLyA3LjEuNCBUb0ludGVnZXJcbiAgdG9JbnRlZ2VyOiB0b0ludGVnZXIsXG4gIC8vIDcuMS4xNSBUb0xlbmd0aFxuICB0b0xlbmd0aDogZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG4gIH0sXG4gIHRvSW5kZXg6IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICAgIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbiAgfSxcbiAgaGFzOiBmdW5jdGlvbihpdCwga2V5KXtcbiAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbiAgfSxcbiAgY3JlYXRlOiAgICAgT2JqZWN0LmNyZWF0ZSxcbiAgZ2V0UHJvdG86ICAgT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICBERVNDOiAgICAgICBERVNDLFxuICBkZXNjOiAgICAgICBkZXNjLFxuICBnZXREZXNjOiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBzZXREZXNjOiAgICBkZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMsXG4gIGdldEtleXM6ICAgIE9iamVjdC5rZXlzLFxuICBnZXROYW1lczogICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgYXNzZXJ0RGVmaW5lZDogYXNzZXJ0RGVmaW5lZCxcbiAgLy8gRHVtbXksIGZpeCBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZyBpbiBlczUgbW9kdWxlXG4gIEVTNU9iamVjdDogT2JqZWN0LFxuICB0b09iamVjdDogZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiAkLkVTNU9iamVjdChhc3NlcnREZWZpbmVkKGl0KSk7XG4gIH0sXG4gIGhpZGU6IGhpZGUsXG4gIGRlZjogY3JlYXRlRGVmaW5lcigwKSxcbiAgc2V0OiBnbG9iYWwuU3ltYm9sID8gc2ltcGxlU2V0IDogaGlkZSxcbiAgZWFjaDogW10uZm9yRWFjaFxufSk7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuaWYodHlwZW9mIF9fZSAhPSAndW5kZWZpbmVkJylfX2UgPSBjb3JlO1xuaWYodHlwZW9mIF9fZyAhPSAndW5kZWZpbmVkJylfX2cgPSBnbG9iYWw7IiwidmFyICQgPSByZXF1aXJlKCcuLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSAkLnRvT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9ICQuZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07IiwidmFyICRyZWRlZiA9IHJlcXVpcmUoJy4vJC5yZWRlZicpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjKXtcclxuICBmb3IodmFyIGtleSBpbiBzcmMpJHJlZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XHJcbiAgcmV0dXJuIHRhcmdldDtcclxufTsiLCJ2YXIgJCAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBhc3NlcnRPYmplY3QgPSByZXF1aXJlKCcuLyQuYXNzZXJ0Jykub2JqO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvd25LZXlzKGl0KXtcbiAgYXNzZXJ0T2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgICAgICAgPSAkLmdldE5hbWVzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9scztcbiAgcmV0dXJuIGdldFN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBpbnZva2UgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBhc3NlcnRGdW5jdGlvbiA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5mbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oLyogLi4ucGFyZ3MgKi8pe1xuICB2YXIgZm4gICAgID0gYXNzZXJ0RnVuY3Rpb24odGhpcylcbiAgICAsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIHBhcmdzICA9IEFycmF5KGxlbmd0aClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIF8gICAgICA9ICQucGF0aC5fXG4gICAgLCBob2xkZXIgPSBmYWxzZTtcbiAgd2hpbGUobGVuZ3RoID4gaSlpZigocGFyZ3NbaV0gPSBhcmd1bWVudHNbaSsrXSkgPT09IF8paG9sZGVyID0gdHJ1ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHZhciB0aGF0ICAgID0gdGhpc1xuICAgICAgLCBfbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBqID0gMCwgayA9IDAsIGFyZ3M7XG4gICAgaWYoIWhvbGRlciAmJiAhX2xlbmd0aClyZXR1cm4gaW52b2tlKGZuLCBwYXJncywgdGhhdCk7XG4gICAgYXJncyA9IHBhcmdzLnNsaWNlKCk7XG4gICAgaWYoaG9sZGVyKWZvcig7bGVuZ3RoID4gajsgaisrKWlmKGFyZ3Nbal0gPT09IF8pYXJnc1tqXSA9IGFyZ3VtZW50c1trKytdO1xuICAgIHdoaWxlKF9sZW5ndGggPiBrKWFyZ3MucHVzaChhcmd1bWVudHNbaysrXSk7XG4gICAgcmV0dXJuIGludm9rZShmbiwgYXJncywgdGhhdCk7XG4gIH07XG59OyIsInZhciAkICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgdHBsID0gU3RyaW5nKHt9Lmhhc093blByb3BlcnR5KVxyXG4gICwgU1JDID0gcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmUoJ3NyYycpXHJcbiAgLCBfdG9TdHJpbmcgPSBGdW5jdGlvbi50b1N0cmluZztcclxuXHJcbmZ1bmN0aW9uICRyZWRlZihPLCBrZXksIHZhbCwgc2FmZSl7XHJcbiAgaWYoJC5pc0Z1bmN0aW9uKHZhbCkpe1xyXG4gICAgdmFyIGJhc2UgPSBPW2tleV07XHJcbiAgICAkLmhpZGUodmFsLCBTUkMsIGJhc2UgPyBTdHJpbmcoYmFzZSkgOiB0cGwucmVwbGFjZSgvaGFzT3duUHJvcGVydHkvLCBTdHJpbmcoa2V5KSkpO1xyXG4gICAgaWYoISgnbmFtZScgaW4gdmFsKSl2YWwubmFtZSA9IGtleTtcclxuICB9XHJcbiAgaWYoTyA9PT0gJC5nKXtcclxuICAgIE9ba2V5XSA9IHZhbDtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYoIXNhZmUpZGVsZXRlIE9ba2V5XTtcclxuICAgICQuaGlkZShPLCBrZXksIHZhbCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9yc1xyXG4vLyB3aXRoIG1ldGhvZHMgc2ltaWxhciB0byBMb0Rhc2ggaXNOYXRpdmVcclxuJHJlZGVmKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcclxuICByZXR1cm4gJC5oYXModGhpcywgU1JDKSA/IHRoaXNbU1JDXSA6IF90b1N0cmluZy5jYWxsKHRoaXMpO1xyXG59KTtcclxuXHJcbiQuY29yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24oaXQpe1xyXG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChpdCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9ICRyZWRlZjsiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJlZ0V4cCwgcmVwbGFjZSwgaXNTdGF0aWMpe1xuICB2YXIgcmVwbGFjZXIgPSByZXBsYWNlID09PSBPYmplY3QocmVwbGFjZSkgPyBmdW5jdGlvbihwYXJ0KXtcbiAgICByZXR1cm4gcmVwbGFjZVtwYXJ0XTtcbiAgfSA6IHJlcGxhY2U7XG4gIHJldHVybiBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIFN0cmluZyhpc1N0YXRpYyA/IGl0IDogdGhpcykucmVwbGFjZShyZWdFeHAsIHJlcGxhY2VyKTtcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaXMgfHwgZnVuY3Rpb24gaXMoeCwgeSl7XHJcbiAgcmV0dXJuIHggPT09IHkgPyB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSA6IHggIT0geCAmJiB5ICE9IHk7XHJcbn07IiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyICQgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgYXNzZXJ0ID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpO1xuZnVuY3Rpb24gY2hlY2soTywgcHJvdG8pe1xuICBhc3NlcnQub2JqKE8pO1xuICBhc3NlcnQocHJvdG8gPT09IG51bGwgfHwgJC5pc09iamVjdChwcm90byksIHByb3RvLCBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICA/IGZ1bmN0aW9uKGJ1Z2d5LCBzZXQpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHNldCA9IHJlcXVpcmUoJy4vJC5jdHgnKShGdW5jdGlvbi5jYWxsLCAkLmdldERlc2MoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgICAgc2V0KHt9LCBbXSk7XG4gICAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgICByZXR1cm4gTztcbiAgICAgICAgfTtcbiAgICAgIH0oKVxuICAgIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59OyIsInZhciAkICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcclxuICAsIHN0b3JlICA9ICQuZ1tTSEFSRURdIHx8ICgkLmdbU0hBUkVEXSA9IHt9KTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xyXG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xyXG59OyIsInZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBTUEVDSUVTID0gcmVxdWlyZSgnLi8kLndrcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEMpe1xuICBpZigkLkRFU0MgJiYgIShTUEVDSUVTIGluIEMpKSQuc2V0RGVzYyhDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogJC50aGF0XG4gIH0pO1xufTsiLCIvLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gJC50b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbFxuICAgICAgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTsiLCIvLyBodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1zdHJhd21hbjpzdHJpbmdfcGFkZGluZ1xudmFyICQgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgcmVwZWF0ID0gcmVxdWlyZSgnLi8kLnN0cmluZy1yZXBlYXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aGF0LCBtaW5MZW5ndGgsIGZpbGxDaGFyLCBsZWZ0KXtcbiAgLy8gMS4gTGV0IE8gYmUgQ2hlY2tPYmplY3RDb2VyY2libGUodGhpcyB2YWx1ZSkuXG4gIC8vIDIuIExldCBTIGJlIFRvU3RyaW5nKE8pLlxuICB2YXIgUyA9IFN0cmluZygkLmFzc2VydERlZmluZWQodGhhdCkpO1xuICAvLyA0LiBJZiBpbnRNaW5MZW5ndGggaXMgdW5kZWZpbmVkLCByZXR1cm4gUy5cbiAgaWYobWluTGVuZ3RoID09PSB1bmRlZmluZWQpcmV0dXJuIFM7XG4gIC8vIDQuIExldCBpbnRNaW5MZW5ndGggYmUgVG9JbnRlZ2VyKG1pbkxlbmd0aCkuXG4gIHZhciBpbnRNaW5MZW5ndGggPSAkLnRvSW50ZWdlcihtaW5MZW5ndGgpO1xuICAvLyA1LiBMZXQgZmlsbExlbiBiZSB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gUyBtaW51cyBpbnRNaW5MZW5ndGguXG4gIHZhciBmaWxsTGVuID0gaW50TWluTGVuZ3RoIC0gUy5sZW5ndGg7XG4gIC8vIDYuIElmIGZpbGxMZW4gPCAwLCB0aGVuIHRocm93IGEgUmFuZ2VFcnJvciBleGNlcHRpb24uXG4gIC8vIDcuIElmIGZpbGxMZW4gaXMgK+KIniwgdGhlbiB0aHJvdyBhIFJhbmdlRXJyb3IgZXhjZXB0aW9uLlxuICBpZihmaWxsTGVuIDwgMCB8fCBmaWxsTGVuID09PSBJbmZpbml0eSl7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0Nhbm5vdCBzYXRpc2Z5IHN0cmluZyBsZW5ndGggJyArIG1pbkxlbmd0aCArICcgZm9yIHN0cmluZzogJyArIFMpO1xuICB9XG4gIC8vIDguIExldCBzRmlsbFN0ciBiZSB0aGUgc3RyaW5nIHJlcHJlc2VudGVkIGJ5IGZpbGxTdHIuXG4gIC8vIDkuIElmIHNGaWxsU3RyIGlzIHVuZGVmaW5lZCwgbGV0IHNGaWxsU3RyIGJlIGEgc3BhY2UgY2hhcmFjdGVyLlxuICB2YXIgc0ZpbGxTdHIgPSBmaWxsQ2hhciA9PT0gdW5kZWZpbmVkID8gJyAnIDogU3RyaW5nKGZpbGxDaGFyKTtcbiAgLy8gMTAuIExldCBzRmlsbFZhbCBiZSBhIFN0cmluZyBtYWRlIG9mIHNGaWxsU3RyLCByZXBlYXRlZCB1bnRpbCBmaWxsTGVuIGlzIG1ldC5cbiAgdmFyIHNGaWxsVmFsID0gcmVwZWF0LmNhbGwoc0ZpbGxTdHIsIE1hdGguY2VpbChmaWxsTGVuIC8gc0ZpbGxTdHIubGVuZ3RoKSk7XG4gIC8vIHRydW5jYXRlIGlmIHdlIG92ZXJmbG93ZWRcbiAgaWYoc0ZpbGxWYWwubGVuZ3RoID4gZmlsbExlbilzRmlsbFZhbCA9IGxlZnRcbiAgICA/IHNGaWxsVmFsLnNsaWNlKHNGaWxsVmFsLmxlbmd0aCAtIGZpbGxMZW4pXG4gICAgOiBzRmlsbFZhbC5zbGljZSgwLCBmaWxsTGVuKTtcbiAgLy8gMTEuIFJldHVybiBhIHN0cmluZyBtYWRlIGZyb20gc0ZpbGxWYWwsIGZvbGxvd2VkIGJ5IFMuXG4gIC8vIDExLiBSZXR1cm4gYSBTdHJpbmcgbWFkZSBmcm9tIFMsIGZvbGxvd2VkIGJ5IHNGaWxsVmFsLlxuICByZXR1cm4gbGVmdCA/IHNGaWxsVmFsLmNvbmNhdChTKSA6IFMuY29uY2F0KHNGaWxsVmFsKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXBlYXQoY291bnQpe1xuICB2YXIgc3RyID0gU3RyaW5nKCQuYXNzZXJ0RGVmaW5lZCh0aGlzKSlcbiAgICAsIHJlcyA9ICcnXG4gICAgLCBuICAgPSAkLnRvSW50ZWdlcihjb3VudCk7XG4gIGlmKG4gPCAwIHx8IG4gPT0gSW5maW5pdHkpdGhyb3cgUmFuZ2VFcnJvcihcIkNvdW50IGNhbid0IGJlIG5lZ2F0aXZlXCIpO1xuICBmb3IoO24gPiAwOyAobiA+Pj49IDEpICYmIChzdHIgKz0gc3RyKSlpZihuICYgMSlyZXMgKz0gc3RyO1xuICByZXR1cm4gcmVzO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjdHggICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjb2YgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCBpbnZva2UgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBjZWwgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gJC5nXG4gICwgaXNGdW5jdGlvbiAgICAgICAgID0gJC5pc0Z1bmN0aW9uXG4gICwgaHRtbCAgICAgICAgICAgICAgID0gJC5odG1sXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbmZ1bmN0aW9uIHJ1bigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYoJC5oYXMocXVldWUsIGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufVxuZnVuY3Rpb24gbGlzdG5lcihldmVudCl7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufVxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIWlzRnVuY3Rpb24oc2V0VGFzaykgfHwgIWlzRnVuY3Rpb24oY2xlYXJUYXNrKSl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbihmbil7XG4gICAgdmFyIGFyZ3MgPSBbXSwgaSA9IDE7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24oKXtcbiAgICAgIGludm9rZShpc0Z1bmN0aW9uKGZuKSA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbihpZCl7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmKGNvZihwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIE1vZGVybiBicm93c2Vycywgc2tpcCBpbXBsZW1lbnRhdGlvbiBmb3IgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyBvYmplY3RcbiAgfSBlbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIGlzRnVuY3Rpb24oZ2xvYmFsLnBvc3RNZXNzYWdlKSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0bmVyLCBmYWxzZSk7XG4gIC8vIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKGlzRnVuY3Rpb24oTWVzc2FnZUNoYW5uZWwpKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdG5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0Jykpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6ICAgc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIGV4ZWMoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07IiwidmFyIHNpZCA9IDA7XG5mdW5jdGlvbiB1aWQoa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsrc2lkICsgTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoMzYpKTtcbn1cbnVpZC5zYWZlID0gcmVxdWlyZSgnLi8kJykuZy5TeW1ib2wgfHwgdWlkO1xubW9kdWxlLmV4cG9ydHMgPSB1aWQ7IiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyIFVOU0NPUEFCTEVTID0gcmVxdWlyZSgnLi8kLndrcycpKCd1bnNjb3BhYmxlcycpO1xuaWYoIShVTlNDT1BBQkxFUyBpbiBbXSkpcmVxdWlyZSgnLi8kJykuaGlkZShBcnJheS5wcm90b3R5cGUsIFVOU0NPUEFCTEVTLCB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIFtdW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vJCcpLmdcbiAgLCBzdG9yZSAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJykoJ3drcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgZ2xvYmFsLlN5bWJvbCAmJiBnbG9iYWwuU3ltYm9sW25hbWVdIHx8IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07IiwidmFyICQgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGNlbCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXG4gICwgY29mICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsICRkZWYgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBpbnZva2UgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmludm9rZScpXG4gICwgYXJyYXlNZXRob2QgICAgICA9IHJlcXVpcmUoJy4vJC5hcnJheS1tZXRob2RzJylcbiAgLCBJRV9QUk9UTyAgICAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmUoJ19fcHJvdG9fXycpXG4gICwgYXNzZXJ0ICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKVxuICAsIGFzc2VydE9iamVjdCAgICAgPSBhc3NlcnQub2JqXG4gICwgT2JqZWN0UHJvdG8gICAgICA9IE9iamVjdC5wcm90b3R5cGVcbiAgLCBodG1sICAgICAgICAgICAgID0gJC5odG1sXG4gICwgQSAgICAgICAgICAgICAgICA9IFtdXG4gICwgX3NsaWNlICAgICAgICAgICA9IEEuc2xpY2VcbiAgLCBfam9pbiAgICAgICAgICAgID0gQS5qb2luXG4gICwgY2xhc3NvZiAgICAgICAgICA9IGNvZi5jbGFzc29mXG4gICwgaGFzICAgICAgICAgICAgICA9ICQuaGFzXG4gICwgZGVmaW5lUHJvcGVydHkgICA9ICQuc2V0RGVzY1xuICAsIGdldE93bkRlc2NyaXB0b3IgPSAkLmdldERlc2NcbiAgLCBkZWZpbmVQcm9wZXJ0aWVzID0gJC5zZXREZXNjc1xuICAsIGlzRnVuY3Rpb24gICAgICAgPSAkLmlzRnVuY3Rpb25cbiAgLCBpc09iamVjdCAgICAgICAgID0gJC5pc09iamVjdFxuICAsIHRvT2JqZWN0ICAgICAgICAgPSAkLnRvT2JqZWN0XG4gICwgdG9MZW5ndGggICAgICAgICA9ICQudG9MZW5ndGhcbiAgLCB0b0luZGV4ICAgICAgICAgID0gJC50b0luZGV4XG4gICwgSUU4X0RPTV9ERUZJTkUgICA9IGZhbHNlXG4gICwgJGluZGV4T2YgICAgICAgICA9IHJlcXVpcmUoJy4vJC5hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsICRmb3JFYWNoICAgICAgICAgPSBhcnJheU1ldGhvZCgwKVxuICAsICRtYXAgICAgICAgICAgICAgPSBhcnJheU1ldGhvZCgxKVxuICAsICRmaWx0ZXIgICAgICAgICAgPSBhcnJheU1ldGhvZCgyKVxuICAsICRzb21lICAgICAgICAgICAgPSBhcnJheU1ldGhvZCgzKVxuICAsICRldmVyeSAgICAgICAgICAgPSBhcnJheU1ldGhvZCg0KTtcblxuaWYoISQuREVTQyl7XG4gIHRyeSB7XG4gICAgSUU4X0RPTV9ERUZJTkUgPSBkZWZpbmVQcm9wZXJ0eShjZWwoJ2RpdicpLCAneCcsXG4gICAgICB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gODsgfX1cbiAgICApLnggPT0gODtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICAkLnNldERlc2MgPSBmdW5jdGlvbihPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICAgIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpYXNzZXJ0T2JqZWN0KE8pW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgICByZXR1cm4gTztcbiAgfTtcbiAgJC5nZXREZXNjID0gZnVuY3Rpb24oTywgUCl7XG4gICAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICAgIHJldHVybiBnZXRPd25EZXNjcmlwdG9yKE8sIFApO1xuICAgIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgICBpZihoYXMoTywgUCkpcmV0dXJuICQuZGVzYyghT2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChPLCBQKSwgT1tQXSk7XG4gIH07XG4gICQuc2V0RGVzY3MgPSBkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24oTywgUHJvcGVydGllcyl7XG4gICAgYXNzZXJ0T2JqZWN0KE8pO1xuICAgIHZhciBrZXlzICAgPSAkLmdldEtleXMoUHJvcGVydGllcylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaSA9IDBcbiAgICAgICwgUDtcbiAgICB3aGlsZShsZW5ndGggPiBpKSQuc2V0RGVzYyhPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgICByZXR1cm4gTztcbiAgfTtcbn1cbiRkZWYoJGRlZi5TICsgJGRlZi5GICogISQuREVTQywgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjYgLyAxNS4yLjMuMyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJC5nZXREZXNjLFxuICAvLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJC5zZXREZXNjLFxuICAvLyAxOS4xLjIuMyAvIDE1LjIuMy43IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6IGRlZmluZVByb3BlcnRpZXNcbn0pO1xuXG4gIC8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbnZhciBrZXlzMSA9ICgnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSwnICtcbiAgICAgICAgICAgICd0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJykuc3BsaXQoJywnKVxuICAvLyBBZGRpdGlvbmFsIGtleXMgZm9yIGdldE93blByb3BlcnR5TmFtZXNcbiAgLCBrZXlzMiA9IGtleXMxLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpXG4gICwga2V5c0xlbjEgPSBrZXlzMS5sZW5ndGg7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBjZWwoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBrZXlzTGVuMVxuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoJzxzY3JpcHQ+ZG9jdW1lbnQuRj1PYmplY3Q8L3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3QucHJvdG90eXBlW2tleXMxW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5mdW5jdGlvbiBjcmVhdGVHZXRLZXlzKG5hbWVzLCBsZW5ndGgpe1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3Qob2JqZWN0KVxuICAgICAgLCBpICAgICAgPSAwXG4gICAgICAsIHJlc3VsdCA9IFtdXG4gICAgICAsIGtleTtcbiAgICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICAgIHdoaWxlKGxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICAgIH4kaW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cbmZ1bmN0aW9uIEVtcHR5KCl7fVxuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG4gIGdldFByb3RvdHlwZU9mOiAkLmdldFByb3RvID0gJC5nZXRQcm90byB8fCBmdW5jdGlvbihPKXtcbiAgICBPID0gT2JqZWN0KGFzc2VydC5kZWYoTykpO1xuICAgIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICAgIGlmKGlzRnVuY3Rpb24oTy5jb25zdHJ1Y3RvcikgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG4gIH0sXG4gIC8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJC5nZXROYW1lcyA9ICQuZ2V0TmFtZXMgfHwgY3JlYXRlR2V0S2V5cyhrZXlzMiwga2V5czIubGVuZ3RoLCB0cnVlKSxcbiAgLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJC5jcmVhdGUgPSAkLmNyZWF0ZSB8fCBmdW5jdGlvbihPLCAvKj8qL1Byb3BlcnRpZXMpe1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYoTyAhPT0gbnVsbCl7XG4gICAgICBFbXB0eS5wcm90b3R5cGUgPSBhc3NlcnRPYmplY3QoTyk7XG4gICAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICAgIEVtcHR5LnByb3RvdHlwZSA9IG51bGw7XG4gICAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHNoaW1cbiAgICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICAgIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gICAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbiAgfSxcbiAgLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG4gIGtleXM6ICQuZ2V0S2V5cyA9ICQuZ2V0S2V5cyB8fCBjcmVhdGVHZXRLZXlzKGtleXMxLCBrZXlzTGVuMSwgZmFsc2UpLFxuICAvLyAxOS4xLjIuMTcgLyAxNS4yLjMuOCBPYmplY3Quc2VhbChPKVxuICBzZWFsOiBmdW5jdGlvbiBzZWFsKGl0KXtcbiAgICByZXR1cm4gaXQ7IC8vIDwtIGNhcFxuICB9LFxuICAvLyAxOS4xLjIuNSAvIDE1LjIuMy45IE9iamVjdC5mcmVlemUoTylcbiAgZnJlZXplOiBmdW5jdGlvbiBmcmVlemUoaXQpe1xuICAgIHJldHVybiBpdDsgLy8gPC0gY2FwXG4gIH0sXG4gIC8vIDE5LjEuMi4xNSAvIDE1LjIuMy4xMCBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoTylcbiAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKGl0KXtcbiAgICByZXR1cm4gaXQ7IC8vIDwtIGNhcFxuICB9LFxuICAvLyAxOS4xLjIuMTMgLyAxNS4yLjMuMTEgT2JqZWN0LmlzU2VhbGVkKE8pXG4gIGlzU2VhbGVkOiBmdW5jdGlvbiBpc1NlYWxlZChpdCl7XG4gICAgcmV0dXJuICFpc09iamVjdChpdCk7IC8vIDwtIGNhcFxuICB9LFxuICAvLyAxOS4xLjIuMTIgLyAxNS4yLjMuMTIgT2JqZWN0LmlzRnJvemVuKE8pXG4gIGlzRnJvemVuOiBmdW5jdGlvbiBpc0Zyb3plbihpdCl7XG4gICAgcmV0dXJuICFpc09iamVjdChpdCk7IC8vIDwtIGNhcFxuICB9LFxuICAvLyAxOS4xLjIuMTEgLyAxNS4yLjMuMTMgT2JqZWN0LmlzRXh0ZW5zaWJsZShPKVxuICBpc0V4dGVuc2libGU6IGZ1bmN0aW9uIGlzRXh0ZW5zaWJsZShpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KTsgLy8gPC0gY2FwXG4gIH1cbn0pO1xuXG4vLyAxOS4yLjMuMiAvIDE1LjMuNC41IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKHRoaXNBcmcsIGFyZ3MuLi4pXG4kZGVmKCRkZWYuUCwgJ0Z1bmN0aW9uJywge1xuICBiaW5kOiBmdW5jdGlvbih0aGF0IC8qLCBhcmdzLi4uICovKXtcbiAgICB2YXIgZm4gICAgICAgPSBhc3NlcnQuZm4odGhpcylcbiAgICAgICwgcGFydEFyZ3MgPSBfc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGZ1bmN0aW9uIGJvdW5kKC8qIGFyZ3MuLi4gKi8pe1xuICAgICAgdmFyIGFyZ3MgICA9IHBhcnRBcmdzLmNvbmNhdChfc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAsIGNvbnN0ciA9IHRoaXMgaW5zdGFuY2VvZiBib3VuZFxuICAgICAgICAsIGN0eCAgICA9IGNvbnN0ciA/ICQuY3JlYXRlKGZuLnByb3RvdHlwZSkgOiB0aGF0XG4gICAgICAgICwgcmVzdWx0ID0gaW52b2tlKGZuLCBhcmdzLCBjdHgpO1xuICAgICAgcmV0dXJuIGNvbnN0ciA/IGN0eCA6IHJlc3VsdDtcbiAgICB9XG4gICAgaWYoZm4ucHJvdG90eXBlKWJvdW5kLnByb3RvdHlwZSA9IGZuLnByb3RvdHlwZTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH1cbn0pO1xuXG4vLyBGaXggZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmcgYW5kIERPTSBvYmplY3RzXG5pZighKDAgaW4gT2JqZWN0KCd6JykgJiYgJ3onWzBdID09ICd6Jykpe1xuICAkLkVTNU9iamVjdCA9IGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG4gIH07XG59XG5cbnZhciBidWdneVNsaWNlID0gdHJ1ZTtcbnRyeSB7XG4gIGlmKGh0bWwpX3NsaWNlLmNhbGwoaHRtbCk7XG4gIGJ1Z2d5U2xpY2UgPSBmYWxzZTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiBidWdneVNsaWNlLCAnQXJyYXknLCB7XG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShiZWdpbiwgZW5kKXtcbiAgICB2YXIgbGVuICAgPSB0b0xlbmd0aCh0aGlzLmxlbmd0aClcbiAgICAgICwga2xhc3MgPSBjb2YodGhpcyk7XG4gICAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiBlbmQ7XG4gICAgaWYoa2xhc3MgPT0gJ0FycmF5JylyZXR1cm4gX3NsaWNlLmNhbGwodGhpcywgYmVnaW4sIGVuZCk7XG4gICAgdmFyIHN0YXJ0ICA9IHRvSW5kZXgoYmVnaW4sIGxlbilcbiAgICAgICwgdXBUbyAgID0gdG9JbmRleChlbmQsIGxlbilcbiAgICAgICwgc2l6ZSAgID0gdG9MZW5ndGgodXBUbyAtIHN0YXJ0KVxuICAgICAgLCBjbG9uZWQgPSBBcnJheShzaXplKVxuICAgICAgLCBpICAgICAgPSAwO1xuICAgIGZvcig7IGkgPCBzaXplOyBpKyspY2xvbmVkW2ldID0ga2xhc3MgPT0gJ1N0cmluZydcbiAgICAgID8gdGhpcy5jaGFyQXQoc3RhcnQgKyBpKVxuICAgICAgOiB0aGlzW3N0YXJ0ICsgaV07XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxufSk7XG5cbiRkZWYoJGRlZi5QICsgJGRlZi5GICogKCQuRVM1T2JqZWN0ICE9IE9iamVjdCksICdBcnJheScsIHtcbiAgam9pbjogZnVuY3Rpb24gam9pbigpe1xuICAgIHJldHVybiBfam9pbi5hcHBseSgkLkVTNU9iamVjdCh0aGlzKSwgYXJndW1lbnRzKTtcbiAgfVxufSk7XG5cbi8vIDIyLjEuMi4yIC8gMTUuNC4zLjIgQXJyYXkuaXNBcnJheShhcmcpXG4kZGVmKCRkZWYuUywgJ0FycmF5Jywge1xuICBpc0FycmF5OiBmdW5jdGlvbihhcmcpe1xuICAgIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xuICB9XG59KTtcbmZ1bmN0aW9uIGNyZWF0ZUFycmF5UmVkdWNlKGlzUmlnaHQpe1xuICByZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2tmbiwgbWVtbyl7XG4gICAgYXNzZXJ0LmZuKGNhbGxiYWNrZm4pO1xuICAgIHZhciBPICAgICAgPSB0b09iamVjdCh0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gaXNSaWdodCA/IGxlbmd0aCAtIDEgOiAwXG4gICAgICAsIGkgICAgICA9IGlzUmlnaHQgPyAtMSA6IDE7XG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA8IDIpZm9yKDs7KXtcbiAgICAgIGlmKGluZGV4IGluIE8pe1xuICAgICAgICBtZW1vID0gT1tpbmRleF07XG4gICAgICAgIGluZGV4ICs9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaW5kZXggKz0gaTtcbiAgICAgIGFzc2VydChpc1JpZ2h0ID8gaW5kZXggPj0gMCA6IGxlbmd0aCA+IGluZGV4LCAnUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpO1xuICAgIH1cbiAgICBmb3IoO2lzUmlnaHQgPyBpbmRleCA+PSAwIDogbGVuZ3RoID4gaW5kZXg7IGluZGV4ICs9IGkpaWYoaW5kZXggaW4gTyl7XG4gICAgICBtZW1vID0gY2FsbGJhY2tmbihtZW1vLCBPW2luZGV4XSwgaW5kZXgsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn1cbiRkZWYoJGRlZi5QLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xMCAvIDE1LjQuNC4xOCBBcnJheS5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBmb3JFYWNoOiAkLmVhY2ggPSAkLmVhY2ggfHwgZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9LFxuICAvLyAyMi4xLjMuMTUgLyAxNS40LjQuMTkgQXJyYXkucHJvdG90eXBlLm1hcChjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkbWFwKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XG4gIH0sXG4gIC8vIDIyLjEuMy43IC8gMTUuNC40LjIwIEFycmF5LnByb3RvdHlwZS5maWx0ZXIoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZpbHRlcih0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9LFxuICAvLyAyMi4xLjMuMjMgLyAxNS40LjQuMTcgQXJyYXkucHJvdG90eXBlLnNvbWUoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgc29tZTogZnVuY3Rpb24gc29tZShjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkc29tZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9LFxuICAvLyAyMi4xLjMuNSAvIDE1LjQuNC4xNiBBcnJheS5wcm90b3R5cGUuZXZlcnkoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KGNhbGxiYWNrZm4vKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XG4gICAgcmV0dXJuICRldmVyeSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9LFxuICAvLyAyMi4xLjMuMTggLyAxNS40LjQuMjEgQXJyYXkucHJvdG90eXBlLnJlZHVjZShjYWxsYmFja2ZuIFssIGluaXRpYWxWYWx1ZV0pXG4gIHJlZHVjZTogY3JlYXRlQXJyYXlSZWR1Y2UoZmFsc2UpLFxuICAvLyAyMi4xLjMuMTkgLyAxNS40LjQuMjIgQXJyYXkucHJvdG90eXBlLnJlZHVjZVJpZ2h0KGNhbGxiYWNrZm4gWywgaW5pdGlhbFZhbHVlXSlcbiAgcmVkdWNlUmlnaHQ6IGNyZWF0ZUFycmF5UmVkdWNlKHRydWUpLFxuICAvLyAyMi4xLjMuMTEgLyAxNS40LjQuMTQgQXJyYXkucHJvdG90eXBlLmluZGV4T2Yoc2VhcmNoRWxlbWVudCBbLCBmcm9tSW5kZXhdKVxuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKGVsIC8qLCBmcm9tSW5kZXggPSAwICovKXtcbiAgICByZXR1cm4gJGluZGV4T2YodGhpcywgZWwsIGFyZ3VtZW50c1sxXSk7XG4gIH0sXG4gIC8vIDIyLjEuMy4xNCAvIDE1LjQuNC4xNSBBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCBbLCBmcm9tSW5kZXhdKVxuICBsYXN0SW5kZXhPZjogZnVuY3Rpb24oZWwsIGZyb21JbmRleCAvKiA9IEBbKi0xXSAqLyl7XG4gICAgdmFyIE8gICAgICA9IHRvT2JqZWN0KHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSBsZW5ndGggLSAxO1xuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKWluZGV4ID0gTWF0aC5taW4oaW5kZXgsICQudG9JbnRlZ2VyKGZyb21JbmRleCkpO1xuICAgIGlmKGluZGV4IDwgMClpbmRleCA9IHRvTGVuZ3RoKGxlbmd0aCArIGluZGV4KTtcbiAgICBmb3IoO2luZGV4ID49IDA7IGluZGV4LS0paWYoaW5kZXggaW4gTylpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIGluZGV4O1xuICAgIHJldHVybiAtMTtcbiAgfVxufSk7XG5cbi8vIDIxLjEuMy4yNSAvIDE1LjUuNC4yMCBTdHJpbmcucHJvdG90eXBlLnRyaW0oKVxuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7dHJpbTogcmVxdWlyZSgnLi8kLnJlcGxhY2VyJykoL15cXHMqKFtcXHNcXFNdKlxcUyk/XFxzKiQvLCAnJDEnKX0pO1xuXG4vLyAyMC4zLjMuMSAvIDE1LjkuNC40IERhdGUubm93KClcbiRkZWYoJGRlZi5TLCAnRGF0ZScsIHtub3c6IGZ1bmN0aW9uKCl7XG4gIHJldHVybiArbmV3IERhdGU7XG59fSk7XG5cbmZ1bmN0aW9uIGx6KG51bSl7XG4gIHJldHVybiBudW0gPiA5ID8gbnVtIDogJzAnICsgbnVtO1xufVxuXG4vLyAyMC4zLjQuMzYgLyAxNS45LjUuNDMgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcoKVxuLy8gUGhhbnRvbUpTIGFuZCBvbGQgd2Via2l0IGhhZCBhIGJyb2tlbiBEYXRlIGltcGxlbWVudGF0aW9uLlxudmFyIGRhdGUgICAgICAgPSBuZXcgRGF0ZSgtNWUxMyAtIDEpXG4gICwgYnJva2VuRGF0ZSA9ICEoZGF0ZS50b0lTT1N0cmluZyAmJiBkYXRlLnRvSVNPU3RyaW5nKCkgPT0gJzAzODUtMDctMjVUMDc6MDY6MzkuOTk5WidcbiAgICAgICYmIHJlcXVpcmUoJy4vJC50aHJvd3MnKShmdW5jdGlvbigpeyBuZXcgRGF0ZShOYU4pLnRvSVNPU3RyaW5nKCk7IH0pKTtcbiRkZWYoJGRlZi5QICsgJGRlZi5GICogYnJva2VuRGF0ZSwgJ0RhdGUnLCB7dG9JU09TdHJpbmc6IGZ1bmN0aW9uKCl7XG4gIGlmKCFpc0Zpbml0ZSh0aGlzKSl0aHJvdyBSYW5nZUVycm9yKCdJbnZhbGlkIHRpbWUgdmFsdWUnKTtcbiAgdmFyIGQgPSB0aGlzXG4gICAgLCB5ID0gZC5nZXRVVENGdWxsWWVhcigpXG4gICAgLCBtID0gZC5nZXRVVENNaWxsaXNlY29uZHMoKVxuICAgICwgcyA9IHkgPCAwID8gJy0nIDogeSA+IDk5OTkgPyAnKycgOiAnJztcbiAgcmV0dXJuIHMgKyAoJzAwMDAwJyArIE1hdGguYWJzKHkpKS5zbGljZShzID8gLTYgOiAtNCkgK1xuICAgICctJyArIGx6KGQuZ2V0VVRDTW9udGgoKSArIDEpICsgJy0nICsgbHooZC5nZXRVVENEYXRlKCkpICtcbiAgICAnVCcgKyBseihkLmdldFVUQ0hvdXJzKCkpICsgJzonICsgbHooZC5nZXRVVENNaW51dGVzKCkpICtcbiAgICAnOicgKyBseihkLmdldFVUQ1NlY29uZHMoKSkgKyAnLicgKyAobSA+IDk5ID8gbSA6ICcwJyArIGx6KG0pKSArICdaJztcbn19KTtcblxuaWYoY2xhc3NvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdPYmplY3QnKWNvZi5jbGFzc29mID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgdGFnID0gY2xhc3NvZihpdCk7XG4gIHJldHVybiB0YWcgPT0gJ09iamVjdCcgJiYgaXNGdW5jdGlvbihpdC5jYWxsZWUpID8gJ0FyZ3VtZW50cycgOiB0YWc7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZGVmICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgdG9JbmRleCA9ICQudG9JbmRleDtcbiRkZWYoJGRlZi5QLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4zIEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluKHRhcmdldCwgc3RhcnQsIGVuZCA9IHRoaXMubGVuZ3RoKVxuICBjb3B5V2l0aGluOiBmdW5jdGlvbiBjb3B5V2l0aGluKHRhcmdldC8qID0gMCAqLywgc3RhcnQgLyogPSAwLCBlbmQgPSBAbGVuZ3RoICovKXtcbiAgICB2YXIgTyAgICAgPSBPYmplY3QoJC5hc3NlcnREZWZpbmVkKHRoaXMpKVxuICAgICAgLCBsZW4gICA9ICQudG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIHRvICAgID0gdG9JbmRleCh0YXJnZXQsIGxlbilcbiAgICAgICwgZnJvbSAgPSB0b0luZGV4KHN0YXJ0LCBsZW4pXG4gICAgICAsIGVuZCAgID0gYXJndW1lbnRzWzJdXG4gICAgICAsIGZpbiAgID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB0b0luZGV4KGVuZCwgbGVuKVxuICAgICAgLCBjb3VudCA9IE1hdGgubWluKGZpbiAtIGZyb20sIGxlbiAtIHRvKVxuICAgICAgLCBpbmMgICA9IDE7XG4gICAgaWYoZnJvbSA8IHRvICYmIHRvIDwgZnJvbSArIGNvdW50KXtcbiAgICAgIGluYyAgPSAtMTtcbiAgICAgIGZyb20gPSBmcm9tICsgY291bnQgLSAxO1xuICAgICAgdG8gICA9IHRvICAgKyBjb3VudCAtIDE7XG4gICAgfVxuICAgIHdoaWxlKGNvdW50LS0gPiAwKXtcbiAgICAgIGlmKGZyb20gaW4gTylPW3RvXSA9IE9bZnJvbV07XG4gICAgICBlbHNlIGRlbGV0ZSBPW3RvXTtcbiAgICAgIHRvICAgKz0gaW5jO1xuICAgICAgZnJvbSArPSBpbmM7XG4gICAgfSByZXR1cm4gTztcbiAgfVxufSk7XG5yZXF1aXJlKCcuLyQudW5zY29wZScpKCdjb3B5V2l0aGluJyk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRkZWYgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b0luZGV4ID0gJC50b0luZGV4O1xuJGRlZigkZGVmLlAsICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjYgQXJyYXkucHJvdG90eXBlLmZpbGwodmFsdWUsIHN0YXJ0ID0gMCwgZW5kID0gdGhpcy5sZW5ndGgpXG4gIGZpbGw6IGZ1bmN0aW9uIGZpbGwodmFsdWUgLyosIHN0YXJ0ID0gMCwgZW5kID0gQGxlbmd0aCAqLyl7XG4gICAgdmFyIE8gICAgICA9IE9iamVjdCgkLmFzc2VydERlZmluZWQodGhpcykpXG4gICAgICAsIGxlbmd0aCA9ICQudG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoYXJndW1lbnRzWzFdLCBsZW5ndGgpXG4gICAgICAsIGVuZCAgICA9IGFyZ3VtZW50c1syXVxuICAgICAgLCBlbmRQb3MgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHRvSW5kZXgoZW5kLCBsZW5ndGgpO1xuICAgIHdoaWxlKGVuZFBvcyA+IGluZGV4KU9baW5kZXgrK10gPSB2YWx1ZTtcbiAgICByZXR1cm4gTztcbiAgfVxufSk7XG5yZXF1aXJlKCcuLyQudW5zY29wZScpKCdmaWxsJyk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjIuMS4zLjkgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleChwcmVkaWNhdGUsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG52YXIgS0VZICAgID0gJ2ZpbmRJbmRleCdcbiAgLCAkZGVmICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBmb3JjZWQgPSB0cnVlXG4gICwgJGZpbmQgID0gcmVxdWlyZSgnLi8kLmFycmF5LW1ldGhvZHMnKSg2KTtcbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZihLRVkgaW4gW10pQXJyYXkoMSlbS0VZXShmdW5jdGlvbigpeyBmb3JjZWQgPSBmYWxzZTsgfSk7XG4kZGVmKCRkZWYuUCArICRkZWYuRiAqIGZvcmNlZCwgJ0FycmF5Jywge1xuICBmaW5kSW5kZXg6IGZ1bmN0aW9uIGZpbmRJbmRleChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTtcbnJlcXVpcmUoJy4vJC51bnNjb3BlJykoS0VZKTsiLCIndXNlIHN0cmljdCc7XG4vLyAyMi4xLjMuOCBBcnJheS5wcm90b3R5cGUuZmluZChwcmVkaWNhdGUsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG52YXIgS0VZICAgID0gJ2ZpbmQnXG4gICwgJGRlZiAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgZm9yY2VkID0gdHJ1ZVxuICAsICRmaW5kICA9IHJlcXVpcmUoJy4vJC5hcnJheS1tZXRob2RzJykoNSk7XG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYoS0VZIGluIFtdKUFycmF5KDEpW0tFWV0oZnVuY3Rpb24oKXsgZm9yY2VkID0gZmFsc2U7IH0pO1xuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiBmb3JjZWQsICdBcnJheScsIHtcbiAgZmluZDogZnVuY3Rpb24gZmluZChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTtcbnJlcXVpcmUoJy4vJC51bnNjb3BlJykoS0VZKTsiLCJ2YXIgJCAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGN0eCAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgJGRlZiAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkaXRlciA9IHJlcXVpcmUoJy4vJC5pdGVyJylcbiAgLCBjYWxsICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIXJlcXVpcmUoJy4vJC5pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZChhcnJheUxpa2UpKVxuICAgICAgLCBtYXBmbiAgID0gYXJndW1lbnRzWzFdXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGYgICAgICAgPSBtYXBwaW5nID8gY3R4KG1hcGZuLCBhcmd1bWVudHNbMl0sIDIpIDogdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZigkaXRlci5pcyhPKSl7XG4gICAgICBpdGVyYXRvciA9ICRpdGVyLmdldChPKTtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgcXVpcmtzIG1vZGUgYnVnIC0+IHVzZSB0eXBlb2YgaW5zdGVhZCBvZiBpc0Z1bmN0aW9uXG4gICAgICByZXN1bHQgICA9IG5ldyAodHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheSk7XG4gICAgICBmb3IoOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIGYsIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc3RyYW5nZSBJRSBxdWlya3MgbW9kZSBidWcgLT4gdXNlIHR5cGVvZiBpbnN0ZWFkIG9mIGlzRnVuY3Rpb25cbiAgICAgIHJlc3VsdCA9IG5ldyAodHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheSkobGVuZ3RoID0gJC50b0xlbmd0aChPLmxlbmd0aCkpO1xuICAgICAgZm9yKDsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IGYoT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7IiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHNldFVuc2NvcGUgPSByZXF1aXJlKCcuLyQudW5zY29wZScpXG4gICwgSVRFUiAgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdpdGVyJylcbiAgLCAkaXRlciAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXInKVxuICAsIHN0ZXAgICAgICAgPSAkaXRlci5zdGVwXG4gICwgSXRlcmF0b3JzICA9ICRpdGVyLkl0ZXJhdG9ycztcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgJC5zZXQodGhpcywgSVRFUiwge286ICQudG9PYmplY3QoaXRlcmF0ZWQpLCBpOiAwLCBrOiBraW5kfSk7XG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBpdGVyICA9IHRoaXNbSVRFUl1cbiAgICAsIE8gICAgID0gaXRlci5vXG4gICAgLCBraW5kICA9IGl0ZXIua1xuICAgICwgaW5kZXggPSBpdGVyLmkrKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIGl0ZXIubyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuc2V0VW5zY29wZSgna2V5cycpO1xuc2V0VW5zY29wZSgndmFsdWVzJyk7XG5zZXRVbnNjb3BlKCdlbnRyaWVzJyk7IiwidmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG4kZGVmKCRkZWYuUywgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMyBBcnJheS5vZiggLi4uaXRlbXMpXG4gIG9mOiBmdW5jdGlvbiBvZigvKiAuLi5hcmdzICovKXtcbiAgICB2YXIgaW5kZXggID0gMFxuICAgICAgLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAvLyBzdHJhbmdlIElFIHF1aXJrcyBtb2RlIGJ1ZyAtPiB1c2UgdHlwZW9mIGluc3RlYWQgb2YgaXNGdW5jdGlvblxuICAgICAgLCByZXN1bHQgPSBuZXcgKHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXkpKGxlbmd0aCk7XG4gICAgd2hpbGUobGVuZ3RoID4gaW5kZXgpcmVzdWx0W2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleCsrXTtcbiAgICByZXN1bHQubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pOyIsInJlcXVpcmUoJy4vJC5zcGVjaWVzJykoQXJyYXkpOyIsInZhciAkICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBIQVNfSU5TVEFOQ0UgID0gcmVxdWlyZSgnLi8kLndrcycpKCdoYXNJbnN0YW5jZScpXG4gICwgRnVuY3Rpb25Qcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbi8vIDE5LjIuMy42IEZ1bmN0aW9uLnByb3RvdHlwZVtAQGhhc0luc3RhbmNlXShWKVxuaWYoIShIQVNfSU5TVEFOQ0UgaW4gRnVuY3Rpb25Qcm90bykpJC5zZXREZXNjKEZ1bmN0aW9uUHJvdG8sIEhBU19JTlNUQU5DRSwge3ZhbHVlOiBmdW5jdGlvbihPKXtcbiAgaWYoISQuaXNGdW5jdGlvbih0aGlzKSB8fCAhJC5pc09iamVjdChPKSlyZXR1cm4gZmFsc2U7XG4gIGlmKCEkLmlzT2JqZWN0KHRoaXMucHJvdG90eXBlKSlyZXR1cm4gTyBpbnN0YW5jZW9mIHRoaXM7XG4gIC8vIGZvciBlbnZpcm9ubWVudCB3L28gbmF0aXZlIGBAQGhhc0luc3RhbmNlYCBsb2dpYyBlbm91Z2ggYGluc3RhbmNlb2ZgLCBidXQgYWRkIHRoaXM6XG4gIHdoaWxlKE8gPSAkLmdldFByb3RvKE8pKWlmKHRoaXMucHJvdG90eXBlID09PSBPKXJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59fSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIE5BTUUgPSAnbmFtZSdcbiAgLCBzZXREZXNjID0gJC5zZXREZXNjXG4gICwgRnVuY3Rpb25Qcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbi8vIDE5LjIuNC4yIG5hbWVcbk5BTUUgaW4gRnVuY3Rpb25Qcm90byB8fCAkLkZXICYmICQuREVTQyAmJiBzZXREZXNjKEZ1bmN0aW9uUHJvdG8sIE5BTUUsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgdmFyIG1hdGNoID0gU3RyaW5nKHRoaXMpLm1hdGNoKC9eXFxzKmZ1bmN0aW9uIChbXiAoXSopLylcbiAgICAgICwgbmFtZSAgPSBtYXRjaCA/IG1hdGNoWzFdIDogJyc7XG4gICAgJC5oYXModGhpcywgTkFNRSkgfHwgc2V0RGVzYyh0aGlzLCBOQU1FLCAkLmRlc2MoNSwgbmFtZSkpO1xuICAgIHJldHVybiBuYW1lO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAkLmhhcyh0aGlzLCBOQU1FKSB8fCBzZXREZXNjKHRoaXMsIE5BTUUsICQuZGVzYygwLCB2YWx1ZSkpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjEgTWFwIE9iamVjdHNcbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uJykoJ01hcCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBNYXAoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHNbMF0pOyB9O1xufSwge1xuICAvLyAyMy4xLjMuNiBNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSl7XG4gICAgdmFyIGVudHJ5ID0gc3Ryb25nLmdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LnY7XG4gIH0sXG4gIC8vIDIzLjEuMy45IE1hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpe1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHRoaXMsIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nLCB0cnVlKTsiLCJ2YXIgSW5maW5pdHkgPSAxIC8gMFxuICAsICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgRSAgICAgPSBNYXRoLkVcbiAgLCBwb3cgICA9IE1hdGgucG93XG4gICwgYWJzICAgPSBNYXRoLmFic1xuICAsIGV4cCAgID0gTWF0aC5leHBcbiAgLCBsb2cgICA9IE1hdGgubG9nXG4gICwgc3FydCAgPSBNYXRoLnNxcnRcbiAgLCBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vclxuICAsIEVQU0lMT04gICA9IHBvdygyLCAtNTIpXG4gICwgRVBTSUxPTjMyID0gcG93KDIsIC0yMylcbiAgLCBNQVgzMiAgICAgPSBwb3coMiwgMTI3KSAqICgyIC0gRVBTSUxPTjMyKVxuICAsIE1JTjMyICAgICA9IHBvdygyLCAtMTI2KTtcbmZ1bmN0aW9uIHJvdW5kVGllc1RvRXZlbihuKXtcbiAgcmV0dXJuIG4gKyAxIC8gRVBTSUxPTiAtIDEgLyBFUFNJTE9OO1xufVxuXG4vLyAyMC4yLjIuMjggTWF0aC5zaWduKHgpXG5mdW5jdGlvbiBzaWduKHgpe1xuICByZXR1cm4gKHggPSAreCkgPT0gMCB8fCB4ICE9IHggPyB4IDogeCA8IDAgPyAtMSA6IDE7XG59XG4vLyAyMC4yLjIuNSBNYXRoLmFzaW5oKHgpXG5mdW5jdGlvbiBhc2luaCh4KXtcbiAgcmV0dXJuICFpc0Zpbml0ZSh4ID0gK3gpIHx8IHggPT0gMCA/IHggOiB4IDwgMCA/IC1hc2luaCgteCkgOiBsb2coeCArIHNxcnQoeCAqIHggKyAxKSk7XG59XG4vLyAyMC4yLjIuMTQgTWF0aC5leHBtMSh4KVxuZnVuY3Rpb24gZXhwbTEoeCl7XG4gIHJldHVybiAoeCA9ICt4KSA9PSAwID8geCA6IHggPiAtMWUtNiAmJiB4IDwgMWUtNiA/IHggKyB4ICogeCAvIDIgOiBleHAoeCkgLSAxO1xufVxuXG4kZGVmKCRkZWYuUywgJ01hdGgnLCB7XG4gIC8vIDIwLjIuMi4zIE1hdGguYWNvc2goeClcbiAgYWNvc2g6IGZ1bmN0aW9uIGFjb3NoKHgpe1xuICAgIHJldHVybiAoeCA9ICt4KSA8IDEgPyBOYU4gOiBpc0Zpbml0ZSh4KSA/IGxvZyh4IC8gRSArIHNxcnQoeCArIDEpICogc3FydCh4IC0gMSkgLyBFKSArIDEgOiB4O1xuICB9LFxuICAvLyAyMC4yLjIuNSBNYXRoLmFzaW5oKHgpXG4gIGFzaW5oOiBhc2luaCxcbiAgLy8gMjAuMi4yLjcgTWF0aC5hdGFuaCh4KVxuICBhdGFuaDogZnVuY3Rpb24gYXRhbmgoeCl7XG4gICAgcmV0dXJuICh4ID0gK3gpID09IDAgPyB4IDogbG9nKCgxICsgeCkgLyAoMSAtIHgpKSAvIDI7XG4gIH0sXG4gIC8vIDIwLjIuMi45IE1hdGguY2JydCh4KVxuICBjYnJ0OiBmdW5jdGlvbiBjYnJ0KHgpe1xuICAgIHJldHVybiBzaWduKHggPSAreCkgKiBwb3coYWJzKHgpLCAxIC8gMyk7XG4gIH0sXG4gIC8vIDIwLjIuMi4xMSBNYXRoLmNsejMyKHgpXG4gIGNsejMyOiBmdW5jdGlvbiBjbHozMih4KXtcbiAgICByZXR1cm4gKHggPj4+PSAwKSA/IDMxIC0gZmxvb3IobG9nKHggKyAwLjUpICogTWF0aC5MT0cyRSkgOiAzMjtcbiAgfSxcbiAgLy8gMjAuMi4yLjEyIE1hdGguY29zaCh4KVxuICBjb3NoOiBmdW5jdGlvbiBjb3NoKHgpe1xuICAgIHJldHVybiAoZXhwKHggPSAreCkgKyBleHAoLXgpKSAvIDI7XG4gIH0sXG4gIC8vIDIwLjIuMi4xNCBNYXRoLmV4cG0xKHgpXG4gIGV4cG0xOiBleHBtMSxcbiAgLy8gMjAuMi4yLjE2IE1hdGguZnJvdW5kKHgpXG4gIGZyb3VuZDogZnVuY3Rpb24gZnJvdW5kKHgpe1xuICAgIHZhciAkYWJzICA9IGFicyh4KVxuICAgICAgLCAkc2lnbiA9IHNpZ24oeClcbiAgICAgICwgYSwgcmVzdWx0O1xuICAgIGlmKCRhYnMgPCBNSU4zMilyZXR1cm4gJHNpZ24gKiByb3VuZFRpZXNUb0V2ZW4oJGFicyAvIE1JTjMyIC8gRVBTSUxPTjMyKSAqIE1JTjMyICogRVBTSUxPTjMyO1xuICAgIGEgPSAoMSArIEVQU0lMT04zMiAvIEVQU0lMT04pICogJGFicztcbiAgICByZXN1bHQgPSBhIC0gKGEgLSAkYWJzKTtcbiAgICBpZihyZXN1bHQgPiBNQVgzMiB8fCByZXN1bHQgIT0gcmVzdWx0KXJldHVybiAkc2lnbiAqIEluZmluaXR5O1xuICAgIHJldHVybiAkc2lnbiAqIHJlc3VsdDtcbiAgfSxcbiAgLy8gMjAuMi4yLjE3IE1hdGguaHlwb3QoW3ZhbHVlMVssIHZhbHVlMlssIOKApiBdXV0pXG4gIGh5cG90OiBmdW5jdGlvbiBoeXBvdCh2YWx1ZTEsIHZhbHVlMil7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB2YXIgc3VtICA9IDBcbiAgICAgICwgaSAgICA9IDBcbiAgICAgICwgbGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbGFyZyA9IDBcbiAgICAgICwgYXJnLCBkaXY7XG4gICAgd2hpbGUoaSA8IGxlbil7XG4gICAgICBhcmcgPSBhYnMoYXJndW1lbnRzW2krK10pO1xuICAgICAgaWYobGFyZyA8IGFyZyl7XG4gICAgICAgIGRpdiAgPSBsYXJnIC8gYXJnO1xuICAgICAgICBzdW0gID0gc3VtICogZGl2ICogZGl2ICsgMTtcbiAgICAgICAgbGFyZyA9IGFyZztcbiAgICAgIH0gZWxzZSBpZihhcmcgPiAwKXtcbiAgICAgICAgZGl2ICA9IGFyZyAvIGxhcmc7XG4gICAgICAgIHN1bSArPSBkaXYgKiBkaXY7XG4gICAgICB9IGVsc2Ugc3VtICs9IGFyZztcbiAgICB9XG4gICAgcmV0dXJuIGxhcmcgPT09IEluZmluaXR5ID8gSW5maW5pdHkgOiBsYXJnICogc3FydChzdW0pO1xuICB9LFxuICAvLyAyMC4yLjIuMTggTWF0aC5pbXVsKHgsIHkpXG4gIGltdWw6IGZ1bmN0aW9uIGltdWwoeCwgeSl7XG4gICAgdmFyIFVJbnQxNiA9IDB4ZmZmZlxuICAgICAgLCB4biA9ICt4XG4gICAgICAsIHluID0gK3lcbiAgICAgICwgeGwgPSBVSW50MTYgJiB4blxuICAgICAgLCB5bCA9IFVJbnQxNiAmIHluO1xuICAgIHJldHVybiAwIHwgeGwgKiB5bCArICgoVUludDE2ICYgeG4gPj4+IDE2KSAqIHlsICsgeGwgKiAoVUludDE2ICYgeW4gPj4+IDE2KSA8PCAxNiA+Pj4gMCk7XG4gIH0sXG4gIC8vIDIwLjIuMi4yMCBNYXRoLmxvZzFwKHgpXG4gIGxvZzFwOiBmdW5jdGlvbiBsb2cxcCh4KXtcbiAgICByZXR1cm4gKHggPSAreCkgPiAtMWUtOCAmJiB4IDwgMWUtOCA/IHggLSB4ICogeCAvIDIgOiBsb2coMSArIHgpO1xuICB9LFxuICAvLyAyMC4yLjIuMjEgTWF0aC5sb2cxMCh4KVxuICBsb2cxMDogZnVuY3Rpb24gbG9nMTAoeCl7XG4gICAgcmV0dXJuIGxvZyh4KSAvIE1hdGguTE4xMDtcbiAgfSxcbiAgLy8gMjAuMi4yLjIyIE1hdGgubG9nMih4KVxuICBsb2cyOiBmdW5jdGlvbiBsb2cyKHgpe1xuICAgIHJldHVybiBsb2coeCkgLyBNYXRoLkxOMjtcbiAgfSxcbiAgLy8gMjAuMi4yLjI4IE1hdGguc2lnbih4KVxuICBzaWduOiBzaWduLFxuICAvLyAyMC4yLjIuMzAgTWF0aC5zaW5oKHgpXG4gIHNpbmg6IGZ1bmN0aW9uIHNpbmgoeCl7XG4gICAgcmV0dXJuIGFicyh4ID0gK3gpIDwgMSA/IChleHBtMSh4KSAtIGV4cG0xKC14KSkgLyAyIDogKGV4cCh4IC0gMSkgLSBleHAoLXggLSAxKSkgKiAoRSAvIDIpO1xuICB9LFxuICAvLyAyMC4yLjIuMzMgTWF0aC50YW5oKHgpXG4gIHRhbmg6IGZ1bmN0aW9uIHRhbmgoeCl7XG4gICAgdmFyIGEgPSBleHBtMSh4ID0gK3gpXG4gICAgICAsIGIgPSBleHBtMSgteCk7XG4gICAgcmV0dXJuIGEgPT0gSW5maW5pdHkgPyAxIDogYiA9PSBJbmZpbml0eSA/IC0xIDogKGEgLSBiKSAvIChleHAoeCkgKyBleHAoLXgpKTtcbiAgfSxcbiAgLy8gMjAuMi4yLjM0IE1hdGgudHJ1bmMoeClcbiAgdHJ1bmM6IGZ1bmN0aW9uIHRydW5jKGl0KXtcbiAgICByZXR1cm4gKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgaXNPYmplY3QgICA9ICQuaXNPYmplY3RcbiAgLCBpc0Z1bmN0aW9uID0gJC5pc0Z1bmN0aW9uXG4gICwgTlVNQkVSICAgICA9ICdOdW1iZXInXG4gICwgJE51bWJlciAgICA9ICQuZ1tOVU1CRVJdXG4gICwgQmFzZSAgICAgICA9ICROdW1iZXJcbiAgLCBwcm90byAgICAgID0gJE51bWJlci5wcm90b3R5cGU7XG5mdW5jdGlvbiB0b1ByaW1pdGl2ZShpdCl7XG4gIHZhciBmbiwgdmFsO1xuICBpZihpc0Z1bmN0aW9uKGZuID0gaXQudmFsdWVPZikgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZihpc0Z1bmN0aW9uKGZuID0gaXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gbnVtYmVyXCIpO1xufVxuZnVuY3Rpb24gdG9OdW1iZXIoaXQpe1xuICBpZihpc09iamVjdChpdCkpaXQgPSB0b1ByaW1pdGl2ZShpdCk7XG4gIGlmKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBpdC5sZW5ndGggPiAyICYmIGl0LmNoYXJDb2RlQXQoMCkgPT0gNDgpe1xuICAgIHZhciBiaW5hcnkgPSBmYWxzZTtcbiAgICBzd2l0Y2goaXQuY2hhckNvZGVBdCgxKSl7XG4gICAgICBjYXNlIDY2IDogY2FzZSA5OCAgOiBiaW5hcnkgPSB0cnVlO1xuICAgICAgY2FzZSA3OSA6IGNhc2UgMTExIDogcmV0dXJuIHBhcnNlSW50KGl0LnNsaWNlKDIpLCBiaW5hcnkgPyAyIDogOCk7XG4gICAgfVxuICB9IHJldHVybiAraXQ7XG59XG5pZigkLkZXICYmICEoJE51bWJlcignMG8xJykgJiYgJE51bWJlcignMGIxJykpKXtcbiAgJE51bWJlciA9IGZ1bmN0aW9uIE51bWJlcihpdCl7XG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiAkTnVtYmVyID8gbmV3IEJhc2UodG9OdW1iZXIoaXQpKSA6IHRvTnVtYmVyKGl0KTtcbiAgfTtcbiAgJC5lYWNoLmNhbGwoJC5ERVNDID8gJC5nZXROYW1lcyhCYXNlKSA6IChcbiAgICAgIC8vIEVTMzpcbiAgICAgICdNQVhfVkFMVUUsTUlOX1ZBTFVFLE5hTixORUdBVElWRV9JTkZJTklUWSxQT1NJVElWRV9JTkZJTklUWSwnICtcbiAgICAgIC8vIEVTNiAoaW4gY2FzZSwgaWYgbW9kdWxlcyB3aXRoIEVTNiBOdW1iZXIgc3RhdGljcyByZXF1aXJlZCBiZWZvcmUpOlxuICAgICAgJ0VQU0lMT04saXNGaW5pdGUsaXNJbnRlZ2VyLGlzTmFOLGlzU2FmZUludGVnZXIsTUFYX1NBRkVfSU5URUdFUiwnICtcbiAgICAgICdNSU5fU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQscGFyc2VJbnQsaXNJbnRlZ2VyJ1xuICAgICkuc3BsaXQoJywnKSwgZnVuY3Rpb24oa2V5KXtcbiAgICAgIGlmKCQuaGFzKEJhc2UsIGtleSkgJiYgISQuaGFzKCROdW1iZXIsIGtleSkpe1xuICAgICAgICAkLnNldERlc2MoJE51bWJlciwga2V5LCAkLmdldERlc2MoQmFzZSwga2V5KSk7XG4gICAgICB9XG4gICAgfVxuICApO1xuICAkTnVtYmVyLnByb3RvdHlwZSA9IHByb3RvO1xuICBwcm90by5jb25zdHJ1Y3RvciA9ICROdW1iZXI7XG4gIHJlcXVpcmUoJy4vJC5yZWRlZicpKCQuZywgTlVNQkVSLCAkTnVtYmVyKTtcbn0iLCJ2YXIgJCAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgYWJzICAgPSBNYXRoLmFic1xuICAsIGZsb29yID0gTWF0aC5mbG9vclxuICAsIF9pc0Zpbml0ZSA9ICQuZy5pc0Zpbml0ZVxuICAsIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFmZmZmZmZmZmZmZmZmOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxO1xuZnVuY3Rpb24gaXNJbnRlZ2VyKGl0KXtcbiAgcmV0dXJuICEkLmlzT2JqZWN0KGl0KSAmJiBfaXNGaW5pdGUoaXQpICYmIGZsb29yKGl0KSA9PT0gaXQ7XG59XG4kZGVmKCRkZWYuUywgJ051bWJlcicsIHtcbiAgLy8gMjAuMS4yLjEgTnVtYmVyLkVQU0lMT05cbiAgRVBTSUxPTjogTWF0aC5wb3coMiwgLTUyKSxcbiAgLy8gMjAuMS4yLjIgTnVtYmVyLmlzRmluaXRlKG51bWJlcilcbiAgaXNGaW5pdGU6IGZ1bmN0aW9uIGlzRmluaXRlKGl0KXtcbiAgICByZXR1cm4gdHlwZW9mIGl0ID09ICdudW1iZXInICYmIF9pc0Zpbml0ZShpdCk7XG4gIH0sXG4gIC8vIDIwLjEuMi4zIE51bWJlci5pc0ludGVnZXIobnVtYmVyKVxuICBpc0ludGVnZXI6IGlzSW50ZWdlcixcbiAgLy8gMjAuMS4yLjQgTnVtYmVyLmlzTmFOKG51bWJlcilcbiAgaXNOYU46IGZ1bmN0aW9uIGlzTmFOKG51bWJlcil7XG4gICAgcmV0dXJuIG51bWJlciAhPSBudW1iZXI7XG4gIH0sXG4gIC8vIDIwLjEuMi41IE51bWJlci5pc1NhZmVJbnRlZ2VyKG51bWJlcilcbiAgaXNTYWZlSW50ZWdlcjogZnVuY3Rpb24gaXNTYWZlSW50ZWdlcihudW1iZXIpe1xuICAgIHJldHVybiBpc0ludGVnZXIobnVtYmVyKSAmJiBhYnMobnVtYmVyKSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xuICB9LFxuICAvLyAyMC4xLjIuNiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICBNQVhfU0FGRV9JTlRFR0VSOiBNQVhfU0FGRV9JTlRFR0VSLFxuICAvLyAyMC4xLjIuMTAgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVJcbiAgTUlOX1NBRkVfSU5URUdFUjogLU1BWF9TQUZFX0lOVEVHRVIsXG4gIC8vIDIwLjEuMi4xMiBOdW1iZXIucGFyc2VGbG9hdChzdHJpbmcpXG4gIHBhcnNlRmxvYXQ6IHBhcnNlRmxvYXQsXG4gIC8vIDIwLjEuMi4xMyBOdW1iZXIucGFyc2VJbnQoc3RyaW5nLCByYWRpeClcbiAgcGFyc2VJbnQ6IHBhcnNlSW50XG59KTsiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG4kZGVmKCRkZWYuUywgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vJC5hc3NpZ24nKX0pOyIsIi8vIDE5LjEuMy4xMCBPYmplY3QuaXModmFsdWUxLCB2YWx1ZTIpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcbiRkZWYoJGRlZi5TLCAnT2JqZWN0Jywge1xuICBpczogcmVxdWlyZSgnLi8kLnNhbWUnKVxufSk7IiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXR9KTsiLCJ2YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRkZWYgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgaXNPYmplY3QgPSAkLmlzT2JqZWN0XG4gICwgdG9PYmplY3QgPSAkLnRvT2JqZWN0O1xuJC5lYWNoLmNhbGwoKCdmcmVlemUsc2VhbCxwcmV2ZW50RXh0ZW5zaW9ucyxpc0Zyb3plbixpc1NlYWxlZCxpc0V4dGVuc2libGUsJyArXG4gICdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsZ2V0UHJvdG90eXBlT2Ysa2V5cyxnZXRPd25Qcm9wZXJ0eU5hbWVzJykuc3BsaXQoJywnKVxuLCBmdW5jdGlvbihLRVksIElEKXtcbiAgdmFyIGZuICAgICA9ICgkLmNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBmb3JjZWQgPSAwXG4gICAgLCBtZXRob2QgPSB7fTtcbiAgbWV0aG9kW0tFWV0gPSBJRCA9PSAwID8gZnVuY3Rpb24gZnJlZXplKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogaXQ7XG4gIH0gOiBJRCA9PSAxID8gZnVuY3Rpb24gc2VhbChpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGl0O1xuICB9IDogSUQgPT0gMiA/IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogaXQ7XG4gIH0gOiBJRCA9PSAzID8gZnVuY3Rpb24gaXNGcm96ZW4oaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiB0cnVlO1xuICB9IDogSUQgPT0gNCA/IGZ1bmN0aW9uIGlzU2VhbGVkKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogdHJ1ZTtcbiAgfSA6IElEID09IDUgPyBmdW5jdGlvbiBpc0V4dGVuc2libGUoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiBmYWxzZTtcbiAgfSA6IElEID09IDYgPyBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gICAgcmV0dXJuIGZuKHRvT2JqZWN0KGl0KSwga2V5KTtcbiAgfSA6IElEID09IDcgPyBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XG4gICAgcmV0dXJuIGZuKE9iamVjdCgkLmFzc2VydERlZmluZWQoaXQpKSk7XG4gIH0gOiBJRCA9PSA4ID8gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuIGZuKHRvT2JqZWN0KGl0KSk7XG4gIH0gOiByZXF1aXJlKCcuLyQuZ2V0LW5hbWVzJykuZ2V0O1xuICB0cnkge1xuICAgIGZuKCd6Jyk7XG4gIH0gY2F0Y2goZSl7XG4gICAgZm9yY2VkID0gMTtcbiAgfVxuICAkZGVmKCRkZWYuUyArICRkZWYuRiAqIGZvcmNlZCwgJ09iamVjdCcsIG1ldGhvZCk7XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCB0bXAgPSB7fTtcbnRtcFtyZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJyldID0gJ3onO1xuaWYocmVxdWlyZSgnLi8kJykuRlcgJiYgY29mKHRtcCkgIT0gJ3onKXtcbiAgcmVxdWlyZSgnLi8kLnJlZGVmJykoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNvZi5jbGFzc29mKHRoaXMpICsgJ10nO1xuICB9LCB0cnVlKTtcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGN0eCAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY29mICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCAkZGVmICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGFzc2VydCAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgZm9yT2YgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzZXRQcm90byA9IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXRcbiAgLCBzYW1lICAgICA9IHJlcXVpcmUoJy4vJC5zYW1lJylcbiAgLCBzcGVjaWVzICA9IHJlcXVpcmUoJy4vJC5zcGVjaWVzJylcbiAgLCBTUEVDSUVTICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpXG4gICwgUkVDT1JEICAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZSgncmVjb3JkJylcbiAgLCBQUk9NSVNFICA9ICdQcm9taXNlJ1xuICAsIGdsb2JhbCAgID0gJC5nXG4gICwgcHJvY2VzcyAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGlzTm9kZSAgID0gY29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGFzYXAgICAgID0gcHJvY2VzcyAmJiBwcm9jZXNzLm5leHRUaWNrIHx8IHJlcXVpcmUoJy4vJC50YXNrJykuc2V0XG4gICwgUCAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBpc0Z1bmN0aW9uICAgICA9ICQuaXNGdW5jdGlvblxuICAsIGlzT2JqZWN0ICAgICAgID0gJC5pc09iamVjdFxuICAsIGFzc2VydEZ1bmN0aW9uID0gYXNzZXJ0LmZuXG4gICwgYXNzZXJ0T2JqZWN0ICAgPSBhc3NlcnQub2JqXG4gICwgV3JhcHBlcjtcblxuZnVuY3Rpb24gdGVzdFJlc29sdmUoc3ViKXtcbiAgdmFyIHRlc3QgPSBuZXcgUChmdW5jdGlvbigpe30pO1xuICBpZihzdWIpdGVzdC5jb25zdHJ1Y3RvciA9IE9iamVjdDtcbiAgcmV0dXJuIFAucmVzb2x2ZSh0ZXN0KSA9PT0gdGVzdDtcbn1cblxudmFyIHVzZU5hdGl2ZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB3b3JrcyA9IGZhbHNlO1xuICBmdW5jdGlvbiBQMih4KXtcbiAgICB2YXIgc2VsZiA9IG5ldyBQKHgpO1xuICAgIHNldFByb3RvKHNlbGYsIFAyLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbiAgdHJ5IHtcbiAgICB3b3JrcyA9IGlzRnVuY3Rpb24oUCkgJiYgaXNGdW5jdGlvbihQLnJlc29sdmUpICYmIHRlc3RSZXNvbHZlKCk7XG4gICAgc2V0UHJvdG8oUDIsIFApO1xuICAgIFAyLnByb3RvdHlwZSA9ICQuY3JlYXRlKFAucHJvdG90eXBlLCB7Y29uc3RydWN0b3I6IHt2YWx1ZTogUDJ9fSk7XG4gICAgLy8gYWN0dWFsIEZpcmVmb3ggaGFzIGJyb2tlbiBzdWJjbGFzcyBzdXBwb3J0LCB0ZXN0IHRoYXRcbiAgICBpZighKFAyLnJlc29sdmUoNSkudGhlbihmdW5jdGlvbigpe30pIGluc3RhbmNlb2YgUDIpKXtcbiAgICAgIHdvcmtzID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIGFjdHVhbCBWOCBidWcsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTYyXG4gICAgaWYod29ya3MgJiYgJC5ERVNDKXtcbiAgICAgIHZhciB0aGVuYWJsZVRoZW5Hb3R0ZW4gPSBmYWxzZTtcbiAgICAgIFAucmVzb2x2ZSgkLnNldERlc2Moe30sICd0aGVuJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHRoZW5hYmxlVGhlbkdvdHRlbiA9IHRydWU7IH1cbiAgICAgIH0pKTtcbiAgICAgIHdvcmtzID0gdGhlbmFibGVUaGVuR290dGVuO1xuICAgIH1cbiAgfSBjYXRjaChlKXsgd29ya3MgPSBmYWxzZTsgfVxuICByZXR1cm4gd29ya3M7XG59KCk7XG5cbi8vIGhlbHBlcnNcbmZ1bmN0aW9uIGlzUHJvbWlzZShpdCl7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKHVzZU5hdGl2ZSA/IGNvZi5jbGFzc29mKGl0KSA9PSAnUHJvbWlzZScgOiBSRUNPUkQgaW4gaXQpO1xufVxuZnVuY3Rpb24gc2FtZUNvbnN0cnVjdG9yKGEsIGIpe1xuICAvLyBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIGlmKCEkLkZXICYmIGEgPT09IFAgJiYgYiA9PT0gV3JhcHBlcilyZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIHNhbWUoYSwgYik7XG59XG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3RvcihDKXtcbiAgdmFyIFMgPSBhc3NlcnRPYmplY3QoQylbU1BFQ0lFU107XG4gIHJldHVybiBTICE9IHVuZGVmaW5lZCA/IFMgOiBDO1xufVxuZnVuY3Rpb24gaXNUaGVuYWJsZShpdCl7XG4gIHZhciB0aGVuO1xuICBpZihpc09iamVjdChpdCkpdGhlbiA9IGl0LnRoZW47XG4gIHJldHVybiBpc0Z1bmN0aW9uKHRoZW4pID8gdGhlbiA6IGZhbHNlO1xufVxuZnVuY3Rpb24gbm90aWZ5KHJlY29yZCl7XG4gIHZhciBjaGFpbiA9IHJlY29yZC5jO1xuICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gIGlmKGNoYWluLmxlbmd0aClhc2FwLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHJlY29yZC52XG4gICAgICAsIG9rICAgID0gcmVjb3JkLnMgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgZnVuY3Rpb24gcnVuKHJlYWN0KXtcbiAgICAgIHZhciBjYiA9IG9rID8gcmVhY3Qub2sgOiByZWFjdC5mYWlsXG4gICAgICAgICwgcmV0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgIGlmKCFvaylyZWNvcmQuaCA9IHRydWU7XG4gICAgICAgICAgcmV0ID0gY2IgPT09IHRydWUgPyB2YWx1ZSA6IGNiKHZhbHVlKTtcbiAgICAgICAgICBpZihyZXQgPT09IHJlYWN0LlApe1xuICAgICAgICAgICAgcmVhY3QucmVqKFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhlbiA9IGlzVGhlbmFibGUocmV0KSl7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmV0LCByZWFjdC5yZXMsIHJlYWN0LnJlaik7XG4gICAgICAgICAgfSBlbHNlIHJlYWN0LnJlcyhyZXQpO1xuICAgICAgICB9IGVsc2UgcmVhY3QucmVqKHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICAgcmVhY3QucmVqKGVycik7XG4gICAgICB9XG4gICAgfVxuICAgIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIGNoYWluLmxlbmd0aCA9IDA7XG4gIH0pO1xufVxuZnVuY3Rpb24gaXNVbmhhbmRsZWQocHJvbWlzZSl7XG4gIHZhciByZWNvcmQgPSBwcm9taXNlW1JFQ09SRF1cbiAgICAsIGNoYWluICA9IHJlY29yZC5hIHx8IHJlY29yZC5jXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZWFjdDtcbiAgaWYocmVjb3JkLmgpcmV0dXJuIGZhbHNlO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdCA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3QuZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3QuUCkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gJHJlamVjdCh2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzXG4gICAgLCBwcm9taXNlO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgcmVjb3JkLnMgPSAyO1xuICByZWNvcmQuYSA9IHJlY29yZC5jLnNsaWNlKCk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgYXNhcC5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICAgIGlmKGlzVW5oYW5kbGVkKHByb21pc2UgPSByZWNvcmQucCkpe1xuICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYoZ2xvYmFsLmNvbnNvbGUgJiYgY29uc29sZS5lcnJvcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZWNvcmQuYSA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgfSwgMSk7XG4gIG5vdGlmeShyZWNvcmQpO1xufVxuZnVuY3Rpb24gJHJlc29sdmUodmFsdWUpe1xuICB2YXIgcmVjb3JkID0gdGhpc1xuICAgICwgdGhlbjtcbiAgaWYocmVjb3JkLmQpcmV0dXJuO1xuICByZWNvcmQuZCA9IHRydWU7XG4gIHJlY29yZCA9IHJlY29yZC5yIHx8IHJlY29yZDsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIGFzYXAuY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3cmFwcGVyID0ge3I6IHJlY29yZCwgZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY29yZC52ID0gdmFsdWU7XG4gICAgICByZWNvcmQucyA9IDE7XG4gICAgICBub3RpZnkocmVjb3JkKTtcbiAgICB9XG4gIH0gY2F0Y2goZSl7XG4gICAgJHJlamVjdC5jYWxsKHtyOiByZWNvcmQsIGQ6IGZhbHNlfSwgZSk7IC8vIHdyYXBcbiAgfVxufVxuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIXVzZU5hdGl2ZSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gIFAgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhc3NlcnRGdW5jdGlvbihleGVjdXRvcik7XG4gICAgdmFyIHJlY29yZCA9IHtcbiAgICAgIHA6IGFzc2VydC5pbnN0KHRoaXMsIFAsIFBST01JU0UpLCAgICAgICAvLyA8LSBwcm9taXNlXG4gICAgICBjOiBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgICBhOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICAgIHM6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgICAgZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICAgIHY6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgaDogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGhhbmRsZWQgcmVqZWN0aW9uXG4gICAgfTtcbiAgICAkLmhpZGUodGhpcywgUkVDT1JELCByZWNvcmQpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHJlY29yZCwgMSksIGN0eCgkcmVqZWN0LCByZWNvcmQsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwocmVjb3JkLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgcmVxdWlyZSgnLi8kLm1peCcpKFAucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciBTID0gYXNzZXJ0T2JqZWN0KGFzc2VydE9iamVjdCh0aGlzKS5jb25zdHJ1Y3RvcilbU1BFQ0lFU107XG4gICAgICB2YXIgcmVhY3QgPSB7XG4gICAgICAgIG9rOiAgIGlzRnVuY3Rpb24ob25GdWxmaWxsZWQpID8gb25GdWxmaWxsZWQgOiB0cnVlLFxuICAgICAgICBmYWlsOiBpc0Z1bmN0aW9uKG9uUmVqZWN0ZWQpICA/IG9uUmVqZWN0ZWQgIDogZmFsc2VcbiAgICAgIH07XG4gICAgICB2YXIgcHJvbWlzZSA9IHJlYWN0LlAgPSBuZXcgKFMgIT0gdW5kZWZpbmVkID8gUyA6IFApKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgICAgcmVhY3QucmVzID0gYXNzZXJ0RnVuY3Rpb24ocmVzKTtcbiAgICAgICAgcmVhY3QucmVqID0gYXNzZXJ0RnVuY3Rpb24ocmVqKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHJlY29yZCA9IHRoaXNbUkVDT1JEXTtcbiAgICAgIHJlY29yZC5jLnB1c2gocmVhY3QpO1xuICAgICAgaWYocmVjb3JkLmEpcmVjb3JkLmEucHVzaChyZWFjdCk7XG4gICAgICBpZihyZWNvcmQucylub3RpZnkocmVjb3JkKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBleHBvcnRcbiRkZWYoJGRlZi5HICsgJGRlZi5XICsgJGRlZi5GICogIXVzZU5hdGl2ZSwge1Byb21pc2U6IFB9KTtcbmNvZi5zZXQoUCwgUFJPTUlTRSk7XG5zcGVjaWVzKFApO1xuc3BlY2llcyhXcmFwcGVyID0gJC5jb3JlW1BST01JU0VdKTtcblxuLy8gc3RhdGljc1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpe1xuICAgIHJldHVybiBuZXcgKGdldENvbnN0cnVjdG9yKHRoaXMpKShmdW5jdGlvbihyZXMsIHJlail7IHJlaihyKTsgfSk7XG4gIH1cbn0pO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAoIXVzZU5hdGl2ZSB8fCB0ZXN0UmVzb2x2ZSh0cnVlKSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCl7XG4gICAgcmV0dXJuIGlzUHJvbWlzZSh4KSAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcylcbiAgICAgID8geCA6IG5ldyB0aGlzKGZ1bmN0aW9uKHJlcyl7IHJlcyh4KTsgfSk7XG4gIH1cbn0pO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhKHVzZU5hdGl2ZSAmJiByZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgUC5hbGwoaXRlcilbJ2NhdGNoJ10oZnVuY3Rpb24oKXt9KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgPSBnZXRDb25zdHJ1Y3Rvcih0aGlzKVxuICAgICAgLCB2YWx1ZXMgPSBbXTtcbiAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCB2YWx1ZXMucHVzaCwgdmFsdWVzKTtcbiAgICAgIHZhciByZW1haW5pbmcgPSB2YWx1ZXMubGVuZ3RoXG4gICAgICAgICwgcmVzdWx0cyAgID0gQXJyYXkocmVtYWluaW5nKTtcbiAgICAgIGlmKHJlbWFpbmluZykkLmVhY2guY2FsbCh2YWx1ZXMsIGZ1bmN0aW9uKHByb21pc2UsIGluZGV4KXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzKHJlc3VsdHMpO1xuICAgICAgICB9LCByZWopO1xuICAgICAgfSk7XG4gICAgICBlbHNlIHJlcyhyZXN1bHRzKTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyA9IGdldENvbnN0cnVjdG9yKHRoaXMpO1xuICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihyZXMsIHJlaik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufSk7IiwidmFyICQgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgc2V0UHJvdG8gID0gcmVxdWlyZSgnLi8kLnNldC1wcm90bycpXG4gICwgJGl0ZXIgICAgID0gcmVxdWlyZSgnLi8kLml0ZXInKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIElURVIgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdpdGVyJylcbiAgLCBzdGVwICAgICAgPSAkaXRlci5zdGVwXG4gICwgYXNzZXJ0ICAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgaXNPYmplY3QgID0gJC5pc09iamVjdFxuICAsIGdldFByb3RvICA9ICQuZ2V0UHJvdG9cbiAgLCAkUmVmbGVjdCAgPSAkLmcuUmVmbGVjdFxuICAsIF9hcHBseSAgICA9IEZ1bmN0aW9uLmFwcGx5XG4gICwgYXNzZXJ0T2JqZWN0ID0gYXNzZXJ0Lm9ialxuICAsIF9pc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgX3ByZXZlbnRFeHRlbnNpb25zID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zXG4gIC8vIElFIFRQIGhhcyBicm9rZW4gUmVmbGVjdC5lbnVtZXJhdGVcbiAgLCBidWdneUVudW1lcmF0ZSA9ICEoJFJlZmxlY3QgJiYgJFJlZmxlY3QuZW51bWVyYXRlICYmIElURVJBVE9SIGluICRSZWZsZWN0LmVudW1lcmF0ZSh7fSkpO1xuXG5mdW5jdGlvbiBFbnVtZXJhdGUoaXRlcmF0ZWQpe1xuICAkLnNldCh0aGlzLCBJVEVSLCB7bzogaXRlcmF0ZWQsIGs6IHVuZGVmaW5lZCwgaTogMH0pO1xufVxuJGl0ZXIuY3JlYXRlKEVudW1lcmF0ZSwgJ09iamVjdCcsIGZ1bmN0aW9uKCl7XG4gIHZhciBpdGVyID0gdGhpc1tJVEVSXVxuICAgICwga2V5cyA9IGl0ZXIua1xuICAgICwga2V5O1xuICBpZihrZXlzID09IHVuZGVmaW5lZCl7XG4gICAgaXRlci5rID0ga2V5cyA9IFtdO1xuICAgIGZvcihrZXkgaW4gaXRlci5vKWtleXMucHVzaChrZXkpO1xuICB9XG4gIGRvIHtcbiAgICBpZihpdGVyLmkgPj0ga2V5cy5sZW5ndGgpcmV0dXJuIHN0ZXAoMSk7XG4gIH0gd2hpbGUoISgoa2V5ID0ga2V5c1tpdGVyLmkrK10pIGluIGl0ZXIubykpO1xuICByZXR1cm4gc3RlcCgwLCBrZXkpO1xufSk7XG5cbnZhciByZWZsZWN0ID0ge1xuICAvLyAyNi4xLjEgUmVmbGVjdC5hcHBseSh0YXJnZXQsIHRoaXNBcmd1bWVudCwgYXJndW1lbnRzTGlzdClcbiAgYXBwbHk6IGZ1bmN0aW9uIGFwcGx5KHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KXtcbiAgICByZXR1cm4gX2FwcGx5LmNhbGwodGFyZ2V0LCB0aGlzQXJndW1lbnQsIGFyZ3VtZW50c0xpc3QpO1xuICB9LFxuICAvLyAyNi4xLjIgUmVmbGVjdC5jb25zdHJ1Y3QodGFyZ2V0LCBhcmd1bWVudHNMaXN0IFssIG5ld1RhcmdldF0pXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gY29uc3RydWN0KHRhcmdldCwgYXJndW1lbnRzTGlzdCAvKiwgbmV3VGFyZ2V0Ki8pe1xuICAgIHZhciBwcm90byAgICA9IGFzc2VydC5mbihhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHRhcmdldCA6IGFyZ3VtZW50c1syXSkucHJvdG90eXBlXG4gICAgICAsIGluc3RhbmNlID0gJC5jcmVhdGUoaXNPYmplY3QocHJvdG8pID8gcHJvdG8gOiBPYmplY3QucHJvdG90eXBlKVxuICAgICAgLCByZXN1bHQgICA9IF9hcHBseS5jYWxsKHRhcmdldCwgaW5zdGFuY2UsIGFyZ3VtZW50c0xpc3QpO1xuICAgIHJldHVybiBpc09iamVjdChyZXN1bHQpID8gcmVzdWx0IDogaW5zdGFuY2U7XG4gIH0sXG4gIC8vIDI2LjEuMyBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKXtcbiAgICBhc3NlcnRPYmplY3QodGFyZ2V0KTtcbiAgICB0cnkge1xuICAgICAgJC5zZXREZXNjKHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIC8vIDI2LjEuNCBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXkpXG4gIGRlbGV0ZVByb3BlcnR5OiBmdW5jdGlvbiBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5KXtcbiAgICB2YXIgZGVzYyA9ICQuZ2V0RGVzYyhhc3NlcnRPYmplY3QodGFyZ2V0KSwgcHJvcGVydHlLZXkpO1xuICAgIHJldHVybiBkZXNjICYmICFkZXNjLmNvbmZpZ3VyYWJsZSA/IGZhbHNlIDogZGVsZXRlIHRhcmdldFtwcm9wZXJ0eUtleV07XG4gIH0sXG4gIC8vIDI2LjEuNiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5S2V5IFssIHJlY2VpdmVyXSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQodGFyZ2V0LCBwcm9wZXJ0eUtleS8qLCByZWNlaXZlciovKXtcbiAgICB2YXIgcmVjZWl2ZXIgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHRhcmdldCA6IGFyZ3VtZW50c1syXVxuICAgICAgLCBkZXNjID0gJC5nZXREZXNjKGFzc2VydE9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSksIHByb3RvO1xuICAgIGlmKGRlc2MpcmV0dXJuICQuaGFzKGRlc2MsICd2YWx1ZScpXG4gICAgICA/IGRlc2MudmFsdWVcbiAgICAgIDogZGVzYy5nZXQgPT09IHVuZGVmaW5lZFxuICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICA6IGRlc2MuZ2V0LmNhbGwocmVjZWl2ZXIpO1xuICAgIHJldHVybiBpc09iamVjdChwcm90byA9IGdldFByb3RvKHRhcmdldCkpXG4gICAgICA/IGdldChwcm90bywgcHJvcGVydHlLZXksIHJlY2VpdmVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIC8vIDI2LjEuNyBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KXtcbiAgICByZXR1cm4gJC5nZXREZXNjKGFzc2VydE9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSk7XG4gIH0sXG4gIC8vIDI2LjEuOCBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClcbiAgZ2V0UHJvdG90eXBlT2Y6IGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKHRhcmdldCl7XG4gICAgcmV0dXJuIGdldFByb3RvKGFzc2VydE9iamVjdCh0YXJnZXQpKTtcbiAgfSxcbiAgLy8gMjYuMS45IFJlZmxlY3QuaGFzKHRhcmdldCwgcHJvcGVydHlLZXkpXG4gIGhhczogZnVuY3Rpb24gaGFzKHRhcmdldCwgcHJvcGVydHlLZXkpe1xuICAgIHJldHVybiBwcm9wZXJ0eUtleSBpbiB0YXJnZXQ7XG4gIH0sXG4gIC8vIDI2LjEuMTAgUmVmbGVjdC5pc0V4dGVuc2libGUodGFyZ2V0KVxuICBpc0V4dGVuc2libGU6IGZ1bmN0aW9uIGlzRXh0ZW5zaWJsZSh0YXJnZXQpe1xuICAgIHJldHVybiBfaXNFeHRlbnNpYmxlKGFzc2VydE9iamVjdCh0YXJnZXQpKTtcbiAgfSxcbiAgLy8gMjYuMS4xMSBSZWZsZWN0Lm93bktleXModGFyZ2V0KVxuICBvd25LZXlzOiByZXF1aXJlKCcuLyQub3duLWtleXMnKSxcbiAgLy8gMjYuMS4xMiBSZWZsZWN0LnByZXZlbnRFeHRlbnNpb25zKHRhcmdldClcbiAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKHRhcmdldCl7XG4gICAgYXNzZXJ0T2JqZWN0KHRhcmdldCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmKF9wcmV2ZW50RXh0ZW5zaW9ucylfcHJldmVudEV4dGVuc2lvbnModGFyZ2V0KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuICAvLyAyNi4xLjEzIFJlZmxlY3Quc2V0KHRhcmdldCwgcHJvcGVydHlLZXksIFYgWywgcmVjZWl2ZXJdKVxuICBzZXQ6IGZ1bmN0aW9uIHNldCh0YXJnZXQsIHByb3BlcnR5S2V5LCBWLyosIHJlY2VpdmVyKi8pe1xuICAgIHZhciByZWNlaXZlciA9IGFyZ3VtZW50cy5sZW5ndGggPCA0ID8gdGFyZ2V0IDogYXJndW1lbnRzWzNdXG4gICAgICAsIG93bkRlc2MgID0gJC5nZXREZXNjKGFzc2VydE9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSlcbiAgICAgICwgZXhpc3RpbmdEZXNjcmlwdG9yLCBwcm90bztcbiAgICBpZighb3duRGVzYyl7XG4gICAgICBpZihpc09iamVjdChwcm90byA9IGdldFByb3RvKHRhcmdldCkpKXtcbiAgICAgICAgcmV0dXJuIHNldChwcm90bywgcHJvcGVydHlLZXksIFYsIHJlY2VpdmVyKTtcbiAgICAgIH1cbiAgICAgIG93bkRlc2MgPSAkLmRlc2MoMCk7XG4gICAgfVxuICAgIGlmKCQuaGFzKG93bkRlc2MsICd2YWx1ZScpKXtcbiAgICAgIGlmKG93bkRlc2Mud3JpdGFibGUgPT09IGZhbHNlIHx8ICFpc09iamVjdChyZWNlaXZlcikpcmV0dXJuIGZhbHNlO1xuICAgICAgZXhpc3RpbmdEZXNjcmlwdG9yID0gJC5nZXREZXNjKHJlY2VpdmVyLCBwcm9wZXJ0eUtleSkgfHwgJC5kZXNjKDApO1xuICAgICAgZXhpc3RpbmdEZXNjcmlwdG9yLnZhbHVlID0gVjtcbiAgICAgICQuc2V0RGVzYyhyZWNlaXZlciwgcHJvcGVydHlLZXksIGV4aXN0aW5nRGVzY3JpcHRvcik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG93bkRlc2Muc2V0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IChvd25EZXNjLnNldC5jYWxsKHJlY2VpdmVyLCBWKSwgdHJ1ZSk7XG4gIH1cbn07XG4vLyAyNi4xLjE0IFJlZmxlY3Quc2V0UHJvdG90eXBlT2YodGFyZ2V0LCBwcm90bylcbmlmKHNldFByb3RvKXJlZmxlY3Quc2V0UHJvdG90eXBlT2YgPSBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKXtcbiAgc2V0UHJvdG8uY2hlY2sodGFyZ2V0LCBwcm90byk7XG4gIHRyeSB7XG4gICAgc2V0UHJvdG8uc2V0KHRhcmdldCwgcHJvdG8pO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuJGRlZigkZGVmLkcsIHtSZWZsZWN0OiB7fX0pO1xuXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqIGJ1Z2d5RW51bWVyYXRlLCAnUmVmbGVjdCcsIHtcbiAgLy8gMjYuMS41IFJlZmxlY3QuZW51bWVyYXRlKHRhcmdldClcbiAgZW51bWVyYXRlOiBmdW5jdGlvbiBlbnVtZXJhdGUodGFyZ2V0KXtcbiAgICByZXR1cm4gbmV3IEVudW1lcmF0ZShhc3NlcnRPYmplY3QodGFyZ2V0KSk7XG4gIH1cbn0pO1xuXG4kZGVmKCRkZWYuUywgJ1JlZmxlY3QnLCByZWZsZWN0KTsiLCJ2YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY29mICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsICRSZWdFeHAgPSAkLmcuUmVnRXhwXG4gICwgQmFzZSAgICA9ICRSZWdFeHBcbiAgLCBwcm90byAgID0gJFJlZ0V4cC5wcm90b3R5cGVcbiAgLCByZSAgICAgID0gL2EvZ1xuICAvLyBcIm5ld1wiIGNyZWF0ZXMgYSBuZXcgb2JqZWN0XG4gICwgQ09SUkVDVF9ORVcgPSBuZXcgJFJlZ0V4cChyZSkgIT09IHJlXG4gIC8vIFJlZ0V4cCBhbGxvd3MgYSByZWdleCB3aXRoIGZsYWdzIGFzIHRoZSBwYXR0ZXJuXG4gICwgQUxMT1dTX1JFX1dJVEhfRkxBR1MgPSBmdW5jdGlvbigpe1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gJFJlZ0V4cChyZSwgJ2knKSA9PSAnL2EvaSc7XG4gICAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICB9KCk7XG5pZigkLkZXICYmICQuREVTQyl7XG4gIGlmKCFDT1JSRUNUX05FVyB8fCAhQUxMT1dTX1JFX1dJVEhfRkxBR1Mpe1xuICAgICRSZWdFeHAgPSBmdW5jdGlvbiBSZWdFeHAocGF0dGVybiwgZmxhZ3Mpe1xuICAgICAgdmFyIHBhdHRlcm5Jc1JlZ0V4cCAgPSBjb2YocGF0dGVybikgPT0gJ1JlZ0V4cCdcbiAgICAgICAgLCBmbGFnc0lzVW5kZWZpbmVkID0gZmxhZ3MgPT09IHVuZGVmaW5lZDtcbiAgICAgIGlmKCEodGhpcyBpbnN0YW5jZW9mICRSZWdFeHApICYmIHBhdHRlcm5Jc1JlZ0V4cCAmJiBmbGFnc0lzVW5kZWZpbmVkKXJldHVybiBwYXR0ZXJuO1xuICAgICAgcmV0dXJuIENPUlJFQ1RfTkVXXG4gICAgICAgID8gbmV3IEJhc2UocGF0dGVybklzUmVnRXhwICYmICFmbGFnc0lzVW5kZWZpbmVkID8gcGF0dGVybi5zb3VyY2UgOiBwYXR0ZXJuLCBmbGFncylcbiAgICAgICAgOiBuZXcgQmFzZShwYXR0ZXJuSXNSZWdFeHAgPyBwYXR0ZXJuLnNvdXJjZSA6IHBhdHRlcm5cbiAgICAgICAgICAsIHBhdHRlcm5Jc1JlZ0V4cCAmJiBmbGFnc0lzVW5kZWZpbmVkID8gcGF0dGVybi5mbGFncyA6IGZsYWdzKTtcbiAgICB9O1xuICAgICQuZWFjaC5jYWxsKCQuZ2V0TmFtZXMoQmFzZSksIGZ1bmN0aW9uKGtleSl7XG4gICAgICBrZXkgaW4gJFJlZ0V4cCB8fCAkLnNldERlc2MoJFJlZ0V4cCwga2V5LCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gQmFzZVtrZXldOyB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGl0KXsgQmFzZVtrZXldID0gaXQ7IH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHByb3RvLmNvbnN0cnVjdG9yID0gJFJlZ0V4cDtcbiAgICAkUmVnRXhwLnByb3RvdHlwZSA9IHByb3RvO1xuICAgIHJlcXVpcmUoJy4vJC5yZWRlZicpKCQuZywgJ1JlZ0V4cCcsICRSZWdFeHApO1xuICB9XG4gIC8vIDIxLjIuNS4zIGdldCBSZWdFeHAucHJvdG90eXBlLmZsYWdzKClcbiAgaWYoLy4vZy5mbGFncyAhPSAnZycpJC5zZXREZXNjKHByb3RvLCAnZmxhZ3MnLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogcmVxdWlyZSgnLi8kLnJlcGxhY2VyJykoL14uKlxcLyhcXHcqKSQvLCAnJDEnKVxuICB9KTtcbn1cbnJlcXVpcmUoJy4vJC5zcGVjaWVzJykoJFJlZ0V4cCk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXN0cm9uZycpO1xuXG4vLyAyMy4yIFNldCBPYmplY3RzXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdTZXQnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gU2V0KCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzWzBdKTsgfTtcbn0sIHtcbiAgLy8gMjMuMi4zLjEgU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKXtcbiAgICByZXR1cm4gc3Ryb25nLmRlZih0aGlzLCB2YWx1ZSA9IHZhbHVlID09PSAwID8gMCA6IHZhbHVlLCB2YWx1ZSk7XG4gIH1cbn0sIHN0cm9uZyk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkYXQgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1hdCcpKGZhbHNlKTtcbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuMyBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0KHBvcylcbiAgY29kZVBvaW50QXQ6IGZ1bmN0aW9uIGNvZGVQb2ludEF0KHBvcyl7XG4gICAgcmV0dXJuICRhdCh0aGlzLCBwb3MpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY29mICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b0xlbmd0aCA9ICQudG9MZW5ndGg7XG5cbi8vIHNob3VsZCB0aHJvdyBlcnJvciBvbiByZWdleFxuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiAhcmVxdWlyZSgnLi8kLnRocm93cycpKGZ1bmN0aW9uKCl7ICdxJy5lbmRzV2l0aCgvLi8pOyB9KSwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4zLjYgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aChzZWFyY2hTdHJpbmcgWywgZW5kUG9zaXRpb25dKVxuICBlbmRzV2l0aDogZnVuY3Rpb24gZW5kc1dpdGgoc2VhcmNoU3RyaW5nIC8qLCBlbmRQb3NpdGlvbiA9IEBsZW5ndGggKi8pe1xuICAgIGlmKGNvZihzZWFyY2hTdHJpbmcpID09ICdSZWdFeHAnKXRocm93IFR5cGVFcnJvcigpO1xuICAgIHZhciB0aGF0ID0gU3RyaW5nKCQuYXNzZXJ0RGVmaW5lZCh0aGlzKSlcbiAgICAgICwgZW5kUG9zaXRpb24gPSBhcmd1bWVudHNbMV1cbiAgICAgICwgbGVuID0gdG9MZW5ndGgodGhhdC5sZW5ndGgpXG4gICAgICAsIGVuZCA9IGVuZFBvc2l0aW9uID09PSB1bmRlZmluZWQgPyBsZW4gOiBNYXRoLm1pbih0b0xlbmd0aChlbmRQb3NpdGlvbiksIGxlbik7XG4gICAgc2VhcmNoU3RyaW5nICs9ICcnO1xuICAgIHJldHVybiB0aGF0LnNsaWNlKGVuZCAtIHNlYXJjaFN0cmluZy5sZW5ndGgsIGVuZCkgPT09IHNlYXJjaFN0cmluZztcbiAgfVxufSk7IiwidmFyICRkZWYgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b0luZGV4ID0gcmVxdWlyZSgnLi8kJykudG9JbmRleFxuICAsIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGVcbiAgLCAkZnJvbUNvZGVQb2ludCA9IFN0cmluZy5mcm9tQ29kZVBvaW50O1xuXG4vLyBsZW5ndGggc2hvdWxkIGJlIDEsIG9sZCBGRiBwcm9ibGVtXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICghISRmcm9tQ29kZVBvaW50ICYmICRmcm9tQ29kZVBvaW50Lmxlbmd0aCAhPSAxKSwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4yLjIgU3RyaW5nLmZyb21Db2RlUG9pbnQoLi4uY29kZVBvaW50cylcbiAgZnJvbUNvZGVQb2ludDogZnVuY3Rpb24gZnJvbUNvZGVQb2ludCh4KXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciByZXMgPSBbXVxuICAgICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIGkgICA9IDBcbiAgICAgICwgY29kZTtcbiAgICB3aGlsZShsZW4gPiBpKXtcbiAgICAgIGNvZGUgPSArYXJndW1lbnRzW2krK107XG4gICAgICBpZih0b0luZGV4KGNvZGUsIDB4MTBmZmZmKSAhPT0gY29kZSl0aHJvdyBSYW5nZUVycm9yKGNvZGUgKyAnIGlzIG5vdCBhIHZhbGlkIGNvZGUgcG9pbnQnKTtcbiAgICAgIHJlcy5wdXNoKGNvZGUgPCAweDEwMDAwXG4gICAgICAgID8gZnJvbUNoYXJDb2RlKGNvZGUpXG4gICAgICAgIDogZnJvbUNoYXJDb2RlKCgoY29kZSAtPSAweDEwMDAwKSA+PiAxMCkgKyAweGQ4MDAsIGNvZGUgJSAweDQwMCArIDB4ZGMwMClcbiAgICAgICk7XG4gICAgfSByZXR1cm4gcmVzLmpvaW4oJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY29mICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuNyBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzKHNlYXJjaFN0cmluZywgcG9zaXRpb24gPSAwKVxuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xuICAgIGlmKGNvZihzZWFyY2hTdHJpbmcpID09ICdSZWdFeHAnKXRocm93IFR5cGVFcnJvcigpO1xuICAgIHJldHVybiAhIX5TdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoaXMpKS5pbmRleE9mKHNlYXJjaFN0cmluZywgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7IiwidmFyIHNldCAgID0gcmVxdWlyZSgnLi8kJykuc2V0XG4gICwgJGF0ICAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSlcbiAgLCBJVEVSICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdpdGVyJylcbiAgLCAkaXRlciA9IHJlcXVpcmUoJy4vJC5pdGVyJylcbiAgLCBzdGVwICA9ICRpdGVyLnN0ZXA7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgc2V0KHRoaXMsIElURVIsIHtvOiBTdHJpbmcoaXRlcmF0ZWQpLCBpOiAwfSk7XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgaXRlciAgPSB0aGlzW0lURVJdXG4gICAgLCBPICAgICA9IGl0ZXIub1xuICAgICwgaW5kZXggPSBpdGVyLmlcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4gc3RlcCgxKTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICBpdGVyLmkgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4gc3RlcCgwLCBwb2ludCk7XG59KTsiLCJ2YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMi40IFN0cmluZy5yYXcoY2FsbFNpdGUsIC4uLnN1YnN0aXR1dGlvbnMpXG4gIHJhdzogZnVuY3Rpb24gcmF3KGNhbGxTaXRlKXtcbiAgICB2YXIgdHBsID0gJC50b09iamVjdChjYWxsU2l0ZS5yYXcpXG4gICAgICAsIGxlbiA9ICQudG9MZW5ndGgodHBsLmxlbmd0aClcbiAgICAgICwgc2xuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCByZXMgPSBbXVxuICAgICAgLCBpICAgPSAwO1xuICAgIHdoaWxlKGxlbiA+IGkpe1xuICAgICAgcmVzLnB1c2goU3RyaW5nKHRwbFtpKytdKSk7XG4gICAgICBpZihpIDwgc2xuKXJlcy5wdXNoKFN0cmluZyhhcmd1bWVudHNbaV0pKTtcbiAgICB9IHJldHVybiByZXMuam9pbignJyk7XG4gIH1cbn0pOyIsInZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuXG4kZGVmKCRkZWYuUCwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4zLjEzIFN0cmluZy5wcm90b3R5cGUucmVwZWF0KGNvdW50KVxuICByZXBlYXQ6IHJlcXVpcmUoJy4vJC5zdHJpbmctcmVwZWF0Jylcbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjb2YgID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuLy8gc2hvdWxkIHRocm93IGVycm9yIG9uIHJlZ2V4XG4kZGVmKCRkZWYuUCArICRkZWYuRiAqICFyZXF1aXJlKCcuLyQudGhyb3dzJykoZnVuY3Rpb24oKXsgJ3EnLnN0YXJ0c1dpdGgoLy4vKTsgfSksICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4xOCBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIFssIHBvc2l0aW9uIF0pXG4gIHN0YXJ0c1dpdGg6IGZ1bmN0aW9uIHN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xuICAgIGlmKGNvZihzZWFyY2hTdHJpbmcpID09ICdSZWdFeHAnKXRocm93IFR5cGVFcnJvcigpO1xuICAgIHZhciB0aGF0ICA9IFN0cmluZygkLmFzc2VydERlZmluZWQodGhpcykpXG4gICAgICAsIGluZGV4ID0gJC50b0xlbmd0aChNYXRoLm1pbihhcmd1bWVudHNbMV0sIHRoYXQubGVuZ3RoKSk7XG4gICAgc2VhcmNoU3RyaW5nICs9ICcnO1xuICAgIHJldHVybiB0aGF0LnNsaWNlKGluZGV4LCBpbmRleCArIHNlYXJjaFN0cmluZy5sZW5ndGgpID09PSBzZWFyY2hTdHJpbmc7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgc2V0VGFnICAgPSByZXF1aXJlKCcuLyQuY29mJykuc2V0XG4gICwgdWlkICAgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCBzaGFyZWQgICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKVxuICAsICRkZWYgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHJlZGVmICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKVxuICAsIGtleU9mICAgID0gcmVxdWlyZSgnLi8kLmtleW9mJylcbiAgLCBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vJC5lbnVtLWtleXMnKVxuICAsIGFzc2VydE9iamVjdCA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5vYmpcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGVcbiAgLCBERVNDICAgICA9ICQuREVTQ1xuICAsIGhhcyAgICAgID0gJC5oYXNcbiAgLCAkY3JlYXRlICA9ICQuY3JlYXRlXG4gICwgZ2V0RGVzYyAgPSAkLmdldERlc2NcbiAgLCBzZXREZXNjICA9ICQuc2V0RGVzY1xuICAsIGRlc2MgICAgID0gJC5kZXNjXG4gICwgJG5hbWVzICAgPSByZXF1aXJlKCcuLyQuZ2V0LW5hbWVzJylcbiAgLCBnZXROYW1lcyA9ICRuYW1lcy5nZXRcbiAgLCB0b09iamVjdCA9ICQudG9PYmplY3RcbiAgLCAkU3ltYm9sICA9ICQuZy5TeW1ib2xcbiAgLCBzZXR0ZXIgICA9IGZhbHNlXG4gICwgVEFHICAgICAgPSB1aWQoJ3RhZycpXG4gICwgSElEREVOICAgPSB1aWQoJ2hpZGRlbicpXG4gICwgX3Byb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCB1c2VOYXRpdmUgPSAkLmlzRnVuY3Rpb24oJFN5bWJvbCk7XG5cbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQyA/IGZ1bmN0aW9uKCl7IC8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZFxuICB0cnkge1xuICAgIHJldHVybiAkY3JlYXRlKHNldERlc2Moe30sIEhJRERFTiwge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gc2V0RGVzYyh0aGlzLCBISURERU4sIHt2YWx1ZTogZmFsc2V9KVtISURERU5dO1xuICAgICAgfVxuICAgIH0pKVtISURERU5dIHx8IHNldERlc2M7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICAgICAgdmFyIHByb3RvRGVzYyA9IGdldERlc2MoT2JqZWN0UHJvdG8sIGtleSk7XG4gICAgICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gICAgICBzZXREZXNjKGl0LCBrZXksIEQpO1xuICAgICAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylzZXREZXNjKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG4gICAgfTtcbiAgfVxufSgpIDogc2V0RGVzYztcblxuZnVuY3Rpb24gd3JhcCh0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gJC5zZXQoJGNyZWF0ZSgkU3ltYm9sLnByb3RvdHlwZSksIFRBRywgdGFnKTtcbiAgREVTQyAmJiBzZXR0ZXIgJiYgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGRlc2MoMSwgdmFsdWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3ltO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKXNldERlc2MoaXQsIEhJRERFTiwgZGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSAkY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBkZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIHNldERlc2MoaXQsIGtleSwgRCk7XG59XG5mdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYXNzZXJ0T2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9PYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKWRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyAkY3JlYXRlKGl0KSA6IGRlZmluZVByb3BlcnRpZXMoJGNyZWF0ZShpdCksIFApO1xufVxuZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBfcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0aGlzLCBrZXkpO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldXG4gICAgPyBFIDogdHJ1ZTtcbn1cbmZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgdmFyIEQgPSBnZXREZXNjKGl0ID0gdG9PYmplY3QoaXQpLCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59XG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOKXJlc3VsdC5wdXNoKGtleSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ2V0TmFtZXModG9PYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighdXNlTmF0aXZlKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgcmV0dXJuIHdyYXAodWlkKGFyZ3VtZW50c1swXSkpO1xuICB9O1xuICAkcmVkZWYoJFN5bWJvbC5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXNbVEFHXTtcbiAgfSk7XG5cbiAgJC5jcmVhdGUgICAgID0gY3JlYXRlO1xuICAkLnNldERlc2MgICAgPSBkZWZpbmVQcm9wZXJ0eTtcbiAgJC5nZXREZXNjICAgID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkLnNldERlc2NzICAgPSBkZWZpbmVQcm9wZXJ0aWVzO1xuICAkLmdldE5hbWVzICAgPSAkbmFtZXMuZ2V0ID0gZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgJC5nZXRTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKCQuREVTQyAmJiAkLkZXKSRyZWRlZihPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xufVxuXG52YXIgc3ltYm9sU3RhdGljcyA9IHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICByZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufTtcbi8vIDE5LjQuMi4yIFN5bWJvbC5oYXNJbnN0YW5jZVxuLy8gMTkuNC4yLjMgU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZVxuLy8gMTkuNC4yLjQgU3ltYm9sLml0ZXJhdG9yXG4vLyAxOS40LjIuNiBTeW1ib2wubWF0Y2hcbi8vIDE5LjQuMi44IFN5bWJvbC5yZXBsYWNlXG4vLyAxOS40LjIuOSBTeW1ib2wuc2VhcmNoXG4vLyAxOS40LjIuMTAgU3ltYm9sLnNwZWNpZXNcbi8vIDE5LjQuMi4xMSBTeW1ib2wuc3BsaXRcbi8vIDE5LjQuMi4xMiBTeW1ib2wudG9QcmltaXRpdmVcbi8vIDE5LjQuMi4xMyBTeW1ib2wudG9TdHJpbmdUYWdcbi8vIDE5LjQuMi4xNCBTeW1ib2wudW5zY29wYWJsZXNcbiQuZWFjaC5jYWxsKChcbiAgICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLCcgK1xuICAgICdzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuICApLnNwbGl0KCcsJyksIGZ1bmN0aW9uKGl0KXtcbiAgICB2YXIgc3ltID0gcmVxdWlyZSgnLi8kLndrcycpKGl0KTtcbiAgICBzeW1ib2xTdGF0aWNzW2l0XSA9IHVzZU5hdGl2ZSA/IHN5bSA6IHdyYXAoc3ltKTtcbiAgfVxuKTtcblxuc2V0dGVyID0gdHJ1ZTtcblxuJGRlZigkZGVmLkcgKyAkZGVmLlcsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuJGRlZigkZGVmLlMsICdTeW1ib2wnLCBzeW1ib2xTdGF0aWNzKTtcblxuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6IGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiBkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiBnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRhZygkLmcuSlNPTiwgJ0pTT04nLCB0cnVlKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCB3ZWFrICAgICAgPSByZXF1aXJlKCcuLyQuY29sbGVjdGlvbi13ZWFrJylcbiAgLCBsZWFrU3RvcmUgPSB3ZWFrLmxlYWtTdG9yZVxuICAsIElEICAgICAgICA9IHdlYWsuSURcbiAgLCBXRUFLICAgICAgPSB3ZWFrLldFQUtcbiAgLCBoYXMgICAgICAgPSAkLmhhc1xuICAsIGlzT2JqZWN0ICA9ICQuaXNPYmplY3RcbiAgLCBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgdG1wICAgICAgID0ge307XG5cbi8vIDIzLjMgV2Vha01hcCBPYmplY3RzXG52YXIgJFdlYWtNYXAgPSByZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdXZWFrTWFwJywgZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFdlYWtNYXAoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHNbMF0pOyB9O1xufSwge1xuICAvLyAyMy4zLjMuMyBXZWFrTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpe1xuICAgIGlmKGlzT2JqZWN0KGtleSkpe1xuICAgICAgaWYoIWlzRXh0ZW5zaWJsZShrZXkpKXJldHVybiBsZWFrU3RvcmUodGhpcykuZ2V0KGtleSk7XG4gICAgICBpZihoYXMoa2V5LCBXRUFLKSlyZXR1cm4ga2V5W1dFQUtdW3RoaXNbSURdXTtcbiAgICB9XG4gIH0sXG4gIC8vIDIzLjMuMy41IFdlYWtNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywga2V5LCB2YWx1ZSk7XG4gIH1cbn0sIHdlYWssIHRydWUsIHRydWUpO1xuXG4vLyBJRTExIFdlYWtNYXAgZnJvemVuIGtleXMgZml4XG5pZihuZXcgJFdlYWtNYXAoKS5zZXQoKE9iamVjdC5mcmVlemUgfHwgT2JqZWN0KSh0bXApLCA3KS5nZXQodG1wKSAhPSA3KXtcbiAgJC5lYWNoLmNhbGwoWydkZWxldGUnLCAnaGFzJywgJ2dldCcsICdzZXQnXSwgZnVuY3Rpb24oa2V5KXtcbiAgICB2YXIgcHJvdG8gID0gJFdlYWtNYXAucHJvdG90eXBlXG4gICAgICAsIG1ldGhvZCA9IHByb3RvW2tleV07XG4gICAgcmVxdWlyZSgnLi8kLnJlZGVmJykocHJvdG8sIGtleSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAvLyBzdG9yZSBmcm96ZW4gb2JqZWN0cyBvbiBsZWFreSBtYXBcbiAgICAgIGlmKGlzT2JqZWN0KGEpICYmICFpc0V4dGVuc2libGUoYSkpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gbGVha1N0b3JlKHRoaXMpW2tleV0oYSwgYik7XG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NldCcgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgLy8gc3RvcmUgYWxsIHRoZSByZXN0IG9uIG5hdGl2ZSB3ZWFrbWFwXG4gICAgICB9IHJldHVybiBtZXRob2QuY2FsbCh0aGlzLCBhLCBiKTtcbiAgICB9KTtcbiAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlYWsgPSByZXF1aXJlKCcuLyQuY29sbGVjdGlvbi13ZWFrJyk7XG5cbi8vIDIzLjQgV2Vha1NldCBPYmplY3RzXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdXZWFrU2V0JywgZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFdlYWtTZXQoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHNbMF0pOyB9O1xufSwge1xuICAvLyAyMy40LjMuMSBXZWFrU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywgdmFsdWUsIHRydWUpO1xuICB9XG59LCB3ZWFrLCBmYWxzZSwgdHJ1ZSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWYgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRpbmNsdWRlcyA9IHJlcXVpcmUoJy4vJC5hcnJheS1pbmNsdWRlcycpKHRydWUpO1xuJGRlZigkZGVmLlAsICdBcnJheScsIHtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2RvbWVuaWMvQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhlbCAvKiwgZnJvbUluZGV4ID0gMCAqLyl7XG4gICAgcmV0dXJuICRpbmNsdWRlcyh0aGlzLCBlbCwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuLyQudW5zY29wZScpKCdpbmNsdWRlcycpOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXRvLWpzb24nKSgnTWFwJyk7IiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi85MzUzNzgxXG52YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIG93bktleXMgPSByZXF1aXJlKCcuLyQub3duLWtleXMnKTtcblxuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnM6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqZWN0KXtcbiAgICB2YXIgTyAgICAgID0gJC50b09iamVjdChvYmplY3QpXG4gICAgICAsIHJlc3VsdCA9IHt9O1xuICAgICQuZWFjaC5jYWxsKG93bktleXMoTyksIGZ1bmN0aW9uKGtleSl7XG4gICAgICAkLnNldERlc2MocmVzdWx0LCBrZXksICQuZGVzYygwLCAkLmdldERlc2MoTywga2V5KSkpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pOyIsIi8vIGh0dHA6Ly9nb28uZ2wvWGtCcmpEXG52YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdFRvQXJyYXkoaXNFbnRyaWVzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgdmFyIE8gICAgICA9ICQudG9PYmplY3Qob2JqZWN0KVxuICAgICAgLCBrZXlzICAgPSAkLmdldEtleXMoTylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaSAgICAgID0gMFxuICAgICAgLCByZXN1bHQgPSBBcnJheShsZW5ndGgpXG4gICAgICAsIGtleTtcbiAgICBpZihpc0VudHJpZXMpd2hpbGUobGVuZ3RoID4gaSlyZXN1bHRbaV0gPSBba2V5ID0ga2V5c1tpKytdLCBPW2tleV1dO1xuICAgIGVsc2Ugd2hpbGUobGVuZ3RoID4gaSlyZXN1bHRbaV0gPSBPW2tleXNbaSsrXV07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cbiRkZWYoJGRlZi5TLCAnT2JqZWN0Jywge1xuICB2YWx1ZXM6ICBjcmVhdGVPYmplY3RUb0FycmF5KGZhbHNlKSxcbiAgZW50cmllczogY3JlYXRlT2JqZWN0VG9BcnJheSh0cnVlKVxufSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2JlbmphbWluZ3IvUmV4RXhwLmVzY2FwZVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG4kZGVmKCRkZWYuUywgJ1JlZ0V4cCcsIHtcbiAgZXNjYXBlOiByZXF1aXJlKCcuLyQucmVwbGFjZXInKSgvW1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnLCB0cnVlKVxufSk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbi10by1qc29uJykoJ1NldCcpOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbid1c2Ugc3RyaWN0JztcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJGF0ICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKTtcbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xuICBhdDogZnVuY3Rpb24gYXQocG9zKXtcbiAgICByZXR1cm4gJGF0KHRoaXMsIHBvcyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHBhZCA9IHJlcXVpcmUoJy4vJC5zdHJpbmctcGFkJyk7XG4kZGVmKCRkZWYuUCwgJ1N0cmluZycsIHtcbiAgbHBhZDogZnVuY3Rpb24gbHBhZChuKXtcbiAgICByZXR1cm4gJHBhZCh0aGlzLCBuLCBhcmd1bWVudHNbMV0sIHRydWUpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRwYWQgPSByZXF1aXJlKCcuLyQuc3RyaW5nLXBhZCcpO1xuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7XG4gIHJwYWQ6IGZ1bmN0aW9uIHJwYWQobil7XG4gICAgcmV0dXJuICRwYWQodGhpcywgbiwgYXJndW1lbnRzWzFdLCBmYWxzZSk7XG4gIH1cbn0pOyIsIi8vIEphdmFTY3JpcHQgMS42IC8gU3RyYXdtYW4gYXJyYXkgc3RhdGljcyBzaGltXG52YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRBcnJheSAgPSAkLmNvcmUuQXJyYXkgfHwgQXJyYXlcbiAgLCBzdGF0aWNzID0ge307XG5mdW5jdGlvbiBzZXRTdGF0aWNzKGtleXMsIGxlbmd0aCl7XG4gICQuZWFjaC5jYWxsKGtleXMuc3BsaXQoJywnKSwgZnVuY3Rpb24oa2V5KXtcbiAgICBpZihsZW5ndGggPT0gdW5kZWZpbmVkICYmIGtleSBpbiAkQXJyYXkpc3RhdGljc1trZXldID0gJEFycmF5W2tleV07XG4gICAgZWxzZSBpZihrZXkgaW4gW10pc3RhdGljc1trZXldID0gcmVxdWlyZSgnLi8kLmN0eCcpKEZ1bmN0aW9uLmNhbGwsIFtdW2tleV0sIGxlbmd0aCk7XG4gIH0pO1xufVxuc2V0U3RhdGljcygncG9wLHJldmVyc2Usc2hpZnQsa2V5cyx2YWx1ZXMsZW50cmllcycsIDEpO1xuc2V0U3RhdGljcygnaW5kZXhPZixldmVyeSxzb21lLGZvckVhY2gsbWFwLGZpbHRlcixmaW5kLGZpbmRJbmRleCxpbmNsdWRlcycsIDMpO1xuc2V0U3RhdGljcygnam9pbixzbGljZSxjb25jYXQscHVzaCxzcGxpY2UsdW5zaGlmdCxzb3J0LGxhc3RJbmRleE9mLCcgK1xuICAgICAgICAgICAncmVkdWNlLHJlZHVjZVJpZ2h0LGNvcHlXaXRoaW4sZmlsbCx0dXJuJyk7XG4kZGVmKCRkZWYuUywgJ0FycmF5Jywgc3RhdGljcyk7IiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciAkICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgSXRlcmF0b3JzICAgPSByZXF1aXJlKCcuLyQuaXRlcicpLkl0ZXJhdG9yc1xuICAsIElURVJBVE9SICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlWYWx1ZXMgPSBJdGVyYXRvcnMuQXJyYXlcbiAgLCBOTCAgICAgICAgICA9ICQuZy5Ob2RlTGlzdFxuICAsIEhUQyAgICAgICAgID0gJC5nLkhUTUxDb2xsZWN0aW9uXG4gICwgTkxQcm90byAgICAgPSBOTCAmJiBOTC5wcm90b3R5cGVcbiAgLCBIVENQcm90byAgICA9IEhUQyAmJiBIVEMucHJvdG90eXBlO1xuaWYoJC5GVyl7XG4gIGlmKE5MICYmICEoSVRFUkFUT1IgaW4gTkxQcm90bykpJC5oaWRlKE5MUHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gIGlmKEhUQyAmJiAhKElURVJBVE9SIGluIEhUQ1Byb3RvKSkkLmhpZGUoSFRDUHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG59XG5JdGVyYXRvcnMuTm9kZUxpc3QgPSBJdGVyYXRvcnMuSFRNTENvbGxlY3Rpb24gPSBBcnJheVZhbHVlczsiLCJ2YXIgJGRlZiAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkdGFzayA9IHJlcXVpcmUoJy4vJC50YXNrJyk7XG4kZGVmKCRkZWYuRyArICRkZWYuQiwge1xuICBzZXRJbW1lZGlhdGU6ICAgJHRhc2suc2V0LFxuICBjbGVhckltbWVkaWF0ZTogJHRhc2suY2xlYXJcbn0pOyIsIi8vIGllOS0gc2V0VGltZW91dCAmIHNldEludGVydmFsIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmaXhcbnZhciAkICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRkZWYgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGludm9rZSAgICA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIHBhcnRpYWwgICA9IHJlcXVpcmUoJy4vJC5wYXJ0aWFsJylcbiAgLCBuYXZpZ2F0b3IgPSAkLmcubmF2aWdhdG9yXG4gICwgTVNJRSAgICAgID0gISFuYXZpZ2F0b3IgJiYgL01TSUUgLlxcLi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTsgLy8gPC0gZGlydHkgaWU5LSBjaGVja1xuZnVuY3Rpb24gd3JhcChzZXQpe1xuICByZXR1cm4gTVNJRSA/IGZ1bmN0aW9uKGZuLCB0aW1lIC8qLCAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gc2V0KGludm9rZShcbiAgICAgIHBhcnRpYWwsXG4gICAgICBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksXG4gICAgICAkLmlzRnVuY3Rpb24oZm4pID8gZm4gOiBGdW5jdGlvbihmbilcbiAgICApLCB0aW1lKTtcbiAgfSA6IHNldDtcbn1cbiRkZWYoJGRlZi5HICsgJGRlZi5CICsgJGRlZi5GICogTVNJRSwge1xuICBzZXRUaW1lb3V0OiAgd3JhcCgkLmcuc2V0VGltZW91dCksXG4gIHNldEludGVydmFsOiB3cmFwKCQuZy5zZXRJbnRlcnZhbClcbn0pOyIsInJlcXVpcmUoJy4vbW9kdWxlcy9lczUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmlzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnN0YXRpY3MtYWNjZXB0LXByaW1pdGl2ZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLmNvbnN0cnVjdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5zdGF0aWNzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmZyb20tY29kZS1wb2ludCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcucmF3Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuY29kZS1wb2ludC1hdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuZW5kcy13aXRoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5pbmNsdWRlcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcucmVwZWF0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5zdGFydHMtd2l0aCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5Lm9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnNwZWNpZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuY29weS13aXRoaW4nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZmlsbCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5maW5kJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZpbmQtaW5kZXgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWFwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnNldCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi53ZWFrLW1hcCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi53ZWFrLXNldCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LmFycmF5LmluY2x1ZGVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy5hdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcubHBhZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcucnBhZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWdleHAuZXNjYXBlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC50by1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5tYXAudG8tanNvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zZXQudG8tanNvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2pzLmFycmF5LnN0YXRpY3MnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy93ZWIudGltZXJzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvd2ViLmltbWVkaWF0ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tb2R1bGVzLyQnKS5jb3JlO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9tYXN0ZXIvTElDRU5TRSBmaWxlLiBBblxuICogYWRkaXRpb25hbCBncmFudCBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluXG4gKiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgaXRlcmF0b3JTeW1ib2wgPVxuICAgIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZSgob3V0ZXJGbiB8fCBHZW5lcmF0b3IpLnByb3RvdHlwZSk7XG5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoXG4gICAgICBpbm5lckZuLCBzZWxmIHx8IG51bGwsXG4gICAgICBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSlcbiAgICApO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBydW50aW1lLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGB2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnRgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLiBTb21lIG1heSBjb25zaWRlciB0aGUgbmFtZSBvZiB0aGlzIG1ldGhvZCB0b29cbiAgLy8gY3V0ZXN5LCBidXQgdGhleSBhcmUgY3VybXVkZ2VvbnMuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gbmV3IEF3YWl0QXJndW1lbnQoYXJnKTtcbiAgfTtcblxuICBmdW5jdGlvbiBBd2FpdEFyZ3VtZW50KGFyZykge1xuICAgIHRoaXMuYXJnID0gYXJnO1xuICB9XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICAvLyBUaGlzIGludm9rZSBmdW5jdGlvbiBpcyB3cml0dGVuIGluIGEgc3R5bGUgdGhhdCBhc3N1bWVzIHNvbWVcbiAgICAvLyBjYWxsaW5nIGZ1bmN0aW9uIChvciBQcm9taXNlKSB3aWxsIGhhbmRsZSBleGNlcHRpb25zLlxuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclttZXRob2RdKGFyZyk7XG4gICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBBd2FpdEFyZ3VtZW50XG4gICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLmFyZykudGhlbihpbnZva2VOZXh0LCBpbnZva2VUaHJvdylcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0sIGludm9rZVRocm93KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgIGludm9rZSA9IHByb2Nlc3MuZG9tYWluLmJpbmQoaW52b2tlKTtcbiAgICB9XG5cbiAgICB2YXIgaW52b2tlTmV4dCA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJuZXh0XCIpO1xuICAgIHZhciBpbnZva2VUaHJvdyA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJ0aHJvd1wiKTtcbiAgICB2YXIgaW52b2tlUmV0dXJuID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInJldHVyblwiKTtcbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgdmFyIGVucXVldWVSZXN1bHQgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICAgIH0pIDogbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgIHJlc29sdmUoaW52b2tlKG1ldGhvZCwgYXJnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBlbnF1ZXVlUmVzdWx0IGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5XG4gICAgICAvLyBsYXRlciBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IsIGFuZCBjYWxsIGdlbmVyYXRvci5yZXR1cm4oKSB0b1xuICAgICAgLy8gYWxsb3cgdGhlIGdlbmVyYXRvciBhIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA9IGVucXVldWVSZXN1bHRbXCJjYXRjaFwiXShpbnZva2VSZXR1cm4pO1xuXG4gICAgICByZXR1cm4gZW5xdWV1ZVJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIgfHxcbiAgICAgICAgICAgICAgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiICYmIGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIC8vIEEgcmV0dXJuIG9yIHRocm93ICh3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gdGhyb3dcbiAgICAgICAgICAgIC8vIG1ldGhvZCkgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICAgIHZhciByZXR1cm5NZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXTtcbiAgICAgICAgICAgIGlmIChyZXR1cm5NZXRob2QpIHtcbiAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKHJldHVybk1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGFyZyk7XG4gICAgICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJldHVybiBtZXRob2QgdGhyZXcgYW4gZXhjZXB0aW9uLCBsZXQgdGhhdFxuICAgICAgICAgICAgICAgIC8vIGV4Y2VwdGlvbiBwcmV2YWlsIG92ZXIgdGhlIG9yaWdpbmFsIHJldHVybiBvciB0aHJvdy5cbiAgICAgICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgICAgIC8vIENvbnRpbnVlIHdpdGggdGhlIG91dGVyIHJldHVybiwgbm93IHRoYXQgdGhlIGRlbGVnYXRlXG4gICAgICAgICAgICAgIC8vIGl0ZXJhdG9yIGhhcyBiZWVuIHRlcm1pbmF0ZWQuXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChcbiAgICAgICAgICAgIGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0sXG4gICAgICAgICAgICBkZWxlZ2F0ZS5pdGVyYXRvcixcbiAgICAgICAgICAgIGFyZ1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIExpa2UgcmV0dXJuaW5nIGdlbmVyYXRvci50aHJvdyh1bmNhdWdodCksIGJ1dCB3aXRob3V0IHRoZVxuICAgICAgICAgICAgLy8gb3ZlcmhlYWQgb2YgYW4gZXh0cmEgZnVuY3Rpb24gY2FsbC5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBEZWxlZ2F0ZSBnZW5lcmF0b3IgcmFuIGFuZCBoYW5kbGVkIGl0cyBvd24gZXhjZXB0aW9ucyBzb1xuICAgICAgICAgIC8vIHJlZ2FyZGxlc3Mgb2Ygd2hhdCB0aGUgbWV0aG9kIHdhcywgd2UgY29udGludWUgYXMgaWYgaXQgaXNcbiAgICAgICAgICAvLyBcIm5leHRcIiB3aXRoIGFuIHVuZGVmaW5lZCBhcmcuXG4gICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgICAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuICAgICAgICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCkge1xuICAgICAgICAgICAgY29udGV4dC5zZW50ID0gYXJnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgY29udGV4dC5zZW50O1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5kZWxlZ2F0ZSAmJiBtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICB0aGlzLnNlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgLy8gUHJlLWluaXRpYWxpemUgYXQgbGVhc3QgMjAgdGVtcG9yYXJ5IHZhcmlhYmxlcyB0byBlbmFibGUgaGlkZGVuXG4gICAgICAvLyBjbGFzcyBvcHRpbWl6YXRpb25zIGZvciBzaW1wbGUgZ2VuZXJhdG9ycy5cbiAgICAgIGZvciAodmFyIHRlbXBJbmRleCA9IDAsIHRlbXBOYW1lO1xuICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCB0ZW1wTmFtZSA9IFwidFwiICsgdGVtcEluZGV4KSB8fCB0ZW1wSW5kZXggPCAyMDtcbiAgICAgICAgICAgKyt0ZW1wSW5kZXgpIHtcbiAgICAgICAgdGhpc1t0ZW1wTmFtZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gQW1vbmcgdGhlIHZhcmlvdXMgdHJpY2tzIGZvciBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbFxuICAvLyBvYmplY3QsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIG1vc3QgcmVsaWFibGUgdGVjaG5pcXVlIHRoYXQgZG9lcyBub3RcbiAgLy8gdXNlIGluZGlyZWN0IGV2YWwgKHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5KS5cbiAgdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6XG4gIHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgPyB3aW5kb3cgOlxuICB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiA/IHNlbGYgOiB0aGlzXG4pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9saWIvYmFiZWwvcG9seWZpbGxcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1jb3JlL3BvbHlmaWxsXCIpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxuLy8gbXVzdCBiZSBubyBzbGFzaGVzLCBlbXB0eSBlbGVtZW50cywgb3IgZGV2aWNlIG5hbWVzIChjOlxcKSBpbiB0aGUgYXJyYXlcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gU3BsaXQgYSBmaWxlbmFtZSBpbnRvIFtyb290LCBkaXIsIGJhc2VuYW1lLCBleHRdLCB1bml4IHZlcnNpb25cbi8vICdyb290JyBpcyBqdXN0IGEgc2xhc2gsIG9yIG5vdGhpbmcuXG52YXIgc3BsaXRQYXRoUmUgPVxuICAgIC9eKFxcLz98KShbXFxzXFxTXSo/KSgoPzpcXC57MSwyfXxbXlxcL10rP3wpKFxcLlteLlxcL10qfCkpKD86W1xcL10qKSQvO1xudmFyIHNwbGl0UGF0aCA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XG4gIHJldHVybiBzcGxpdFBhdGhSZS5leGVjKGZpbGVuYW1lKS5zbGljZSgxKTtcbn07XG5cbi8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzb2x2ZWRQYXRoID0gJycsXG4gICAgICByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcbiAgICB2YXIgcGF0aCA9IChpID49IDApID8gYXJndW1lbnRzW2ldIDogcHJvY2Vzcy5jd2QoKTtcblxuICAgIC8vIFNraXAgZW1wdHkgYW5kIGludmFsaWQgZW50cmllc1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLnJlc29sdmUgbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfSBlbHNlIGlmICghcGF0aCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbiAgfVxuXG4gIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcbiAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihyZXNvbHZlZFBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhcmVzb2x2ZWRBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIHJldHVybiAoKHJlc29sdmVkQWJzb2x1dGUgPyAnLycgOiAnJykgKyByZXNvbHZlZFBhdGgpIHx8ICcuJztcbn07XG5cbi8vIHBhdGgubm9ybWFsaXplKHBhdGgpXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCksXG4gICAgICB0cmFpbGluZ1NsYXNoID0gc3Vic3RyKHBhdGgsIC0xKSA9PT0gJy8nO1xuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICBwYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhaXNBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIGlmICghcGF0aCAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHBhdGggPSAnLic7XG4gIH1cbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xuICAgIHBhdGggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIChpc0Fic29sdXRlID8gJy8nIDogJycpICsgcGF0aDtcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmpvaW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBhdGhzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIGV4cG9ydHMubm9ybWFsaXplKGZpbHRlcihwYXRocywgZnVuY3Rpb24ocCwgaW5kZXgpIHtcbiAgICBpZiAodHlwZW9mIHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5qb2luIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfSkuam9pbignLycpKTtcbn07XG5cblxuLy8gcGF0aC5yZWxhdGl2ZShmcm9tLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVsYXRpdmUgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuICBmcm9tID0gZXhwb3J0cy5yZXNvbHZlKGZyb20pLnN1YnN0cigxKTtcbiAgdG8gPSBleHBvcnRzLnJlc29sdmUodG8pLnN1YnN0cigxKTtcblxuICBmdW5jdGlvbiB0cmltKGFycikge1xuICAgIHZhciBzdGFydCA9IDA7XG4gICAgZm9yICg7IHN0YXJ0IDwgYXJyLmxlbmd0aDsgc3RhcnQrKykge1xuICAgICAgaWYgKGFycltzdGFydF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW5kID0gYXJyLmxlbmd0aCAtIDE7XG4gICAgZm9yICg7IGVuZCA+PSAwOyBlbmQtLSkge1xuICAgICAgaWYgKGFycltlbmRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gW107XG4gICAgcmV0dXJuIGFyci5zbGljZShzdGFydCwgZW5kIC0gc3RhcnQgKyAxKTtcbiAgfVxuXG4gIHZhciBmcm9tUGFydHMgPSB0cmltKGZyb20uc3BsaXQoJy8nKSk7XG4gIHZhciB0b1BhcnRzID0gdHJpbSh0by5zcGxpdCgnLycpKTtcblxuICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oZnJvbVBhcnRzLmxlbmd0aCwgdG9QYXJ0cy5sZW5ndGgpO1xuICB2YXIgc2FtZVBhcnRzTGVuZ3RoID0gbGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZyb21QYXJ0c1tpXSAhPT0gdG9QYXJ0c1tpXSkge1xuICAgICAgc2FtZVBhcnRzTGVuZ3RoID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvdXRwdXRQYXJ0cyA9IFtdO1xuICBmb3IgKHZhciBpID0gc2FtZVBhcnRzTGVuZ3RoOyBpIDwgZnJvbVBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0UGFydHMucHVzaCgnLi4nKTtcbiAgfVxuXG4gIG91dHB1dFBhcnRzID0gb3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSk7XG5cbiAgcmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oJy8nKTtcbn07XG5cbmV4cG9ydHMuc2VwID0gJy8nO1xuZXhwb3J0cy5kZWxpbWl0ZXIgPSAnOic7XG5cbmV4cG9ydHMuZGlybmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIHJlc3VsdCA9IHNwbGl0UGF0aChwYXRoKSxcbiAgICAgIHJvb3QgPSByZXN1bHRbMF0sXG4gICAgICBkaXIgPSByZXN1bHRbMV07XG5cbiAgaWYgKCFyb290ICYmICFkaXIpIHtcbiAgICAvLyBObyBkaXJuYW1lIHdoYXRzb2V2ZXJcbiAgICByZXR1cm4gJy4nO1xuICB9XG5cbiAgaWYgKGRpcikge1xuICAgIC8vIEl0IGhhcyBhIGRpcm5hbWUsIHN0cmlwIHRyYWlsaW5nIHNsYXNoXG4gICAgZGlyID0gZGlyLnN1YnN0cigwLCBkaXIubGVuZ3RoIC0gMSk7XG4gIH1cblxuICByZXR1cm4gcm9vdCArIGRpcjtcbn07XG5cblxuZXhwb3J0cy5iYXNlbmFtZSA9IGZ1bmN0aW9uKHBhdGgsIGV4dCkge1xuICB2YXIgZiA9IHNwbGl0UGF0aChwYXRoKVsyXTtcbiAgLy8gVE9ETzogbWFrZSB0aGlzIGNvbXBhcmlzb24gY2FzZS1pbnNlbnNpdGl2ZSBvbiB3aW5kb3dzP1xuICBpZiAoZXh0ICYmIGYuc3Vic3RyKC0xICogZXh0Lmxlbmd0aCkgPT09IGV4dCkge1xuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBmO1xufTtcblxuXG5leHBvcnRzLmV4dG5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBzcGxpdFBhdGgocGF0aClbM107XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIgKHhzLCBmKSB7XG4gICAgaWYgKHhzLmZpbHRlcikgcmV0dXJuIHhzLmZpbHRlcihmKTtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZih4c1tpXSwgaSwgeHMpKSByZXMucHVzaCh4c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyIC0gbmVnYXRpdmUgaW5kZXggZG9uJ3Qgd29yayBpbiBJRThcbnZhciBzdWJzdHIgPSAnYWInLnN1YnN0cigtMSkgPT09ICdiJ1xuICAgID8gZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikgeyByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKSB9XG4gICAgOiBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7XG4gICAgICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gc3RyLmxlbmd0aCArIHN0YXJ0O1xuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKTtcbiAgICB9XG47XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiJdfQ==
