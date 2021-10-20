const Customer = require('../models/customer');

exports.getAllCustomer = async (req, res) => {
  try {
    const getCustomers = await Customer.find({}, { __v: 0 }).populate('productIds', 'title price');
    res.status(200).send(getCustomers);
  }
  catch (err) {
    res.status(404).send(err.message);
  }
}

exports.postNewCustomer = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const customerEmail = await Customer.findOne({ email: email });
  try {
    if (customerEmail) {
      res.status(400).send('customer already exist');
      return;
    }
    else {
      if (email !== '' & name !== '') {
        const addCustomer = new Customer({
          name: name,
          email: email,
          date: new Date().toLocaleDateString()
        })
        await addCustomer.save()
        res.status(200).send(addCustomer);    
      } 
      else {
        res.status(400).send('customer data is invalid')
      }
    }
  }
  catch (err) {
    console.log("error in post customer")
    res.status(404).send(err.message);
  }
}