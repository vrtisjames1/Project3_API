const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

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
    Students.create(req.body, (err, createdStudents)=>{
        res.json(createdStudents); //.json() will send proper headers in response so client knows it's json coming back
    });
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
router.put('/status:id', (req, res)=>{
    Students.findByIdAndUpdate({status: req.params.id}, req.body, {new:true}, (err, updatedStudents)=>{
        res.json(updatedStudents);
    });
});

//============================================
//export
module.exports = router;