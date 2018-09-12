(function (root) {
  'use strict';

  var name = 'simtool';
  var version = '0.0.1';
  var author = 'Hughes';

  var isBrowser = typeof window !== 'undefined' ?
    true :
    false;

  //原型方法
  var _create = Object.create;
  var _freeze = Object.freeze;
  var _getPropDesc = Object.getOwnPropertyDescriptor;
  var _getPropNames = Object.getOwnPropertyNames;
  var _defineProp = Object.defineProperty;
  var _toString = Object.prototype.toString;
  var _hasProp = Object.prototype.hasOwnProperty;
  var _getProto = Object.getPrototypeOf;
  var _keys = Object.keys;
  var _values = Object.values;
  var _max = Math.max;
  var _min = Math.min;

  //类型标注
  var arrTag = '[object Array]',
    funcTag = '[object Function]',
    valueTag = '[object Object]',
    strTag = '[object String]',
    numTag = '[object Number]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    nullTag = '[object Null]',
    undefinedTag = '[object Undefined]',
    regTag = '[object RegExp]';

  /**
   * 判断数组
   * @param {*} value
   */
  var isArray = function (value) {
    return _toString.call(value) === arrTag;
  };

  /**
   * 判断函数
   * @param {*} value
   */
  var isFunction = function (value) {
    return _toString.call(value) === funcTag;
  };

  /**
   * 判断对象
   * @param {*} value
   */
  var isObject = function (value) {
    return _toString.call(value) === valueTag;
  };

  /**
   * 判断字符串
   * @param {*} value
   */
  var isString = function (value) {
    return _toString.call(value) === strTag;
  };

  /**
   * 判断数字
   * @param {*} value
   */
  var isNumber = function (value) {
    return _toString.call(value) === numTag;
  };

  /**
   * 判断布尔值
   * @param {*} value
   */
  var isBoolean = function (value) {
    return _toString.call(value) === boolTag;
  };

  /**
   * 判断Null
   * @param {*} value
   */
  var isNull = function (value) {
    return _toString.call(value) === nullTag;
  };

  /**
   * 判断undefined
   * @param {*} value
   */
  var isUndefined = function (value) {
    return _toString.call(value) === undefinedTag;
  };

  /**
   * 判断正则表达式
   * @param {*} value
   */
  var isRegExp = function (value) {
    return _toString.call(value) === regTag;
  };

  /**
   * 返回参数数据类型
   * @param {*} value
   */
  var types = function (value) {
    if (isArray(value))
      return 'array';
    if (isBoolean(value))
      return 'boolean';
    if (isFunction(value))
      return 'function';
    if (isNull(value))
      return 'null';
    if (isNumber(value))
      return 'number';
    if (isObject(value))
      return 'object';
    if (isString(value))
      return 'string';
    if (isUndefined(value))
      return 'undefined';
  };

  //类型string转换
  var typeFormat = function (value) {

    if (!isString(value))
      return value;

    var trans = _freeze({
      'true': true,
      'false': false,
      'undefined': undefined,
      'null': null,
    });

    return _hasProp.call(trans, value) ?
      trans[value] :
      value;

  };

  var Tool = function () {
    this.author = author;
    this.name = name;
    this.version = version;
    this.isBrowser = isBrowser;
  };

  Tool.prototype.isArray = isArray;
  Tool.prototype.isFunction = isFunction;
  Tool.prototype.isObject = isObject;
  Tool.prototype.isString = isString;
  Tool.prototype.isNumber = isNumber;
  Tool.prototype.isBoolean = isBoolean;
  Tool.prototype.isNull = isNull;
  Tool.prototype.isUndefined = isUndefined;
  Tool.prototype.isRegExp = isRegExp;
  Tool.prototype.types = types;
  Tool.prototype.keys = _keys;
  Tool.prototype.values = _values;

  /**
   * 返回Tool原型上所有方法名
   */
  Tool.prototype.all = function () {
    return _keys(_getProto(this));
  };

  /**
   * 验证类型是否为Date
   * @param {*} value
   */
  Tool.prototype.isDate = function (value) {
    var flag;

    if (this.isString(value)) {

      var d = new Date(value);

      flag = d != 'Invalid Date' ?
        _toString.call(new Date(value)) === dateTag :
        false;

    } else {

      flag = _toString.call(value) === dateTag;

    }

    return flag;

  };

  /**
   * 如果value不包含任何值，返回true。
   * 对于字符串和数组对象，如果length属性为0，那么返回true。
   * 对于空对象也返回true。
   * @param {*} value
   */
  Tool.prototype.isEmpty = function (value) {

    var flag = true;

    if (this.isNumber(value)) {
      flag = false;
    }

    if (this.isNull(value) || this.isUndefined(value)) {
      flag = true;
    }

    if (this.isBoolean(value) || this.isDate(value) || this.isFunction(value)) {
      flag = false;
    }

    if (this.isArray(value) || this.isString(value)) {
      flag = value.length > 0 ?
        false :
        true;
    }

    if (this.isObject(value)) {
      for (var key in value) {
        if (_hasProp.call(value, key)) {
          flag = false;
        }
      }
    }

    return flag;
  };

  /**
   * 去除字符串左右空格
   * @param {String} value
   */
  Tool.prototype.trim = function (value) {
    if (!this.isString(value))
      return value;
    return value.replace(/(^\s*)|(\s*$)/g, '');
  };

  /**
   * 过滤字符串中的空格
   * @param {String} value
   */
  Tool.prototype.clearSpace = function (value) {
    if (!this.isString(value))
      return value;
    return value.replace(/[ ]/g, '');
  };

  /**
   * 检测字符串中是否包含中文
   * @param {String} value
   */
  Tool.prototype.existCN = function (value) {
    if (!this.isString(value))
      return value;
    return /.*[\u4e00-\u9fa5]+.*$/.test(value);
  };

  /**
   * 从字符串中获取数字
   * @param {String} value
   */
  Tool.prototype.getNumber = function (value) {
    if (!this.isString(value))
      return value;

    var val = value.replace(/[^\d]/g, '');

    return val !== '' ?
      parseInt(val) :
      val;
  };

  /**
   * 从字符串中获取中文
   * @param {String} value
   */
  Tool.prototype.getCN = function (value) {
    if (!this.isString(value))
      return value;

    return value.replace(/[^\u4e00-\u9fa5\uf900-\ufa2d]/g, '');
  };

  /**
   * 字符串截取
   *
   * @param {*} value
   * @param {Number|String} length 截取位数
   * @param {String} separator 截断的符号
   */
  Tool.prototype.trunc = function (value, length, separator) {

    if (!this.isString(value))
      return value;

    var len = parseInt(length) || value.length;
    var codes = separator ?
      separator.toString() :
      '...';

    return (value.substring(0, len) + codes);
  };

  /**
   * 过滤HTML标签和&nbsp;
   * @param {String} value
   */
  Tool.prototype.excludeHTML = function (value) {

    if (!this.isString(value))
      return value;

    value = value
      .replace(/<\/?[^>]*>/g, '')
      .replace(/&nbsp;/ig, '');

    return value;
  };

  /**
   * 过滤HTML标签内联样式但保留HTML标签
   * @param {String} value
   */
  Tool.prototype.excludeStyle = function (value) {

    if (!this.isString(value))
      return value;

    return value.replace(/ style\s*?=\s*?(['"])[\s\S]*?\1/g, '');
  };

  /**
   * HTML转义
   * @param {String} value
   */
  Tool.prototype.HTMLEncode = function (value) {

    if (!this.isString(value))
      return value;

    var str = '';

    str = value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/ /g, '&nbsp;')
      .replace(/\'/g, '\'')
      .replace(/\"/g, '&quot;')
      .replace(/\n/g, '<br>');

    return str;

  };

  /**
   * HTML反转义
   * @param {String} value
   */
  Tool.prototype.HTMLDecode = function (value) {

    if (!this.isString(value))
      return value;

    var str = '';

    str = value
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;;/g, ' ')
      .replace(/'/g, '\'')
      .replace(/&quot;/g, '"')
      .replace(/<br>/g, '\n');

    return str;

  };

  /**
   * 生成范围随机数
   * @param {Number|String} start
   * @param {Number|String} end
   */
  Tool.prototype.roundNum = function (start, end) {

    if (!this.isNumber(start) || !this.isNumber(end))
      return '';

    start = parseInt(start);
    end = parseInt(end);

    return Math.floor(Math.random() * (end - start) + start);

  };

  /**
   * 随机码
   * @param {Number} num 验证码位数
   */
  Tool.prototype.randomCode = function (num) {

    var code = '';

    if (!this.isNumber(num) || !this.isNumber(this.getNumber(num)))
      return '';

    code = Math
      .random()
      .toString(32)
      .slice(2, num + 2);

    if (code.length < num) {
      code += this.randomCode(num - code.length);
    }

    return code;

  };

  /**
   * 字符串格式化为对象
   * @param {String} str
   */
  Tool.prototype.stringFormat = function (str) {

    if (!this.isString(str))
      return '';

    var strArr = str.indexOf('&') === -1 ?
      str.split('=') :
      str.split('&');

    var formatObj = {};

    for (var index in strArr) {
      if (_hasProp.call(strArr, index)) {

        if (strArr.length === 2) {

          formatObj[strArr[0]] = strArr[1];

        } else {

          var key = strArr[index].split('=')[0];
          var value = typeFormat(strArr[index].split('=')[1]);

          formatObj[key] = value;
        }
      }
    }

    return formatObj;

  };

  /**
   * 对象转换为字符串
   * @param {Object} obj
   */
  Tool.prototype.objFormat = function (obj) {

    var keysArr = _keys(obj);
    var len = keysArr.length;
    var valuesArr = _values(obj);
    var str = '';

    for (let index = 0; index < len; index++) {
      str += typeFormat(keysArr[index]) + '=' + typeFormat(valuesArr[index]) + (index === len - 1 ?
        '' :
        '&');
    }

    return str;
  };

  /**
   * url参数格式化
   * @param {*} url
   */
  Tool.prototype.urlParamFormat = function (url) {

    if (!this.isBrowser && !this.isString(url))
      return null;

    var urlParam = {};

    if (this.isBrowser) {
      url = url ?
        url.split('?')[1] :
        decodeURI(root.location.search.substr(1));
    } else {
      url = url || null;
    }

    if (!url)
      return null;

    urlParam = this.stringFormat(url);

    return urlParam;

  };

  /**
   * 去除数组中的假值元素和空对象
   * @param {Array} arr
   */
  Tool.prototype.compact = function (arr) {

    if (!this.isArray(arr))
      return [];

    var len = arr.length;
    var newArr = [];

    for (var index = 0; index < len; index++) {
      if (_hasProp.call(arr, arr[index]) && !this.isEmpty(arr[index])) {
        newArr.push(arr[index]);
      }
    }

    return newArr;

  };

  /**
   * 获取数组最大值
   * @param {Array} arr
   */
  Tool.prototype.max = function (arr) {

    if (!this.isArray(arr))
      return null;

    return _max.apply(null, this.compact(arr));

  };

  /**
   * 获取数组最小值
   * @param {Array} arr
   */
  Tool.prototype.min = function (arr) {

    if (!this.isArray(arr))
      return null;

    return _min.apply(null, this.compact(arr));

  };

  /**
   * 数组去重
   * @param {Array} arr
   */
  Tool.prototype.unique = function (arr) {

    if (!this.isArray(arr))
      return null;

    arr = this.compact(arr);

    if (this.types(root.Set) !== 'undefined') {

      return [...new root.Set(arr)];

    } else {

      var len = arr.length;
      var newArr = [arr[0]];

      for (let index = 1; index < len; index++) {
        if (arr[index] !== newArr[newArr.length - 1]) {
          newArr.push(arr[index]);
        }
      }

      return newArr;

    }

  };

  /**
   * 根据属性名和值(或条件方法)递归获取集合数据
   * @param {Array} arr
   * @param {String} key 属性名
   * @param {*} condition 值或条件方法
   */
  Tool.prototype.collectDeep = function (arr, key, condition) {

    if (!this.isArray(arr) || !this.isString(key))
      return null;

    var result = [];

    var _deep = function (_arr, _key, _condition) {
      var len = _arr.length;

      for (var index = 0; index < len; index++) {
        var el = _arr[index];

        if (this.isFunction(_condition) && _condition(el[_key]))
          result.push(el);

        if (el[_key] === _condition)
          result.push(el);

        for (var k in el) {
          if (_hasProp.call(el, k) && this.isArray(el[k])) {
            _deep(el[k], _key, _condition);
          }
        }
      }
    }.bind(this);

    _deep(arr, key, condition);

    return result;

  };

  /**
   * 根据一维数组生成树级结构数据
   * @param {Array} arr 需要转换的数据
   * @param {String} pkey 父级标识名称
   * @param {*} pvalue 父级id或标识的值
   * @param {String} childArrName 子级名称
   */
  Tool.prototype.tree = function (arr, idName, pkey, pvalue, childName) {

    if (!this.isArray(arr) || !this.isString(pkey))
      return null;

    idName = idName || 'id';
    childName = childName || 'child';

    var result = [];
    var len = arr.length;

    for (var index = 0; index < len; index++) {

      var el = arr[index];

      if (el[pkey] == pvalue) {

        var nodes = this.collectDeep(arr, pkey, el[idName]);
        var nlen = nodes.length;

        if (this.isUndefined(el[childName]) && nlen !== 0)
          (el[childName] = []) && (el[childName] = nodes);

        result.push(el);

        this.tree(arr, pkey, el[idName], childName);

      }

    }

    return result;

  };

  /**
   * 集合内对象根据属性排序
   * @param {Array} arr 待排序数组
   * @param {String} key 排序属性
   * @param {String} type 排序方式 asc升序,desc倒序
   */
  Tool.prototype.sortByKey = function (arr, key, type) {

    if (!this.isArray(arr) || !this.isString(key))
      return null;

    type = type || 'asc';

    var _sort = function (a, b) {
      return key ?
        (a[key] > b[key] ? 1 : -1) :
        (a > b ? 1 : -1);
    };

    type === 'asc' ?
      arr.sort(_sort) :
      arr
        .sort(_sort)
        .reverse();

    var len = arr.length;

    for (var index = 0; index < len; index++) {

      var el = arr[index];

      for (var k in el) {

        if (_hasProp.call(el, k) && this.isArray(el[k])) {

          this.sortByKey(el[k], key, type);

        }

      }

    }

    return arr;

  };

  /**
   * 函数简单防抖
   * @param {Function} fn 需要防抖的函数
   * @param {Number} wait 间隔执行时间
   */
  Tool.prototype.debounce = function (fn, wait) {

    var timeout;

    return function () {
      var context = this;
      var args = arguments;

      if (timeout)
        clearTimeout(timeout);

      timeout = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    };

  };

  /**
   * 对象克隆
   * @param {*} from 数据源
   * @param {*} option
   * @param {Boolean}  enumOnly 是否深度遍历
   * @param {Boolean} complete 是否完全复制
   */
  Tool.prototype.clone = function (from, option) {

    if (!this.isObject(from))
      return from;

    option = option || {
      enumOnly: false,
      complete: false,
    };

    var newObj = _create(_getProto(from));

    var propNames = this.isBoolean(option.enumOnly) && option.enumOnly ?
      _getPropNames(from) :
      _keys(from);

    var len = propNames.length;

    for (var index = 0; index < len; index++) {

      var prop = from[propNames[index]];

      if (this.isObject(prop)) {

        newObj[propNames[index]] = this.clone(prop, option);

      } else {

        this.isBoolean(option.complete) && option.complete ?
          _defineProp(newObj, propNames[index], _getPropDesc(from, propNames[index])) :
          (newObj[propNames[index]] = prop);

      }

    }

    return newObj;

  };

  /**
   * 数据冻结
   * @param {*} obj 冻结数据源
   * @param {Boolean} deep 是否深冻结
   */
  Tool.prototype.freeze = function (obj, deep) {

    deep = deep || false;

    if (this.isBoolean(deep) && deep) {

      var propNames = _getPropNames(obj);
      var len = propNames.length;

      for (let index = 0; index < len; index++) {

        var prop = obj[propNames[index]];

        if (this.isObject(prop))
          this.freeze(prop, deep);

      }

      return _freeze(obj);

    }

    return _freeze(obj);

  };

  /***********/
  var simtool = _freeze(new Tool());

  if (simtool.isBrowser) {

    if (!root._)
      root._ = simtool;

  } else {

    module.exports = simtool;

  }

})(this);