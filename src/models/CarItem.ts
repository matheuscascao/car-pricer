import ICarItem from "../entities/carEntity";

// export type CarItem = {
//     model: string | undefined;
//     price: string | undefined;
//     year_of_manufacture: string | undefined;
//     location: string | undefined;
//     mileage: string | undefined;
//     manufacturer: string | undefined;
// }
// export default CarItem;

export class CarItem implements ICarItem {
    private _model: string;
    private _year_of_manufacture: number;
    private _price!: number;
    private _mileage!: number;
    private _manufacturer: string;
    private _location: string;

    constructor(
        model: string,
        year_of_manufacture: number,
        price: number,
        mileage: number,
        manufacturer: string,
        location: string
    ) {
        this._model = model;
        this._year_of_manufacture = year_of_manufacture;
        this.price = price;
        this.mileage = mileage;
        this._manufacturer = manufacturer;
        this._location = location;
    }

    get model(): string {
        return this._model;
    }

    set model(value: string) {
        this._model = value;
    }

    get year_of_manufacture(): number {
        return this._year_of_manufacture;
    }

    set year_of_manufacture(value: number) {
        // check different formats to year format, like 2011/2012 or so
        this._year_of_manufacture = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        // check different formats to price format, like 10.000,00 or so
    
        this._price = value;
    }

    get mileage(): number {
        return this._mileage;
    }

    set mileage(value: number) {
        this._mileage = value;
    }

    get manufacturer(): string {
        return this._manufacturer;
    }

    set manufacturer(value: string) {
        this._manufacturer = value;
    }

    get location(): string {
        return this._location;
    }

    set location(value: string) {
        this._location = value;
    }
}

export default CarItem;
