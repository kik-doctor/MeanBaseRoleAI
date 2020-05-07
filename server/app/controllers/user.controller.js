const fs = require('fs');
const db = require("../models/");
const Product = db.product;
const clarifaiApiKey = '7de657eeff6e4d9aa34fb72cc1b8b65a';
const workflowId = 'my-first-application-workflow-2';
const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: clarifaiApiKey
});

exports.allAccess = (req, res) => {
    res.status(200).send("Welcome to our platform.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User content.");
};


exports.createProduct = (req, res) => {
    let image = req.files.file;
    let path = './app/assets/upload/image/';
    let user_id = req.body.user_id;
    let image_name = image.name;
    // convert binary data to base64 encoded string
    image.mv(path + image.name,  function (err, result) {
        let imageData = base64_encode( path + image.name);
        predictFromWorkflow(user_id, image_name, imageData).then((productData, error) => {
            console.log("0000000000000", productData);
            if(error) {
                res.status(500).send({message: error});
            }
            const product = new Product(productData)
                product.save((err, result) => {
                    if(err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    if(result) {
                        console.log("11111111111", result)
                        res.status(201).send({product: result});
                    }
                });
        })
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
        }
    });
};

// Analyzes image provided with Clarifai's Workflow API
 async function predictFromWorkflow(user_id, image_name, imageData){
    let assay_location_name = '';
    let assay_location_value = 0;
    let silver_mark_name = '';
    let silver_mark_value = 0;
    let date_name = '';
    let date_value = 0;
    let maker_mark_name = '';
    let maker_mark_value = 0;
   return new Promise((resolve, reject) => {
       app.workflow.predict(workflowId, {base64: imageData}).then(
           function(response){
               let outputs = response.results[0].outputs;
               outputs.forEach((output, index) => {
                   let modelName = '';
                   let concept = {};
                   if (output.model.name !== undefined) {
                       console.log("33333333333333333", output.model.name);
                       console.log("44444444444444444", output)
                       modelName = output.model.name;
                       concept = output.data.concepts[0];
                       if(modelName === "Assay Office Location") {
                           assay_location_name = concept.name;
                           assay_location_value = concept.value;
                       }
                       if(modelName === "Silver Standard Mark") {
                           silver_mark_name = concept.name;
                           silver_mark_value = concept.value;
                       }
                       if(modelName === "Date_Mark") {
                           date_name = concept.name;
                           date_value = concept.value;
                       }
                       if(modelName === "Makers_Mark") {
                           maker_mark_name = concept.name;
                           maker_mark_value = concept.value;
                       }

                   } else {
                       return "";
                   }

                   if(outputs.length === index + 1) {
                       const product = new Product({
                           image_name: image_name,
                           user_id: user_id,
                           assay_location_name: assay_location_name,
                           assay_location_value: assay_location_value,
                           silver_mark_name: silver_mark_name,
                           silver_mark_value: silver_mark_value,
                           date_name: date_name,
                           date_value: date_value,
                           maker_mark_name: maker_mark_name,
                           maker_mark_value: maker_mark_value
                       });

                       console.log("2222222222222222", product);
                       resolve(product);
                   }
               });
           },
           function(err){
               console.log(err);
               reject(err);
           }
       );
   })
}


function base64_encode(file) {
    // read binary data
    let bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

