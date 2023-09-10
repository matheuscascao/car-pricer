import puppeteer from "puppeteer";
import CarItem from "../../../models/CarItem";

async function webMotorsCrawler(model: string, manufacturer: string): Promise<void> {
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

    const carsData = await page.$$eval(selector, items => {
        return items.map(el => {

            const modelElement = el.querySelector(".sc-hqyNC");
            const priceElement = el.querySelector(".sc-cJSrbW");
            const yearOfManufactureElement = el.querySelectorAll(".sc-frDJqD");
            const locationElement = el.querySelector(".sc-kgAjT");
            const mileageElement = el.querySelectorAll(".sc-cHGsZl.goowTJ");

            const carElement: CarItem = {
                model: modelElement ? modelElement.textContent?.trim() : "N/A",
                price: priceElement ? priceElement.textContent?.trim() : "N/A",
                yearOfManufacture: yearOfManufactureElement ? yearOfManufactureElement[0].textContent?.trim() : "N/A",
                location: locationElement ? locationElement.textContent?.trim() : "N/A",
                mileage: mileageElement ? mileageElement[1].textContent?.trim() : "N/A",
                manufacturer: "placeholder"
            }

            return carElement;
        });
    });

    console.log(carsData);

    await browser.close();
};

export default webMotorsCrawler;