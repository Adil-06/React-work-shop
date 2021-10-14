const Publisher = require('../models/publisher');

// for all publisher
exports.get_Publisher = async (req, res) => {
  try {
    const allPublisher = await Publisher.find({}, { _id: 0 }).populate('publishedBooks', 'name')

    res.status(200).send(allPublisher)
  }
  catch (err) {
    res.status(400).send(err)
  }
}
// for get publisher by year
exports.getPublisherbyYear = async (req, res, next) => {
  try {
    const pub_by_year = await Publisher.findOne({ year: { $gte: req.params.year } })
      .populate('publishedBooks', 'name')
    console.log("year:", pub_by_year)

    res.status(200).send(pub_by_year)
  }
  catch (err) {
    res.status(404).send(err)
    console.log(err)
  }
}
// for update publisher
exports.update_Publisher = async (req, res, next) => {
  try {
    const updatePub = await Publisher.findOneAndUpdate({ name: req.params.name },
      { $set: { location: req.params.location } });
    console.log('updated', updatePub)
    res.status(200).send(updatePub)
  }
  catch (err) {
    res.status(404).send(err)
    console.log(err)
  }

}


// create new publisher
exports.publishPost = async (req, res) => {
  const publish = new Publisher({
    name: req.body.name,
    year: req.body.year,
    location: req.body.location
  })
  try {
    const savedPublisher = await publish.save();
    //res.status(201).json({success:true, data: savedPublisher })
    res.status(200).send(savedPublisher);
    console.log('publisher created');

  }
  catch (err) {
    res.status(404).send(err)
    console.log('error in publishing')

  }


}
