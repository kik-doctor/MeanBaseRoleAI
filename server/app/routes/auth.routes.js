const {Router} = require('express');
const app = Router();
const { verifySignUp } = require("./../middleware");
const controller = require("./../controllers/auth.controller");

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);

app.post("/signin", controller.signin);
module.exports = app;
