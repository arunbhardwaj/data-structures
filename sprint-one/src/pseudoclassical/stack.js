var Stack = function() {
  // Is this still pseudoclassical or is a functional-
  // shared-pseudoclassical hybrid make it not.
  Object.assign(Stack.prototype, stackMethods);
  this._size = 0;
};

// Stack.prototype.push = function(value) {
//     this[this._size] = value;
//     this._size++;
//   };

// Stack.prototype.pop = function() {
//   if (this._size <= 0) {
//     return;
//   }
//   var lastValue = this[this._size - 1];
//   delete this[this._size - 1];
//   this._size--;

//   return lastValue;
// };
// Stack.prototype.size = function(value) {
//   return this['_size'];
// };

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
