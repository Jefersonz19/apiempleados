const express = require('express');
const router = express.Router();
const empleadocontrolador = require('../controllers/empleadocontrolador');

router.get('/', empleadocontrolador.getEmpleados);

module.exports = router;