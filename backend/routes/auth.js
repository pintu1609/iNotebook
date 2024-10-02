const express=require("express");
const User= require('../models/User')
const router=express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt=require('bcryptjs')
const  jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET ='Pintu@1609';
// create a user using :POST "/api/auth.soesn't require auth"

router.post('/createuser',[
   body('name','Please Enter valid Name').isLength({min:3}),
   body('email','Please Enter valid Email').isEmail(),
   body('password','Password should be atleast 8 Character').isLength({min:8}),
] ,async(req, res)=>{

  let success=false;
// if thre is error, return bad request and the error  

    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success, errors:errors.array()});

    }

    //check weather the user with same email  exist already

    try {
      
    
    let user=await User.findOne({email:req.body.email}); 
    if(user){
      return res.status(400).json({success, error:"sorry a user with this email already exists"})
    }

    const salt= await bcrypt.genSalt(10);
    secPass= await bcrypt.hash(req.body.password, salt);
    user=await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
  
    const data={
      user:{
        id:user.id
      }
    }
   const authtoken=jwt.sign(data, JWT_SECRET)
    success= true;
    res.json({success, authtoken})
} catch (error) {
     console.error(error.message);
     res.status(500).send("some error occours")
}
})

//router 2 authenticate a user using post"/api/auth/login" no login requrie.
router.post('/login',[
  body('email','Please Enter valid Email').isEmail(),
  body('password','Password cannot be blank').exists(),
] ,async(req, res)=>{

  let success=false;

  const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success, errors:errors.array()});

    }
    const{email, password}=req.body;

    try {
      let user=await User.findOne({email});
      if(!user){
        // success=false;
        return res.status(400).json({success, error:"please try to login with correct credentials"})
      }
      const passwordCompare=  await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        // success=false;
        return res.status(400).json({ success, error:"please try to login with correct credentials"})
      }

      const data ={
        user:{
          id:user.id
        }
      } 
      const authtoken=jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authtoken})
    } catch (error) {
      console.error(error.message);
     res.status(500).send("internal server error")
    }


})

// route 3 get login user details using post "/api/auth/getuser". login required


router.post('/getuser', fetchuser ,async(req, res)=>{
try {
  userId=req.user.id;
  const user=await User.findById(userId).select("-password") 
  res.json(user)
} catch (error) {
  console.error(error.message);
     res.status(500).send("internal server error")
}
})


module.exports=router