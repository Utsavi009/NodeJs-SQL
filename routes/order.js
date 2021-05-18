const express = require('express');
const order = express.Router();
// const { body, validationResult } = require("express-validator");   // npm install --save express-validator

const connection = require('../conf/conf');
order.use(express.urlencoded());  // parses incoming req with urlencoded - part of bodyParser


/* const Validator = [
    body("price").isLength({ min: 1 }),
    body("date").isLength({ min: 2 }),
    body("users_id").isLength({ min: 1 }),
  ]; */


order.get('/', (req, res) => {
    res.send('Welcome to my API');
})

order.get('/api/orders', (req, res) => {
    connection.query(`SELECT * FROM orders`, (err, results) => {
        if(err) throw err
        res.json(results);
    })
})

order.get('/api/orders/:id', (req, res) => {
    let {id} = req.params;
    connection.query(`SELECT * FROM orders WHERE id= ?`, [id], (err, results) => {
        if(err) throw err
        res.json(results);
    })
})

order.post('/api/orders', (req, res) => {
    
   /*  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } */

    const {price, date, users_id } = req.body;
    connection.query(`INSERT INTO orders (price, date, users_id) VALUES ('${price}', '${date}', '${users_id}')`, (err, results) => {
        if(err) throw err
        res.json(results);
    })
})

order.put('/api/orders/:id', (req, res) => {

   /*  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } */

    let {id} = req.params;
    const {price, date, users_id } = req.body;
    connection.query(`UPDATE orders SET price='${price}', date= '${date}', users_id='${users_id}' WHERE ID = ${id}`, (err, results) => {
        if(err) throw err
        res.json(results);
    })
})

order.delete('/api/orders/:id', (req, res) => {
    let {id} = req.params;
    connection.query(`DELETE FROM orders WHERE ID = ${id}`, (err, results) => {
        if(err) throw err
        res.json('Order has been deleted');
    })
})



module.exports = order;