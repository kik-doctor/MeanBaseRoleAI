const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const fileUpload = require('express-fileupload');
const routes = require('./app/routes');

let corsOptions = {origin: "http://localhost:4200"};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({createParentPath: true}));
const db = require('./app/models');
const Role = db.role;
const dbConfig = require('./app/config/db.config');
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(("Successfully connect to MongoDB" + dbConfig.DB));
        initial();
    }).catch(err => {
        console.error("Connection error", err);
        process.exit();
}) ;

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added `user` to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added `moderator` to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added `admin` to roles collection");
            });
        }
    })
}

app.get("/", (req, res) => {
    res.json({message: "Welcome to AI platform application."});
});

app.use('/api', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
