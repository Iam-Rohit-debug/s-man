const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

mongoose.connect("mongodb://localhost:27017/addDB",{useNewUrlParser:true});

const personSchema = mongoose.Schema({
    studentName:{
        type:String,
        required:[true,"check name"],
        maxlength:35
    },
    collegeName:{
        type:String,
        required:[true,"check name"],
        maxlength:50
    },
    r1_marks:{
        type:Number,
        required:[true,"check name"],
        min:0,
        max:10
    },
    r2_marks:{
        type:Number,
        required:[true,"check name"],
        min:0,
        max:10
    },
    r3_marks:{
        type:Number,
        required:[true,"check name"],
        min:0,
        max:10
    },
    t_r_marks:{
        type:Number,
        required:[true,"check name"],
        min:0,
        max:20
    },
    t_marks:{
        type:Number,
    },
    result:{
        type:String,
    },
    // rank:{
    //     type:Number,
    //     required:[true,"check name"],
    //     min:0,
    //     max:50
    // },
    
})

let f_name,c_name,r1_name,r2_name,r3_name,tech_name;
   

const User = mongoose.model("User",personSchema);

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    User.find()
    .then((foundUser=>{
    res.render('home',{f:foundUser})
    }))
    .catch((err=>{
        console.log(err);
    }))
})

app.get("/new_user",function(req,res){
    res.render('new_user');
})

app.post("/new_user",function(req,res){
    if(req.body.submit==="a")
    {   
            let t_marks = Number(req.body.r1_marks) + Number(req.body.r2_marks)+ Number(req.body.r3_marks)+Number(req.body.t_r_marks);
        let r;
        if(t_marks<35)
        {
            r="Rejected";
        }
        else{
            r="Selected";
        }
    
    let first = new User({
        studentName:req.body.s_name,
        collegeName:req.body.c_name,
        r1_marks:req.body.r1_marks,
        r2_marks:req.body.r2_marks,
        r3_marks:req.body.r3_marks,
        t_r_marks:req.body.t_r_marks,
        t_marks:t_marks,
        result:r,
    })
    first.save();

    res.redirect('/');
        
     

        
    
}
})

app.listen(3000,function(){
    console.log("server has started");
})