const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.json({ res: 'Bienvenidos al API del proyecto de Edunect' })

});

//TODO: Add API Authentication


module.exports = router;