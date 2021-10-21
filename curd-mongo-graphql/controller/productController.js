const Product = require('../models/product');
const Customer = require('../models/customer');

exports.getAllProducts = async (req, res) => {
  try{
    const getAllSaveProduct = await Product.find({},{__v:0});
    res.status(200).send(getAllSaveProduct)
  }
  catch(err) {
    res.status(404).send(err.message);
  }
}

exports.postProduct = async (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const name = req.body.name;
  try {
    const customerData = await Customer.findOne({name: name})
        
    if(title !=='' & price !== '' & description !=='') {
      const addNewProduct = new Product ({
        title : title,
        price : price,
        description : description,
        date : new Date().toLocaleDateString()
      });
      addNewProduct.customerID = customerData._id;
      await addNewProduct.save();

      const getCustomer = await Customer.findById({_id: addNewProduct.customerID});
      await getCustomer.productIds.push(addNewProduct);
      await getCustomer.save();

      res.status(200).send(addNewProduct);
    }
    else {
      res.status(400).send(" product data is not valid");
    }
  }
  catch(err) {
    res.status(404).send(err.message);
  }

}