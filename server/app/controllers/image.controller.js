const path = require('path');
exports.getImage = (req, res) => {
    let image_name = req.params.image_name;
    res.sendFile(path.join(__dirname + './../assets/upload/image/' + image_name));
};