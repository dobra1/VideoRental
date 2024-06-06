
const Rental = require('../db/rental');

async function addRental(rentalModel) {
    let rental = new Rental({
        ...rentalModel,
    });

    await rental.save();

    return rental.toObject();
}

async function getRentals() {
    const rentals = await Rental.find().populate("customer").populate("product");
    return rentals.map(x => x.toObject());
}


async function getRental(id) {
    const rental = await Rental.findById(id).populate("customer").populate("product");
    return rental.toObject();
}

async function getDelayedRentals(request) {
    const rentDuration = request.rentDuration;
    let today = new Date();
    today.setDate(today.getDate() - rentDuration - 1);
    
    let filter = {"rentalDate": {$lt: today.toISOString()}, "returnDate": null }
    const rentals = await Rental.find(filter).populate("customer").populate("product");
    
    let result = [];
    rentals.forEach(rental => {
        let today = new Date();
        const diffTime = today - new Date(rental.rentalDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) - rentDuration; 

        result.push(
            {
                "rentalDate": rental.rentalDate,
                "returnDate": rental.returnDate,
                "customer": rental.customer,
                "product": rental.product,
                "delay": diffDays
            }
        );
    });
    
    return result;
}

async function getRentalByCustomer(customerId, rentDuration) {

    
    let filter = {
        "customer": customerId,
        "returnDate": null
    };

    const rentals = await Rental.find(filter).populate("product");
    
    let result = [];
    rentals.forEach(rental => {
        let today = new Date();
        const diffTime = today - new Date(rental.rentalDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) - rentDuration; 

        result.push(
            {
                "_id": rental._id,
                "rentalDate": rental.rentalDate,
                "returnDate": rental.returnDate,
                "product": rental.product,
                "delay": diffDays
            }
        );
    });    
    
    return result;
}



async function getRentalByFilm(productId) {
    const rentals = await Rental.find({"product": productId}).populate("customer");
    return rentals.map(x => x.toObject());
}

async function returnRental(id, returnDate) {
    const filter = { _id: id };
    const rental = await Rental.findOneAndUpdate(filter, returnDate, {new: true});
    return rental.toObject();
}

/*
async function updateCustomer(id, customerModel) {
    const filter = { _id: id };
    await Customer.findOneAndUpdate(filter, customerModel);
}

async function deleteCustomer(id) {
    await Customer.findByIdAndDelete(id);
}
*/
module.exports = { addRental, getRentals, getRental, getRentalByCustomer, getRentalByFilm, returnRental, getDelayedRentals};
