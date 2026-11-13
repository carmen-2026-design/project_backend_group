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
INSERT INTO categories (category_name, category_description) VALUES
  ('Sports',     'Running, football, hiking and other sports meetups'),
  ('Music',      'Concerts, jam sessions and music events'),
  ('Technology', 'Talks, workshops and tech meetups'),
  ('Culture',    'Museums, theatre, book clubs and exhibitions'),
  ('Food',       'Tastings, cooking classes and dinners');

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
  ('Sunday 10K run in Retiro Park',
   'Relaxed-pace group run around Retiro. All levels welcome.',
   '2026-11-22 09:00:00', 'Puerta de Alcalá, Plaza de la Independencia', '28001', 28, 2, 1),
  ('Acoustic jam session',
   'Bring your guitar, cajón or just your voice. Open mic from 20:00.',
   '2026-11-27 20:00:00', 'Carrer de Blai 25', '08004', 8, 3, 2),
  ('Intro to Node.js and Express workshop',
   'Hands-on workshop: build your first REST API. Bring your laptop.',
   '2026-12-03 18:30:00', 'Calle de la Paz 10', '46003', 46, 4, 3),
  ('Book club: monthly meeting',
   'This month we discuss a classic Spanish novel. Coffee included.',
   '2026-12-05 17:00:00', 'Calle Sierpes 48', '41004', 41, 5, 4),
  ('Tapas tasting route',
   'Walking route through five tapas bars in the old town.',
   '2026-12-12 13:00:00', 'Calle Marqués de Larios 1', '29005', 29, 2, 5),
  ('Hiking trail to Monte Artxanda',
   'Medium difficulty hike with views over the city. About 3 hours.',
   '2026-12-13 10:00:00', 'Funicular de Artxanda, Plaza del Funicular', '48007', 48, 6, 1),
  ('Indie bands night',
   'Three local indie bands live. Doors open at 21:00.',
   '2026-12-18 21:30:00', 'Calle del Coso 120', '50001', 50, 7, 2),
  ('Christmas cooking class',
   'Learn three traditional Christmas recipes with a local chef.',
   '2026-12-20 11:00:00', 'Calle Real 75', '15003', 15, 1, 5),
  ('Guided visit to the Alhambra',
   'Guided tour of the Nasrid Palaces and gardens.',
   '2026-10-17 10:00:00', 'Calle Real de la Alhambra s/n', '18009', 18, 8, 4),
  ('Frontend developers meetup',
   'Lightning talks about CSS, accessibility and web performance.',
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