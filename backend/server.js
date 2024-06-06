const express = require('express');
const server = express();
const port = 3000;
const mongoose = require('mongoose');
const productRoutes = require("./routes/product_route");
const customerRoutes = require("./routes/customer_route"); 
const rentalRoutes = require("./routes/rental_route");
const userRoutes = require("./routes/user_route");
const cors = require("cors");
const { addRental } = require('./handlers/rentalHandle');

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('running!')
});

server.use(productRoutes);

server.use(customerRoutes); 

server.use(rentalRoutes); 

server.use(userRoutes); 


/*
server.post("/rentals", async (req, res) => {
  console.log("req.body", req.body);
  await addRental(req.body);
  res.send('done');
});

server.get("/rentals", async (req, res) => {
  let rentals = await getRentals();
  res.send(rentals);
});
*/
server.post("/products", async (req, res) => {
  console.log("req.body", req.body);
  await addProduct(req.body);
  res.send('done');
});

server.get("/products", async (req, res) => {
  let products = await getProducts();
  res.send(products);
});

/*
server.post("/customers", async (req, res) => {
  console.log("req.body", req.body);
  await addCustomer(req.body);
  res.send('done');
});

server.get("/customers", async (req, res) => {
  let customers = await getCustomers();
  res.send(customers);
});*/

async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "videoRental"
  });
}
connectDb().catch((err) => console.error(err));

server.listen(port, () => {
  console.log(`The server is started on port ${port}`);
});


