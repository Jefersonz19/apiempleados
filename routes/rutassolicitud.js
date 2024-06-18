const express = require('express');
const router = express.Router();
const solicitudcontrolador = require('../controllers/solicitudcontrolador');

router.get('/', solicitudcontrolador.getSolicitudes);
router.get('/:id', solicitudcontrolador.getSolicitudById);
router.post('/', solicitudcontrolador.addSolicitud);
router.delete('/:id', solicitudcontrolador.deleteSolicitud);


module.exports = router;