/****************************************************************
 * support for ES5 
/***************************************************************/

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if ( !Array.prototype.forEach ) {

    Array.prototype.forEach = function( callback, thisArg ) {

        var T, k;

        if ( this == null ) {
            throw new TypeError( " this is null or not defined" );
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if ( {}.toString.call(callback) != "[object Function]" ) {
            throw new TypeError( callback + " is not a function" );
        }

        if ( thisArg ) {
            T = thisArg;
        }

        k = 0;

        while( k < len ) {

            var kValue;

            if ( k in O ) {

                kValue = O[ k ];

                callback.call( T, kValue, k, O );
            }
            k++;
        }
    };
}

if (!Array.prototype.filter)
{
    Array.prototype.filter = function(fun /*, thisp */)
    {
        "use strict";

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in t)
            {
                var val = t[i]; 
                if (fun.call(thisp, val, i, t))
                    res.push(val);
            }
        }

        return res;
    };
}

if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {

        var T, A, k;

        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }

        if (thisArg) {
            T = thisArg;
        }

        A = new Array(len);

        k = 0;

        while(k < len) {

            var kValue, mappedValue;

            if (k in O) {

                kValue = O[ k ];

                mappedValue = callback.call(T, kValue, k, O);



                A[ k ] = mappedValue;
            }
            k++;
        }

        return A;
    };      
}


if (!Array.prototype.some)
{
    Array.prototype.some = function(fun /*, thisp */)
    {
        "use strict";

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in t && fun.call(thisp, t[i], i, t))
                return true;
        }

        return false;
    };
}

