const express = require('express');
const router = express.Router();
const joi = require('joi');
const mongoose = require('mongoose');

const userdataSchema = new mongoose.Schema({
  name:String,
  sex:String,
  age:Number,
  country:String,
  DateCreated:{type:Date,default:Date.now}
});

const Userdata = mongoose.model('userdata',userdataSchema);

function validateData(body) {
  const schema = {
    name:joi.string().min(3).max(30).required(),
    sex:joi.string().alphanum().min(3).max(10).required(),
    age:joi.number().greater(1).less(110).required(),
    country:joi.string().min(3).max(30).required()
  };
  return joi.validate(body,schema);;
}

router.post('/save',async (req,res) =>{
  const { error }=validateData(req.body);
  if (error) {
    res.status(400).send(error)
    return;
  }
  let userdata = new Userdata({
    name:req.body.name,
    sex:req.body.sex,
    age:req.body.age,
    country:req.body.country
  })
  userdata = await userdata.save();
  console.log(req.body.name);
  res.send(userdata);
})
module.exports.router = router;
module.exports.Userdata = Userdata;
