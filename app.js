// Import the necessary modules
const express = require('express');
require("dotenv").config()
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const logger = require('morgan');

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const blogRouter = require('./routes/blog');
const contactRouter = require('./routes/contact');
const featureRouter = require('./routes/feature');
const serviceRouter = require('./routes/service');
const teamRouter = require('./routes/team');
const testimonialRouter = require('./routes/testimonial');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Configure session middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/blog', blogRouter);
app.use('/contact', contactRouter);
app.use('/feature', featureRouter)
app.use('/service', serviceRouter);
app.use('/team', teamRouter);
app.use('/testimonial', testimonialRouter);


// Port
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected!');
   
  })
  .catch((err) => console.log(err));
   app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

module.exports = app;