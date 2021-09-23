var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var queue = Object.create(queueMethods);
  queue._size = 0;
  queue._enqueuePosition = 0;

  return queue;
};


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


