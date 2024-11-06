const express = require('express');
const path = require('path');
const mailData =  require('./mailData');
const store = require('./store');
const indexRouter = require('./routes/index');
const inboxRouter = require('./routes/inbox');
const port = process.env.PORT || 4000
const app = express();

store.set('mailData', mailData);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/inbox', inboxRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})