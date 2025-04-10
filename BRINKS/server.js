const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB Atlas (reemplaza TU_URI aquí debajo)
mongoose.connect('mongodb+srv://luisgerez30soporte:<db_password>@cluster0.ngey2e5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión:', err));

// Esquema de datos
const ReporteSchema = new mongoose.Schema({
  fecha: String,
  tipo: String,
  patente: String,
  sucursal: String,
  falla: String,
  nombre: String,
  telefono: String,
  email: String
});

const Reporte = mongoose.model('Reporte', ReporteSchema);

// Ruta para recibir datos del formulario
app.post('/api/reportar', async (req, res) => {
  try {
    const nuevoReporte = new Reporte(req.body);
    await nuevoReporte.save();
    res.status(200).json({ mensaje: 'Datos guardados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al guardar los datos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
