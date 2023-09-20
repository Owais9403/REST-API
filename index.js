const mysql = require("mysql2");
const express = require("express");   
const bodyparser= require("body-parser"); 
const encoder = bodyparser.urlencoded();
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const bcrypt=require("bcryptjs"); // bcrypt for encryption
const conn = require("./db_config");  // requring the connectivity of mysql db
 conn.connect(function(err){
    if(err) throw err; 
    console.log("connect"); // connectivity check!!
 });
app.post("/index",encoder, async function(req,res){// index login wala code hai jo check krega db k data se..!
    const email = req.body.email;            //on clicking submit this post method executes which is retrieved by req.body.attribute
    // const name = req.body.body.name;
    const password = req.body.password;
    // below query making a request to mysql to check email and password provided in login form exist in db or not.
    console.log(req.body);
    conn.query("select * from studentlogin where email = ?", [email],async function(err,result,fields){// the square brackets elemnt are place holders
        // function is a callback function gets executed after query, result contains data retrieved from the db.
        console.log("total fields",result.length,"found");
        console.log("fields are",result);
        const dbpass = result[0].password;
        // now compare the encrypted password withactual password
        const ismatch = await bcrypt.compare(password,dbpass);
        if(result.length>0 && ismatch){ // when query matches with the db, then data is retrieved in result 
            res.redirect("/welcome"); // jab user successfully login krega jab welcome page khulega.
        }else{
            res.send("invalid login details"); // when query is not matched, result will be empty.
        }
        res.end(); 
    });
})

app.post("/register",encoder,async function(req,res){ // register wala code hai jo insert krega data db me
    const eemail = req.body.email;
    const nname = req.body.name;
    const ppassword = req.body.password;
    const bcrptpassword = await bcrypt.hash(ppassword,10);
    console.log(`studentlogin values "${eemail}","${nname}","${ppassword}"`);
    conn.query(`insert into studentlogin values(?,?,?)`, [eemail,nname,bcrptpassword],function(err,result,fields){
        // console.log(result);
        // console.log(result.length);
        if(err){
            console.log(err);
            res.send("cannot register");
        }else{
            res.redirect("/index");
        }
        res.end(); 
    });
})

app.get("/index",async function(req,res){
    res.sendFile(__dirname + "/index.html"); //index page
})
app.get("/welcome",function(req,res){ 
    res.sendFile(__dirname + "/welcome.html");
})
app.get("/register",function(req,res){
    res.sendFile(__dirname + "/register.html");
})
 app.listen(port,()=>{
    console.log("am listening");
 });