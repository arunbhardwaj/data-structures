var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    if (this.tail === null) {
      this.head = Node(value);
      this.tail = this.head;
      return;
    }
    this.tail.next = Node(value);
    this.tail = this.tail.next;
  };

  list.removeHead = function() {
    var temp = this.head;
    this.head = this.head.next;
    return temp.value;
  };

  list.contains = function(target) {
    var curr = this.head;
    while (curr !== null) {
      if (curr.value === target) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
