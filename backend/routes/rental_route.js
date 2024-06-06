const express = require("express");
const router = express.Router();
const { addRental, getRentals, getRental, getRentalByCustomer, getRentalByFilm, returnRental, getDelayedRentals } = require("./../handlers/rentalHandle");
const { updateProduct } = require("./../handlers/productHandle")

router.post("/rentals", async (req, res) => {
    console.log("req.body", req.body);
    let rental = await addRental(req.body);
    let productRequest = {
        "status": "borrowed"
    }
    updateProduct(req.body.product._id, productRequest)
    res.send(rental);
});

router.get("/rentals", async (req, res) => {
    let rentals = await getRentals();
    res.send(rentals);
});

router.get("/delays", async (req, res) => {
    let rentals = await getDelayedRentals(req.body); 
    res.send(rentals);
});


router.get("/rental/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    let rental = await getRental(req.params["id"]);
    res.send(rental);
});

router.get("/rentals/customer/:id/rentDuration/:duration", async (req, res) => {
    let rentals = await getRentalByCustomer(req.params["id"], req.params["duration"]);
    res.send(rentals);
})


router.get("/rentals/product/:id", async (req, res) => {
    let rentals = await getRentalByFilm(req.params["id"]);
    res.send(rentals);
})

router.put("/return/:id", async (req, res) => {
    let rental = await returnRental(req.params["id"], req.body);
    let productRequest = {
        "status": "available"
    };
    if (rental && rental.product) {
        updateProduct(rental.product.toString(), productRequest);
    } else {
        res.status(400).send({ error: "Product not found in rental" });
        return;
    }
    res.send(rental);
});

/*
router.put("/customers/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    let customer = await updateCustomer(req.params["id"], req.body);
    res.send({});
});

router.delete("/customers/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    await deleteCustomer(req.params["id"]);
    res.send({});
});
*/
module.exports = router;
