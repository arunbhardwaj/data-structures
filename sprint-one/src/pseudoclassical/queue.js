var Queue = function() {
  Object.assign(Queue.prototype, queueMethods);
  this._size = 0;
  this._enqueuePosition = 0;
};

// Way too tedious to keep typing Queue.prototype.method = blah blah blah
var queueMethods = {
  enqueue: function(value) {
    var key = this._enqueuePosition;
    this[[key]] = value; // "Computed property names" aka variables as keys biggest pita
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
    this._enqueuePosition++;
    this._size++;
  },
  dequeue: function() {
    if (this._size <= 0) {
      return null;
    }
    var firstKey = Object.keys(this)[0];
    var value = this[firstKey];
    delete this[firstKey];
    this._size--;

    return value;
  },
  size: function() {
    return this._size;
  }
};
