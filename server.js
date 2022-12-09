const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Travel = require('./models/model.js');
const app = express();

let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

//creates rect.body off of url encoded data
app.use(express.json()); //use .json(), not .urlencoded()
app.use(cors()); //allow everyone to access your data


// =======================================
const appRouter = require("./controllers/routes.js");

////test route
app.get('/', (req, res)=>{
        res.send('hello');
});
app.use("/travel", appRouter);

////drop database comment
// mongoose.connection.dropDatabase();

//=================================================
// connections
mongoose.connect('mongodb+srv://vrtisjames:NZLKOh1gH62iZn0d@cluster0.ctjxurb.mongodb.net/?retryWrites=true&w=majority', () => {
  console.log('The connection with mongod is established')
});

app.listen(PORT, ()=>{
	console.log('listening');
})