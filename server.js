const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const session = require('express-session');
const app = express();

require ('./db/db');

const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogroutes');
const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'This Is A Secret String',
  resave: false,
  saveUninitialized: false
}));
app.use('/users', userRoutes);
app.use('/dog', dogRoutes)
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(3000, () => {
  console.log("Server is Up & Listening on Port 3000!");
});