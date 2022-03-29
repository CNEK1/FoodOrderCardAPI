import * as dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DB_CONNECTION = "Lol Fuck yourself"


const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    dbConnection: DB_CONNECTION
};

const config = {
    server: SERVER
};

export default config;
