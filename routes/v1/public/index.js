import express from "express";
import { addToCart, addToWishlist, checkout, deleteItemFromCart, orderHistory, payment, searchBooks, searchByCategory } from "../../../controllers/public/index.js";

const router = express.Router();

// search books
router.get('/search-books', searchBooks);

// filter books by category
router.get('/search-with-category/:category', searchByCategory);

// add to cart
router.post('/add-to-cart', addToCart);

// delete item from cart
router.delete('/delete-item-from-cart', deleteItemFromCart);

// add to checkout
router.post('/checkout', checkout);

// payment
router.post('/payment', payment);

// customer order history
router.get('/history', orderHistory);

// add book to wish list
router.post('/add-book-to-wish-list', addToWishlist);

export default router;