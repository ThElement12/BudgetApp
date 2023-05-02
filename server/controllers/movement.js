const express = require('express');
const mysqlConnection = require('../database');
const router = express.Router();


router.get('/movement/:id', (req, res) => {
    //Get all budget by user

    const { budget_id } = req.params;


    const query = "SELECT * FROM movement WHERE budget_id = ?"

    mysqlConnection.query(query, [budget_id], (err, rows) => {
      if(!err){
        res.json(rows);
      }else{
        console.error(err);
      }
    });

});

router.post('/movement', (req, res) => {
  const { category, budget_id, movement_type, amount, date} = req.body;

  const query = "INSERT INTO budget (category_id, budget_id, movement_type_id, amount, date) VALUES (?, ?, ?, ?, ?)"

  mysqlConnection.query(query, [category, budget_id, movement_type, amount, date], (err, rows) => {
    if(!err){
      res.json(rows);
    }else{
      console.error(err);
    }
  })
});



module.exports = router;