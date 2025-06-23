
class ServiceRepository {
  constructor(database) {
    this.database = database;
  }

  async setAppointment(data) {
    try {
      const sql = `
        INSERT INTO appointments (
          client_name, client_cpf, appointment_date, appointment_time, services, additionals, price
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      await this.database.query(sql, [
        data.client_name,
        data.client_cpf,
        data.appointment_date,
        data.appointment_time,
        data.services,
        data.additionals,
        data.price
      ]);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getHistoryByCpf(cpf) {
    try {
      const sql = "SELECT * FROM appointments WHERE client_cpf = $1 ORDER BY appointment_date DESC, appointment_time DESC";
      const response = await this.database.query(sql, [cpf]);
      return response.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getHistoryByName(name) {
    try {
      const sql = "SELECT * FROM appointments WHERE client_name ILIKE $1 ORDER BY appointment_date DESC, appointment_time DESC";
      const response = await this.database.query(sql, [`%${name}%`]);
      return response.rows;
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = ServiceRepository;
