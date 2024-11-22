const dotenv = require('dotenv')
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    return res.send("App funcionando")
})

// Endpoint 1: /externo/blipia
app.get("/externo/blipia", (req, res) => {
  const { solicitud } = req.query;

  console.log(solicitud)
  console.log({ req: req.query })

  if (!solicitud) return res.status(200).send("ERROR_PETICION");
  

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
        return res.status(200).send("ERROR_CON_IDREGISTRO|");
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
