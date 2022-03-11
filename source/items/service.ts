import { Burger, ProductJson } from './IProduct';

let items: Array<Burger> = [
    new Burger('Burger', 14.25, true, 10, 43128),
    new Burger('BurgerWithChease', 11.2, false, 20, 43132),
    new Burger('BurgerWithMeat', 25, true, 30, 43128),
    new Burger('SuperBurger', 14.23, true, 10, 43132),
    new Burger('MegaBurger', 14.23, true, 10, 43135)
];

export const AllOrders = async (): Promise<Array<Burger>> => items;

export const find = async (id: number): Promise<Array<Burger>> => items.filter((elm) => elm._order == id);

export const sumOfAllBurgers = async (): Promise<number> => items.map((elm) => elm._cost).reduce((sum, x) => parseFloat((sum + x).toFixed(2)));

export const costOfOrder = async (id: number): Promise<number> => (await find(id)).map((elm) => elm._cost).reduce((x, y) => parseFloat((x + y).toFixed(2)));

export const costOfOrders = async (): Promise<object> => {
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
export const sortOrdersLowToHigh = async (): Promise<Array<Burger>> => {
    return items.sort((x, y) => x._order - y._order);
};
export const sortOrdersHighToLow = async (): Promise<Array<Burger>> => {
    return items.sort((x, y) => y._order - x._order);
};
