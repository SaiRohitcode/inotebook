const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Harryisagoodb$oy';

// create a user using : POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter password upto 5 characters').isLength({min : 5}),
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    try{
    let user = await User.findOne({email: req.body.email});
    console.log(user);
    if(user){
        return res.status(400).json({error : 'Sorry! a user with this email already exists'})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass,
    });
    // .then(user => res.json(user))
    // .catch(err => {
    //     res.json({error : 'Please enter a unique value for email',message : err.message})
    // });
    const data = {
        user : {
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);

    res.json(user);
    res.json(authToken);
    
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})
module.exports = router