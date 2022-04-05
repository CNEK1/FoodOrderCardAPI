import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Products from '../models/ProductJSON';

const getALL = (req: Request, res: Response, next: NextFunction) => {
    Products.find()
        .exec()
        .then((result) => {
            return res.json({
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

export default { getALL, createItem, deleteItem };
