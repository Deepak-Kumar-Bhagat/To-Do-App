//require the library
const mongoose=require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/list_db');

//acquiring the connection(to check if it is successful)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to database'));

//if everything is fine
db.once('open',function(){
     console.log('connected successfully');
});