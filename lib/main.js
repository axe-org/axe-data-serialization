'use strict';
// 判断函数

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var is = exports.is = {
  types: ['Number', 'Boolean', 'String', 'Map', 'Array', 'Date', 'RegEpx', 'Window', 'HTMLDocument']
};
is.types.forEach(function (type) {
  is[type] = function (type) {
    return function (obj) {
      return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    };
  }(type);
});

var AXEDataItemType = exports.AXEDataItemType = Object.freeze({
  Number: 'Number',
  Boolean: 'Boolean',
  String: 'String',
  Array: 'Array',
  Map: 'Map',
  Model: 'Model',
  Image: 'Image',
  Data: 'Data',
  Date: 'Date'
});

var AXEDataItem = exports.AXEDataItem = function () {
  function AXEDataItem(json) {
    _classCallCheck(this, AXEDataItem);

    this.json = json;
  }

  _createClass(AXEDataItem, [{
    key: 'getValue',
    value: function getValue() {
      var data = this.json;
      var ret = void 0;
      if (data.type && data.value) {
        if (data.type === AXEDataItemType.Number) {
          ret = Number(data.value);
        } else if (data.type === AXEDataItemType.Boolean) {
          ret = data.value === 'true';
        } else if (data.type === AXEDataItemType.String) {
          ret = data.value;
        } else if (data.type === AXEDataItemType.Array || AXEDataItemType.Map) {
          ret = JSON.parse(data.value);
        } else if (data.type === AXEDataItemType.Model) {
          ret = JSON.parse(data.value);
        } else if (data.type === AXEDataItemType.Image || data.type === AXEDataItemType.Data) {
          // 返回的 base64的字符串。
          ret = data.value;
        } else if (data.type === AXEDataItemType.Date) {
          ret = new Date();
          ret.setTime(data.value);
        }
      }
      return ret;
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.json.type;
    }
  }]);

  return AXEDataItem;
}();

var AXEData = exports.AXEData = function () {
  function AXEData(json) {
    _classCallCheck(this, AXEData);

    this.json = json || {};
  }
  // 设置方法， 设置时要指明类型


  _createClass(AXEData, [{
    key: 'setNumber',
    value: function setNumber(key, value) {
      if (key && is.String(key)) {
        if (is.Number(value)) {
          this.setItemForKey(key, {
            value: '' + value,
            type: 'Number'
          });
        }
      }
    }
  }, {
    key: 'setBoolean',
    value: function setBoolean(key, value) {
      if (key && is.String(key)) {
        if (is.Boolean(value)) {
          this.setItemForKey(key, {
            value: '' + value,
            type: 'Boolean'
          });
        }
      }
    }
  }, {
    key: 'setString',
    value: function setString(key, value) {
      if (key && value && is.String(key)) {
        if (is.String(value)) {
          this.setItemForKey(key, {
            value: value,
            type: 'String'
          });
        }
      }
    }
  }, {
    key: 'setArray',
    value: function setArray(key, value) {
      if (key && value && is.String(key)) {
        if (is.Array(value)) {
          this.setItemForKey(key, {
            value: JSON.stringify(value),
            type: 'Array'
          });
        }
      }
    }
    // map 或者 称为字典类型。 与 model类型是有区别的。
    // Map 类型， 在javascript中为 es6的map类型， 在iOS中为 Dictionary， 在Android中为 HashMap
    // Model 类型， 为对象类型， 在javascript中为 Object

  }, {
    key: 'setMap',
    value: function setMap(key, value) {
      if (key && value && is.String(key)) {
        if (is.Map(value)) {
          this.setItemForKey(key, {
            value: JSON.stringify(value),
            type: 'Map'
          });
        }
      }
    }
    // model 与 map的区别在于， model 的空值，必须设置为 null ,否则原生会发生异常！！！

  }, {
    key: 'setModel',
    value: function setModel(key, value) {
      if (key && value && is.String(key)) {
        if (is.Object(value)) {
          this.setItemForKey(key, {
            value: JSON.stringify(value),
            type: 'Model'
          });
        }
      }
    }
    // 设置 图片 ， 为图片数据的base64结果

  }, {
    key: 'setImage',
    value: function setImage(key, value) {
      if (key && value && is.String(key)) {
        if (is.String(value)) {
          this.setItemForKey(key, {
            value: value,
            type: 'Image'
          });
        }
      }
    }
    // 设置 data 类型， 实际也是 base64字符串。

  }, {
    key: 'setData',
    value: function setData(key, value) {
      if (key && value && is.String(key)) {
        if (is.String(value)) {
          this.setItemForKey(key, {
            value: value,
            type: 'Data'
          });
        }
      }
    }
    // 设置 Date类型

  }, {
    key: 'setDate',
    value: function setDate(key, value) {
      if (key && value && is.String(key)) {
        if (is.Date(value)) {
          this.setItemForKey(key, {
            value: '' + Date.parse(value),
            type: 'Date'
          });
        }
      }
    }
    // 获取数据时， 不需要指明类型.
    // undefined 表示出错， 而 null 表示key 值不存在，为空。

  }, {
    key: 'getItem',
    value: function getItem(key) {
      if (is.String(key)) {
        var dataItem = this.getDataItemForKey(key);
        if (dataItem) {
          return dataItem.getValue();
        } else {
          return null;
        }
      }
      return undefined;
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      if (key && is.String(key)) {
        this.json[key] = undefined;
      }
    }
  }, {
    key: 'setItem',
    value: function setItem(key, obj) {
      this.json[key] = obj;
    }
    // 当要检测数据类型时，使用这个get

  }, {
    key: 'getDataItemForKey',
    value: function getDataItemForKey(key) {
      if (this.json[key]) {
        return new AXEDataItem(this.data[key]);
      } else {
        return null;
      }
    }
  }, {
    key: 'toJson',
    value: function toJson() {
      return this.json;
    }
  }]);

  return AXEData;
}();