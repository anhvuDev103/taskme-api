const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const Project = require('./models/Project');
const Task = require('./models/Task');
const User = require('./models/User');
mongoose.set('strictQuery', false);

const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 8000;

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://anhvuDev103:chainuocngot@taskme.tmff7vw.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log('MongoDB is connected');
  } catch (error) {
    console.log('Have some troubles in connections, please checkout. Error: ' + error.message);
    process.exit(1);
  }
};
connectDB();

app.use('/api/auth', authRouter);
app.use('/api/task', taskRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
