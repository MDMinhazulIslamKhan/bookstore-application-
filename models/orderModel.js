import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerDetails: {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phonNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postCode: {
            type: String,
            required: true
        },
    },
    order: [
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
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'paid'],
        default: "pending"
    }

});

const Order = mongoose.model("order", orderSchema);

export default Order;

