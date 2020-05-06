const path = require('path');
exports.getImage = (req, res) => {
    console.log('1111111111111111111111', req.params)
    let image_name = req.params.image_name;
    console.log('2222222222222222', image_name)
    res.sendFile(path.join(__dirname + './../assets/upload/image/' + image_name));
};