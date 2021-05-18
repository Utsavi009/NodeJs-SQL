const express = require("express");
const user = express.Router();
const { body, validationResult } = require("express-validator"); 

const connection = require("../conf/conf");
user.use(express.urlencoded());

 const Validator = [
  body("first_name").isLength({ min: 2 }),
  body("last_name").isLength({ min: 2 }),
  body("age").isLength({ min: 1 }),
];

user.get("/", (req, res) => {
  res.send("Welcome to my API");
});

user.get("/api/users", (req, res) => {
  connection.query(`SELECT * FROM users`, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

user.get("/api/users/:id", (req, res) => {
  let { id } = req.params;
  connection.query(`SELECT * FROM users WHERE id= ?`, [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

user.post("/api/users", Validator, (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 

  const { first_name, last_name, age } = req.body;
  connection.query(
    `INSERT INTO users (first_name, last_name, age) VALUES ('${first_name}', '${last_name}', '${age}')`,
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

user.put("/api/users/:id", (req, res) => {
   
    /*  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } */

  let { id } = req.params;
  const { first_name, last_name, age } = req.body;
  connection.query(
    `UPDATE users SET first_name='${first_name}', last_name= '${last_name}', age='${age}' WHERE ID = ${id}`,
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

user.delete("/api/users/:id", (req, res) => {
  let { id } = req.params;
  connection.query(`DELETE FROM users WHERE ID = ${id}`, (err, results) => {
    if (err) throw err;
    res.json("User has been deleted");
  });
});

user.get('/api/users/:id/orders', (req, res) => {
    let {id} = req.params;
    connection.query(`SELECT * FROM orders WHERE users_id = ${id}`, (err, results) => {
        if(err) throw err
        res.json(results);
    })
})

user.put('/api/users/:id/check-inactive', (req, res) => {
    let {id} = req.params;
    connection.query(`UPDATE users SET active=0 WHERE ID = ${id} AND ID NOT IN(SELECT users_id FROM orders) `, (err, results) => {
        if(err) throw err
        res.json(results);
    })
})


module.exports = user;
