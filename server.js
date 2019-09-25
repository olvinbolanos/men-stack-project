const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const session = require('express-session');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

require ('./db/db');

const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogroutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.static('Public'))
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

app.get('*', async (req, res) => {
  res.redirect("/dog")
});

app.listen(PORT, () => {
  console.log(`Server is Up & Listening on Port ${process.env.PORT}`);
});

