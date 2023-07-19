const mongoose = require('mongoose');
console.log("mongodb://127.0.0.1:27017/db")
const connectionString = "mongodb://127.0.0.1:27017/db";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`mongoose connected to ${connectionString}`);
});

mongoose.connection.on('disconnected', () => {
  console.log(`mongoose disconnected to ${connectionString}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`mongoose error to ${err}`);
});