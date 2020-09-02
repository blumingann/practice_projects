const express = require("express");
const request = require("request");

module.exports = app => {
    app.use(express.json());

    app.post("/newsletter/", (req, res) => {
        const newContact = req.body;
        console.log(req.body);

        const mcData =
        {
            email_address: newContact.email_address,
            status: "pending"
        }

        const mcDataPost = JSON.stringify(mcData);

        const options = {
            url: "https://us10.api.mailchimp.com/3.0/lists/2b76666823/members",
            method: "POST",
            headers: {
                Authorization: "Bearer bb3a6dbe17eb8e89faa56778e3f73d27-us10"
            },
            body: mcDataPost
        }
        if (newContact.email_address) {
            request(options, (err, response, body) => {
                if (err) {
                    res.json({ error: err })
                } else {
                    console.log("Success!")
                    res.status(201).json(req.body);
                }
            })
        } else {
            res.status(404).send({ message: "Failed" })
        }
    });
}