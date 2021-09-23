var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // You can only ever go down a tree so the tree value you're given IS THE ROOT.
  newTree.children = [];

  Object.assign(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  this.children.push(Tree(value));
};

treeMethods.contains = function(target) {
  if (this.value === target) {
    return true;
  }
  for (var i = 0; i < this.children.length; i++) {
    if(this.children[i].contains(target)) {
      return true;
    };
  }

  return false;

  // Sam's code. Interesting bc it requires the `if` statement
  // to be before the `result` change bc it keeps iterating
  // to the next `child` before returning out.

  // var result = false;
  // if (this.value === target) {
  //   result = true;
  // }

  // _.each(this.children, function(child) {
  //   if (result) {
  //     return true;
  //   }
  //   result = child.contains(target);
  // })

  // return result;

};

/*
 * Complexity: What is the time complexity of the above functions?
 */