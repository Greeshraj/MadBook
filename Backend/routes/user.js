const router = require('express').Router();

const user_controller = require('../controllers/user_controller');
const auth = require('../middlewares/auth');
router.get('/login_check', user_controller.login_check);
router.get('/temp',user_controller.temp);
module.exports = router;