export interface ICarItem {
    model: string;
    year_of_manufacture: number;
    price: number;
    mileage: number;
    manufacturer: string;
    location: string;   
}

export type CarType = {
    model: string;
    year_of_manufacture: number;
    price: number;
    mileage: number;
    manufacturer: string;
    location: string;   
}

export default ICarItem;