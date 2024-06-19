
const express = require('express');
const rutasempleado = require('./routes/rutasempleado');
const rutassolicitud = require('./routes/rutassolicitud');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

/*
const bdConnection = require('./configuration/bdconfig');

bdConnection().then((bd) => {
    console.log('Connected successfully');
}) */

const port = 3030;
app.use(cors());
app.use(bodyParser.json());

app.listen(port, ()=> {
    console.log(`server running on port ${port}`);
});


app.use('/api/empleados', rutasempleado);
app.use('/api/solicitudes', rutassolicitud);