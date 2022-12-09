const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

//============================================
//required
const Travel = require('../models/model.js');
const travelSeed = require('../models/seed.js');

//============================================
//          SEED
//============================================
////FIRST uncomment then comment out
// Travel.create(travelSeed, (err, data) => {
//   if (err) console.log(err.message)
//   console.log(`added provided travel data`)
// })

//============================================
//routes
router.post('/', (req, res)=>{
    Travel.create(req.body, (err, createdTravel)=>{
        res.json(createdTravel); //.json() will send proper headers in response so client knows it's json coming back
    });
});

//create index route
router.get('/', (req, res)=>{
    Travel.find({}, (err, foundTravel)=>{
        res.json(foundTravel);
    });
});

//create delete route
router.delete('/:id', (req, res)=>{
    Travel.findByIdAndRemove(req.params.id, (err, deletedTravel)=>{
        res.json(deletedTravel);
    });
});

//create update route
router.put('/:id', (req, res)=>{
    Travel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTravel)=>{
        res.json(updatedTravel);
    });
});

//============================================
//export
module.exports = router;