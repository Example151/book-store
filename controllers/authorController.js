const {Author, Book} = require("../models/model");

const authorController = {
  addAuthor: async (req, res) => {
    try {
        const author = new Author(req.body);
        const savedAuthor = await author.save();

        res.status(200).json(savedAuthor);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  getAllAuthors: async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  getAnAuthor: async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate("books");
        res.status(200).json(author);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  updateAuthor: async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        await author.updateOne({$set: req.body});

        res.status(200).json('Updated successfully');
    } catch (err) {
        res.status(500).json(err);
    }
  },
  deleteAuthor: async (req, res) => {
    try {
        await Book.updateMany({author: req.params.id}, {$set: {author: null}});
        await Author.findByIdAndDelete(req.params.id);

        res.status(200).json('Deleted successfully');
    } catch (err) {
        res.status(500).json(err);
    }
  }
};

module.exports = authorController;