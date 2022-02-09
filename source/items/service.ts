import { Burger, ProductJson } from './IProduct';

let items: Array<Burger> = [
    new Burger('Burger', 14.23, true, 10, 5),
    new Burger('BurgerWithChease', 11.2, false, 20, 11),
    new Burger('BurgerWithMeat', 22, true, 30, 4),
    new Burger('Burger', 14.23, true, 10, 20)
];

export const AllOrders = async (): Promise<Array<Burger>> => items;

export const find = async (id: number): Promise<Array<Burger>> => items.filter((elm) => elm._order == id);

export const sumOfAllBurgers = async (): Promise<number> => items.map((elm) => elm._cost).reduce((sum, x) => parseFloat((sum + x).toFixed(2)));

export const costOfOrder = async (): Promise<object> => {
    let result: any = {};
    items.forEach((elm) => {
        if (result[elm._order] != undefined) {
            result[elm._order] += elm._cost;
        } else {
            result[elm._order] = elm._cost;
        }
    });
    return result;
};
export const addToFav = async (order: number, naming: string): Promise<Array<Burger>> => {
    items.forEach((elm) => {
        if (elm._order == order && elm._title == naming) {
            elm._like = true;
        }
    });
    return items;
};
export const increaseAmount = async (amount: number, order: number, naming: string): Promise<Array<Burger>> => {
    items.forEach((elm) => {
        if (elm._order == order && elm._title == naming) {
            elm._amount += amount;
        }
    });
    return items;
};
export const decreaseAmount = async (amount: number, order: number, naming: string): Promise<Array<Burger>> => {
    items.forEach((elm) => {
        if (elm._order == order && elm._title == naming) {
            elm._amount -= amount;
        }
    });
    return items;
};
export const sortOrders = async (): Promise<Array<Burger>> => {
    return items.sort((x, y) => x._order - y._order);
};
