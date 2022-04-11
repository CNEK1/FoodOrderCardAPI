import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { isObjectLiteralElement } from 'typescript';
import Products from '../models/ProductJSON';

const getALL = (req: Request, res: Response, next: NextFunction) => {
    Products.find()
        .exec()
        .then((result) => {
            return res.json({
                items: result,
                countOfItems: result.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
const createItem = (req: Request, res: Response, next: NextFunction) => {
    let { title, cost, like, amount, order } = req.body;

    const items = new Products({
        _id: new mongoose.Types.ObjectId(),
        title,
        cost,
        like,
        amount,
        order
    });

    return items
        .save()
        .then((result) => {
            return res.status(201).json({
                items: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
const deleteItem = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    return Products.findByIdAndDelete(id)
        .then((result) => (result ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not Found' })))
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
const costOfEveryOrder = (req: Request, res: Response, next: NextFunction) => {
    var objectOfMongo: any = {};
    Products.find()
        .exec()
        .then((result) => {
            res.json({
                items: result.forEach((elm) => {
                    if (objectOfMongo[elm.order] != undefined) {
                        objectOfMongo[elm.order] += elm.cost;
                    } else {
                        objectOfMongo[elm.order] = elm.cost;
                    }
                    return objectOfMongo;
                })
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { getALL, createItem, deleteItem, costOfEveryOrder };
