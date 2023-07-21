const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI);
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`mongoose connected to ${MONGODB_URI}`);
});

mongoose.connection.on('disconnected', () => {
  console.log(`mongoose disconnected to ${MONGODB_URI}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`mongoose error to ${err}`);
});