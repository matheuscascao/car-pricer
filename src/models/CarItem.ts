import ICarItem from "../entities/carEntity";

// export type CarItem = {
//     model: string | undefined;
//     price: string | undefined;
//     yearOfManufacture: string | undefined;
//     location: string | undefined;
//     mileage: string | undefined;
//     manufacturer: string | undefined;
// }
// export default CarItem;

export class CarItem implements ICarItem {
    private _model: string;
    private _yearOfManufacture: string;
    private _price!: number;
    private _mileage!: number;
    private _manufacturer: string;
    private _location: string;

    constructor(
        model: string,
        yearOfManufacture: string,
        price: string,
        mileage: string,
        manufacturer: string,
        location: string
    ) {
        this._model = model;
        this._yearOfManufacture = yearOfManufacture;
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

    get yearOfManufacture(): string {
        return this._yearOfManufacture;
    }

    set yearOfManufacture(value: string) {
        // normalize different formats to year format, like 2011/2012 or so
        this._yearOfManufacture = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: string) {
        const numericString = value.replace(/[^\d.-]/g, '');    
        const floatValue = parseFloat(numericString);
        
        this._price = floatValue;
    }

    get mileage(): number {
        return this._mileage;
    }

    set mileage(value: string) {
        this._mileage = parseInt(value);
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
