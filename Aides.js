/**
 * Copyright Leo·Hughes
 * vision：1.0.0;
 **/

(function() {

    var root = this,
        store,
        doc;

    var _ = {};

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = _;
    } else {
        root._ = _;
        doc = root.document;

        if ((typeof Storage) !== 'undefined') {
            store = root.localStorage;
        }
    }

    /**** Util ****/

    // 控制台输出
    _.log = function(type, text, css) {
        switch (type) {
            case 'warn':
                console.warn(text);
                break;
            case 'log':
                console.log(text);
                break;
            case 'info':
                console.info(text);
                break;
            case 'error':
                console.error(text);
                break;
            case 'custom':
                console.log('%c' + text, css);
                break;
        }
    };

    // 如果object是一个数组，返回true。
    _.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    // 如果object是一个Function，返回true。
    _.isFunction = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    };

    // 如果object是一个对象，返回true。[排除数组和函数]
    _.isObject = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };

    // 如果object是一个字符串，返回true。
    _.isString = function(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    };

    // 如果object是一个数值，返回true (包括 NaN)。
    _.isNumber = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Number]';
    };

    // 如果object是一个布尔值，返回true。
    _.isBoolean = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Boolean]';
    };

    // 如果object是一个Date类型，返回true。
    _.isDate = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    };

    // 如果object的值是 null、undefined或者空，返回true。
    _.isNull = function(value) {
        return value === '' || value === undefined || value === null ? true : false;
    };

    // 如果object 不包含任何值，返回true。 对于字符串和数组对象，如果length属性为0，那么返回true。
    _.isEmpty = function(obj) {
        var _ = this,
            flag = true;

        if (_.isArray(obj) || _.isNumber(obj) || _.isString(obj)) {
            flag = obj.length === 0 ? true : false;
        }

        if (_.isObject(obj)) {
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    flag = false;
                }
            }
        }

        return flag;
    };

    // 验证日期格式[yyyy-mm-dd]
    _.isDate = function(text) {
        var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
        return reg.test(text.toString());
    };

    // 验证邮箱
    _.isEmail = function(text) {
        var reg = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
        return reg.test(text);
    };

    // 验证ip
    _.isIP = function(text) {
        var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/;
        return reg.test(text);
    };

    // 验证url
    _.isURL = function(text) {
        var reg = /[a-zA-z]+:\/\/[^\s]/;
        return reg.test(text);
    };

    //  验证账号或密码(字母开头，允许6-15字节，允许字母数字下划线)
    _.verifyAccount = function(text) {
        var reg = /^[a-zA-Z][a-zA-Z0-9_]{5,14}$/;
        return reg.test(text);
    };

    //	去除字符串左右空格
    _.trim = function(text) {
        return text.replace(/(^\s*)|(\s*$)/g, "");
    };

    //  过滤字符串中的空格
    _.clearSpace = function(text) {
        return text.replace(/[ ]/g, "");
    };

    // 检测字符串中是否包含中文
    _.existCN = function(text) {
        var reg = /.*[\u4e00-\u9fa5]+.*$/;
        return reg.test(text);
    };

    // 保留数字
    _.getNum = function(text) {
        var regEx = /[^\d]/g;
        return text.replace(regEx, '');
    };

    // 保留中文
    _.getCN = function(text) {
        var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
        return text.replace(regEx, '');
    };

    // 字符串截取 [separator:截断的符号 length:截取位数]
    _.trunc = function(text, length, separator) {
        var _ = this,
            len = length || text.length,
            codes = _.isNull(separator) ? '...' : separator.toString();

        return (text.substring(0, len) + codes);
    };

    // 字符串重复 [length:重复次数]
    _.repeat = function(text, length) {
        var _ = this,
            outText = '';

        if (_.isString(text)) {
            for (var i = 0; i < length; i++) {
                outText += text;
            }
        }
        return outText;
    };

    /**
     * 将 string 拆分成多个 size 长度的数组
     *
     * str: 需要被处理的字符串。
     * size: 每个拆分数组的长度。
     *
     **/
    _.strArr = function(str, size) {
        var _ = this,
            strArr = str.replace(/(.)(?=[^$])/g, "$1,").split(','),
            outArr = [];

        return _.chunk(strArr, size);
    };

    // 将[1,2,3...]数字转为汉字数字[一,二,三...]
    _.exNum = function(text){
      var _ = this,
          charArr = ['零','一','二','三','四','五','六','七','八','九','十'],
          num = _.isNumber(text) ? text.toString() : _.getNum(text),
          numArr = num.split(''),
          len = numArr.length,
          result = '';

          for (var i = 0; i < len; i++) {
            result += charArr[parseInt(numArr[i])];
          }

      return result;
    };

    //	生成范围随机数
    _.roundNum = function(start, end) {
        return Math.floor(Math.random() * (end - start) + start);
    };

    //随机验证码  num：验证码位数
    _.getCode = function(num) {
        var arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            arr2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            arr3 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            arr = arr1.concat(arr2, arr3),
            res = '';

        for (var i = 0; i < num; i++) {
            var charIndex = this.roundNum(0, arr.length);
            res += arr[charIndex];
        }
        return res;
    };

    // 获取当前时间[年月日] CN中文格式
    _.getDate = function(type) {
        var time = new Date(),
            year = time.getFullYear(),
            m = time.getMonth() + 1,
            month = m < 10 ? ('0' + m) : m,
            d = time.getDate(),
            day = d < 10 ? ('0' + d) : d,
            dateText = '';

        if (type === 'CN') {
            return dateText += year + '年' + month + '月' + day + '日';
        } else {
            return dateText += year + '-' + month + '-' + day;
        }
    };

    // 获取当前时间[时分秒] CN中文格式
    _.getTimes = function(type) {
        var time = new Date(),
            hours = time.getHours(),
            m = time.getMinutes(),
            minutes = m < 10 ? ('0' + m) : m,
            s = time.getSeconds(),
            seconds = s < 10 ? ('0' + s) : s,
            dateText = '';

        if (type === 'CN') {
            return dateText += hours + '时' + minutes + '分' + seconds + '秒';
        } else {
            return dateText += hours + ':' + minutes + ':' + seconds;
        }
    };

    // 根据日期[yyyy-mm-dd]获取星期，为空则获取当前时间星期
    _.getWeek = function(date) {
        var _ = this;
        date = date || (_.getDate('EN'));

        return '星期' + _.exNum(new Date(date).getDay());
    };

    // 来获得一个当前时间的整数时间戳
    _.now = function() {
        var _ = this,
            date = _.getDate('EN').toString(),
            times = _.getTimes('EN').toString();

        return (date.replace(/-/g, '') + times.replace(/:/g, ''));
    };

    // 获取url参数并转为object
    _.getUrlParam = function() {
        var reg_url = window.location.search,
            reg_arr = [],
            url_obj = {};

        if (reg_url.indexOf('&') !== -1) {
            reg_arr = reg_url.substr(1).split('&');
            for (var v in reg_arr) {
                var key = reg_arr[v].split('=')[0],
                    value = reg_arr[v].split('=')[1];

                url_obj[key] = value;
            }
            return url_obj;
        } else {
            return reg_url.substr(1);
        }
    };

    // 放弃控制变量"_"。返回对象的引用
    _.noConflict = function() {
        var _ = this;
        root._ = null;
        return _;
    };

    // 输出工具库所有可用方法
    _.all = function() {
        var _ = this,
            fucArr = _.methods(_),
            len = fucArr.length;

        for (var i = 0; i < len; i++) {
            _.log('custom', '[ ' + fucArr[i] + ' ]', 'font-size:14px;font-weight:bold;');
        }
    };

    // 工具库扩展
    _.extend = function(key, fn) {
        var _ = this,
            funcArr = _.methods(_);

        if (_.indexOf(funcArr, key) == -1) {
            _[key] = fn;
        }
    };

    /**
     *  setInterval方法
     *
     *  callback 执行方法
     *  time 执行间隔时间
     *  endTime 结束时间[为空将一直执行]
     *  endCallback 结束后的执行方法
     **/
    _.setTimesDo = function(callback, time, endTime, endCallback) {
        var _ = this;

        if (!_.isNull(time) && !_.isNull(callback)) {
            if (endTime) {
                var t = setInterval(function() {
                    callback();
                }, time);
                _.setTimeout = setTimeout(function() {
                    clearInterval(t);
                    if (endCallback) endCallback();
                }, time + endTime);
            } else {
                setInterval(callback, time);
            }
        }

    };

    /**
     * 设置cookie
     *
     * name  cookie名称
     * value cookie值
     * time  cookie过期时间,单位秒
     **/
    _.setCookie = function(name, value, time) {
        var d = new Date();
        d.setTime(d.getTime() + (time * 1000)),
            expires = "expires=" + d.toUTCString();

        doc.cookie = name + "=" + value + "; " + expires;
    };

    // 根据name获取cookie值，若无则返回null
    _.getCookie = function(name) {
        var _ = this;

        if (!_.isNull(name)) {
            var cstr = doc.cookie,
                carr = cstr.split(';'),
                cvalue = null;

            for (var i = 0; i < carr.length; i++) {
                var sarr = carr[i].split('=');
                if (sarr[0] == name) {
                    cvalue = sarr[1];
                    return cvalue;
                }
                return cvalue;
            }
            return carr;
        } else {
            return doc.cookie;
        }
    };

    // 根据name清除cookie
    _.clearCookie = function(name) {
        var _ = this;
        _.setCookie(name, "", -1);
    };

    // 根据name设置localStorage本地存储[name相同，后面会覆盖前面的存储值]
    _.setStoreItem = function(name, val) {
        var _ = this;

        if (!_.isNull(store)) {
            store.setItem(name, val);
        }
    };

    // 根据name获取localStorage存储的值
    _.getStoreItem = function(name) {
        var _ = this;

        if (!_.isNull(store)) {
            return store.getItem(name);
        }
    };

    // 根据传入的object设置localStorage本地存储
    _.setStoreObj = function(obj) {
        var _ = this;
        if (_.isObject(obj)) {
            for (var v in obj) {
                _.setStoreItem(v, obj[v]);
            }
        }
    };

    // 将所有localStorage本地存储以Object返回
    _.getStoreObj = function() {
        var _ = this,
            len = store.length;
        obj = {};

        for (var i = 0; i < len; i++) {
            var key = store.key(i),
                val = _.getStoreItem(key);

            obj[key] = val;
        }

        return obj;

    };

    // 根据name删除localStorage存储的值,成功则返回true
    _.removeStoreItem = function(name) {
        var _ = this;

        store.removeItem(name);

        return _.getStoreItem(name) === null ? true : false;
    };

    // 清空localStorage的所有数据
    _.clearStore = function() {
        store.clear();
    };


    /**** Array ****/

    // 查找指定值在数组中的的第一个的位置
    _.indexOf = function(arr, val) {
        return arr.indexOf(val);
    };

    /**
     * 将 array 拆分成多个 size 长度的数组
     *
     * arr: 需要被处理的数组。
     * size: 每个拆分数组的长度。
     *
     **/
    _.chunk = function(arr, size) {
        var outArr = [];

        for (var i = 0; i < arr.length; i += size) {
            var inArr = arr.slice(i, i + size);
            outArr.push(inArr);
        }

        return outArr;
    };

    // 去除数组中的假值元素[null,undefined,'']
    _.compact = function(arr) {
        var outArr = [];
        for (var v in arr) {
            if (arr[v]) outArr.push(arr[v]);
        }
        return outArr;
    };

    // 删除数组中指定的值
    _.delValue = function(arr, val) {
        var _ = this;
        for (var v in arr) {
            if (arr[v] == val) arr.splice(_.indexOf(arr, arr[v]), 1);
        }
        return arr;
    };

    // 删除数组中指定下标的值
    _.delValueByIndex = function(arr, index) {
        var _ = this;
        return _.delValue(arr, arr[index]);
    };

    // 获得数字数组中最小项 [会先剔除掉假值再返回最小值]
    _.getMin = function(arr) {
        var _ = this;

        arr = _.compact(arr);

        if (_.isArray(arr)) {
            var oValue = arr[0];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] < oValue) {
                    oValue = arr[i];
                }
            }
            return oValue;
        }
    };

    // 获得数字数组中最大项 [会先剔除掉假值再返回最大值]
    _.getMax = function(arr) {
        var _ = this;

        arr = _.compact(arr);

        if (_.isArray(arr)) {
            var oValue = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] > oValue) {
                    oValue = arr[i];
                }
            }
            return oValue;
        }
    };

    // 数组除重复项
    _.unique = function(arr) {
        var _ = this;
        if (_.isArray(arr)) {
            arr.sort(); //先排序
            var r = [arr[0]];
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] !== r[r.length - 1]) {
                    r.push(arr[i]);
                }
            }
            return r;
        }
    };

    // 数组合并去重 [字符串数字和数字视为不同处理]
    _.concat = function(arr) {
        for (var _len = arguments.length, arrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            arrs[_key - 1] = arguments[_key];
        }

        var _ = this,
            countArr = arr.concat.apply(arr, arrs),
            outArr = [countArr[0]];

        countArr = countArr.sort();

        return _.unique(countArr);
    };

    /**
     * 数组排除掉给定的值
     *
     * arr 需要过滤的数组
     * keys 需要排除掉的值
     **/
    _.difference = function(arr, keys) {
        var _ = this;

        for (var v in arr) {
            for (var i in keys) {
                if (arr[v] == keys[i]) {
                    _.delValue(arr, arr[v]);
                }
            }
        }

        return arr;
    };

    // 将数组前n个元素去除，n默认为1
    _.drop = function(arr, size) {
        size = size || 1;

        for (var i = 0; i < size; i++) {
            arr.shift();
        }

        return arr;
    };

    // 将数组后n个元素去除，n默认为1
    _.dropRight = function(arr, size) {
        arr.length = arr.length - size;
        return arr;
    };

    //  使用 value 值来替换 array，从start位置开始, 到end位置结束(不包含end)
    _.fill = function(arr, value, start, end) {
        start = this.isNull(start) ? 0 : start;
        end = this.isNull(end) ? arr.length : end;
        arr.length = (end > arr.length) ? end : arr.length;

        for (var i = start; i < end; i++) {
            arr[i] = value;
        }

        return arr;
    };

    /** 将数组转换为对象。
     *
     * list 键列表
     * values 值列表
     **/
    _.object = function(list, values) {
        var _ = this,
            len = list.length,
            obj = {};

        if (_.isArray(list) && _.isArray(values)) {
            for (var i = 0; i < len; i++) {
                if (!values[i]) obj[list[i]] = undefined;
                obj[list[i]] = values[i];
            }
        }

        return obj;
    };

    // 数组内对象根据属性排序 [暂只支持数据两层分级]
    _.sortByKey = function(arr, key, fn) {
        var _ = this;
        if (_.isArray(arr) && !_.isNull(key)) {
            arr.sort(function(x, y) {
                if (x[key] > y[key]) {
                    return 1;
                } else {
                    return -1;
                }
            });
            return arr;
        }
    };

    /**
     * 集合内按条件查找对象并返回新的集合
     *
     * key 需要查找的属性值
     * fn 查询条件方法
     **/
    _.filter = function(arr, key, fn) {
        var objArr = [];
        key = key.toString();

        for (var v in arr) {
            if (arr[v].hasOwnProperty(key) && fn(arr[v][key])) {
                objArr.push(arr[v]);
            }
        }

        return objArr;
    };

    /**
     * 根据属性名遍历集合并将对应的值生成数组返回
     *
     * arr 需要遍历的对象数组
     * key 需要获得值的属性名
     **/
    _.pluck = function(arr, key) {
        var _ = this,
            outArr = [];

        key = key.toString();

        for (var v in arr) {
            if (arr[v].hasOwnProperty(key)) outArr.push(arr[v][key]);
        }

        return outArr;
    };

    // 获得字符串、数组的长度,获得对象的属性数量,数字小数点前的位数
    _.size = function(el) {
        var _ = this,
            length;

        if (_.isString(el) || _.isArray(el)) {
            length = el.length;
        } else if (_.isObject(el)) {
            length = _.keys(el).length;
        } else if (_.isNumber(el)) {
            el = el.toString().split('.')[0];
            length = el.length;
        }

        return length;
    };

    // 在数组中逐项查找，如果找到匹配的元素，函数将立即返回，不会遍历整个数组。
    _.find = function(arr, val) {
        for (var v in arr) {
            if (arr[v] == val) return arr[v];
        }
    };


    /**** Object ****/

    // 如果对象包含给定的键，返回true。
    _.has = function(obj, key) {
        if (!_.isObject(obj)) return;

        var flag = false;

        for (var v in obj) {
            if (v === key) flag = true;
        }

        return flag;
    };

    // 获取object对象所有的属性名称。
    _.keys = function(obj) {
        var outArr = [];

        if (_.isObject(obj)) {
            for (var p in obj) {
                if (_.has(obj, p)) outArr.push(p);
            }
        }

        return outArr;
    };

    // 返回object对象所有的属性值。
    _.values = function(obj) {
        var outArr = [];

        if (_.isObject(obj)) {
            for (var v in obj) {
                if (_.has(obj, v)) outArr.push(obj[v]);
            }
        }

        return outArr;
    };

    // 把一个对象转变为一个[key, value]形式的数组。
    _.pairs = function(obj) {
        var objArr = [];

        if (_.isObject(obj)) {
            var keys = _.keys(obj);
            len = keys.length;
            objArr.length = len;

            for (var i = 0; i < len; i++) {
                objArr[i] = [keys[i], obj[keys[i]]];
            }
        }

        return objArr;
    };

    // 返回一个对象里所有的方法名, 已经排序的数组.
    _.methods = function(obj) {
        var nameArr = [];
        keys = _.pairs(obj);
        len = keys.length;

        for (var i = 0; i < len; i++) {
            var inKeys = keys[i];
            if (_.isFunction(inKeys[1])) nameArr.push(inKeys[0]);
        }

        return nameArr.sort();
    };

    // 去除对象里的假值键
    _.objCompact = function(obj) {
        for (var v in obj) {
            if (!obj[v]) {
                delete obj[v];
            }
        }
        return obj;
    };


    // 返回一个object副本，只过滤出keys[数组]参数指定的属性值。
    _.pick = function(obj, keys) {
        var newObj = {};

        for (var v in keys) {
            if (obj.hasOwnProperty(keys[v])) {
                newObj[keys[v]] = obj[keys[v]];
            }
        }

        return newObj;
    };

    // 返回一个object副本，只过滤出除去keys[数组]参数指定的属性值。
    _.omit = function(obj, keys) {
        var _ = this,
            newObj = {},
            kArr = [];

        kArr = _.difference(_.keys(obj), keys);

        for (var v in obj) {
            for (var i in kArr) {
                if (v == kArr[i]) {
                    newObj[v] = obj[v];
                }
            }
        }

        return newObj;
    };

    // 将对象合并为一个对象返回
    _.assign = function(targetObj) {
        var _ = this,
            target = targetObj || {},
            objArr = arguments,
            len = objArr.length;

        for (var i = 1; i < len; i++) {
            for (var v in objArr[i]) {
                if (!_.has(target, objArr[i][v])) {
                    target[v] = objArr[i][v];
                }
            }
        }

        return target;
    };

}.call(this));
