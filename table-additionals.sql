-- Tabela de serviços adicionais relacionados aos serviços principais

CREATE TABLE additionals (
  id SERIAL,
  id_service INTEGER,
  name VARCHAR NOT NULL,
  price REAL NOT NULL,
  PRIMARY KEY (id, id_service),
  FOREIGN KEY (id_service) REFERENCES services(id)
);

-- Adicionais para Corte Degradê
INSERT INTO additionals (id, id_service, name, price) VALUES
(1, 1, 'Lavagem', 5.00),
(2, 1, 'Massagem Capilar', 10.00);

-- Adicionais para Corte Social
INSERT INTO additionals (id, id_service, name, price) VALUES
(1, 2, 'Lavagem', 5.00),
(2, 2, 'Toalha Quente', 3.00);

-- Adicionais para Barboterapia
INSERT INTO additionals (id, id_service, name, price) VALUES
(1, 3, 'Creme Hidratação', 8.00),
(2, 3, 'Toalha Gelada', 4.00);

-- Adicionais para Barba
INSERT INTO additionals (id, id_service, name, price) VALUES
(1, 4, 'Óleo para Barba', 7.00),
(2, 4, 'Toalha Quente', 3.00);
