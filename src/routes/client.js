const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Acount = require("../models/Acount");
const generateCode = require("../utils/generator");
const Client = require("../models/Client");

// create
router.post("/create", (req, res) => {
  const { name, postname, age, nationalite } = req.body;
  const newClient = new Client({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    postname: postname,
    age: age,
    nationalite: nationalite,
  });

  newClient
    .save()
    .then(() => {
      const code = generateCode(10);
      const newAcount = new Acount({
        client: newClient._id,
        acountNumber: code,
      });

      newAcount.save();
      res.json(newClient);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error creating client" });
    });
});

// read all
router.get("/", (req, res) => {
  Client.find()
    .sort({ name: -1 })
    .then((clients) => {
      res.json(clients);
    })
    .catch((err) => {
      res.json({ error: "Error fetching clients" });
    });
});

// get one by id
router.get("/:id", (req, res) => {
  Client.findOne({ _id: `${req.params.id}` }).then((client) => {
    res.json(client);
  });
});

//update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, postname, nationalite } = req.body;
  Client.findByIdAndUpdate(id, { name, postname, nationalite }, { new: true })
    .then((client) => {
      res.json(client);
    })
    .catch((err) => {
      res.json({ error: "Error Updating client" });
    });
});

//delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Client.findByIdAndRemove(id)
    .then(() => {
      Acount.findOneAndDelete({ client: `${id}` })
        .then(() => {
          res.json({ message: "Client deleted successfuly" });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json({ error: "Error deleting Client" });
    });
});

module.exports = router;
