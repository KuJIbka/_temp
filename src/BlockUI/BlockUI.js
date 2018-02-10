const blockUICss = '.blockOverlay';

const {By, Key, until} = require('selenium-webdriver');

class BlockUI {
    constructor(driver) {
        this.driver = driver;
    }

    async waitForBlockUIDisabling() {
        const el = await this.driver.wait(
            until.elementLocated(By.css(blockUICss)),
            30000
        );
        await this.driver.wait(
            until.elementIsNotVisible(el),
            30000
        );
        await this.driver.sleep(400);
    }
}

module.exports = BlockUI;