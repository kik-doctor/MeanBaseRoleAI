const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        image_name: String,
        user_id: String,
        standard_mark_name: {
            type: String,
            default: ''
        },
        standard_mark_certainty: {
            type: Number,
            default: 0
        },
        location_name: {
            type: String,
            default: 'Australia'
        },
        location_certainty: {
            type: Number,
            default: 0
        },
        date_number: {
            type: Date,
            default: Date.now()
        },
        date_certainty: {
            type: Number,
            default: 0
        },
        markers_mark_name: {
            type: String,
            default: ''
        },
        markers_mark_certainty: {
            type: Number,
            default: 0
        }
    })
);

module.exports = Product;
