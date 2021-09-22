var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var length = 0;
  var enqPosition = 0;

  // Implement the methods below
  someInstance.enqueue = function(value) {
    storage[enqPosition] = value;
    length++; enqPosition++;
  };

  someInstance.dequeue = function() {
    if (length <= 0) {
      return null;
    }

    // Doesn't guarantee either but tends to on most browsers
    var firstKey = Object.keys(storage)[0];
    var firstValue = storage[firstKey];

    // Doesn't guarntee the first key/value
    // for (var key in storage) {
    //   var firstKey = key;
    //   var firstValue = storage[key];
    //   break;
    // }
    delete storage[firstKey]; // isn't executing
    length--;
    return firstValue;
  };

  someInstance.size = function() {
    return length;
  };

  return someInstance;
};
