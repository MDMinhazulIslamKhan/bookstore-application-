import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ISBN: {
        type: Number,
        required: true
    },
    coverImageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Fiction', 'Non-fiction', 'Sci-fi', 'Mystery', 'Thriller', "Children's book", "Religious", "History", "Biography"]
    },
    price: {
        type: Number,
        required: true
    },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;