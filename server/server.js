
const express = require('express');
require('dotenv').config();
const rutasempleado = require('./routes/rutasempleado');
const rutassolicitud = require('./routes/rutassolicitud');
const bodyParser = require('body-parser');
const rutasauth = require('./routes/rutasauth');
const cors = require('cors');
const { authenticateToken } = require('./middleware/Authmiddleware');
const app = express();

/*
const bdConnection = require('./configuration/bdconfig');

bdConnection().then((bd) => {
    console.log('Connected successfully');
}) */

//const port = 3030;
app.use(cors());
app.use(bodyParser.json());

/*
app.listen(port, ()=> {
    console.log(`server running on port ${port}`);
}); */
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/api/auth', rutasauth);
app.use('/api/empleados', authenticateToken, rutasempleado);
app.use('/api/solicitudes', authenticateToken, rutassolicitud);