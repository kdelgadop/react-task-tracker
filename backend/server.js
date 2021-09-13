
import mongoose from 'mongoose';
import taskRouter from './routes/taskRouter';
import bodyParser from 'body-parser';

require("dotenv").config()

const express = require('express')
const cors = require('cors')
// const data = require('./data')
const dbURI = process.env.REACT_APP_MONGODB_URI


//MONGOOSE COLLECTION:
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true }).then((result) => {
  app.listen('8000', ()=> console.log("MongoDB served at http://localhost:8000/tasks"))
  });
  
  const db = mongoose.connection; 
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Connected to user Data Base'));

const app = express();
app.use(cors());
app.use(bodyParser.json())

//Have the server use the task Router:
app.use('/tasks', taskRouter)

app.use((error, req, res, next) => {
  const status = error.name && error.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: error.message });
  next();
})