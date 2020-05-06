const db = require("../models/");
const Product = db.product;


exports.allAccess = (req, res) => {
    res.status(200).send("Public content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator content");
};

exports.createProduct = (req, res) => {
    let image = req.files.file;
    let path = './app/assets/upload/image/';
    let user_id = req.body.user_id;
    const product = new Product({
        image_name: image.name,
        user_id: user_id,
    });
    product.save((err, product) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }
        if(product.image_name) {
            image.mv(path + image.name);
            res.status(201).send({image_name: product.image_name});
        }
    });
};

exports.getProduct = (req, res) => {
    let user_id = req.query.user_id;
    Product.find({'user_id': user_id}).exec((err, products) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }
        if(products.length) {
            res.status(200).send({products: products});
            return;
        }
        res.status(400).send({message: err});
    });
};