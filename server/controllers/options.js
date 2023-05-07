const express = require('express');
const mysqlConnection = require('../config/database');
const router = express.Router();


router.get('/payment_type', (req, res) => {
  const { user_id } = req.body;

  const query = "SELECT * FROM payment_type"

  mysqlConnection.query(query, [user_id], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(err);
    }
  });

});
router.get('/movement_type', (req, res) => {
  const { user_id } = req.body;

  const query = "SELECT * FROM movement_type"

  mysqlConnection.query(query, [user_id], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(err);
    }
  });

});

router.get('/category', (req, res) => {
  const { user_id } = req.body;

  const query = "SELECT * FROM category"

  mysqlConnection.query(query, [user_id], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(err);
    }
  });

});
router.get('/currency', (req, res) => {
  const { user_id } = req.body;

  const query = "SELECT * FROM currency"

  mysqlConnection.query(query, [user_id], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(err);
    }
  });

});

module.exports = router;