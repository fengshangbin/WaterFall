export function extend(defaultOption, options) {
  var temp = {};
  for (var i in defaultOption) {
    temp[i] = defaultOption[i];
  }
  for (var j in options) {
    temp[j] = options[j];
  }
  return temp;
}
export function C3Event(type, data) {
  this.type = type;
  this.data = data;
  this.target = null;
}
export function C3EventDispatcher() {
  var event = {};
  this.addEventListener = function(eventType, callback) {
    if (event[eventType] == null) event[eventType] = [];
    if (event[eventType].indexOf(callback) == -1) event[eventType].push(callback);
  };
  this.removeEventListener = function(eventType, callback) {
    if (event[eventType] == null) event[eventType] = [];
    if (callback == null) {
      if (event[eventType].length > 0) event[eventType] = [];
    } else {
      var index = event[eventType].indexOf(callback);
      if (index > -1) {
        event[eventType].splice(index, 1);
      }
    }
  };
  this.dispatchEvent = function(e) {
    e.target = this;
    if (event[e.type] != null) {
      for (var i = 0; i < event[e.type].length; i++) {
        event[e.type][i](e);
      }
    }
  };
  this.hasEventListener = function(eventType) {
    if (event[eventType] == null) event[eventType] = [];
    return event[eventType].length > 0;
  };
}

export function debounce(fn, wait) {
  var timer;
  return function(...args) {
    if (!timer) {
      timer = 'immediate';
      fn.apply(this, args);
    } else {
      if (timer != 'immediate') clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, wait);
    }
  };
}

export function throttle(fn, wait) {
  var timer;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, wait);
    }
  };
}
