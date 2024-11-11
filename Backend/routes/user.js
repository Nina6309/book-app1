const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Assuming you have a `User` model defined in "../models/user"
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Sign-in API
router.post("/sign-in", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate username length
    if (username.length < 4) {
      return res.status(400).json({ message: "Username should have at least 4 characters" });
    }
    const hashPass=await bcrypt.hash(password,10);


    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashPass,
    });

    // Save the new user to the database
    await newUser.save();

    // Return success response
    return res.status(201).json({ message: "Sign in successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// login
router.post("/log-in" ,async (req,res)=>{
  const {  username, password } = req.body;
  const existingUser = await User.findOne({ username});

  if (!existingUser) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  bcrypt.compare(password,existingUser.password,(err,data)=>{
    if(data){
      const authClaims= [{name:username},{jti:jwt.sign({},"babarAB")}]
      const token= jwt.sign({authClaims},"babarAB",{expiresIn: "2d"});
    return res.status(200).json({Id: existingUser._id,token:token});


    } else {
    return res.status(400).json({ message: "Invalid Credentials" });


    }
  });



});

module.exports = router;
