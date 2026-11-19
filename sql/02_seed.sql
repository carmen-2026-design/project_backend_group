-- =====================================================================
--  Gestor de eventos y planes JoinUp — Datos de ejemplo
--
--  Se ejecuta AUTOMÁTICAMENTE después de 01-schema.sql la primera vez
--  que arranca el contenedor de PostgreSQL.
--
--  Para restaurar los datos sin borrar el volumen:
--    docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < init-db/02-seed.sql
--
--  Contraseñas (hash bcrypt, 10 rondas):
--    admin           -> admin
--    resto usuarios  -> user
-- =====================================================================

BEGIN;

TRUNCATE provinces, registrations, categories, events, users RESTART IDENTITY CASCADE;

-- =============================================================
--  JoinUp · Sample data
--  Run on EMPTY tables, in this order (SERIAL ids start at 1):
--    provinces → categories → users → events → registrations
--
--  Admin (user_id 1) password: admin · every other user: user
--  (bcrypt, cost 10 — login with bcrypt.compare(), never compare plain text)
-- =============================================================

-- -------------------------------------------------------------
--  PROVINCES (52, id = official INE code, matches postal code prefix)
-- -------------------------------------------------------------
INSERT INTO provinces (province_id, province_name) VALUES
  (1, 'Álava'),
  (2, 'Albacete'),
  (3, 'Alicante'),
  (4, 'Almería'),
  (5, 'Ávila'),
  (6, 'Badajoz'),
  (7, 'Illes Balears'),
  (8, 'Barcelona'),
  (9, 'Burgos'),
  (10, 'Cáceres'),
  (11, 'Cádiz'),
  (12, 'Castellón'),
  (13, 'Ciudad Real'),
  (14, 'Córdoba'),
  (15, 'A Coruña'),
  (16, 'Cuenca'),
  (17, 'Girona'),
  (18, 'Granada'),
  (19, 'Guadalajara'),
  (20, 'Gipuzkoa'),
  (21, 'Huelva'),
  (22, 'Huesca'),
  (23, 'Jaén'),
  (24, 'León'),
  (25, 'Lleida'),
  (26, 'La Rioja'),
  (27, 'Lugo'),
  (28, 'Madrid'),
  (29, 'Málaga'),
  (30, 'Murcia'),
  (31, 'Navarra'),
  (32, 'Ourense'),
  (33, 'Asturias'),
  (34, 'Palencia'),
  (35, 'Las Palmas'),
  (36, 'Pontevedra'),
  (37, 'Salamanca'),
  (38, 'Santa Cruz de Tenerife'),
  (39, 'Cantabria'),
  (40, 'Segovia'),
  (41, 'Sevilla'),
  (42, 'Soria'),
  (43, 'Tarragona'),
  (44, 'Teruel'),
  (45, 'Toledo'),
  (46, 'Valencia'),
  (47, 'Valladolid'),
  (48, 'Bizkaia'),
  (49, 'Zamora'),
  (50, 'Zaragoza'),
  (51, 'Ceuta'),
  (52, 'Melilla');

-- -------------------------------------------------------------
--  CATEGORIES
-- -------------------------------------------------------------
-- INSERT INTO categories (category_name, category_description) VALUES
--   ('Sports',     'Running, football, hiking and other sports meetups'),
--   ('Music',      'Concerts, jam sessions and music events'),
--   ('Technology', 'Talks, workshops and tech meetups'),
--   ('Culture',    'Museums, theatre, book clubs and exhibitions'),
--   ('Food',       'Tastings, cooking classes and dinners');

INSERT INTO categories (category_name, category_description) VALUES
  ('Deportes',   'Carreras, fútbol, senderismo y otros encuentros deportivos'),
  ('Música',     'Conciertos, improvisaciones musicales y eventos musicales'),
  ('Tecnología', 'Charlas, talleres y encuentros tecnológicos'),
  ('Cultura',    'Museos, teatro, clubes de lectura y exposiciones'),
  ('Gastronomía','Degustaciones, clases de cocina y cenas');

-- -------------------------------------------------------------
--  USERS (ids 1..8, admin is id 1)
-- -------------------------------------------------------------
INSERT INTO users (user_name, user_email, user_password, user_role) VALUES
  ('Admin JoinUp',     'admin@joinup.com',                  '$2a$10$lMXWNRjkhdoTL6mCFfQsOuXupLuyFDq4d0/bY7jg2.T7zHEAQEFqy', 'admin'),
  ('Laura Martínez',   'laura.martinez@example.com',        '$2a$10$MBsq7diFuwi7eDUz/sjeSuBpv281aYhPC2QEvVXXhsOGJRwRhpF7y', 'user'),
  ('Carlos Gómez',     'carlos.gomez@example.com',          '$2a$10$MBsq7diFuwi7eDUz/sjeSuBpv281aYhPC2QEvVXXhsOGJRwRhpF7y', 'user'),
  ('Lucía Fernández',  'lucia.fernandez@example.com',       '$2a$10$MBsq7diFuwi7eDUz/sjeSuBpv281aYhPC2QEvVXXhsOGJRwRhpF7y', 'user'),
  ('Javier Ruiz',      'javier.ruiz@example.com',           '$2a$10$MBsq7diFuwi7eDUz/sjeSuBpv281aYhPC2QEvVXXhsOGJRwRhpF7y', 'user'),
  ('Marta Sánchez',    'marta.sanchez@example.com',         '$2a$10$MBsq7diFuwi7eDUz/sjeSuBpv281aYhPC2QEvVXXhsOGJRwRhpF7y', 'user'),
  ('Pablo Navarro',    'pablo.navarro@example.com',         '$2a$10$MBsq7diFuwi7eDUz/sjeSuBpv281aYhPC2QEvVXXhsOGJRwRhpF7y', 'user'),
  ('Elena Torres',     'elena.torres@example.com',          '$2a$10$MBsq7diFuwi7eDUz/sjeSuBpv281aYhPC2QEvVXXhsOGJRwRhpF7y', 'user');

