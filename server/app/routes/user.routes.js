const {Router} = require('express');
const app = Router();
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.get("/all", controller.allAccess);

app.get("/user", [authJwt.verifyToken], controller.userBoard);

app.post(
    "/create-product",
    controller.createProduct
);

app.get(
    "/get-product",
    controller.getProduct
);


module.exports = app;
