// export interface ICarItem {
//     model: string;
//     yearOfManufacture: string;
//     price: number;
//     mileage: number;
//     manufacturer: string;
//     location: string;   
// }
export interface ICarItem {
    model: string;
    year_of_manufacture: string;
    price: string;
    mileage: string;
    manufacturer: string;
    location: string;   
}

export type Car = {
    model: string;
    year_of_manufacture: string;
    price: string;
    mileage: string;
    manufacturer: string;
    location: string;   
}

export default ICarItem;