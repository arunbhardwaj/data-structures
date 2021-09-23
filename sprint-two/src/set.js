var Set = function() {
  var set = Object.create(setMethods);
  set._storage = {};
  return set;
};

var setMethods = {};

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
