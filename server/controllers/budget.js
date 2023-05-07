const express = require('express');
const mysqlConnection = require('../config/database');
const router = express.Router();


router.get('/budget', (req, res) => {
  //Get all budget by user

  const { user_id } = req.body;


  const query = "SELECT * FROM budget WHERE user = ?"

  mysqlConnection.query(query, [user_id], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(err);
    }
  });

});

router.post('/budget', (req, res) => {
  const { payment_type, budget_name, saturday_payment, start_day, end_day, user_id } = req.body;

  const query = "INSERT INTO budget (payment_type_id, budget_name, saturday_payment, start_day, end_day, user_id) VALUES (?, ?, ?, ?, ?, ?)"

  mysqlConnection.query(query, [payment_type, budget_name, saturday_payment, start_day, end_day, user_id], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(err);
    }
  })
});

router.put('/budget', (req, res) => {
  const { payment_type, budget_name, saturday_payment, start_day, end_day, user_id } = req.body;

  const query = "UPDATE budget SET payment_type_id = ?, budget_name = ?, saturday_payment = ?, start_day = ?, end_day = ? WHERE user_id = ?"

  mysqlConnection.query(query, [payment_type, budget_name, saturday_payment, start_day, end_day, user_id], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(err);
    }
  })
});



module.exports = router;