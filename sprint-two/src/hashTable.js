// hash table that regrows solely based on size of the limited array
// NOT BASED ON THE NUMBER OF COLLISIONS
const HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._growLoadFactor = 0.75;
  this._shrinkLoadFactor = 0.25;
  this._entries = 0;
  this._currentLoadFactor = 0;
  this._intialized = false;
  this.initialize();
};

HashTable.prototype.insert = function(k, v) {
  // var $ = this;
  // default assignment
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this.getBucket(index);

  // Adds or replaces the value in the bucket;
  this.updateBucket(bucket, k, v);

  // Check size and grow if necessary
  this.checkAndGrow();

};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this.getBucket(index);
  return this.getValue(bucket, k);
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this.getBucket(index);
  this.removeTuple(bucket, k);

  // Check size and shrink if necessary
  this.checkAndShrink();
};

//////////////////////////////////////
/////////// Helper Methods ///////////
//////////////////////////////////////
HashTable.prototype.initialize = function() {
  if (!this._intialized) {
    for (var i = 0; i < this._limit; i++) {
      this._storage.set(i, []);
    }
    this._intialized = true;
  }
};

HashTable.prototype.checkAndGrow = function() {
  if (this._currentLoadFactor > this._growLoadFactor) {
    this._limit *= 2;
    this.computeLF();

    // rehash and re-assign items
    this.rehashAndReinsert(true);
  }
};

HashTable.prototype.checkAndShrink = function() {
  if (this._currentLoadFactor < this._shrinkLoadFactor) {
    this._limit /= 2;
    this.computeLF();

    this.rehashAndReinsert(false);

  }
};

// Iterates through hash table and transfers every
// key-value tuple to new empty storage of different
// size. Resets _entries, _intialized.
HashTable.prototype.rehashAndReinsert = function(state) {
  var oldStorage = this._storage;
  this._storage = LimitedArray(this._limit);
  this._entries = 0;
  this._intialized = false;
  this.initialize();
  this.computeLF(); // unnecessary

  var oldLimit = (state) ? this._limit / 2 : this._limit * 2;

  for (var index = 0; index < oldLimit; index++) {
    var bucket = oldStorage.get(index);
    for (var i = 0; i < bucket.length; i++) {
      var k = bucket[i][0];
      var v = bucket[i][1];
      this.transferTupleToNewStorage(k, v);
    }
  }
};

// Inserts without a grow check. Could be handled with a boolean
// flag but why?
HashTable.prototype.transferTupleToNewStorage = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this.getBucket(index);

  // Adds or replaces the value in the bucket;
  this.updateBucket(bucket, k, v);
};

// Get the value of the key;
HashTable.prototype.getValue = function(bucket, k) {
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      return bucket[i][1];
    }
  }
};

// Inserts or updates the key-value tuple into the bucket;
HashTable.prototype.updateBucket = function(bucket, k, v) {
  // Overwrite the value if the key already exists.
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      bucket[i][1] = v;
      return;
    }
  }

  // Add the entry if the key is unique.
  bucket.push([k, v]);
  this._entries++; this.computeLF();
};

// Helper to remove a key-value tuple from a bucket;
HashTable.prototype.removeTuple = function(bucket, k) {
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      bucket.splice(i, 1);
      this._entries--; this.computeLF();
      return;
    }
  }
};

// Computes the current load factor
HashTable.prototype.computeLF = function() {
  this._currentLoadFactor = (this._entries / this._limit);
};

HashTable.prototype.getBucket = function(index) {
  return this._storage.get(index);
};

HashTable.prototype.contains = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this.getBucket(index);
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      return true;
    }
  }
  return false;
};