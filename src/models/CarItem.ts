import { Schema, model, Types } from 'mongoose';

export interface ICarItem {
    model: string;
    yearOfManufacture: number;
    price: number;
    mileage: number;
    manufacturer: string;
}

export const CarItem = new Schema({
    model: String,
    yearOfManufacture: Number,
    price: Number,
    mileage: Number,
    manufacturer: String,
})

export default model<ICarItem>("CarItem", CarItem)