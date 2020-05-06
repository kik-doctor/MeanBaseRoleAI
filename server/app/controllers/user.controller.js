const db = require("../models/");
const Product = db.product;
// const {ClarifaiStub} = require("clarifai-nodejs-grpc");
// const grpc = require("@grpc/grpc-js");
// // Construct one of the stubs you want to use
// // const stub = ClarifaiStub.json();
// const stub = ClarifaiStub.insecureGrpc();
// // This will be used by every Clarifai endpoint call.
// const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key 7de657eeff6e4d9aa34fb72cc1b8b65a");
const Clarifai = require('clarifai');





exports.allAccess = (req, res) => {
    res.status(200).send("Public content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User content.");
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
    let user_id = req.query.userId;
    Product.find({'user_id': user_id}).exec((err, products) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }
        if(products.length) {
            res.status(200).send({products: products});
            return;
        }
        res.status(204).send({products: ''});
    });
};

exports.getImageData = (req, res) => {
    let imageName = req.query.imageName;
    const app = new Clarifai.App({
        apiKey: 'e64c85a33e9d43b4867d070d844ffc67'
    });
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
        result => {
            console.log("1111111111111111111", result)
        },err => {
            console.log("bbbbbbbbbbbbbbbbb", err)
        }
    );

    res.status(200).send({'status': true})
};