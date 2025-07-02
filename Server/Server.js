const express = require('express');
const db = require('../bd/BD');

const Router = express();
Router.use(express.json());

// const Usuarios = require('./Routes/Usuarios.Routes.js'); 
const Usuarios = require('./Routes/Usuarios.Routes'); 
const Perfiles = require('./Routes/Perfiles.Routes'); 

Router.use('/Usuarios', Usuarios); 
Router.use('/Niveles', Perfiles); 


Router.listen(3000, () => {
  console.log('🚀 Servidor Express escuchando en http://localhost:3000');
});