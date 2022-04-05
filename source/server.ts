import http from 'http';
import logging from './config/logging';
import config from './config/config';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import router from './routes/routes';

const NAMESPACE = 'Server';
const app = express();

mongoose
    .connect(config.server.dbConnection)
    .then((res) => {
        logging.info(NAMESPACE, 'Connected to DB');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

app.use((req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

app.use(express.json());

app.use('/', router);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not Found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
