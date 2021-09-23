// TODO: re-do this class with objects for the children for O(1) deletion
// O(1) for adding nodes
// O(n**2) for deleting nodes
// O(1) for adding edges
// O(n) for deleting edges
// O(1) for node lookup
// 3 ways
// Using nodes
// using hashtables
//
var Graph = function() {
  var newGraph = Object.create(Graph.prototype);
  newGraph.nodes = {};
  return newGraph;
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this.nodes[node] = graphNode.Node(node);
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this.hasNode(node);
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  if (this.hasNode(node)) {
    var nodeToDelete = this.getNodeFromValue(node);

    // iterate over children and delete this node from their list;
    for (var i = 0; i < nodeToDelete.children.length; i++) {
      var connectedNode = nodeToDelete.children[i];
      this.getNodeFromValue(connectedNode).deleteChild(node);
    }

    // finally, delete the node
    delete this.nodes[node];
  }

};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  // Is this check useless?
  // if (this.hasBothNodes(fromNode, toNode)) {
    if (this.nodes[fromNode].contains(toNode) && this.nodes[toNode].contains(fromNode)) {
      return true;
    }
    return false;
  // }
  // return false;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  // Edges will be stored as each node having each other as children.
  if (this.hasBothNodes(fromNode, toNode)) {
    this.nodes[fromNode].children.push(toNode);
    this.nodes[toNode].children.push(fromNode);
  }

};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  if (this.hasBothNodes(fromNode, toNode)) {
    this.getNodeFromValue(fromNode).deleteChild(toNode);
    this.getNodeFromValue(toNode).deleteChild(fromNode);
  }
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (var key in this.nodes) {
    cb(this.nodes[key].value);
  }
};

// Checks to see if the graph contains a node
Graph.prototype.hasNode = function(node) {
  if (this.nodes[node] === undefined) {
    return false;
  }
  return true;
}

// Checks to see if the graph contains two nodes.
Graph.prototype.hasBothNodes = function(fromNode, toNode) {
  if (this.hasNode(fromNode) && this.hasNode(toNode)) {
    return true;
  }
  return false;
}

Graph.prototype.getNodeFromValue = function(node) {
  return this.nodes[node];
}



/*
 * Complexity: What is the time complexity of the above functions?
 */
var graphNode = {};

graphNode.Node = function(value) {
  var node = Object.create(graphNode.Node.prototype);

  node.value = value;
  node.children = [];

  return node;
};

graphNode.Node.prototype.contains = function(targetNode) {
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i] === targetNode) {
      return true;
    }
  }
  return false;
}

graphNode.Node.prototype.indexOf = function(target) {
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i] === target) {
      return i;
    }
  }
  return -1;
}

graphNode.Node.prototype.deleteChild = function(node) {
  var index = this.indexOf(node);
  if (index >= 0) {
    this.children.splice(index, 1);
  }
}

// Not namespacing causes issues with linkedlist.js
// var newNode = function(value) {
//   var node = Object.create(newNode.prototype);

//   node.value = value;
//   // node.next = null;
//   node.children = [];

//   return node;
// };

// newNode.prototype.contains = function(targetNode) {
//   for (var i = 0; i < this.children.length; i++) {
//     if (this.children[i] === targetNode) {
//       return true;
//     }
//   }
//   return false;
// }

// newNode.prototype.indexOf = function(target) {
//   for (var i = 0; i < this.children.length; i++) {
//     if (this.children[i] === target) {
//       return i;
//     }
//   }
//   return -1;
// }

// newNode.prototype.deleteChild = function(node) {
//   var index = this.indexOf(node);
//   if (index >= 0) {
//     this.children.splice(index, 1);
//   }
// }