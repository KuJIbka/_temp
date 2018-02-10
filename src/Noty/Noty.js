const { By, until } = require('selenium-webdriver');

const successCss = '.noty_type_success';

class Noty {
    constructor(driver) {
        this.driver = driver;
    }

    async isSuccess() {
        return this.driver.wait(
            until.elementLocated(By.css(successCss)),
            10000
        );
    }
}

module.exports = Noty;
