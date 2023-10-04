import puppeteer from "puppeteer";
import CarItem from "../../../models/CarItem";
import {ICarItem, Car} from "../../../entities/carEntity";
import insertCarListings from "../../../repository/database/repository/cars";

async function webMotorsCrawler(model: string, manufacturer: string): Promise<Car[]> {
    const basePageUrl = "https://www.webmotors.com.br/carros/estoque";

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(`${basePageUrl}/${manufacturer}/${model}`, {
        waitUntil: "domcontentloaded",
    });

    const selector = ".sc-GMQeP";

    await page.waitForSelector(selector);

    const carsData: Car[]  = await page.$$eval(selector, items => {
        return items.map(el => {

            const modelElement = el.querySelector(".sc-hqyNC");
            const priceElement = el.querySelector(".sc-cJSrbW");
            const yearOfManufactureElement = el.querySelectorAll(".sc-frDJqD");
            const locationElement = el.querySelector(".sc-kgAjT");
            const mileageElement = el.querySelectorAll(".sc-cHGsZl.goowTJ");

            // const carElement: CarItem = {
            //     model: modelElement ? modelElement.textContent?.trim() : "N/A",
            //     price: priceElement ? priceElement.textContent?.trim() : "N/A",
            //     yearOfManufacture: yearOfManufactureElement ? yearOfManufactureElement[0].textContent?.trim() : "N/A",
            //     location: locationElement ? locationElement.textContent?.trim() : "N/A",
            //     mileage: mileageElement ? mileageElement[1].textContent?.trim() : "N/A",
            //     manufacturer: "placeholder"
            // }

            const model = modelElement ? modelElement.textContent?.trim() as string: "N/A";
            const year_of_manufacture = yearOfManufactureElement ? yearOfManufactureElement[0].textContent?.trim() as string: "N/A";
            const price = priceElement ? priceElement.textContent?.trim() as string: "N/A";
            const mileage = mileageElement ? mileageElement[1].textContent?.trim() as string: "N/A";
            const manufacturer = "placeholder";
            const location = locationElement ? locationElement.textContent?.trim() as string: "N/A";
            
            // model: string;
            // yearOfManufacture: string;
            // price: number;
            // mileage: number;
            // manufacturer: string;
            // location: string;   

            return {model, year_of_manufacture, price, mileage, manufacturer, location} as Car;

            // return {model, yearOfManufacture, price, mileage, manufacturer, location};

            // const carElement = new CarItem(model, yearOfManufacture, price, mileage, manufacturer, location); 
            // console.log(carElement);
            // return carElement.location;

            // return new CarItem(model, yearOfManufacture, price, mileage, manufacturer, location); 
        });
    });

    // console.log(carsData);
    await browser.close();

    insertCarListings(carsData);
    return carsData;
};

export default webMotorsCrawler;