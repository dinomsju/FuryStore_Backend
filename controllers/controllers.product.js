const Product = require('../models/models.product');

const getProduct = (req, res) => {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 0;
    Product.find()
        .sort({ update_At: -1 })
        .skip(page * limit)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                res.status(400).send({
                    status: "ERR_SERVER",
                    message: err.message,
                    content: null
                });
            }
            Product.countDocuments().exec((count_error, count) => {
                if (err) {
                    res.json(count_error);
                }
                res.json({
                    total: count,
                    page: page,
                    pageSize: data.length,
                    content: data
                });
            });
        });
};

const postProduct = (req, res, next) => {
    const host = process.env.HOST_NAME;
    const tenSP = req.body.tenSP.replace(/ +/g, "");
    if (!req.body) {
        res.status(200).send({
            status: "ERR_REQUEST",
            message: "Vui lòng kiểm tra yêu cầu của bạn!",
            content: null
        });
    }
    const imageUrl = "/images/productPictures/" + tenSP + ".jpg";
    const resizeUrl = "/images/productPictures/" + "256x144-" + tenSP + ".jpg"

    const product = new Product({
        tenSP: req.body.tenSP,
        giaSP: req.body.giaSP,
        xuatXu: req.body.xuatXu,
        moTa: req.body.moTa,
        url: imageUrl,
        thumb: resizeUrl,
        loaiSP: req.body.loaiSP,
    });
    product.save()
        .then((data) => {
            res.status(200).send({
                status: "OK",
                message: "Thêm thành công!",
                content: data
            });
        })
        .catch((err) => {
            res.status(400).send({
                status: "ERR_SERVER",
                message: err.message,
                content: null,
            })
        });
};

module.exports = {
    getProduct,
    postProduct
};