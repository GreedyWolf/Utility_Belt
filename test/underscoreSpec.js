(function() {
  var _ = typeof require == 'function' ? require('..') : window._;
  var answers = [];

  QUnit.module('Underscore');

  test('first', function() {
    deepEqual(_.first([1,2,3,4,5,6], 5), [1,2,3,4,5], 'return first n elements of array');
    deepEqual(_.first([1,2,3], 10), [1,2,3], 'return all elements if n >= array.length');
    deepEqual(_.first([1,2,3,4,5], -2), [1,2,3], 'return length-n elements if n is negative');
    deepEqual(_.first([1,2,3], -3), [], 'return no elements if n <= -array.length');
    deepEqual(_.first([1,2,3]), [1], 'n is default to 1');
  });

  test('last', function() {
    deepEqual(_.last([1,2,3,4,5,6], 5), [2,3,4,5,6], 'return last n elements of array');
    deepEqual(_.last([1,2,3], 10), [1,2,3], 'return all elements if n >= array.length');
    deepEqual(_.last([1,2,3,4,5], -2), [3,4,5], 'return last length+n elements if n is negative');
    deepEqual(_.last([1,2,3], -3), [], 'return no elements if n <= -array.length');
    deepEqual(_.last([1,2,3]), [3], 'n is default to 1');
  });

  test('each', function() {
    _.each([1, 2, 3], function(num){ answers.push(num); });
    deepEqual(answers, [1, 2, 3], 'value is passed into callback');

    answers = [];
    _.each([null, null, null], function(num, i) { answers.push(i); });
    deepEqual(answers, [0, 1, 2], 'index is passed into callback');

    answers = [];
    _.each({a: 1}, function(el, key, obj) { answers.push(obj); });
    deepEqual(answers, [{a: 1}], 'array/object is passed into callback');

    answers = {};
    _.each({a: 1, b: 2, c: 3}, function(el, key) { answers[key] = el; });
    deepEqual(answers, {a: 1, b: 2, c: 3}, 'works on Objects');
  });

  test('indexOf', function() {
    equal(_.indexOf([1, 2, 3], 4), -1, 'should default to -1');
    equal(_.indexOf([1, 2, 2, 2, 3], 2), 1, 'should return first occurence');
    equal(_.indexOf({a:1, b:2, c:3 }, 2), 'b', 'should work on object');
  });

  test('filter', function() {
    deepEqual(_.filter([1, 2, 3], function(n,i){ return n%2 === 0; }), [2], 'should pass in value to test');
    deepEqual(_.filter([1, 2, 3, 4, 5, 6, 7], function(n,i){ return i%2 === 0; }), [1, 3, 5, 7], 'should pass in index to test');
    deepEqual(_.filter({a:1, b:2, c:3}, function(n,i){ return n%3 === 0 || i === 'b'; }), {b:2, c:3}, 'should work on object');
  });

  test('reject', function() {
    deepEqual(_.reject([1, 2, 3], function(n,i){ return n%2 === 0; }), [1, 3], 'should pass in value to test');
    deepEqual(_.reject([1, 2, 3, 4, 5, 6, 7], function(n,i){ return i%2 === 0; }), [2, 4, 6], 'should pass in index to test');
    deepEqual(_.reject({a:1, b:2, c:3}, function(n,i){ return n%3 === 0 || i === 'b'; }), {a:1}, 'should work on object');
  });

  test('reduce', function() {
    equal(_.reduce([1, 2, 3], function(a,b){ return a+b; }, 10), 16, 'should sum up an array');
    equal(_.reduce([1, 2, 3], function(a,b){ return a+b; }), 6, 'default accumulator to first element');
    equal(_.reduce({a:1, b:2, c:3}, function(a,b){ return a+b; }, 0), 6, 'should work on object');
    deepEqual(_.reduce(['a','p','p','l','e'], function(a,b){ 
      a[b] = !a[b] ? 1 : a[b] + 1;
      return a; 
    }, {}), {a: 1, p: 2, l: 1, e: 1}, 'should work on accumlator = {}');
  });  

  test('map', function() {
    answers = [1,2,3];
    deepEqual(_.map(answers, function(n,i){ return n*2; }), [2, 4, 6], 'should double the array');
    deepEqual(_.map(answers, function(n,i){ return n*i; }), [0, 2, 6], 'should passed in value and index to callbacks');
    deepEqual(_.map({a:1, b:2, c:3}, function(v,k){ return v*2; }), {a:2, b:4, c:6}, 'should work on object');
    deepEqual(answers, [1,2,3], 'should not mutate input');
  });

  test('uniq', function() {
    answers = [1,2,2,3,3,4,5,5,5,5,6];
    deepEqual(_.uniq(answers), [1, 2, 3, 4, 5, 6], 'should return uniq numbers');
    deepEqual(_.uniq(('mississippi').split('')), ['m', 'i', 's', 'p'], 'should return uniq letters');
    deepEqual(answers, [1,2,2,3,3,4,5,5,5,5,6], 'should not mutate input');
  });

  test('every', function() {
    equal(_.every([2,4,6], function(n){ return n%2 === 0; }), true, 'should test if all array elements are even numbers');
    equal(_.every({a:1, b:3, c:5, d:7}, function(n){ return n%2 === 0; }), false, 'should test if all object elements are odd numbers');
  });

  test('some', function() {
    equal(_.some([1,3,4,6], function(n){ return n%2 === 0; }), true, 'should test if some array elements are even numbers');
    equal(_.some({a:1, b:3, c:5, d:7}, function(n){ return n%2 === 0; }), false, 'should test if some object elements are even numbers');
  });

  test('invoke', function() {
    var reverse = function(salt){
      return this.split('').reverse().join('')+salt;
    }
    deepEqual(_.invoke(['foo', 'bar'], reverse, 'test'), ['ooftest', 'rabtest'], 'should run function of collection with correct context and arguments');
    deepEqual(_.invoke({foo: 'dog', bar: 'cat'}, 'toUpperCase'), {foo: 'DOG', bar: 'CAT'}, 'should run method of collection if functionOrKey is a key');
  });

  test('extend', function() {
    deepEqual(_.extend({foo: 'apple'}, {bar: 'orange'}, {bundi: 'banana'}, {foo: 'pineapple'}), {foo: 'pineapple', bar: 'orange', bundi: 'banana'}, 'should extend multiple objects');
  });

  test('defaults', function() {
    deepEqual(_.defaults({foo: 'apple'}, {bar: 'orange'}, {bundi: 'banana'}, {foo: 'pineapple'}), {foo: 'apple', bar: 'orange', bundi: 'banana'}, 'should extend multiple objects');
  });

  test('once', function() {
    var log = function(str){
      return str;
    };
    var onceFn = _.once(log);
    equal(onceFn('foo'), 'foo', 'should invoke function and return arguments');
    equal(onceFn('bar'), 'foo', 'should not invoke funciton and return last arguments');
  });

  test('memoize', function() {
    var salt = 'salt'
    var log = function(str){
      return str+salt;
    };
    var memoFn = _.memoize(log);
    equal(memoFn('foo'), 'foosalt', 'should invoke function and return arguments');

    salt = 'SALT';
    equal(memoFn('foo'), 'foosalt', 'should not invoke funciton and return last arguments');
  });

}());
