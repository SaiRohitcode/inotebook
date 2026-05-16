const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oy';

//Route 1
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

    // res.json(user);
    res.json(authToken);
    
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


//Route 2
// authenticate a user using the: POST "/api/auth/login". No login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please enter the details with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        // it automatically verifies the hashkeys
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, error:"Please enter the details with correct credentials"});
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        res.json({success : true, authtoken : authToken});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


//Route 3
// Get login user details using : Get "/api/auth/getuser". login required
router.post('/getuser',fetchuser, async (req,res) => {
try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router