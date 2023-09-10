// import { Schema, model, Types } from 'mongoose';

// export interface ICarItem {
//     model: string;
//     yearOfManufacture: number;
//     price: number;
//     mileage: number;
//     manufacturer: string;
//     location: string;
// }

// export const CarItem = new Schema({
//     model: String,
//     yearOfManufacture: Number,
//     price: Number,
//     mileage: Number,
//     manufacturer: String,
//     location: String
// })
// export default model<ICarItem>("CarItem", CarItem)

// export default ICarItem

export type CarItem = {
    model: string|undefined;
    price: string|undefined;
    yearOfManufacture: string|undefined;
    location: string|undefined;
    mileage: string|undefined;
    manufacturer: string|undefined;
}

export default CarItem;
