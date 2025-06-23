const database = require("./database");
const Repository = require("./repository");

const repo = new Repository(database);

async function setAppointment(req, res) {
  const result = await repo.setAppointment(req.body);
  res.json(result);
}

async function getHistoryByCpf(req, res) {
  const result = await repo.getHistoryByCpf(req.params.cpf);
  res.json(result);
}

async function getHistoryByName(req, res) {
  const result = await repo.getHistoryByName(req.params.name);
  res.json(result);
}

module.exports = {
  setAppointment,
  getHistoryByCpf,
  getHistoryByName
};
