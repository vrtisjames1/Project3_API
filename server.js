const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const Students = require('./models/students.js');
const app = express();

let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

//creates rect.body off of url encoded data
app.use(express.urlencoded({extended:true}));
app.use(express.json()); //use .json(), not .urlencoded()
app.use(cors()); //allow everyone to access your data
app.use(methodOverride('_method'));


// =======================================
const appRouter = require("./controllers/routes.js");

////test route
app.use("/", appRouter);


////drop database comment
// mongoose.connection.dropDatabase();

//=================================================
// connections
mongoose.connect("mongodb+srv://vrtisjames:NZLKOh1gH62iZn0d@cluster0.ctjxurb.mongodb.net/?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

app.listen(PORT, ()=>{
	console.log('listening');
})
