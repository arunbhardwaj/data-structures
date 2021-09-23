var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var _stack = {
    _size: 0
  };

  Object.assign(_stack, stackMethods);

  return _stack;
};

var stackMethods = {};

stackMethods.push = function(value) {
  this[this._size] = value;
  this._size++;
}

stackMethods.pop = function() {
  if (this._size <= 0) {
    return;
  }
  var lastValue = this[this._size - 1];
  delete this[this._size - 1];
  this._size--;

  return lastValue;
}

stackMethods.size = function(value) {
  return this['_size'];
}