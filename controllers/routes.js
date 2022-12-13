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

//============================================
//routes
router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    Students.create(req.body, (err, createdStudents)=>{
        res.json(createdStudents); //.json() will send proper headers in response so client knows it's json coming back
    });
});

user.put('/login', (req, res) => {
    console.log(req.body);
    Students.findOne({username: req.body.username}, (err, foundUser) => {
      if(err) {
        res.json('Oops, there was an error. Please try again')
      } else {
        if(!foundUser){
          res.json('Username and password do not match. Please try again.')
        } else if(bcrypt.compareSync(req.body.password, foundUser.password)) {
          res.json({username: foundUser.username, admin: foundUser.admin})
        } else {
          res.json('Username and password do not match. Please try again.')
        }
      }
    })
  });

//create index route
router.get('/', (req, res)=>{
    Students.find({}, (err, foundStudents)=>{
        res.json(foundStudents);
    });
});

//create delete route
router.delete('/:id', (req, res)=>{
    Students.findByIdAndRemove(req.params.id, (err, deletedStudents)=>{
        res.json(deletedStudents);
    });
});

//create update route
router.put('/:id', (req, res)=>{
    Students.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedStudents)=>{
        res.json(updatedStudents);
    });
});

//============================================
//create index route
router.get('/status', (req, res)=>{
    Students.find({},{status: 1}, (err, foundStudents)=>{
        res.json(foundStudents);
    });
});

//create update route
router.put('/status/:id', (req, res)=>{
    Students.findByIdAndUpdate(req.params.id, {"$push": {status: {date: req.body.date, header: req.body.header, comments: req.body.comments}} }, {new:true}, (err, updatedStudents)=>{
        res.json(updatedStudents);
    });
});

//============================================
//edit comments
router.get('/comments/:id', (req, res)=>{
    Students.findOne({"status._id": req.params.id, "status": {"$elemMatch": {"_id": req.params.id}}} , (err, foundStudents)=>{
        res.json(foundStudents);
    });
});

// {"status": {"$elemMatch": {"_id": req.params.id}}}, {"status": {"$elemMatch": {"_id": req.params.id}}, "_id":0 }

router.put('/comments/:id', (req, res)=>{
    Students.findOneAndUpdate({"status._id" : req.params.id},{$set : {"status.$[t].comments" : req.body.comments}},{arrayFilters : [{"t._id" : req.params.id}]}, (err, updatedComments)=>{
        res.json(updatedComments);
    });
});

//create delete route
router.put('/deletecomments/:id', (req, res)=>{
    Students.findOneAndUpdate({"status._id" : req.params.id},{$pull : {"status": {"_id": req.params.id}}}, (err, deletedStudents)=>{
        res.json(deletedStudents);
    });
});

// ==========================================
//filter results
router.get('/find/:id', (req, res)=>{
    Students.find({"_id": req.params.id}, (err, foundStudents)=>{
        res.json(foundStudents);
    });
});

//============================================
//export
module.exports = router;