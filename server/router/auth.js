const express = require('express');
const mongoose = require('mongoose');
const { validate } = require('../model/userSchema');
const router = express.Router();
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const session = require('express-session');
const authenticate = require("../middleware/authenticate");



dotenv.config({path:'./.env'});




var validateEmail = function(email) {
   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   return re.test(email)
};

require('../db/conn');
const User = require("../model/userSchema");

router.use(session({
   secret: 'jayasecret', 
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false }
 }));



router.get('/', (req, res) =>{
    res.send(`Hello world from the server router.js `);
});


// Async-Await for Registration
router.post("/register", async (req, res)=> {

 const{name, email, phone, work, password, cpassword} = req.body;

 if ( !name || !email || !phone || !work || !password || !cpassword) {

 return res.status(422).json({error: "Please fill the field properly"});
}

if (!validateEmail(email)) { 
  return res.status(422).json({error: "Email id is not valid"});
}


try{
   
   const userExist = await User.findOne({email: email});
 
   if(userExist) {

        return res.status(422).json({error: "Email already Exists"});

     }else if (password!= cpassword){

        return res.status(422).json ({error : "(password are not matching"})

    }else{
      const user = new User({name, email, phone, work, password, cpassword});
     
      const token = await user.generateAuthToken();
      user.tokens.concat({ token });

      await user.save();
     
      res.status(201).json({message: "user registered successfully"});
    }
    
   }catch (err) {
     console.log(err);
     res.status(500).json({error: "Server error"});

   }



});

// login route 
router.post("/login", async(req,res)=>{
   try{
        let token;
         const{email,password} = req.body

         if(!email|| !password){
             return res.status(400).json({error: "Please fill the data"});
         }

         const userLogin = await User.findOne({ email:email });

         //console.log(userLogin);
         if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password )

            //need to generate the token and stored cookie after the password match
            token =  await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token,{
               expires: new Date (Date.now () + 25892000000),
               httpOnly:true
            });

            if(!isMatch){
                  return res.json({error:"Invalid Credientials password"});
            }else{
               req.session.user = userLogin;
               res.json({message:"user Signin Successfully"});
            }
         }else{
            res.json({error:"Invalid Credientials"});
         }
 
      }catch(err){
      console.log(err);
   }


});






//Logout page



   







 
module.exports = router;

