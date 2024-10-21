const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para parsear JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definir la ruta para "/"
app.get("/", (req, res) => {
    res.redirect("/product");
});

// Cargar el archivo de rutas
const productRoutes = require("./routes/product"); // Ajusta la ruta si es necesario
app.use(productRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
