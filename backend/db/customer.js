const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new mongoose.Schema({

    name: String, 
    phone: String, 
    idNumber: Number, 
    address: String, 
    status: { type: String, enum: ['active', 'inactive'] },
    rentals: [{ 
        type: Schema.Types.ObjectId, 
        ref: "rentals" 
    }]

});

const Customer = mongoose.model('customers', customerSchema);
module.exports = Customer;