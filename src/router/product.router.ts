import { Router } from 'express';
const productRoutes = Router();
import { Product } from "../schemas/product.model";
import multer from 'multer';
const upload = multer();


productRoutes.get('/create', (req, res) => {
    res.render("createProduct");
});


productRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        const productNew = new Product(req.body);
        const product = await productNew.save();
        if (product) {
            res.redirect("/products/list")
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});



productRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.body.id });
        product.name = req.body.name;
        product.producer = req.body.producer;
        product.avatar = req.body.avatar;

        await product.save();
        if (product) {
            res.redirect("/products/list")
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});



productRoutes.get('/list', async (req, res) => {
    try {
        console.log(req.query)
        let limit: number;
        let offset: number;
        if(!req.query.offset || !req.query.limit) {
            limit = 1;
            offset = 0;
        } else {
            limit = Number(req.query.limit as string);
            offset = Number(req.query.offset as string);
        }

        const products = await Product.find().limit(limit).skip(offset);
        res.render("listProduct", { products: products });
    } catch {
        res.render("error");
    }
});



productRoutes.get('/update/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        console.log(product, 'product')
        if (product) {
            res.render("updateProduct", {product: product})
        } else {
            res.render("error");
        }
    } catch (err) {

        res.render("error");
    }
});



productRoutes.get('/delete/:id', async (req, res) => {

    try {
        console.log(req.params.id)
        const product = await Product.findOne({ _id: req.params.id });

        if (product) {

            await product.remove();

            res.redirect("/products/list")

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});





export default productRoutes;
