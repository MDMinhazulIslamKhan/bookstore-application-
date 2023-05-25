import mongoose from "mongoose";
import Book from "../../models/bookModel.js";


// view all books controller
export const viewBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();
        return res.status(200).json(allBooks);
    } catch (error) {
        return res.status(404).json({ error });
    }
};

// view book by id controller
export const viewBookById = async (req, res) => {
    const { bookId } = req.query;
    try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(404).send({ message: `No book with this bookId (${bookId})` });
        }
        const searchedBook = await Book.findOne({ _id: bookId });
        return res.status(200).json(searchedBook);
    } catch (error) {
        return res.status(404).json({ error });
    }
};

// add book controller
export const addBook = async (req, res) => {
    const book = req.body;

    const newBook = new Book({ ...book })
    try {
        await newBook.save();
        return res.status(201).json({
            message: "Book Added Successfully",
            newBook
        });
    } catch (error) {
        return res.status(409).json({ message: error });
    }
};

// edit book controller
export const editBook = async (req, res) => {
    const { bookId } = req.query;
    const newBookData = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(404).send({ message: `No book with this bookId (${bookId})` });
        }

        const updatedBook = await Book.findByIdAndUpdate(bookId, { ...newBookData }, { new: true });

        return res.status(201).json({
            message: "Book Edited Successfully",
            newBook: updatedBook

        });
    } catch (error) {
        return res.status(409).json({ error });
    }
};

// delete book controller
export const deleteBook = async (req, res) => {
    const { bookId } = req.query;
    try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(404).send(
                { message: `This is an invalid bookId '(${bookId})'` }
            );
        }

        const data = await Book.findByIdAndRemove(bookId);
        const message = data ? 'Book deleted Successfully' : `No book exist with this bookId`;
        res.json({ message: message });
    } catch (error) {
        return res.status(409).json({ error });
    }
};