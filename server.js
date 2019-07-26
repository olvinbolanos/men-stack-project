const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const session = require('express-session');
const app = express();

require ('./db/db');

const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogroutes')

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'This Is A Secret String',
  resave: false,
  saveUninitialized: false
}));
app.use('/users', userRoutes);
app.use('/dogs', dogRoutes)
// USE ROUTE HERE

app.listen(3000, () => {
  console.log("Server is Up & Listening on Port 3000!");
})