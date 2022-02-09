import http from 'http';
import logging from './config/logging';
import config from './config/config';
import express, { Request, response, Response } from 'express';
import * as Service from './items/service';

const NAMESPACE = 'Server';
const router = express();

router.set('views', './views');
router.set('view engine', 'ejs');

router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});
router.get('/', async (req: Request, res: Response) => {
    try {
        res.render('index', {
            items: await Service.AllOrders()
        });
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

router.get('/:id/get', async (req: Request, res: Response) => {
    var id: number = parseInt(req.params.id, 10);
    try {
        res.render('index', {
            items: await Service.find(id)
        });
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
router.get('/costOfEvery', async (req: Request, res: Response) => {
    try {
        res.render('objToArr', {
            items: await Service.costOfOrder(),
            sumOf: await Service.sumOfAllBurgers()
        });
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
router.get('/:order/:naming/Fav', async (req: Request, res: Response) => {
    const order: number = parseInt(req.params.order, 10);
    const naming: string = req.params.naming;
    try {
        const item: object = await Service.addToFav(order, naming);

        if (item) {
            return res.status(200).send(item);
        }

        res.status(404).send('item not found');
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
router.get('/:order/:naming/:amount/inc', async (req: Request, res: Response) => {
    const order: number = parseInt(req.params.order, 10);
    const naming: string = req.params.naming;
    const amount: number = parseInt(req.params.amount, 10);
    try {
        const item: object = await Service.increaseAmount(amount, order, naming);

        if (item) {
            return res.status(200).send(item);
        }

        res.status(404).send('item not found');
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
router.get('/:order/:naming/:amount/dec', async (req: Request, res: Response) => {
    const order: number = parseInt(req.params.order, 10);
    const naming: string = req.params.naming;
    const amount: number = parseInt(req.params.amount, 10);
    try {
        const item: object = await Service.decreaseAmount(amount, order, naming);

        if (item) {
            return res.status(200).send(item);
        }

        res.status(404).send('item not found');
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
router.get('/sort', async (req: Request, res: Response) => {
    try {
        res.render('index', {
            items: await Service.sortOrders()
        });
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
