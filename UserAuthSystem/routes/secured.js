const { Router } = require('express');
const db = require('../utilities/databse');

const securedRoute = Router();

securedRoute.get("/secured/:id", async (req, res) => {
    try {
        const userid = req.params.id;
        const userData = await db.User.findById(userid);
        res.status(200).render('secured', { username: userData._doc.username, error: false });
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error);
    };
});

module.exports = { securedRoute };