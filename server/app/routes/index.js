const {Router} = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const imageRoute = require('./image.routes');
const router = Router();
router.use('/auth', authRoute);
router.use('/root', userRoute);
router.use('/image', imageRoute);
module.exports = router;