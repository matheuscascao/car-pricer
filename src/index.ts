import puppeteer from "puppeteer";

(async () => {
    console.log("HEHEHE ASYNC HAHAHAH");

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto("https://www.webmotors.com.br/carros/estoque/volkswagen/fusca/", {
        waitUntil: "domcontentloaded",
    });

    const selector = ".sc-GMQeP";

    // Wait for the selector to be present in the DOM
    await page.waitForSelector(selector);

    const carsData = await page.$$eval(selector, items => {
        return items.map(el => {
            const nameElement = el.querySelector(".sc-hqyNC");
            const priceElement = el.querySelector(".sc-cJSrbW");

            const name = nameElement ? nameElement.textContent?.trim() : "N/A";
            const price = priceElement ? priceElement.textContent?.trim() : "N/A";

            return {
                name,
                price
            };
        });
    });

    console.log(carsData);

    // Close the browser when done
    await browser.close();
})();
