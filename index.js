const express = require('express');
const mongoose = require('mongoose');

const joi = require('joi');
const path = require('path');
const app = express();
mongoose.connect('mongodb://localhost/nodetest')
  .then(()=> console.log('connected to mongodb..'))
  .catch(err => console.log('DB not connected...'));

app.use(express.json());
app.use(express.static(path.resolve('./views')));
app.listen(3000,()=>console.log("lestening on port 3000"));

const userdataSchema = new mongoose.Schema({
  name:String,
  sex:String,
  age:Number,
  country:String,
  DateCreated:{type:Date,default:Date.now}
});

const Userdata = mongoose.model('userdata',userdataSchema);


app.post('/api/save',async (req,res) =>{
  const schema = {
    name:joi.string().min(3).required(),
    sex:joi.string().required(),
    age:joi.number().required(),
    country:joi.string().required()
  };
  const result = joi.validate(req.body,schema);
  if (result.error) {
    res.status(400).send(result.error)
    return;
  }
  let userdata = new Userdata({
    name:req.body.name,
    sex:req.body.sex,
    age:req.body.age,
    country:req.body.country
  })
  userdata = await userdata.save();
  res.send(userdata);
})
app.get('/', function(req, res) {
     res.sendFile(path.resolve('./views/main.html'));
});
