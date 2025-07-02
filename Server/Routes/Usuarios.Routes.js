const db = require('../../bd/BD');
const express = require('express');
const app = express.Router();

// app.get('/')

app.get('/prueba', async (req, res) => {

  res.status(200).json({ Mnesaje: "Solo es mucho mejor" });

});


app.get('/UsuariosTodos', async (req, res) => {
  try {
    const [filas] = await db.query('SELECT * FROM Usuarios');
    res.json(filas);
  } catch (error) {
    console.error('Error consultando:', error);
    res.status(500).json({ error: 'Error al consultar Usuarios' });
  }
});

app.get('/FindOne/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const [fila] = await db.query(`
      SELECT * FROM Usuarios
      Where id = ${id}`);
    res.json(fila);
  } catch (error) {
    console.error('Error consultando:', error);
    res.status(500).json({ error: 'Error al consultar Usuarios' });
  }
});

app.delete('/DeleteOne/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const [fila] = await db.query(`
  DELETE FROM Usuarios
  Where id = ${id}`);
    res.json(fila);

  } catch (error) {
    console.error("Error Eliminado dato:", error);
    res.status(500).json({ error: "Error al consultar Usuarios" });
  }
  console.log ('jesus');
});

app.post('/InsertOneOLD/:id/:id_perfil/:Nombre/:Correo', async (req, res) => {
  try {

    const { id, id_perfil, Nombre, Correo } = req.params;
    console.log(id, id_perfil, Nombre, Correo);

    const [resultados] = await db.query(`INSERT INTO Usuarios (id, id_perfil, Nombre, Correo) VALUES (?, ?, ?, ?)`,
      [id, id_perfil, Nombre, Correo]);

    res.json({
      mensaje: 'Usuario insertado correctamente',
      insertid: resultados.insertId
    });
  } catch (error) {
    console.error('Error al insertar:', error);
    res.status(500).json({ error: 'Error al Insertar Usuarios' });

  }
})

app.post('/InsertOne', async (req, res) => {
  try {

    const { id, id_perfil, Nombre, Correo } = req.body;
    console.log(id, id_perfil, Nombre, Correo);

    if (!id || !id_perfil || !Nombre || !Correo) {
      console.log('Faltan Campos Requeridos');
      return res.status(400).json('Faltan Campos Requeridos');
    }

    const [resultados] = await db.query(`INSERT INTO Usuarios (id, id_perfil, Nombre, Correo) VALUES (?, ?, ?, ?)`,
      [id, id_perfil, Nombre, Correo]);

    res.json({
      mensaje: 'Usuario insertado correctamente',
      insertid: resultados.insertId
    });
  } catch (error) {
    console.error('Error al insertar:', error);
    res.status(500).json({ error: 'Error al Insertar Usuarios' });

  }
});

app.put('/Actualizar', async (req, res) => {
  try {

    const { id, id_perfil, Nombre, Correo } = req.body;
    console.log(id, id_perfil, Nombre, Correo);

    if (!id || !id_perfil || !Nombre || !Correo) {
      console.log('Faltan Campos Requeridos');
      return res.status(400).json('Faltan Campos Requeridos');
    }

    const [resultados] = await db.query(`UPDATE Usuarios SET  id_perfil = ?, Nombre = ?, Correo = ? Where id = ?`,
      [id_perfil, Nombre, Correo, id]);

    res.json({
      mensaje: 'Usuario Actualiado correctamente'
    });
  } catch (error) {
    console.error('Error al Actualiado:', error);
    res.status(500).json({ error: 'Error al Actualiado Usuarios' });

  }
});

app.patch('/Actualizarcampo/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const campos = req.body;
console.log(id);
console.log(campos);
    if (!id || Object.keys(campos).length === 0) {
      console.error("No ingresaste campos o hace falta el ID");
      res.status(400).json({ error: 'No ingreso nada mijo' });
    }

    const columnas = Object.keys(campos).map(campo => `${campo} = ?`).join(', ');
    const valores = Object.values(campos);

    const [resultado] = await db.query(`UPDATE usuarios set ${columnas} where id = ?`,
      [...valores, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' })

    }

    res.json({ mensaje: 'Usuario actualizado' });


  } catch (error) {
    console.error('Error ', error);
    res.status(500).json({ error: 'error encontrador en el servidor' });
  }
});

module.exports = app; 