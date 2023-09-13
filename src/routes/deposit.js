const express = require("express");
const router = express.Router();
const Deposit = require("../models/Deposit");
const Account = require("../models/Acount");

// create

router.post("/:id", (req, res) => {
  const Id = req.params;
  let clientId = Id.id;
  const { amount, isUSD } = req.body;
  const newDeposit = new Deposit({ amount });

  newDeposit.save().then(() => {
    Account.findOne({ client: `${clientId}` })
      .then((acount) => {
        if (isUSD) {
          acount.usdSold = acount.usdSold + amount;
          acount.save();
          res.json(acount);
        } else {
          acount.fcSold = acount.fcSold + amount;
          acount.save();
          res.json(acount);
        }
      })
      .catch(() => {
        res.json({ message: "Account dosn't exist! Error" });
      });
  });
});

// read all
router.get("/", (req, res) => {
  Deposit.find()
    .then((deposits) => {
      res.json(deposits);
    })
    .catch((err) => {
      res.json({ error: "Error fetching deposits" });
    });
});

module.exports = router;
