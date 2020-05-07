const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        image_name: String,
        user_id: String,
        silver_mark_name: {
            type: String,
            default: ''
        },
        silver_mark_value: {
            type: Number,
            default: 0
        },
        assay_location_name: {
            type: String,
            default: 'Australia'
        },
        assay_location_value: {
            type: Number,
            default: 0
        },
        date_name: {
            type: Date,
            default: Date.now()
        },
        date_value: {
            type: Number,
            default: 0
        },
        maker_mark_name: {
            type: String,
            default: ''
        },
        maker_mark_value: {
            type: Number,
            default: 0
        }
    })
);

module.exports = Product;
