import puppeteer from "puppeteer";

(async () => {
    console.log("HEHEHE ASYNC HAHAHAH");

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    })

    const page = await browser.newPage();

    await page.goto("https://webmotors.com.br/carros/estoque/jeep/cherokee/", {
        waitUntil: "domcontentloaded",
    });
    setTimeout(async () => {
        const selector: string = ".sc-GMQeP";
    
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
    }, 5000);

})();