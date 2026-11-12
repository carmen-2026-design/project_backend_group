import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.POSTGRES_DB;
const DB_USER = process.env.POSTGRES_USER;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD;

const DB_HOST = process.env.POSTGRES_HOST;
const DB_PORT = 5432;
const DIALECT = "postgres";
const LOGGING = true;

const connection = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: DIALECT,
        logging: LOGGING,
    }
)
export default connection