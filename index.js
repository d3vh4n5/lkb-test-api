const express = require("express");
const app = express();
const port = 3000;

// Endpoint 1: /externo/blipia
app.get("/externo/blipia", (req, res) => {
  const { solicitud } = req.query;

  console.log(solicitud)

  if (!solicitud) return res.status(400).send("ERROR|Parámetros insuficientes");
  

  if (solicitud === "peticionblip"){
    const { codcli, area } =  req.query

    if (!codcli || !area) {
        return res.status(400).send("ERROR|Parámetros insuficientes");
    }

    const registroID = generateUUID();
    return res.send(`OK|${registroID}`);


  }else if (solicitud === "resblip") {
    const { idregistro, resp, action, valora, horario } =  req.query

    if (!idregistro || !resp) {
        return res.status(400).send("ERROR|Parámetros insuficientes");
    }

    return res.send(`OK|${idregistro}`);


  } else {
    return res.status(400).send("ERROR|Solicitud desconocida");
  }
  
});


// Función para generar un UUID simulado
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
