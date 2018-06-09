const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const router = require('./routers/router');
mongoose.connect('mongodb://localhost/nodetest')
  .then(()=> console.log('connected to mongodb..'))
  .catch(err => console.log('DB not connected...'));

app.use(express.json());
app.use('/api',router.router);
app.use(express.static(path.resolve('./views')));
const server = app.listen(3000,()=>console.log("lestening on port 3000"));

app.get('/', function(req, res) {
     res.sendFile(path.resolve('./views/main.html'));
});
module.exports = server;
