const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static("public"));

// Servir la página principal (index.html) cuando se accede a la raíz "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta para consultar la URL base de la API
app.get("/api/base", async (req, res) => {
  try {
    const response = await axios.get("https://dog.ceo/api/");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener la información de la URL base." });
  }
});

// Ruta para consultar el endpoint de la API
app.post("/api/endpoint", async (req, res) => {
  const { endpoint } = req.body;

  if (!endpoint) {
    return res.status(400).json({ error: "El campo endpoint es obligatorio." });
  }

  try {
    const response = await axios.get(`https://dog.ceo/api/${endpoint}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener la información del endpoint solicitado." });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
