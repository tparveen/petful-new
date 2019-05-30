const express = require('express');
const cors = require('cors');
const { cats, dogs } = require('./animals.json');
const { Queue, readQue } = require('./Queue.js');
const { seedQue, startCatInterval, startDogInterval } = require('./utils');
const { PORT, CLIENT } = require('./config');

const [catQ, dogQ] = [new Queue(),new Queue()];

let catDequeTimer;
let dogDequeTimer;

seedQue(catQ, cats);
seedQue(dogQ, dogs);

const app = express();
app.use(cors({
  origin: CLIENT
}));

// app.get('/api/start', (req,res, next) => {
//   setTimeout(()=>{
//     startCatInterval(catQ, 5000);
//     startDogInterval(dogQ, 5000);
//   },2500);
//   res.sendStatus(204);
// });
setTimeout(()=>{
  startCatInterval(catQ, 5000);
  startDogInterval(dogQ, 5000);
},2500);

app.get('/api/cats/queue', (req,res, next) => {
  res.json(readQue(catQ));
});

app.get('/api/dogs/queue', (req,res, next) => {
  res.json(readQue(dogQ));
});

app.delete('/api/cats/adopt', (req,res, next)=>{
  // catQ.dequeue();
  const dq = catQ.dequeue();
  catQ.enqueue(dq);
  startCatInterval(catQ, 5000);
  res.sendStatus(204);
});

app.delete('/api/dogs/adopt', (req,res, next)=>{
  // dogQ.dequeue();
  const dq = dogQ.dequeue();
  dogQ.enqueue(dq);
  startDogInterval(dogQ, 5000);
  res.sendStatus(204);
});

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(PORT,()=>{
  console.log(`Serving on ${PORT}`);
});