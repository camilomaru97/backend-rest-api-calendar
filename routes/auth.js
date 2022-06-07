/* 
    Rutas de usuarios / auth
    host + /api/auth 
*/
const {Router} = require('express')
const router = Router();
const { check } = require('express-validator')

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

router.post(
    '/new',
    [
        check('name', 'EL nombre es obligatorio').not().isEmpty(),
        check('email', 'EL email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ], 
    crearUsuario
) 

router.post(
    '/', 
    [
        check('email', 'EL email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ], 
    loginUsuario
) 

router.get('/renew', validarJWT, revalidarToken) 

module.exports = router;