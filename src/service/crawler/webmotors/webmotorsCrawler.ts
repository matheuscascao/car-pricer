import puppeteer from "puppeteer";
import ICarItem from "../../../models/CarItem";

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

            const model = modelElement ? modelElement.textContent?.trim() : "N/A";
            const price = priceElement ? priceElement.textContent?.trim() : "N/A";
            const yearOfManufacture = yearOfManufactureElement ? yearOfManufactureElement[0].textContent?.trim() : "N/A";
            const location = locationElement ? locationElement.textContent?.trim() : "N/A";
            const mileage = mileageElement ? mileageElement[1].textContent?.trim() : "N/A";

            return {
                model,
                price,
                yearOfManufacture,
                location,
                mileage
            };
        });
    });

    console.log(carsData);

    await browser.close();
};

export default webMotorsCrawler;