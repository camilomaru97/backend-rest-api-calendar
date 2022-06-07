const express = require('express');
const { dbConnection } = require('./Database/config');
require('dotenv').config();


//Crear el servidor de Express
const app = express();

//Base de datos
dbConnection();


//directorio publico
app.use( express.static('public') );

//lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Escuchar peticiones 
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});