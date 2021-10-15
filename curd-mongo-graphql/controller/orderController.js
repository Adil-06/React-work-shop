const Order = require('../models/order');

exports.getAllOrders = async (req, res) => {

  try {
    const allOrderList = await Order.find({},
      { _id: 0, date: 1, status: 1, productName: 1, customerName: 1 })
    await res.status(200).send(allOrderList);
  }
  catch (err) {
    await res.status(404).send(err)
    console.log('error in getting all order', err)
  }
}
exports.postNewOrder = async (req, res, next) => {
  const custName = req.body.customerName;
  const prodName = req.body.productName;
  const prodPrice = req.body.productPrice;
  const status = req.body.status;
  const date = new Date()

  try {
    if (custName !== '' & prodName !== '' & prodPrice !== '') {
      const postOrder = new Order({
        customerName: custName,
        productName: prodName,
        productPrice: prodPrice,
        status: status,
        date: date
      });
      await postOrder.save();
      await res.status(200).send(postOrder);
      //console.log('order posted')
    }
    else {
      res.status(200).send("in complete data")
    }

  }
  catch (err) {
    await res.status(404).send(err)
    console.log('error in posting new order', err)
  }
}

exports.getFilterCustomer = async (req, res, next) => {
  const name = req.query.name
  try {
    if (name) {
      //const filterCust = await Order.find({customerName: name}, {createdAt:0,__v:0, updatedAt:0});
      const filterCust = await Order.aggregate([ { $project: {createdAt:0 , updatedAt:0 , __v:0} }
        ,{ $match: { customerName: name } }]);
      await res.status(200).send(filterCust);
    }
    else {
      await res.status(200).send("no user found");
    }

  }
  catch (err) {
    console.log('error in filter', err)
    await res.status(404).send(err);
  }
}