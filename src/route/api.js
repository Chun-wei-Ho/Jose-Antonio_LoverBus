const express = require("express");
const router = express.Router();

router.get('/gettest', (req, res) => {
    console.log(req)
    res.json({data: "get haha"})
});

router.post('/posttest', (req, res) => {
    console.log(req)
    res.json({data: "post haha"})
});

module.exports = router;