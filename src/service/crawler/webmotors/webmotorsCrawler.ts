import puppeteer from "puppeteer";
import {CarType} from "../../../entities/carEntity";
import insertCarListings from "../../../repository/database/repository/cars";

async function webMotorsCrawler(model: string, manufacturer: string): Promise<CarType[]> {
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

    const carsData: CarType[]  = await page.$$eval(selector, items => {
        return items.map(el => {

            const modelElement = el.querySelector(".sc-hqyNC");
            const priceElement = el.querySelector(".sc-cJSrbW");
            const yearOfManufactureElement = el.querySelectorAll(".sc-frDJqD");
            const locationElement = el.querySelector(".sc-kgAjT");
            const mileageElement = el.querySelectorAll(".sc-cHGsZl.goowTJ");

            const model = modelElement ? modelElement.textContent?.trim() as string: "N/A";
            let year_of_manufacture = 0;
            if (yearOfManufactureElement[0].textContent?.trim()) {
                year_of_manufacture = yearOfManufactureElement ? parseInt(yearOfManufactureElement[0].textContent.trim()) as number: 0;
            }
            let price = 0;
            if (priceElement) {
                const numericString = priceElement.textContent?.trim().replace(/[^\d.-]/g, '');    
                price = parseFloat(numericString as string);
            }
            // const mileage = mileageElement ? mileageElement[1].textContent?.trim() as string: "N/A";
            let mileage = 0;
            if (mileageElement[1].textContent?.trim()) {
                const numericString = mileageElement[1].textContent?.trim().replace(/[^\d.-]/g, '');    
                mileage = parseFloat(numericString as string);
            }
            const manufacturer = model.split(" ")[0];
            const location = locationElement ? locationElement.textContent?.trim() as string: "N/A";
            
            return {model, year_of_manufacture, price, mileage, manufacturer, location} as CarType;
        });
    });

    await browser.close();

    insertCarListings(carsData);
    return carsData;
};

export default webMotorsCrawler;