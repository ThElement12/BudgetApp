const express = require('express');
const mysqlConnection = require('../config/database');
const router = express.Router();


router.get('/user', (req, res) => {
  //Get all users
  const query = "SELECT * FROM user"

  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(err);
    }
  });

});
router.get('/user/:email', (req, res) => {
  //Get specific user
  const { email } = req.params;
  const query = "SELECT * FROM user WHERE email = ?"

  mysqlConnection.query(query, [email], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(err);
    }
  });
});

router.post('/user', (req, res) => {
  //Register user
  const { name, email } = req.body;
  const query = "INSERT INTO user (name, email) VALUES (?, ?)"

  mysqlConnection.query(query, [name, email], (err, rows) => {
    if (!err) {

    } else {
      console.error(err);
    }
  })

});


//TODO: Add API Authentication


module.exports = router;