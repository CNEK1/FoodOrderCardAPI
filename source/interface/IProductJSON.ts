import {Document} from 'mongoose'

export default interface IProductJSON extends Document{
    title: string;
    cost: number;
    like: boolean;
    amount: number;
    order: number;
}
