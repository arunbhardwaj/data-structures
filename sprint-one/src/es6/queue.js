class Queue {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  constructor() {
    this._size = 0;
    this._enqueuePosition = 0;
  }

  enqueue(value) {
    var key = this._enqueuePosition;
    this[[key]] = value; // "Computed property names" aka variables as keys biggest pita
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
    this._enqueuePosition++;
    this._size++;
  }

  dequeue() {
    if (this._size <= 0) {
      return null;
    }
    var firstKey = Object.keys(this)[0];
    var value = this[firstKey];
    delete this[firstKey];
    this._size--;

    return value;
  }

  size() {
    return this._size;
  }
}
