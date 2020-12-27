const multer = require('multer');
const sharp = require('sharp');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/productPictures");
    },
    fillname: (req, file, cb) => {
        cb(null, req.body.tenSP.replace(/ +/g, "") + ".jpg");
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg  or png"));
    }
};

const resize = async (req, res, next) => {
    if (!req.file) return next();
    await sharp(req.file.path)
        .resize(256, 144)
        .toFile("./public/images/productPictures/" + "255x144-" + req.body.tenSP.replace(/ +/g, "") + ".jpg",
            (err) => {
                if (err) {
                    console.log("sharp>>>", err);
                }
                console.log("Resize Succesfully!")
            });
    next();
};
const upload = multer({ storage, fileFilter });
module.exports = { upload };