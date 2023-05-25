import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: "user"
    },
    cart: [
        {
            bookTitle: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            quantity: {
                type: String,
                required: true
            },
        },
    ],
    wishList: [
        {
            bookTitle: String,
            author: String,
            ISBN: Number,
        }
    ]


});

const User = mongoose.model("User", userSchema);

export default User;