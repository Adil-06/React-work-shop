const Customer = require('../models/customer');
const Product = require('../models/product');

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

exports.getCustomerProduct = async (req, res) => {
  try {
    const fetchCustProd = await Customer.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "customerID",
          as: "customerProducts",
        }
      },
      {
        $project: { productIds: 0, __v: 0,
          "customerProducts.__v": 0, "customerProducts.description": 0
        }
      }
    ])
    res.status(200).send(fetchCustProd);
  }
  catch (err) {
    res.status(404).send(err.message);
  }
}

exports.getCustomerByName = async (req, res) => {
  const prodTitle = req.query.name
  try {
    const custbyName = await Customer.aggregate([
      {
        $lookup :{
          from: "products",
          let : {custId: "$_id"},
          pipeline : [
            {
              $match : {
                $expr: {
                  $and : [
                    { $eq : [ "$customerID", "$$custId" ] },
                    { $eq : [ "$title" , prodTitle ] }
                  ]
                }
              }
            }
          ],
          as : "prodNameList",
        },
      },
      { $project: { __v:0,productIds: 0 }}

    ]);
    res.status(200).send(custbyName);
  }
  catch(err) {
    res.status(404).send(err.message);
  }
}