const express = require('express');  // npm i express
const app = express();
const PORT = 3001;
const order = require('./routes/order');
const user = require('./routes/user')



app.use('/', order);
app.use('/', user);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})