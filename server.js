
const express = require("express");
const cors = require("cors");
const Controller = require("./controller");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.post("/appointment", Controller.setAppointment);
app.get("/history/cpf/:cpf", Controller.getHistoryByCpf);
app.get("/history/name/:name", Controller.getHistoryByName);

app.listen(8080, () => console.log('Server ON'));
