const Book = require('../models/book');
const Publisher = require('../models/publisher')


exports.postBook =  async (req, res) => {
    const book = new Book({
        name: req.body.name,
        year : req.body.year,
        author : req.body.author,
        pubName : req.body.pubName
    })
    try {
      // find specific publisher
      const publish = await Publisher.findOne({name : req.body.pubName})
      console.log("publisher id is:", publish._id)
      book.publisher = publish._id
     // console.log('book id', book.publisher)

      await book.save();
      console.log('saved book :', book)
      // find publisher by id
      const publisher  = await Publisher.findById({ _id: book.publisher })
      await publisher.publishedBooks.push(book);
      await publisher.save();
      console.log('publisher :', publisher)

      // return book
      res.status(200).json({ success: true, data: book })
      //res.status(200).send(book);
      console.log("book posted");

    }
    catch(err) {
        res.status(404).send(err)
        console.log("book not posted")
    }
  
}