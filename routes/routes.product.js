const express = require('express');
const router = express.Router();
const { upload, resize } = require("../middlewares/uploadProductPic");
const { getProduct, postProduct } = require('../controllers/controllers.product');

router.get("/", getProduct);

router.post('/post', upload.single("imageUrl"), postProduct)

module.exports = router;