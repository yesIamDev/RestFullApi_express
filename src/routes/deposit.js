const express = require("express");
const router = express.Router();
const Deposit = require("../models/Deposit");
const Account = require("../models/Acount");

// create

router.post("/:id", (req, res) => {
  const Id = req.params;
  let clientId = Id.id;
  const { amount, isUSD } = req.body;
  const newDeposit = new Deposit({ amount, clientId, isUSD });

  newDeposit
    .save()
    .then(()=>{
      Account
        .findOne({ clientId: `${clientId}`})
        .then((account)=>{
          account.amount = account.amount + amount;
          account.save();
          res.json(account);
        })
        .catch(()=>{
          res.json({message:"Account dosn't exist! Error"});
        })
    })
});

// read all
router.get("/", (req,res) => {
  Deposit
    .find()
    .then((deposits) => {
       res.json(deposits)
    })
    .catch((err) => {
      res.json({ error: "Error fetching deposits" });
    });
});

module.exports = router;
