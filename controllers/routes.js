const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//============================================
//required
const Students = require('../models/students.js');
const studentSeed = require('../models/seed.js');

//============================================
//          SEED
//============================================
////FIRST uncomment then comment out
// Students.create(studentSeed, (err, data) => {
//   if (err) console.log(err.message)
//   console.log(`added provided studetn data`)
// })

//==================================================
// unsure if currently being used
//==================================================
router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    Students.create(req.body, (err, createdStudents)=>{
        res.json(createdStudents); //.json() will send proper headers in response so client knows it's json coming back
    });
});
//==================================================
// login route to find 
//==================================================
router.put('/login', (req, res) => {
    console.log(req.body);
    Students.findOne({username: req.body.username}, (err, foundUser) => {
      if(err) {
        res.json('Oops, there was an error. Please try again')
      } else {
        if(!foundUser){
          res.json('Username and password do not match. Please try again.')
        } else if(bcrypt.compareSync(req.body.password, foundUser.password)) {
          res.json(foundUser)
        } else {
          res.json('Username and password do not match. Please try again.')
        }
      }
    })
  });

  //==================================================
  // create account route hidden on page
  //==================================================
  router.post('/createaccount', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    Students.create(req.body, (err, createdUser) => {
      if(err){
        console.log(err);
        res.json(err.message)
      } else {
        console.log('user is created', createdUser);
        res.json(createdUser)
      }
    })
  });

//==================================================
//create index route
//==================================================
router.get('/', (req, res)=>{
    Students.find({}, (err, foundStudents)=>{
        res.json(foundStudents);
    });
});

//==================================================
//delete profile route
//==================================================
router.delete('/:id', (req, res)=>{
    Students.findByIdAndRemove(req.params.id, (err, deletedStudents)=>{
        res.json(deletedStudents);
    });
});

//==================================================
//update route to update all information except for password
//==================================================
router.put('/:id', (req, res)=>{
    Students.findByIdAndUpdate(req.params.id, {username: req.body.user, admin: req.body.admin, confirm: req.body.confirm, kid: req.body.kid, photo: req.body.photo, status: req.body.status}, {new:true}, (err, updatedStudents)=>{
        res.json(updatedStudents);
    });
});

//==================================================
// update new password route
//==================================================
router.put('/password/:id', (req, res)=>{
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  Students.findByIdAndUpdate(req.params.id, {username: req.body.user, password: req.body.password, admin: req.body.admin, confirm: req.body.confirm, kid: req.body.kid, photo: req.body.photo, status: req.body.status}, {new:true}, (err, updatedStudents)=>{
      res.json(updatedStudents);
  });
});

//==================================================
//not sure if currentl being used
//==================================================
router.get('/status', (req, res)=>{
    Students.find({},{status: 1}, (err, foundStudents)=>{
        res.json(foundStudents);
    });
});
//==================================================
//create commentes for nested status array
//==================================================
router.put('/status/:id', (req, res)=>{
    Students.findByIdAndUpdate(req.params.id, {"$push": {status: {date: req.body.date, header: req.body.header, comments: req.body.comments}}, "$set": {confirm: false}}, {new:true}, (err, updatedStudents)=>{
        res.json(updatedStudents);
    });
});

//==================================================
//edit comments in nested status array
//==================================================

router.put('/comments/:id', (req, res)=>{
    Students.findOneAndUpdate({"status._id" : req.params.id},{$set : {"status.$[t].comments" : req.body.comments}},{arrayFilters : [{"t._id" : req.params.id}]}, (err, updatedComments)=>{
        res.json(updatedComments);
    });
});

//==================================================
//delete comments in nested array
//==================================================
router.put('/deletecomments/:id', (req, res)=>{
    Students.findOneAndUpdate({"status._id" : req.params.id},{$pull : {"status": {"_id": req.params.id}}}, (err, deletedStudents)=>{
        res.json(deletedStudents);
    });
});

//==================================================
//filter results to display on page
//==================================================
router.get('/find/:id', (req, res)=>{
    Students.find({"_id": req.params.id}, (err, foundStudents)=>{
        res.json(foundStudents);
    });
});

//==================================================
//export
//==================================================
module.exports = router;