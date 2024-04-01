const router = require('express').Router();

const pdf_controller = require('../controllers/pdf_controller')
const auth = require('../middlewares/auth');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/getpdf',auth,pdf_controller.getPdf);
// router.post('/checkaccess',pdf_controller.checkaccess);
router.post('/createpdf', upload.single('pdf_file'), pdf_controller.createPdf); 

module.exports = router;
 