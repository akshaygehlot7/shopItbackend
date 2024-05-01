const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/product');

// setting dotenv file 
dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

const seedProducts = async () =>{
    try {
        await Product.deleteMany();
        console.log('products are deleted');

        await Product.insertMany(products);
        console.log('products are added');

        process.exit();
    }catch(erroe){
        console.log(error.message);
        process.exit();
    }
}

seedProducts()