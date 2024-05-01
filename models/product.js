const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter product Name"],
      trim: true,
      maxLength: [100, "product Name cannot be exceed 100 characters"]
    },
    description: {
      type: String,
      required: [true, "Please Enter product Description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter product Price"],
      maxLength: [8, "Price cannot exceed 8 characters"],
      default: 0.00
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
      enum: {
        values: [
            'Electronics',
            'Cameras',
            'Laptops',
            'Accessories',
            'Headphones',
            'Food',
            'Books',
            'Cloth/Shoes',
            'Beauty?Helth',
            'Sports',
            'Outdoor',
            'Home',
        ],
        message: 'please select correct category for products'
      }
    },
    seller: {
        type: String,
        required: [true, "Please Enter product seller"],
      },
    Stock: {
      type: Number,
      required: [true, "Please Enter product Stock"],
      maxLength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        // user: {
        //   type: mongoose.Schema.ObjectId,
        //   ref: "User",
        //   required: true,
        // },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model('Product',productSchema)