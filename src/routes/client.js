const express = require("express");
const router = express.Router();
const Acount = require("../models/Acount");
const generateCode = require("../utils/generator");
const Client = require("../models/Client");

// create
router.post("/create", (req, res) => {
  const { name, postname, nationalite } = req.body;
  const newClient = new Client({ name, postname, nationalite });

  newClient
    .save()
    .then((newClient) => {
      const clientId = newClient.id;
      const code = generateCode(10);
      const newAcount = new Acount({ clientId, code });

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
    .then((clients) => {
      res.json(clients);
    })
    .catch((err) => {
      res.json({ error: "Error fetching clients" });
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
      Acount.findOneAndDelete({ clientId: `${id}` })
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
