const Customer = require('../db/customer');

async function addCustomer(customerModel) {
    let customer = new Customer({
        ...customerModel,
    });
    await customer.save();
    return customer.toObject();
}

async function getCustomers() {
    const customers = await Customer.find().populate("rentals");
    return customers.map(x => x.toObject());
}

async function getCustomer(id) {
    console.log(Object.prototype.toString.call(id))
    const customer = await Customer.findById(id);
    return customer.toObject();
}

async function updateCustomer(id, customerModel) {
    const filter = { _id: id };
    await Customer.findOneAndUpdate(filter, customerModel);
}

async function updateCustomerStatus(id, status) {
    const filter = { _id: id };
    const update = { status: status };
    const customer = await Customer.findOneAndUpdate(filter, update, { new: true });
    return customer.toObject();
}

module.exports = { addCustomer, getCustomers, getCustomer, updateCustomer, updateCustomerStatus };
