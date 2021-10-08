//requiring express module
const express = require('express');

//requiring path module
const path = require("path");
const { object } = require('webidl-conversions');

//declare port number
const port =8000;

//requirng mongoose module
const data=require('./config/mongoose');

//requiring schema of list
const list_to_do=require('./model/list');

//passing express as a function
const app =express();

//setting view engine to ejs
app.set('view engine','ejs');

//setting default views folder name to my folder name and joining current directory to it
app.set('views', path.join(__dirname,'main_file'));

//middleware between browser and server
app.use(express.urlencoded());

//adding static files like style.css
app.use(express.static('main_file'));

//our to do list
var list=[{}];

//getting response from url and feting data from database
app.get('/home',function(req,res){
    list_to_do.find({},function(err, lists){
        if(err){
            console.log('error in fetching contact from database');
            return;
        }
        return res.render('home',{
            title:"To Do List",
            task:lists
    });

    });
});

//getting response from url
//performing addition to list database
app.post('/list',function(req,res){
    console.log();
    list_to_do.create({
        task: req.body.task,
        category: req.body.category,
        date: req.body.date
    },function(err,newlist){
        if(err){
            console.log('error while creating contact');
            return;
        }
        console.log("new contact list is: ",newlist);
        return res.redirect("/home");
    });
});

//getting response from url
//performing deletion from list in database
app.get('/delete',function(req,res){

    let id=req.query;
    var count = Object.keys(id).length;
    
    for(let i=0;i<count;i++){
    list_to_do.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
        console.log('error in deleting contact from database');
        return;
    }
    });
}
    return res.redirect('back');
});
   
//listening to the port
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("server is running");
});