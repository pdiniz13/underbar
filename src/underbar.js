/**
 * Created by Pdiniz on 1/2/2015.
 */
(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

    // Return an array of the first n elements of an array. If n is undefined,
    // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n === undefined){
      return array.pop();
    }
    else if (n === 0){
      return [];
    }
    else if (array.length <= n){
      return array;
    }
    else{
      var array2 = [];
      for (var x = 0; x < n; x++){
        array2.unshift(array.pop());
      }
      return array2;
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      var count = collection.length;
      for (var x = 0; x < count; x++) {
        iterator(collection[x], x, collection);
      }
    }
    else{
      for (var key in collection){
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var array2 = [];
    var count = collection.length;
    for (var x=0; x < count; x++){
      if (test(collection[x]) === true){
        array2.push(collection[x]);
      }
    }
    return array2;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(newArray, newFunction){
    var array2 = [];
    var count = newArray.length;
    for (var x=0; x < count; x++){
      if (newFunction(newArray[x]) === false){
        array2.push(newArray[x]);
      }
    }
    return array2;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(newArray, bool, iterator){
    var array2 = [];
    var newIterator;
    var count = newArray.length;
    var inArray = function(array, value){
      for (var i = 0, count1 = array.length; i < count1; i++){
        if(array[i] === value){
          return true;
        }
        return false;
      }
    };

    if (iterator !== undefined){
      newIterator = iterator;
    }

    if(bool){
      var newValue = newIterator(newArray[0]);
      array2.push(newArray[0]);
      for (var x=1; x<count; x++){
        var newValue2 = iterator(newArray[x]);
        if(newValue2 !== newValue){
          array2.push(newArray[x]);
          newValue = iterator(newArray[x])
        }
      }
    }
    else{
      array2.push(newArray[0]);
      for(var y = 0; y < count; y++){
        if(!inArray(array2, newArray[y])){
          array2.push(newArray[y]);
        }
      }
    }
    return array2;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(newArray, newFunc){
    var array2 = [],
        count = newArray.length;
    for (var x= 0; x < count; x++){
      array2.push(newFunc(newArray[x]));
    }
    return array2;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(newArray, newFunc, index){
    var newIndex = index;
    var count = newArray.length;
    if (newIndex === undefined){
      newIndex = 0;
    }
    var value;
    if(index === undefined){
      value = newArray[newIndex];
      for(var x=newIndex+1; x < count; x++){
        value = newFunc(value, newArray[x]);
      }
    }
    else{
      value = 0;
      for(var y=newIndex; y < count; y++){
        value = newFunc(value, newArray[y]);
      }
    }
    return value;
  };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(newObj, newValue){
    if (newObj.constructor === Array){
      for (var x = 0, count = newObj.length; x < count; x++){
        if(newObj[x] === newValue){
          return true;
        }
      }
      return false;
    }
    else {
      for (var key in newObj) {
        if (key === newValue || newObj[key] === newValue) {
          return true;
        }
      }
      return false;
    }
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(newArray, newFunc){
    var func;
    if(newFunc === undefined){
      func = _.identity;
    }
    else{
      func = newFunc;
    }
    if (newArray == []){
      return true;
    }
    else{
      for(var x = 0, count = newArray.length; x < count; x++){
        if (func(newArray[x]) == false || func(newArray[x]) == undefined){
          return false;
        }
      }
      return true;
    }
  };
  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(newArray, newFunc){
    var func;
    if(newFunc === undefined){
      func = _.identity;
    }
    else{
      func = newFunc;
    }
    if (newArray == []){
      return false;
    }
    else{
      for(var x = 0, count = newArray.length; x < count; x++){
        if (func(newArray[x]) == true || typeof(newArray[x]) == "string"){
          return true;
        }
      }
      return false;
    }
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

    // Extend a given object with all the properties of the passed in
    // object(s).
    //
    // Example:
    //   var obj1 = {key1: "something"};
    //   _.extend(obj1, {
    //     key2: "something new",
    //     key3: "something else new"
    //   }, {
    //     bla: "even more stuff"
    //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(){
    var to = arguments[0];
    for (var x = 0, count = arguments.length; x < count; x++){
      var from = arguments[x];
      for(var key in from){
        to[key] = from[key];
      }
    }
    return to;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(newObj, defaults){
    var to = newObj;
    for(var key in defaults){
      if (to[key] === undefined){
        to[key] = defaults[key];
      }
    }
    return to;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

    // Return a function that can be called at most one time. Subsequent calls
    // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var oldArg;
    var result;
    var newFunc = func;
    return function() {
      if(oldArg !== arguments){
        result = newFunc.apply(this, arguments);
        oldArg = arguments;
      }
      return result;
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [].slice.call(arguments, 2);
    return setTimeout(func,wait, args);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

    // Randomizes the order of an array's contents.
    //
    // TIP: This function's test suite will ask that you not modify the original
    // input array. For a tip on how to make a copy of an array, see:
    // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    var newArray = [];
    var count = array.length;
    for (var x = 0; x < count; x++){
      var rand = getRandomInt(0, count);
      while (newArray[rand] !== undefined){
        rand = getRandomInt(0, count);
      }
      newArray[rand] = array[x];
    }
    return newArray;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

    // Calls the method named by functionOrKey on each value in the list.
    // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    functionOrKey.apply(collection);
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
