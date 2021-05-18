const express = require('express');  // npm i express
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const order = require('./routes/order');
const user = require('./routes/user')



app.use('/', order);
app.use('/', user);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})