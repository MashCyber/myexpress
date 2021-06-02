const express = require('express');
const User = require('../models/userModels');
const bcrypt = require('bcryptjs')

exports.signup = async(req,res,next) =>{
    const {username,password} = req.body
    try {
        const hashpass = await bcrypt.hash(password,12);
        const newUser = await User.create({
            username,
            password: hashpass
        })
        req.session.user = newUser;
        res.status(200).json({
            status:"Success",
            message:{
                newUser
            }
        })
    } catch (e) {
        console.log("Error:",e)
        res.status(400).json({
            status:"Error",
            message:"Unable to Signup!!"
        })
    }

}


exports.login = async(req,res,next) =>{
    const {username,password} = req.body
    try {
        const user = await User.findOne({username})
    if(!user){
        return res.status(400).json({
            status:"Error",
            message:"User Not Found!!"
        })
    }
    const correctPass = await bcrypt.compare(password,user.password)
    if(correctPass){
        req.session.user = user;
        res.status(200).json({
            status:"Success",
            message:"Login Successful!"
        })
    }
    } catch (e) {
        console.log("Error:",e)
        res.status(400).json({
            status:"Error",
            message:"Incorrect username/password"
        })
    }
}