(function(){

var TN = {};


(function()
{
var NS          = TN;
var __host      = function(){return this;}.call(null);
var nameRoot    = __host;
var isCommonJS  = typeof exports === 'object';
var __toString  = Object.prototype.toString;
var __slice     = Array.prototype.slice;

__host.__tnns__ = '';
NS.__tnns__     = '.TN';

var log = function(msg) {
    nameRoot.console 
    && console.log 
    && console.log(msg);
};

var warn = function(msg) {
    nameRoot.console
    && console.warn
    && console.warn(msg);
};

var error = function(msg) {
    nameRoot.console
    && console.error
    && console.error(msg);
};

var getTime = function(func){
	if(nameRoot.console){
		console.time(1);
		func();
		console.timeEnd(1);
	}else{
		return false;
	}
};


var extend = function() {
    var target = arguments[0];
    var src, name;
    for (var i = 1; i < arguments.length; i ++) {
        src = arguments[i]; 
        for (name in src) {
            if (target === src[name])continue;
            target[name] = src[name];
        }
    }
    return target;
};


var each = function(a, cb, obj) {
    if (__toString.call(a) === '[object Array]') {
        for (var i = 0, j = a.length; i < j; i ++) {
            if (cb.call(obj || null, i, a[i]) === false)
                break;
        }
    } else {
        for (var k in a) {
            if (cb.call(obj || null, k, a[k]) === false)
                break;
        }
    }
};

var namespace = function(root, name) {
    var paths;

    if (typeof root === 'string') {
        name = root;
        paths = name.split('.');
        root = /^[A-Z]{2,}$/.test(paths[0]) ? nameRoot : NS;
    } else {
        paths = name.split('.');
    }
   
    if (typeof root.__tnns__ === 'undefined' || root.__tnns__ === null) {
        throw new Error('invalid ns root!');
    }

    var path = root.__tnns__;
    each(paths, function(i, pathName) {
        root[pathName] = root[pathName] || {};
        path += '.' + pathName;
        root[pathName].__tnns__ = path;
        root = root[pathName];
    });

    return root;        
};

var _uniqId = 0;
var getUniqId = function() {
    return _uniqId++;
};


NS.log          = log;
NS.warn         = warn;
NS.getTime			= getTime;
NS.error        = error;
NS.extend       = extend;
NS.namespace    = namespace;
NS.each         = each;
NS.getUniqId    = getUniqId;
NS.__host       = __host;
NS.isCommonJS   = isCommonJS;
})();

TN.__host['TN'] = TN;
if (TN.isCommonJS) {
    exports.TN = TN;
}

(function(){

var NS              = TN.namespace('Class');
var extend          = TN.extend;
var namespace       = TN.namespace;
var nameRoot        = TN.__host;
var getUniqId       = TN.getUniqId;
var getElementById  = typeof jQuery !== 'undefined' ?
                    function(id) {return jQuery('#' + id);}
                    : function(id) {return document.getElementById(id);};

var __slice        = Array.prototype.slice;

var wrap = function(obj, method, wrapper) {
    var orig = obj[method];
    if (typeof orig !== 'function')
        throw new Error('cant find method ' + method);
    obj[method] = wrapper(method, orig);
}

var wrapAll = function(obj, wrapper) {
    for (var n in obj) {
       if (typeof obj[n] === 'function') {
           wrap(obj, n, wrapper);
       } 
    }
}

var createObject = function() {
    var obj = new this();
    obj.init.apply(obj, arguments);
    return obj;
}

var fromJSON = function() {
    var obj = new this();
    obj.fromJSON.apply(obj, arguments);
    return obj;
}

/**
 * 检查必须的字段
 */

var checkParams = function() {
    var keys = __slice.call(arguments, 0);
    var dict = keys.shift(), key;
    for (var i = 0; i < keys.length; i ++) {
        key = keys[i]; 
        if (typeof dict[key] == 'undefined') {
            throw new Error(key + ' is required');
        }
    }
};

var impl = function() {
    var Class = this;
    __slice.call(arguments, 0).forEach(function(proto, i) {
        wrapAll(proto, function(name, func) {
            return function() {
                var superProto = Class.superClass.prototype;
                this.superProto = superProto;
                func.superMethod = superProto[name];
                this.superMethod = function() {
                    return superProto[name].apply(this, arguments);
                };

                return func.apply(this, arguments);
            };
        });
        extend(Class.prototype, proto);
    });
};

var defineClass = function(name, superClass, prototype, staticMethods){
    var className, classNamespace, tmp, host, classHost;
    
    var args = __slice.call(arguments, 0);
    if (typeof args[0] === 'object') {
        classHost       = args.shift(); 
        name            = args[0];
        superClass      = args[1];
        prototype       = args[2];
        staticMethods   = args[3];
    }

    function Class(){
    };
    
    if (name) {
        tmp = name.split('.');

        if (tmp.length === 1) {
            className = name;
        } else {
            className = tmp.pop();
            classNamespace = tmp.join('.'); 
        }

        if (classNamespace) {
            if (classHost) {
                host = namespace(classHost, classNamespace);
            } else {
                host = namespace(classNamespace);
            }
        } else {
            if (classHost) {
                host = classHost;
            } else {
                host = nameRoot;
            }
        }

        host[className] = Class;
    }

    extend(Class, staticMethods);

    Class.prototype = new superClass(); 

    Class.create = createObject;
    Class.superClass = superClass;
    Class.fromJSON = fromJSON;

    Class.impl = impl;    
    Class.impl(prototype);

    Class.prototype.constructor = Class;
    Class.prototype.__name__ = name || null;

    return Class; 
};


//根类
defineClass(NS, 'TNObject', Object, {

    init:function() {
         this._propertys = {};
         this._eventListeners = {};
         this.uniqId = this.__name__ + '.' + getUniqId();
    },

    elementId:function(name) {
         return (this.uniqId + '_' + name).replace(/[\.\%]/g, '_');
    },

    getElement:function(name) {
        return getElementById(this.elementId(name));
    },
    
    ownHtml:function() {
        var T = this;
        var html;

        if (arguments.length > 1)
            html = __slice.call(arguments, 0).join('');
        else
            html = arguments[0];

        return html.replace(/(for|id)="([a-zA-Z0-9\-_]+)"/g, function(){
            return arguments[1] + '="' + T.elementId(arguments[2]) + '"';
        });
    },

    destroy:function() {
    },

    addListener:function(type, func) {
        var listeners = this._eventListeners;
        listeners[type] ? listeners[type].push(func) : listeners[type] = [func];
        return this;
    },

    on:function(type, func) {
        return this.addListener(type, func);
    },

    removeListener:function(type, func) {
        var listeners = this._eventListeners;
        if (!listeners[type]) return;
        listeners[type] = listeners[type].filter(function(value, index){
            return func !== value;
        });
        return this;
    },

    removeAllListeners:function(type) {
        if (!type) {
            this._eventListeners = {};
            return this;
        }
        this._eventListeners[type] = {};
        return this;
    },

    emit:function(type) {
        var listeners = this._eventListeners;
        if (!listeners[type]) return;

        var args = [];
        for (var i = 1; i < arguments.length; i ++) {
            args.push(arguments[i]);
        }

        //防止回调中调用removeListener
        var T = this;
        listeners[type].concat([]).forEach(function(func, index) {
            func.apply(T, args);
        })

        return this;
    },

    set:function(name, value, defalutValue) {
            var setMethod = 'set' + name.charAt(0).toUpperCase() + name.substr(1, name.length);

            this.emit('propertyWillChange', name, this.get(name), value);

            this._propertys[name] = (typeof value == 'undefined' ? defalutValue : value);

            if (this[setMethod]) {
                this[setMethod](value, defalutValue);
            }

            this.emit('propertyDidChange', name, this.get(name));

            return this;
    },

    get:function(name) {
        var getMethod = 'get' + name.charAt(0).toUpperCase() + name.substr(1, name.length);

        if (this[getMethod]) {
            return this[getMethod]();
        } else {
            return this._propertys[name];
        }
    },

    getCfg:function() {
        var args = __slice.call(arguments, 0);
        var name = args.shift();
        TN.log(name);
        var rt = this.get(name);
        if (typeof rt === 'function') {
            return rt.apply(this, args||[]);
        }
        return rt;
    },

    isKindOf:function(Class) {
        return (this instanceof Class);
    },

    toJSON:function() {
        var json = {};
        json['_propertys'] = this._propertys;
        return json;
    },

    fromJSON:function(json) {
        this._propertys = json['_propertys'] || {};
    }
});

NS.wrap         = wrap
NS.wrapAll      = wrapAll;
NS.def          = defineClass;
NS.checkParams  = checkParams;
NS.EventCenter  = NS.TNObject.create();
})();


})();


