"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRoutes = (0, express_1.Router)();
const product_model_1 = require("../schemas/product.model");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
productRoutes.get('/create', (req, res) => {
    res.render("createProduct");
});
productRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        const productNew = new product_model_1.Product(req.body);
        const product = await productNew.save();
        if (product) {
            res.redirect("/products/list");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
productRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const product = await product_model_1.Product.findOne({ _id: req.body.id });
        product.name = req.body.name;
        product.producer = req.body.producer;
        product.avatar = req.body.avatar;
        await product.save();
        if (product) {
            res.redirect("/products/list");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
productRoutes.get('/list', async (req, res) => {
    try {
        console.log(req.query);
        let limit;
        let offset;
        if (!req.query.offset || !req.query.limit) {
            limit = 1;
            offset = 0;
        }
        else {
            limit = Number(req.query.limit);
            offset = Number(req.query.offset);
        }
        const products = await product_model_1.Product.find().limit(limit).skip(offset);
        res.render("listProduct", { products: products });
    }
    catch (_a) {
        res.render("error");
    }
});
productRoutes.get('/update/:id', async (req, res) => {
    try {
        const product = await product_model_1.Product.findOne({ _id: req.params.id });
        console.log(product, 'product');
        if (product) {
            res.render("updateProduct", { product: product });
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
productRoutes.get('/delete/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const product = await product_model_1.Product.findOne({ _id: req.params.id });
        if (product) {
            await product.remove();
            res.redirect("/products/list");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
exports.default = productRoutes;
//# sourceMappingURL=product.router.js.map