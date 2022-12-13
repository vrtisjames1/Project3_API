const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const Students = require('./models/students.js');
const app = express();
require('dotenv').config();

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
mongoose.connect(process.env.DB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

app.listen(PORT, ()=>{
	console.log('listening');
})
