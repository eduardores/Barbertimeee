-- Tabela de serviços principais

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  price REAL NOT NULL
);

-- Inserção dos serviços principais
INSERT INTO services (id, name, price) VALUES
(1, 'Corte Degradê', 25.00),
(2, 'Corte Social', 25.00),
(3, 'Barboterapia', 25.00),
(4, 'Barba', 15.00);
