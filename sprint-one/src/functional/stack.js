var Stack = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var length = 0;

  // Implement the methods below
  someInstance.push = function(value) {
    storage[length] = value;
    length++;
  };

  someInstance.pop = function() {
    if (length <= 0) {
      return null;
    }

    // Doesn't guarantee either but tends to on most browsers
    var lastValue = storage[length - 1];
    delete storage[length - 1];
    length--;
    return lastValue;
  };

  someInstance.size = function() {
    return length;
  };

  return someInstance;
};
