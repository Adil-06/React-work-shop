// mongodb operators and querries

const Inventory = require('../models/inventory');

exports.getAllInventory = async (req, res) => {
  try {
    //const fetchItems = await Inventory.find({'item.name' : req.query.name}, {__v:0})
    //const fetchItems = await Inventory.find({quantity : { $lt: req.query.qty } }, {__v:0});
    //const fetchItems = await Inventory.find({tags : { $in: req.query.tag } }, {__v:0})
    // const fetchItems = await Inventory.find(
    //  { $and: [ { quantity: { $lte: req.query.qty } }, { tags: { $in: req.query.tag } } ] },
    //  { __v: 0 });
    // const fetchItems = await Inventory.find(
    //   { $or: [ { quantity: { $lte: req.query.qty } }, { tags: { $eq: req.query.tag } } ] },
    //   { __v: 0 });
    // const fetchItems = await Inventory.find({ quantity: { $mod: [ req.query.mod  , 0 ] } },{__v:0})
    const fetchItems = await Inventory.find( { 'item.name' : { $regex : req.query.name , $options : 'i'} },{__v:0});
    await res.status(200).send(fetchItems);
  }
  catch (err) {
    res.status(404).send(err.message)
  }
}

exports.postNewInventory = async (req, res) => {
  const inventoryItem = req.body.item;
  const inventoryQuantity = req.body.quantity;
  const inventoryTags = req.body.tags;

  try {
    if (inventoryQuantity >= 0) {
      const addInventory = new Inventory({
        item: {
          name: inventoryItem.name,
          code: inventoryItem.code
        },
        quantity: inventoryQuantity,
        tags: inventoryTags
      });
      await addInventory.save();
      res.status(200).send(addInventory);
    }
    else {
      res.status(400).send("bad request");
    }
  }
  catch (err) {
    res.status(404).send(err);
  }
}