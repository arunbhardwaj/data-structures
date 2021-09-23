var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var stack = Object.create(stackMethods);
  stack._size = 0;
  return stack;
};

var stackMethods = {
  push: function(value) {
    this[this._size] = value;
    this._size++;
  },
  pop: function() {
    if (this._size <= 0) {
      return;
    }
    var lastValue = this[this._size - 1];
    delete this[this._size - 1];
    this._size--;

    return lastValue;
  },
  size: function(value) {
    return this['_size'];
  }
};


