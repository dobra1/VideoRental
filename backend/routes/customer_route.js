const express = require("express");
const router = express.Router();
const { addCustomer, getCustomers, getCustomer, updateCustomer, updateCustomerStatus } = require("./../handlers/customerHandle");

router.post("/customers", async (req, res) => {
    console.log("req.body", req.body);
    let customer = await addCustomer(req.body);
    res.send(customer);
});

router.get("/customers", async (req, res) => {
    let customers = await getCustomers();
    res.send(customers);
});

router.get("/customers/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    let customer = await getCustomer(req.params["id"]);
    res.send(customer);
});

router.put("/customers/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    let customer = await updateCustomer(req.params["id"], req.body);
    res.send({});
});

router.patch("/customers/:id/status", async (req, res) => {
    console.log("id", req.params["id"]);
    console.log("status", req.body.status);
    let customer = await updateCustomerStatus(req.params["id"], req.body.status);
    res.send(customer);
});

module.exports = router;