/**
 * @author : lu.hua
 * @date : 2011-12-31
 */

(function(){

var NS          = TN.namespace('Util');
var isCommonJS  = TN.isCommonJS;
var getType     = Object.prototype.toString;

var getQuery = function(key, url) {
    var rt          = [],
        i           = 0,
        key         = key + '=',
        keyLength   = key.length,
        start, end, char;

    if (!isCommonJS && (typeof url == 'undefined' || url === null)) {
        url = window.location.href;
    }

    var length      = url.length;

    while ((start = url.indexOf(key, i)) !== -1) {
        start = end = start + keyLength;

        while ((char = url.charAt(end)) && end < length && char != '&' && char != '#' && ++end);
        i = end;
        rt.push(decodeURIComponent(url.substring(start, i)));
    }
    
    if (rt.length === 0) return undefined;
    if (rt.length === 1) return rt[0];
    return rt;
};

var setQuery = function(key, value, url) {
    var rt          = '',
        i           = 0,
        key         = key + '=',
        start, end, char, tmp, anchor;

    if (!isCommonJS && (typeof url == 'undefined' || url === null)) {
        url = window.location.href;
    }

    var length      = url.length;

    while ((start = url.indexOf(key, i)) !== -1) {
        end = start;
        rt += url.substring(i, start);
        while ((char = url.charAt(end)) && end < length && char != '&' && char != '#' && ++end);
        i = end;
        if (char == '&') i ++;
    }

    if (i < length)
        rt += url.substring(i, length);
   
    tmp = rt.split('#');
    rt = tmp.shift();
    if (tmp && tmp.length) 
        anchor = tmp.join('#');

  
    if (rt.indexOf('?') === -1)
        rt += '?';

    if (getType.call(value) == '[object Array]') {
        for (i = 0; i < value.length; i ++) {
            rt += '&' + key + encodeURIComponent(value[i]);    
        }
    } else {
        rt += '&' + key + encodeURIComponent(value);    
    }

    if (anchor)
        rt += '#' + anchor;

    return rt.replace(/&{2,}/g, '&');
};

NS.getQuery = getQuery;
NS.setQuery = setQuery;
})();
