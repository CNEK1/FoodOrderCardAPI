import { Product } from "./abstract";

export interface ProductJson {
    title: string;
    cost: number;
    like: boolean;
    amount: number;
    order: number;
}
export class Burger extends Product {
    public constructor(public _title: string, public _cost: number, public _like: boolean, public _amount: number, public _order: number) {
        super(_title, _cost, _like, _amount, _order);
    }

    public get cost(): number {
        return this._cost;
    }
    public set cost(value: number) {
        this._cost = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get like(): boolean {
        return this._like;
    }
    public set like(value: boolean) {
        this._like = value;
    }
    public get amount(): number {
        return this.amount;
    }
    public set amount(value: number) {
        this.amount = value;
    }
    public get order(): number {
        return this.order;
    }
    public set order(value: number) {
        this.order = value;
    }
}
