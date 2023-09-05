const express = require("express");
const router = express.Router();
const Retrait = require('../models/Retrait');
const Account = require('../models/Acount')

// create

router.post("/:id", (req, res) => {
  const clientId = req.params;
  const { amount, isUSD } = req.body;
  const newRetrait = new Retrait({ amount, clientId, isUSD });

  Account.find().then((acounts) => {
    acounts.forEach((acount) => {
      if (acount.clientId == clientId) {
        if (acount.amount < amount) {
          res.json({
            message: "votre solde est insuffisant pour effectuer ce retrait",
          });
        } else {
          acount.amount = acount.amount - amount;
        }
      }
    });
  });
  newRetrait
    .save()
    .then(() => {
      res.json({ message: "Operation effectuee avec succes" });
    })
    .catch((err) => {
      res.json(err);
    });
});

// get All retraits

router.get("/retraits", (res)=>{
  Retrait
        .find()
        .then((retraits)=>{
            res.json(retraits)
        })
        .catch((err)=>{
            res.json(err)
        })
})

module.exports = router;