-- -------------------------------------------------------------
--  EVENTS (ids 1..10)
--  Past events (9 and 10) are useful to test "upcoming" filters.
--  event_postal_code matches the province of each event.
-- -------------------------------------------------------------
INSERT INTO events (event_title, event_description, event_date, event_address, event_postal_code, province_id, user_id, category_id) VALUES
  ('Carrera popular de 10K en el Parque de Retiro',
   'Carrera en grupo a ritmo relajado por el Retiro. Todos los niveles son bienvenidos.',
   '2026-11-22 09:00:00', 'Puerta de Alcalá, Plaza de la Independencia', '28001', 28, 2, 1),
  ('Sesión de improvisación acústica',
   'Trae tu guitarra, cajón o simplemente tu voz. Micrófono abierto a partir de las 20:00.',
   '2026-11-27 20:00:00', 'Carrer de Blai 25', '08004', 8, 3, 2),
  ('Taller de introducción a Node.js y Express',
   'Taller práctico: construye tu primera API REST. Trae tu portátil.',
   '2026-12-03 18:30:00', 'Calle de la Paz 10', '46003', 46, 4, 3),
  ('Club de lectura: reunión mensual',
   'Este mes debatimos sobre una novela clásica española. Café incluido.',
   '2026-12-05 17:00:00', 'Calle Sierpes 48', '41004', 41, 5, 4),
  ('Ruta de cata de tapas',
   'Ruta a pie por cinco bares de tapas en el casco antiguo.',
   '2026-12-12 13:00:00', 'Calle Marqués de Larios 1', '29005', 29, 2, 5),
  ('Ruta de senderismo al Monte Artxanda',
   'Ruta de dificultad media con vistas a la ciudad. Alrededor de 3 horas.',
   '2026-12-13 10:00:00', 'Funicular de Artxanda, Plaza del Funicular', '48007', 48, 6, 1),
  ('Noche de bandas independientes',
   'Tres bandas locales de música independiente en directo. Apertura de puertas a las 21:00.',
   '2026-12-18 21:30:00', 'Calle del Coso 120', '50001', 50, 7, 2),
  ('Clase de cocina navideña',
   'Aprende tres recetas tradicionales de Navidad con un cocinero local.',
   '2026-12-20 11:00:00', 'Calle Real 75', '15003', 15, 1, 5),
  ('Visita guiada a la Alhambra',
   'Visita guiada por los Palacios Nazaríes y los jardines.',
   '2026-10-17 10:00:00', 'Calle Real de la Alhambra s/n', '18009', 18, 8, 4),
  ('Encuentro de desarrolladores frontend',
   'Charlas cortas sobre CSS, accesibilidad y rendimiento web.',
   '2026-10-29 19:00:00', 'Calle Uría 20', '33003', 33, 3, 3);

-- -------------------------------------------------------------
--  REGISTRATIONS (ids 1..18)
--  registration_cancel_date is set only when status = 'cancelled'.
--  Nobody registers for an event they created.
-- -------------------------------------------------------------
INSERT INTO registrations (user_id, event_id, registration_people, registration_status, registration_cancel_date) VALUES
  (3, 1, 1, 'registered',     NULL),
  (4, 1, 2, 'registered',     NULL),
  (6, 1, 1, 'cancelled',      '2026-11-08 12:00:00'),
  (2, 2, 3, 'registered',     NULL),
  (7, 2, 1, 'registered',     NULL),
  (5, 3, 1, 'registered',     NULL),
  (8, 3, 1, 'registered',     NULL),
  (2, 3, 1, 'registered',     NULL),
  (4, 4, 2, 'registered',     NULL),
  (3, 5, 4, 'registered',     NULL),
  (6, 5, 2, 'cancelled',      '2026-11-09 10:00:00'),
  (2, 6, 1, 'registered',     NULL),
  (5, 7, 5, 'registered',     NULL),
  (8, 8, 2, 'registered',     NULL),
  (7, 8, 1, 'registered',     NULL),
  (2, 9, 2, 'registered',     NULL),
  (4, 9, 1, 'cancelled',      '2026-10-10 09:00:00'),
  (6, 10, 1, 'registered',    NULL);

  COMMIT;