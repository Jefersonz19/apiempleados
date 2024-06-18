
const express = require('express');
const rutasempleado = require('./routes/rutasempleado');
const bodyParser = require('body-parser');

const app = express();

const bdConnection = require('./configuration/bdconfig');

bdConnection().then((bd) => {
    console.log('Connected successfully');
})

const port = 3030;
app.listen(port, ()=> {
    console.log(`server running on port ${port}`);
});

app.use(bodyParser.json());
app.use('/api/empleados', rutasempleado);