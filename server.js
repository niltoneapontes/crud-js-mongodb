const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');

const url = 'mongodb://localhost/MyFirstDB'

const app = express();

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', function() {
  console.log('Connected to DB')
})

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333);