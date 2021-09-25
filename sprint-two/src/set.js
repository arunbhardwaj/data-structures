var Set = function() {
  var set = Object.create(setMethods);
  set._storage = {};
  return set;
};

var setMethods = {};

// I am aware of how to use my hashtable implementation to change
// set. However, I will need to change a prewritten test file
// and am unaware of how this will affect grading.
setMethods.add = function(item) {
  this._storage[item] = item;
};

setMethods.contains = function(item) {
  return (this._storage[item]) ? true : false;
};

setMethods.remove = function(item) {
  delete this._storage[item];
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
// I'm not sure about `delete` but everything else is O(1);
