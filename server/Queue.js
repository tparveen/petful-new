'use strict';

function createNode(data = null, next = null, prev = null) {
  return { data, next, prev };
}
/**
 * An ordered structure which can add elements to its end and remove elements from its beginning.
 */
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }
  /**
   * Add data to the queue.
   * @param {*} data - the data to add to the queue.
   */
  enqueue(data) {
    const node = createNode(data);
    if (this.last) {
      node.next = this.last;
      this.last.prev = node;
    }

    this.last = node;

    if (this.first === null) {
      this.first = node;
    }
  }
  /**
   * Remove data from the queue.
   */
  dequeue() {
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = node.prev;

    if (node === this.last) {
      this.last = null;
    }

    // console.log('Dequeued:',node.data.name)

    return node.data;
  }
}

/**
 * Look at the top of the queue
 * @param {Queue} queue
 */
function peek(queue) {
  /** If the top of the queue does not have anything
   * then the queue is empty
   * otherwise return what's on the top */
  if (queue.first === null) {
    return null;
  }
  return queue.first.data;
}


// reads the contents
// of the entire Queue.
function readQue(q) {
  const arr = [];
  if(!q.first) {
    return [];
  }
  let curr = q.first;
  while(curr.prev!==null) {
    arr.push(curr.data);
    curr = curr.prev;
  }
	arr.push(curr.data);
  return arr;
}

module.exports = { Queue, peek, readQue };
