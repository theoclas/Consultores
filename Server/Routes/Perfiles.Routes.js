const db = require('../../bd/BD');
const express = require('express');
const app = express.Router();



app.get('/prueba', async (req, res) => {

    res.status(200).json({ Mnesaje: "Solo es mucho mejor" });

});



app.get('/nivelestodos', async (req, res) => {

    try {
        const [filas] = await db.query('Select * from niveles');
        res.json(filas);
    } catch (error) {
        console.error('ERROR EN LA CONSULTA', error);
        res.status(500).json({ error: 'ERROR EN EL SERVIDOR' });
    }
})

module.exports = app; 
