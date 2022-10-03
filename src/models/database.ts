import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const db_name = process.env.DB_NAME,
    db_user = process.env.DB_USER,
    db_pass = process.env.DB_PASS,
    db_host = process.env.DB_HOST,
    db_port = process.env.DB_PORT,
    db_dialect = process.env.DB_DIALECT,
    db_logging = (process.env.DB_LOGGING == 'false') ? false : true;

const conn = new Sequelize(`${db_dialect}://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}`,
    { logging: db_logging }
);

export default conn;