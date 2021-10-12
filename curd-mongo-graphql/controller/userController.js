const User = require('../models/User');
const { registerValidation , loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.get_Users = async (req, res) => {
    try {
        const allUsers = await User.find()

        res.status(200).send(allUsers)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

exports.create_User = async (req, res) => {

    // validating the fields
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    //if user already exist
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
        res.status(400).send("email already exist")
    }

     const { name, email, password } = req.body    
    //to hash the user password
    const hashedPassword = await bcrypt.hash(req.body.password, 7)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    //create token
    const token = jwt.sign(
        {user_id : user._id, email}, 
        process.env.secret_token,
        { expiresIn: "2h"}
    );

    // save token
    user.token = token
   // user.save()

    try {
        const savedUser = await user.save();
        res.send(savedUser);
        console.log("user created");
    }
    catch (err) {
        console.log("not created", + err)
        res.status(404).send(err)
    }

}

exports.userLogin = async (req, res) => {

    // validating the fields
    const { error } = loginValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    //if user email exist
    const userExist = await User.findOne({ email: req.body.email })
    if (!userExist) {
        res.status(400).send("email is wrong")
    }
    // if password is wrong
    const validPass = await bcrypt.compare(req.body.password, userExist.password)
    if (!validPass) {
        res.status(400).send("password is not correct");
    }
    // creat token
    const token = jwt.sign({ userExist_id: userExist._id }, process.env.secret_token);
    res.header('auth-token', token).send(`user logged in  with token ${token}`);

}