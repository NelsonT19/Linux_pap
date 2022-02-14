const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/login', (req, res) => {
    res.render('login')
})


router.get('/register', (req, res) => {
    res.render('register')
})


router.post('/register', (req,res)=>{
    //handeling validation in form
    const errors = []
    const { name, email,password,password2} = req.body

    
    if(!name || !email || !password || !password2){
        errors.push({msg:"All fields are require"})
        console.log('All fields are require')
    }

    //email validation
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!email.match(validRegex)){
        errors.push({ message: 'Ivalid Email' })
        console.log('Ivalid Email')
    }

    //password length
    if(password.length <6){
        errors.push({ msg: "Password len must be min 6" })
        console.log('Password len must be min 6')
    }

    //match password
    if(password !== password2){
        errors.push({msg: "Passwords doest match"})
        console.log('Passwords doest match')
    }

    if(errors.length >0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
            //check if user alredy exists
            User.findOne({email:email})
            .then((user)=>{
                if(user){
                    errors.push({ msg: "User alredy existes" })
                    console.log('User alredy existe')
                    res.render('register')

            }
            else{
                    const user = new User({
                        name,
                        email,
                        password
                    })
                    //hashing the password 
                    bcrypt.genSalt(10,(err,salt)=>{
                        bcrypt.hash(user.password,salt,(err,hash)=>{
                            user.password = hash
                            user.save()
                                .then((user) => {
                                    console.log('User Created')
                                    res.redirect('/user/login')
                                })
                                .catch(err => {
                                    res.redirect('/user/register')
                                })
                        })
                    })

                    
            }

        })
        .catch(err=>{
            res.render('register')
        })

    
    }
})


//sign th token
const createtoken = (id)=>{
    return jwt.sign({ id }, "secretkey")
}



router.post('/login', (req,res)=>{
    const { email, password} = req.body
    //check email
    User.findOne({ email: email})
    .then((user)=>{
        if(user){
            //compare the password
            bcrypt.compare(password, user.password,(err,isMatch)=>{
                //if password matches
                if(isMatch){
                    //generate token 
                    const token = createtoken(user._id)
                    //store the jwt in cookie
                    res.cookie("acess-token",token)
                    console.log(token)


                    res.redirect('/dashboard')
                }
                else{
                    res.render('login')
                }
            })
        }else{
            res.render('login')
        }
    })
})

router.get('/logout',(req,res)=>{
    res.cookie("access-token"," ", { maxAge : 1})
    res.redirect('/user/login')
})

module.exports = router;