/* 
    Rutas de eventos / events
    host + /api/events 
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();


//Todas tienen que pasar por la validacion del JWT

//Obtener eventos
router.get(
    '/',
    [

    ],
    validarJWT,
    getEventos
);

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
    validarJWT,
    crearEvento
);

//Actualizar evento
router.put(
    '/:id',
    validarJWT,
    actualizarEvento
);

//Borrar evento
router.delete(
    '/:id',
    validarJWT,
    eliminarEvento
);


module.exports = router;