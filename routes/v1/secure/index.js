import express from "express";
import { addBook, deleteBook, editBook, viewBookById, viewBooks } from "../../../controllers/secure/index.js";

const router = express.Router();

// view all books
router.get('/view-all-books', viewBooks);

// view book by id
router.get('/view-book', viewBookById);

// add book
router.post('/add-book', addBook);

// edit book
router.patch('/edit-book', editBook);

// delete book
router.delete('/delete-book', deleteBook);


export default router;