const bcrypt = require('bcryptjs');
const UserSignUp = require('../models/SignupModel')


exports.signupPost = async (req, res, next) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 7)
  try {
    const postUserData = new UserSignUp({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    const userData = await postUserData.save();
    const totallUsers = await UserSignUp.find();
    res.status(200).send({data: userData, total: totallUsers.length});
    console.log("userCreated from post req");
  }
  catch (err) { console.log("usernot created erroris :", err) }
}

exports.getSignedUpUSer = async (req, res) => {
  try {
    const AllSignUpUser = await UserSignUp.find();
    res.status(200).send(AllSignUpUser);
    console.log("get signed in users");
  }
  catch (err) { console.log("error in getting user", err) }
}

exports.filterUsers = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip)
    const name = req.query.name

    if (skip >= 0 & limit >= 0 & name === '') {
      const page = limit * (skip);
      const totallUsers = await UserSignUp.find();
      //console.log(totallUsers.length)
      const users = await UserSignUp.find().skip(page).limit(limit)
      await res.status(200).send({ data: users, total: totallUsers.length });
    }
    else if (name !== '') {
      // console.log("name to search", req.query.name);
      var condition = name ? { name: { $regex: name, $options: "i" } } : {};
      const users = await UserSignUp.find(condition).sort({ created_at: -1 })
      await res.status(200).send({ data: users, total: users.length })
    }
  }
  catch (err) {
    res.status(404).send({ message: err })
  }
}

exports.userRecord = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip)
    const name = req.query.name
    var condition = name ? { name: { $regex: name, $options: "i" } } : {};

    if (skip >= 0 & limit >= 0 & name !== undefined) {
      //console.log(typeof name, typeof skip)
      const totallUsers = await UserSignUp.find();
      const page = limit * skip
      const users = await UserSignUp.find().skip(page).limit(limit)

      res.status(200).send({ data: users, total: totallUsers.length })
    }
    else if (name) {
      console.log("name to search", req.query.name);
      const users = await UserSignUp.find(condition).sort({ created_at: -1 })
      // console.log('find', users)
      res.status(200).send({ data: users, total: users.length })
    }
    else {
      res.status(404).send('bad request')
    }

  }
  catch (err) {
    await res.status(500).send({ message: err.message })
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await UserSignUp.findById(req.params.id)
    const usersAfterDelete = await deleteUser.remove()
    res.status(200).send(usersAfterDelete)
    console.log("user deleted")
  }
  catch (err) { res.send("error in delete method") }
}
exports.deleteManay = async (req, res, next) => {
  try {
    const removeUser = req.body.delmany
    console.log('from client delete many users', removeUser);
    const deleteManay = await UserSignUp.deleteMany({ _id: { $in: removeUser } })
    await res.status(200).send(deleteManay);
  }
  catch (err) {
    res.status(404).send(err.message)
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const name = req.body.data.name;
    const email = req.body.data.email
    const id = req.params.id
    if (name !== null && email !== null) {
         
      const updatedUser = await UserSignUp.findByIdAndUpdate({ _id: id },
        { $set: {name: name, email: email } }        
        , { new: true });
      await updatedUser.save();
      console.log('updated', updatedUser)
      res.status(200).send(updatedUser)
    }
  }
  catch (err) {
    res.status(404).send(err)
    console.log(err)
  }
}


exports.getPaginatedUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const allUser = await UserSignUp.find();
    const results = {};

    if (endIndex < allUser.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    results.results = allUser.slice(startIndex, endIndex);
    console.log(`total: ${allUser.length}`);
    res.status(200).send(results);
  }
  catch (err) { console.log('error in pagination api', err) }
}