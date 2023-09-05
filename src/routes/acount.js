const express = require('express')
const router = express.Router()
const Acount = require('../models/Acount')

// get all acounts

router.get('/', (req,res) => {
    Acount
        .find()
        .then((acounts) => {
            res.json(acounts);
        })
        .catch((err) => {
            res.json({ error: 'Error fetching acounts'})
        })
})

module.exports = router;