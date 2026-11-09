-- =====================================================================
--  Agencia de Superhéroes de Segunda — Datos de ejemplo
--
--  Se ejecuta AUTOMÁTICAMENTE después de 01-schema.sql la primera vez
--  que arranca el contenedor de PostgreSQL.
--
--  Para restaurar los datos sin borrar el volumen:
--    docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < init-db/02-seed.sql
--
--  Contraseñas (hash bcrypt, 10 rondas):
--    admin           -> admin1234
--    resto usuarios  -> heroe1234
-- =====================================================================

BEGIN;

TRUNCATE hero_powers, heroes, powers, users RESTART IDENTITY CASCADE;

-- ---------------------------------------------------------------------
--  Usuarios
--  - paco y marta tienen VARIAS identidades secretas (relación 1:N)
--  - pepe no tiene ningún héroe (útil para probar listas vacías)
-- ---------------------------------------------------------------------
INSERT INTO users (username, email, password, role) VALUES
  ('admin', 'admin@agencia.test', '$2b$10$Q0tpp8.5ahRcn9dT6JmEje7F85fk0AdkaRQRF2wj4KmMoeI5M73Za', 'admin'), -- id 1
  ('paco',  'paco@agencia.test',  '$2b$10$AVSXrv7/YhFi8sVBuhUWOeB7Bl.ZxnX2/1UqWKnzwthzNmgZsqcNO', 'user'),  -- id 2
  ('marta', 'marta@agencia.test', '$2b$10$AVSXrv7/YhFi8sVBuhUWOeB7Bl.ZxnX2/1UqWKnzwthzNmgZsqcNO', 'user'),  -- id 3
  ('lucia', 'lucia@agencia.test', '$2b$10$AVSXrv7/YhFi8sVBuhUWOeB7Bl.ZxnX2/1UqWKnzwthzNmgZsqcNO', 'user'),  -- id 4
  ('pepe',  'pepe@agencia.test',  '$2b$10$AVSXrv7/YhFi8sVBuhUWOeB7Bl.ZxnX2/1UqWKnzwthzNmgZsqcNO', 'user');  -- id 5

-- ---------------------------------------------------------------------
--  Poderes
--  - "Abrir botes imposibles" no lo tiene nadie (para probar LEFT JOIN)
-- ---------------------------------------------------------------------
INSERT INTO powers (name, description) VALUES
  ('Detección de wifi',          'Encuentra la red y la contraseña de cualquier bar en menos de un minuto.'),             -- 1
  ('Visión de huecos libres',    'Ve una plaza de aparcamiento libre a tres manzanas de distancia.'),                     -- 2
  ('Puntualidad sobrehumana',    'Llega exactamente a la hora acordada. Siempre. Incluso a las cenas de empresa.'),       -- 3
  ('Memoria de tápers',          'Recuerda de quién es cada táper de la nevera de la oficina.'),                         -- 4
  ('Invisibilidad en reuniones', 'Nadie le pregunta nada en una reunión aunque esté en primera fila.'),                  -- 5
  ('Cargador infinito',          'Siempre lleva encima el cargador del modelo de móvil que necesitas.'),                  -- 6
  ('Silencio absoluto',          'Silencia el grupo de WhatsApp de la familia sin que nadie lo note.'),                   -- 7
  ('Teletransporte a la cola',   'Aparece siempre en la cola más corta del supermercado.'),                               -- 8
  ('Explicar lo evidente',       'Describe con todo detalle lo que todo el mundo ya sabía.'),                             -- 9
  ('Localizar objetos perdidos', 'Encuentra llaves, mandos a distancia y el otro calcetín de la lavadora.'),             -- 10
  ('Radar vecinal',              'Sabe quién se muda, quién se separa y quién tiene obras antes que nadie en el bloque.'),-- 11
  ('Abrir botes imposibles',     'Abre cualquier bote de conserva a la primera.');                                       -- 12

-- ---------------------------------------------------------------------
--  Héroes
-- ---------------------------------------------------------------------
INSERT INTO heroes (name, description, utility_level, user_id) VALUES
  ('Capitán Wifi',                          'Patrulla las cafeterías del barrio para que nadie se quede sin conexión.',          9, 2), -- 1  paco
  ('El Fantasma del Trastero',              'Recorre los trasteros los sábados y nadie sabe qué hace allí.',                     2, 2), -- 2  paco
  ('El Hombre que Llega Puntual',           'Su mera presencia hace que las reuniones empiecen a su hora.',                      6, 2), -- 3  paco
  ('La Mujer que Siempre Encuentra Aparcamiento', 'Temida por los conductores del centro un viernes por la tarde.',              10, 3), -- 4  marta
  ('Doctor Cargador',                       'Salvó tres móviles al 1 % el mes pasado.',                                          8, 3), -- 5  marta
  ('El Calcetín Desparejado',               'Devuelve cada calcetín a su pareja. Nadie conoce su método.',                       4, 3), -- 6  marta
  ('Señora Táper',                          'Ningún táper vuelve a casa equivocada mientras ella esté de guardia.',              7, 4), -- 7  lucia
  ('Mister Mute',                           'Protector de la salud mental en los grupos de mensajería.',                         5, 4), -- 8  lucia
  ('Abuela Radar',                          'Fuente de información más fiable del barrio desde 1974.',                            8, 4), -- 9  lucia
  ('Capitán Obvio',                         'Siempre dispuesto a recordar que el agua moja.',                                     1, 1); -- 10 admin

-- ---------------------------------------------------------------------
--  Asignación de poderes (relación N:M)
--  - "Puntualidad sobrehumana" la comparten varios héroes
--  - Capitán Wifi tiene varios poderes
-- ---------------------------------------------------------------------
INSERT INTO hero_powers (hero_id, power_id) VALUES
  (1, 1),  (1, 6),            -- Capitán Wifi: wifi + cargador
  (2, 5),                     -- Fantasma del Trastero: invisibilidad
  (3, 3),  (3, 8),            -- Hombre Puntual: puntualidad + teletransporte
  (4, 2),  (4, 3),            -- Mujer Aparcamiento: huecos libres + puntualidad
  (5, 6),  (5, 1),            -- Doctor Cargador: cargador + wifi
  (6, 10),                    -- Calcetín Desparejado: localizar objetos
  (7, 4),  (7, 10),           -- Señora Táper: memoria de tápers + localizar objetos
  (8, 7),  (8, 5),            -- Mister Mute: silencio + invisibilidad
  (9, 11), (9, 3), (9, 8),    -- Abuela Radar: radar + puntualidad + cola
  (10, 9);                    -- Capitán Obvio: explicar lo evidente

COMMIT;

-- ---------------------------------------------------------------------
--  Consultas de comprobación (opcionales)
-- ---------------------------------------------------------------------
-- Héroes con su creador y sus poderes:
--   SELECT h.name AS heroe, u.username AS creador,
--          STRING_AGG(p.name, ', ' ORDER BY p.name) AS poderes
--   FROM heroes h
--   JOIN users u            ON u.id = h.user_id
--   LEFT JOIN hero_powers hp ON hp.hero_id = h.id
--   LEFT JOIN powers p       ON p.id = hp.power_id
--   GROUP BY h.id, u.username
--   ORDER BY h.id;
--
-- Poderes y cuántos héroes los tienen (incluye los que no tiene nadie):
--   SELECT p.name, COUNT(hp.hero_id) AS num_heroes
--   FROM powers p
--   LEFT JOIN hero_powers hp ON hp.power_id = p.id
--   GROUP BY p.id
--   ORDER BY num_heroes DESC;