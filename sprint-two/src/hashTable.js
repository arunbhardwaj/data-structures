
const HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._loadFactor = 5;
  this._currentLoadFactor = 5;
  this._entries = 0;
};

HashTable.prototype.insert = function(k, v) {
  var $ = this;
  var index = getIndexBelowMaxForKey(k, $._limit);  // hash
  $._storage[index] = ($._storage[index]) ? $._storage[index] : []; // default assignment
  var bucket = $._storage[index];
  $.updateBucket(bucket, k, v);
  $._entries++;
  $.computeLF();

  // check size and resize if necessary
  // $.resize();
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage[index];
  return this.getValue(bucket, k);
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage[index];
  this._entries--;
  this.computeLF();
  return this.removeTuple(bucket, k);
};

HashTable.prototype.resize = function() {
  if (this._currentLoadFactor > this._loadFactor) {
    this._limit *= 2;
    this.computeLF();
    this.rehashAndReinsert();
  }
  // if (this._currentLoadFactor < (this._loadFactor / 4)) {
  //   this._limit /= 2;
  //   this.computeLF();
  //   this.rehashAndReinsert();
  // }

}

HashTable.prototype.rehashAndReinsert = function() {
  for (var key in this._storage) {
    var bucket = this._storage[key];
    for (var i = 0; i < bucket.length; i++) {
      var k = bucket[i][0];
      var v = bucket[i][1];
      this.removeTuple(bucket, k);
      this.reinsert(k, v);
    }
  }
}

HashTable.prototype.reinsert = function(k, v) {
  var $ = this;
  var index = getIndexBelowMaxForKey(k, $._limit);  // hash
  $._storage[index] = ($._storage[index]) ? $._storage[index] : []; // default assignment
  var bucket = $._storage[index];
  $.updateBucket(bucket, k, v);
  $._entries++;
};

// Get the value of the key;
HashTable.prototype.getValue = function(bucket, k) {
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      return bucket[i][1];
    }
  }
}

// Helper to remove a key-value pair from a bucket;
HashTable.prototype.removeTuple = function(bucket, k) {
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      bucket.splice(i, 1);
      return;
    }
  }
}

// Inserts or updates the key-value pair into the bucket;
HashTable.prototype.updateBucket = function(bucket, k, v) {
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      bucket[i][1] = v;
      return;
    }
  }
  bucket.push([k, v]);
}

// Computes the current load factor
HashTable.prototype.computeLF = function() {
  this._currentLoadFactor = this._entries / this._limit;
}