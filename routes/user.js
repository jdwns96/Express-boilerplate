const express = require('express');
const path = require('path');

const router = express.Router();

router.route('/')
    .get((req, res)=>{
        res.sendFile(path.join(__dirname, '../views/user.html'));
    })
    .post((req, res)=>{

        
    });

module.exports = router;