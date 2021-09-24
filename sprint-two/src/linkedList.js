var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  // Optional
  list.addToHead = function(value) {
    if (this.head === null) {
      this.head = Node(value);
      this.tail = this.head;
      return;
    }
    var temp = Node(value);
    temp.next = this.head;
    this.head.prev = temp;
    this.head = temp;
  };

  list.addToTail = function(value) {
    if (this.tail === null) {
      this.head = Node(value);
      this.tail = this.head;
      return;
    }
    var temp = Node(value);
    this.tail.next = temp;
    temp.prev = this.tail;
    this.tail = this.tail.next;
  };

  list.removeHead = function() {
    var temp = this.head;
    this.head = this.head.next;
    return temp.value;
  };

  // Optional
  list.removeTail = function() {
    var temp = this.tail;
    var prevNode = this.tail.prev;
    prevNode.next = null;
    temp.prev = null;
    this.tail = prevNode;
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
  node.prev = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */