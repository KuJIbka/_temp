const { urlExchange } = require(global.src + 'urls.js');

const { By, until } = require('selenium-webdriver');
const BlockUI = require(global.src + 'BlockUI/BlockUI.js');

const exchangeFormCss = '.qaExchangeForm';
const exchangeFromCss = exchangeFormCss + ' .qaExchangeFrom';
const exchangeToCss = exchangeFormCss + ' .qaExchangeTo';

class Exchange {
    constructor(driver) {
        this.driver = driver;
        this.exchangeFormEl = '';
        this.exchangeFromEl = '';
        this.exchangeToEl = '';
    }

    async get() {
        await this.driver.get(urlExchange);
        await this.driver.wait(
            until.elementLocated(By.css(exchangeFormCss)),
            10000
        );
//        let blockUI = new BlockUI(this.driver);
//        await blockUI.waitForBlockUIDisabling();

        this.exchangeFormEl = await this.driver.findElement(By.css(exchangeFormCss));
        this.exchangeFromEl = await this.driver.findElement(By.css(exchangeFromCss));
        this.exchangeToEl = await this.driver.findElement(By.css(exchangeToCss));
        return Promise.resolve();
    }

    async setValues(amountFrom) {
        return this.exchangeFromEl.sendKeys(amountFrom);
    }

    async submit() {
        return this.exchangeFormEl.submit();
    }
}

module.exports = Exchange;
