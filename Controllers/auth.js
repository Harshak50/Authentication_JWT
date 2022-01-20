const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Joi = require("joi");
const dotenv = require("dotenv");
dotenv.config();

// VALIDATION OF USER INPUTS PREREQUISITIES
const registerSchema = Joi.object({
  fname: Joi.string().min(3).required(),
  lname: Joi.string().min(3).required(),
  email: Joi.string().min(3).required().email(),
  password: Joi.string().min(6).required(),
});

//SIGNUP USER
const register = async (req, res) => {
  // CHECK IF EMAIL EXISTS
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      res.status(200).json({ message: "Email already exists" });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    //VALIDATION FOR USER INPURTS
    const { error } = await registerSchema.validateAsync(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message, auth: false });
      return;
    } else {
      // SAVE NEW USER
      await user.save();
      res.status(200).json({ message: "Please Verify Your Email",auth:false });
    }
  } catch (error) {
    res.status(400).json({ message: error, auth: false });
  }
};
// VALIDATION FOR LOGIN INPUT
const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//LOGIN USER
const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(200).json({ message: "Incorrect Email-ID", auth: false });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(200).json({ message: "Incorrect Password", auth: false });
  try {
    const { error } = await loginSchema.validateAsync(req.body);
    if (error)
      return res.status(400).json({ message: error.details.message[0] });
    else {
      var data = {
        time: Date(),
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "5h",
      });
      res
        .status(200)
        .json({ message: "Successfully loggedin", token: token, auth: true });
    }
  } catch (error) {
    res.status(500).json({ message: error, auth: true, isActive:false });
  }
};

const getUserFromToken = async (req, res) => {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    res.status(200).send(decoded);
  });
};

module.exports.register = register;
module.exports.login = login;
module.exports.getUserFromToken = getUserFromToken;
