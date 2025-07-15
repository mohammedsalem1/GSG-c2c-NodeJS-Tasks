# Task 3 -Reading & Summarizing: Iterable Protocol and Generators in JavaScript

## Iterable Protocol

### Iterator protocol
The iterator protocol defines an standard to produce a sequence of values. This protocol is really an object that contains a next() method and this one returns another object with two properties, value and done. Similar to this which is an iterator that returns a counter, the important is that an iterator is an object which returns another object with two properties, value and done.

The next() method always returns an object with value and done properties. The value property contains the value to be returned and the done property indicates the termination of the iterator. You can call the next method whenever you want, but in this example after the third call, you will be receiving { value: undefined, done: true }. If you consume this code, you need to check when the property done is true in your code logic

### example Iterator protocol
<details>
  <summary>code</summary>
  
  ```
  function squareIterator(arr) {
    return {
      [Symbol.iterator]() {
      let counter = 0;
        return {
          next() {
            return (counter < arr.length) ?
               { value : arr[counter++] ** 2 , done : false }:
               { value : undefined, done : true }
              }   
            }
          }
        }
    }
  
   
let numbers = [1,5,3]
for (const element of squareIterator(numbers)) {
    console.log(element)
}
// 1 , 25 , 9 
  ```
</details>

###  ✅Real-world Use Cases:

In backend (Node.js) or large front-end apps, custom iterables and async iterables are used for:

Lazy evaluation (like reading files line by line)

Data streams

Pagination (fetching data in chunks)

Controlling memory usage


## Generators in JavaScript
The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.

A generator is a special function that can pause and resume its execution using the yield keyword.

### example generator
<details>
  <summary>code</summary>
  
  ```
  function* countUpTo(n) {
  for (let i = 0; i <= n; i++) {
    yield i;
  }
}

const counter = countUpTo(3);
console.log(counter.next()); // { value: 0, done: false }
console.log(counter.next()); // { value: 1, done: false }
console.log(counter.next()); // { value: undefined, done: true }

  ```
</details>


###  ✅Real-world Use Cases:

Iterating over large or infinite data sets

Data streaming (files, APIs)

State machines

