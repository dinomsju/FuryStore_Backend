const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        tenSP: {
            type: String,
            required: true,
            unique: true,
        },
        giaSP: {
            type: String,
            required: true,
        },
        xuatXu: {
            type: String,
            required: true,
        },
        moTa: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            default: '',
        },
        thumb: {
            type: String,
            default: '',
        },
        loaiSP: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
const Product = mongoose.model('products', productSchema);

module.exports = Product;
