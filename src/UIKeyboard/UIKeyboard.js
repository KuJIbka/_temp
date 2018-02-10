const {By, Key, until} = require('selenium-webdriver');

const mainKeyboardCss = '.ui-keyboard';
const buttonCss = mainKeyboardCss + ' .ui-keyboard-';

class UIKeyboard {
    constructor(driver) {
        this.driver = driver;
    }

    async waitForKeyboard() {
        await this.driver.wait(
            until.elementLocated(By.css(mainKeyboardCss)),
            10000
        );
        return this.driver.sleep(400);
    }

    async enterCode(code) {
        for (let i = 0, ic = code.length; i < ic; i++) {
           await this.sendKey(code[i]);
        }
        return Promise.resolve();
    }

    async sendKey(key) {
        await this.driver.sleep(100);
        await this.driver.findElement(By.css(buttonCss + key)).click();
    }
}

module.exports = UIKeyboard;
