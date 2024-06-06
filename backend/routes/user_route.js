const express = require("express");
const router = express.Router();
const { addUser, getUsers, getUser, loginUser } = require("./../handlers/userHandle");

router.post("/users", async (req, res) => {
    console.log("req.body", req.body);
    let user = await addUser(req.body);
    res.send(user);
});

router.get("/users", async (req, res) => {
    let users = await getUsers();
    res.send(users);
});

router.get("/users/:id", async (req, res) => {
    console.log("id", req.params["id"])
    let user = await getUser(req.params["id"]);
    res.send(user);
});

router.post("/login", async (req, res) => {
    console.log("Bejelentkezés:", req.body);
    try {
        const result = await loginUser(req.body);
        res.json(result);
    } catch (error) {
        console.error('Hiba a felhasználó bejelentkezése során:', error);
        res.status(500).json({ üzenet: 'Belső szerver hiba' });
    }
});




module.exports = router;
