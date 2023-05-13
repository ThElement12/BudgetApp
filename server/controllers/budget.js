const express = require('express');
const mysqlConnection = require('../config/database');
const router = express.Router();


router.get('/budget/:id', (req, res) => {
    //Get all budget by user

    const {user_id} = req.params;


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
    const {payment_type, budget_name, saturday_payment, user_id} = req.body;

    const query = "INSERT INTO budget (payment_type_id, budget_name, saturday_payment, place, user_id) VALUES (?, ?, ?, ?, ?)";
    const amount = payment_type === 2 ? 2 : payment_type === 1 ? 4 : 1;
    for (let i = 0; i < amount; i++) {
        mysqlConnection.query(query, [payment_type, budget_name, saturday_payment, i, user_id], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({msg: "Error ocurred"})
            }
        });
    }
    res.json({msg: "Budgets Registered"})
});

module.exports = router;
