-- Tabela para registrar agendamentos

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR NOT NULL,
  client_cpf VARCHAR NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  services TEXT NOT NULL,
  additionals TEXT,
  price REAL NOT NULL
);

-- Exemplo de agendamento
INSERT INTO appointments (
  client_name, client_cpf, appointment_date, appointment_time, services, additionals, price
) VALUES
('João da Silva', '12345678900', '2025-06-30', '14:00', 'Corte Social, Barba', 'Lavagem, Óleo para Barba', 47.00);
