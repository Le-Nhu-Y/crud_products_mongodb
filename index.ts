import express from "express";

import bodyParser from "body-parser";

import mongoose from "mongoose";

import productRouters from "./src/router/product.router";


const PORT = 3000;

const app = express();

app.set("view engine", "ejs");

app.set('views', './src/views');

const DB_URL = 'mongodb://127.0.0.1:27017/test2';

mongoose.connect(DB_URL)

    .then(() => console.log('DB Connected!'))

    .catch(error => console.log('DB connection error:', error.message));

app.use(bodyParser.json());

app.use('/products',productRouters);


app.listen(PORT, () => {

    console.log("Server is running on http://localhost:3000/products/list")

})


 //npm run start:dev