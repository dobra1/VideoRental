const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({

    rentalDate: String,
    returnDate: String,
    customer: {
        type: Schema.Types.ObjectId,
        ref: "customers"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "products"
    }

});


const Rental = mongoose.model('rentals', rentalSchema);
module.exports = Rental;
