const {Router} = require('express');
const app = Router();
const imageController = require('./../controllers/image.controller');

app.get('/:image_name', imageController.getImage);
module.exports = app;