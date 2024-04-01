const router = require('express').Router();

const subjects_controller = require("../controllers/subjects_controller")

const auth = require('../middlewares/auth');
router.get('/getsubjects',subjects_controller.getsubjects)
router.post('/createsubject',subjects_controller.createsubject)
module.exports = router;