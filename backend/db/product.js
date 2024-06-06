const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({

    title: String,
    aquisitionDate: String,
    serialNumber: Number,
    status: { type: String, enum: ['available', 'borrowed', 'disposed'] },
    rentals: [{ 
        type: Schema.Types.ObjectId, 
        ref: "rentals" 
    }]
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;
