const faker = require('faker');
const { cats, dogs } = require('./animals.json');
const { Queue, peek, readQue } = require('./Queue.js');

const [catQ, dogQ] = [new Queue(),new Queue()];

// let catDequeTimer;
// let dogDequeTimer;

function random(a) {
  const rand =  Math.floor(Math.random()*a.length);
  if(rand <= 0) {
    return 1;
  } else if(rand >= a.length-1) {
    return a.length - 2;
  } else {
    return rand;
  }
}

function seedQue(que, arr) {
  if(que.first === null) {
    const randClient = random(arr);
    for(let i=0; i<arr.length; i++) {
      if(randClient === i) {
        arr[i].adopter = null;
        que.enqueue(arr[i]);
      } else {
        arr[i].adopter = `${faker.name.firstName()} ${faker.name.lastName()}`;
        que.enqueue(arr[i]);
      }
    }
  }
}

function safeCatDeque(que) {
  if(que.first !== null) {
    if( que.first.data.adopter !== null) {
      // que.dequeue();
      const dq = que.dequeue();
      que.enqueue(dq);
    } else {
      // clearTimeout
      clearInterval(catDequeTimer)
    }
  } else {
    // clearTimeout
    clearInterval(catDequeTimer)
  }
}

function safeDogDeque(que) {
  if(que.first !== null) {
    if( que.first.data.adopter !== null) {
      // que.dequeue();
      const dq = que.dequeue();
      que.enqueue(dq);
    } else {
      // clearTimeout
      clearInterval(dogDequeTimer)
    }
  } else {
    // clearTimeout
    clearInterval(dogDequeTimer)
  }
}

function startDogInterval(que, t) {
  dogDequeTimer = setInterval(()=>{
    safeDogDeque(que);
  },t)
}

function startCatInterval(que, t) {
  catDequeTimer = setInterval(()=>{
    safeCatDeque(que);
  },t)
}

module.exports = {
  random,
  seedQue,
  safeCatDeque,
  safeDogDeque,
  startCatInterval,
  startDogInterval
}