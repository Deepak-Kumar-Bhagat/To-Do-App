//requiring mongoose module
const mongoose=require('mongoose');

//creating schema
const listschema=new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
});

//creating collection(table)

const Dolist=mongoose.model('Dolist',listschema);

//exporting collection to index.js
module.exports=Dolist;
