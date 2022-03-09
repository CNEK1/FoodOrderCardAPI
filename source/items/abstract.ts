import { ProductJson } from './IProduct';

export abstract class Product implements ProductJson {
    protected constructor(protected _title: string, protected _cost: number, protected _like: boolean, protected _amount: number, protected _order: number) {}

    abstract get cost(): number;
    abstract set cost(value: number);

    abstract get title(): string;
    abstract set title(value: string);

    abstract get like(): boolean;
    abstract set like(value: boolean);

    abstract get amount(): number;
    abstract set amount(value: number);

    abstract get order(): number;
    abstract set order(value: number);
}
