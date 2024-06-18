const express = require('express');
const router = express.Router();
const empleadocontrolador = require('../controllers/empleadocontrolador');

router.get('/', empleadocontrolador.getEmpleados);
router.get('/:id', empleadocontrolador.getEmpleadoById);
router.post('/', empleadocontrolador.addEmpleado);
router.delete('/:id', empleadocontrolador.deleteEmpleado);


module.exports = router;