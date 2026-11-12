-- =====================================================================
--  Gestor de eventos y planes JoinUp — Esquema de la base de datos
--  PostgreSQL 14+
--
--  Se ejecuta AUTOMÁTICAMENTE al arrancar el contenedor de PostgreSQL
--  por primera vez (cuando el volumen de datos está vacío). Los ficheros
--  de /docker-entrypoint-initdb.d se ejecutan por orden alfabético:
--  primero 01-schema.sql y después 02-seed.sql.
--
--  Para volver a ejecutarlo:  docker compose down -v && docker compose up
--
--  ¡Atención! Borra las tablas si ya existen (se pierden los datos).
-- =====================================================================

DROP TABLE IF EXISTS provinces;
DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

-- CONSTRAINT uq_users_email UNIQUE (user_email)
-- CONSTRAINT uq_categories_name UNIQUE (category_name)
-- CONSTRAINT uq_provinces_name UNIQUE (province_name)

-- CONSTRAINT chk_events_postal_code CHECK (event_postal_code ~ '^[0-9]{5}$'),
--   CONSTRAINT fk_events_province  FOREIGN KEY (province_id)
--     REFERENCES provinces (province_id)  ON UPDATE CASCADE ON DELETE RESTRICT,
--   CONSTRAINT fk_events_creator FOREIGN KEY (event_creator_id)
--     REFERENCES users (user_id)          ON UPDATE CASCADE ON DELETE RESTRICT,
--   CONSTRAINT fk_events_category  FOREIGN KEY (category_id)
--     REFERENCES categories (category_id) ON UPDATE CASCADE ON DELETE RESTRICT

-- CONSTRAINT chk_registrations_people CHECK (registration_people BETWEEN 1 AND 10),
--   CONSTRAINT uq_registrations_user_event UNIQUE (user_id, event_id),
--   CONSTRAINT fk_registrations_user  FOREIGN KEY (user_id)
--     REFERENCES users (user_id)   ON UPDATE CASCADE ON DELETE CASCADE,
--   CONSTRAINT fk_registrations_event FOREIGN KEY (event_id)
--     REFERENCES events (event_id) ON UPDATE CASCADE ON DELETE CASCADE

-- -------------------------------------------------------------
--  ENUM TYPES
-- -------------------------------------------------------------
CREATE TYPE user_role_enum           AS ENUM ('admin', 'user');
CREATE TYPE registration_status_enum AS ENUM ('registered', 'cancelled');

-- -------------------------------------------------------------
--  USERS
-- -------------------------------------------------------------
CREATE TABLE users (
  user_id        SERIAL       PRIMARY KEY,
  user_name      VARCHAR(100)   NOT NULL UNIQUE,
  user_email     VARCHAR(150)   NOT NULL UNIQUE,
  user_password  VARCHAR(255)   NOT NULL,             -- bcrypt hash, never plain text
  user_role      user_role_enum NOT NULL DEFAULT 'user',
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- -------------------------------------------------------------
--  CATEGORIES
-- -------------------------------------------------------------
CREATE TABLE categories (
  category_id           SERIAL       PRIMARY KEY,
  category_name         VARCHAR(60)  NOT NULL UNIQUE,
  category_description  TEXT,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- -------------------------------------------------------------
--  PROVINCES (read-only catalogue, filled by the seed below)
-- -------------------------------------------------------------
CREATE TABLE provinces (
  province_id    SERIAL       PRIMARY KEY,
  province_name  VARCHAR(60) NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- -------------------------------------------------------------
--  EVENTS
-- -------------------------------------------------------------
CREATE TABLE events (
  event_id           SERIAL       PRIMARY KEY,
  event_title        VARCHAR(150) NOT NULL UNIQUE,
  event_description  TEXT,
  event_date         TIMESTAMP    NOT NULL DEFAULT NOW(),
  event_address      VARCHAR(255) NOT NULL,
  event_postal_code  CHAR(5)      NOT NULL,           -- text, keeps leading zeros (08001)
  province_id        SMALLINT     NOT NULL,
  event_creator_id   INTEGER      NOT NULL,
  category_id        INTEGER      NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_events_date      ON events (event_date);
CREATE INDEX idx_events_province  ON events (province_id);
CREATE INDEX idx_events_category  ON events (category_id);
CREATE INDEX idx_events_creator ON events (event_creator_id);

-- -------------------------------------------------------------
--  REGISTRATIONS (N:M between users and events)
-- -------------------------------------------------------------
CREATE TABLE registrations (
  registration_id           SERIAL       PRIMARY KEY,
  user_id                   INTEGER   NOT NULL,
  event_id                  INTEGER   NOT NULL,
  registration_people       SMALLINT  NOT NULL DEFAULT 1,  -- seats booked (user + guests)
  registration_status       registration_status_enum NOT NULL DEFAULT 'registered',
  registration_cancel_date  TIMESTAMP,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_registrations_event ON registrations (event_id);