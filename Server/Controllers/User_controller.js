//@desc Auth user/setToken
//rooute  POST /api/users/auth
//@access Public
import asyncHandler from "express-async-handler";
import usersModel from "../models/usersModel.js";
import generateToken from "../utils/generateToken.js";


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await usersModel.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or Password");
  }

  res.status(200).json({ message: "Auth User" });
});

//@desc Register a new  user
//rooute  POST   /api/users/auth
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  const userExists = await usersModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await usersModel.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id); // Make sure this line is correct
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});



//@desc Logout   user
//rooute  POST   /api/users/auth
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
 // destroy the cookie for the user
  res.cookie('jwt','',{
       httpOnly:true,
       expires: new Date(0)
  })
  res.status(200).json({ message: " User Loggged Out  " });
});

//@desc Get   user
//rooute  GET   /api/users/profile
//@access Private
const getUserprofile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Profile" });
});

//@desc Update user
//rooute  PUT  /api/users/profile
//@access Public
const updateUserprofile = asyncHandler(async (req, res) => {
  const user = await usersModel.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


export {
  authUser,
  registerUser,
  logoutUser,
  getUserprofile,
  updateUserprofile,
};
