var BinarySearchTree = function(value) {
  var newBST = {};
  newBST.value = value;
  newBST.left = null;
  newBST.right = null;

  Object.assign(newBST, BSTMethods);

  return newBST;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */

var BSTMethods = {}

BSTMethods.insert = function(value) {
  var current = this;
  if (value < current.value) {
    if (current.left === null) {
      current.left = BinarySearchTree(value);
    } else {
      current = current.left;
      current.insert(value);
    }
  } else if (value > current.value) {
    if (current.right === null) {
      current.right = BinarySearchTree(value);
    } else {
      current.right.insert(value);
    }
  }
}

BSTMethods.contains = function(value) {
  if (this === null) {
    return false;
  }
  if (this.value === value) {
    return true;
  }
  if (value < this.value) {
    return (this.left === null) ? false : this.left.contains(value);
  } else {
    return (this.right === null) ? false : this.right.contains(value);
  }

}

BSTMethods.depthFirstLog = function(callback) {
  callback(this.value);
  if (this.left !== null) {
    this.left.depthFirstLog(callback);
  }
  if (this.right !== null) {
    this.right.depthFirstLog(callback);
  }
}