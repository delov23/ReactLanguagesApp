const express = require('express');
const bodyParser = require('body-parser');
const lessonRoutes = require('./routes/lesson');
const courseRoutes = require('./routes/course');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const applicationRoutes = require('./routes/application');

require('./database/database')();
const port = 9999;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/course', courseRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/lesson', lessonRoutes);
app.use('/application', applicationRoutes);

// General error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
  next();
})

app.listen(port, () => { 
  console.log(`REST API listening on port: ${port}`) 
});