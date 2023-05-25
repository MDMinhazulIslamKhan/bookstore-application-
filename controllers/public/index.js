import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import Book from "../../models/bookModel.js";
import User from '../../models/userModel.js';
import Order from '../../models/orderModel.js';


// controller for search books by title, author, ISBN
export const searchBooks = async (req, res) => {
    const { title, author, ISBN } = req.query;
    try {
        const toIntISBN = +ISBN;
        if (typeof (toIntISBN) !== "number") {
            return res.status(404).json({ message: "ISBN must be a number" });
        }
        if (ISBN || title || author) {
            const books = await Book.find({
                $or: [
                    { title }, { ISBN }, { author }
                ]
            })
            return res.status(201).json(books);
        }
        else return res.status(404).json({ message: "You can search by book 'title', 'author' and 'ISBN'." });
    } catch (error) {
        return res.status(409).json({ error });
    }
};

// controller for search books by category
export const searchByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const realCategory = Book.schema.path('category').enumValues.includes(category);
        if (!realCategory) {
            return res.status(400).json({ message: 'Invalid category' });
        }
        else {
            const books = await Book.find({ category })
            return res.status(201).json(books);
        }
    } catch (error) {
        return res.status(409).json({ error });
    }
};

// controller for add to cart
export const addToCart = async (req, res) => {
    const { bookId, quantity } = req.body;
    const token = req?.headers?.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const _id = decoded.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(404).send({ message: `No book with this bookId (${bookId})` });
        };
        if (Number.isInteger(+quantity)) {
            const book = await Book.findOne({ _id: bookId });
            const { title, author, price } = book;
            await User.updateOne(
                { _id },
                { $push: { cart: { bookTitle: title, author, price, quantity } } }
            );
            return res.status(200).json({ message: 'Cart item added successfully' });
        } else {
            return res.status(400).send({ message: 'Give a valid quantity' });
        }
    } catch (error) {
        return res.status(409).json({ error });
    }
};

// controller for delete item from cart
export const deleteItemFromCart = async (req, res) => {
    const token = req?.headers?.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const _id = decoded.id;

    const { bookId } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(404).send({ message: `No book with this bookId (${bookId})` });
        };
        await User.updateOne(
            { _id },
            { $pull: { cart: { bookId: bookId } } }
        );
        return res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        return res.status(409).json({ error });
    }
};

// controller for add to checkout
export const checkout = async (req, res) => {
    const token = req?.headers?.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { address, city, postCode } = req.body;
    const customerDetails = {
        _id: decoded.id,
        name: decoded.name,
        phonNumber: decoded.phonNumber,
        email: decoded.email,
        address,
        city,
        postCode
    }
    const order = [];
    let total = 0;
    try {
        if (!address || !city || !postCode) {
            return res.status(400).send({ message: 'Give a valid address, city and postCode' });
        };
        const [allBooks] = await User.find({ email: decoded.email }, { cart: 1 });
        if (allBooks.cart.length === 0) {
            return res.status(400).send({ message: 'Please add product on cart.' });
        }
        allBooks.cart.map(book => {
            order.push({
                bookTitle: book.bookTitle,
                author: book.author,
                price: book.price,
                quantity: book.quantity,
            });
            total += book.price * book.quantity;
        });
        const newOrder = Order({ customerDetails, order, total });
        await newOrder.save();
        await User.updateOne({ "email": decoded.email }, { $unset: { "cart": 1 } })
        return res.status(200).json({ message: 'Checkout successfully' });
    } catch (error) {
        return res.status(409).json({ error });
    }
};


// controller for payment
export const payment = async (req, res) => {
    const token = req?.headers?.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const { orderId, totalAmount } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(404).send({ message: `No order with this orderId (${orderId})` });
        };
        const orderDetails = await Order.find({ $and: [{ "customerDetails._id": decoded.id }, { _id: orderId }, { total: totalAmount }] });

        if (orderDetails.length === 0) {
            return res.status(404).send({ message: 'Wrong information' });
        }
        await Order.updateOne({
            $and: [{ "customerDetails._id": decoded.id }, { _id: orderId }, { total: totalAmount }]
        }, {
            $set: { status: "paid" }
        })
        return res.status(200).json({ message: 'Payment successful' });
    } catch (error) {
        return res.status(409).json({ error });
    }
};

// controller for order history
export const orderHistory = async (req, res) => {
    const token = req?.headers?.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    try {
        const previousOrder = await Order.find({ $and: [{ "customerDetails._id": decoded.id }, { "status": "paid" }] });
        return res.status(200).json({ previousOrder });
    } catch (error) {
        return res.status(409).json({ error });
    }
};


// controller for add book in wishlist
export const addToWishlist = async (req, res) => {
    const { bookId } = req.body;
    const token = req?.headers?.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(404).send({ message: `Wrong bookId` });
        };
        const book = await Book.findOne({ _id: bookId });
        if (!book) {
            return res.status(404).send({ message: `No book with this bookId (${bookId})` });
        };
        const { title, author, ISBN } = book;
        await User.updateOne(
            { _id: decoded.id },
            { $push: { wishList: { bookTitle: title, author, ISBN } } }
        );
        return res.status(200).json({ message: 'Successfully add the book in wishlist' });
    } catch (error) {
        return res.status(409).json({ error });
    }
};