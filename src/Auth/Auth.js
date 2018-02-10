const ConfirmCode = require(global.src + 'ConfirmCode/ConfirmCode.js');
const BlockUI = require(global.src + 'BlockUI/BlockUI.js');

const {By, Key, until} = require('selenium-webdriver');

const authFormCss = '.qaAuthForm';
const loginCss = authFormCss + ' .qaPhoneNumber';
const passwordCss = authFormCss + ' .qaPassword';

const showLogoutFormCss = '.qaShowLogoutForm';
const logoutFormCss = '.qaLogoutForm';

const { urlSign } = require(global.src + 'urls.js');

class Auth {
    constructor(driver) {
        this.driver = driver;
        this.authFormEl = '';
        this.loginEl = '';
        this.passwordEl = '';
        this.logoutFormEl = '';
        this.isTestedUser = false;
    }

    async get() {
        await this.driver.get(urlSign);

        await this.driver.wait(
            until.elementLocated(By.css(authFormCss)),
            10000
        );

        this.authFormEl = await this.driver.findElement(By.css(authFormCss));
        this.loginEl = await this.driver.findElement(By.css(loginCss));
        this.passwordEl = await this.driver.findElement(By.css(passwordCss));
        return Promise.resolve();
    }

    async setAuth(login, password, isTestedUser = false) {
        await this.loginEl.sendKeys(login);
        await this.passwordEl.sendKeys(password);
        this.isTestedUser = isTestedUser;
    }

    async submit() {
        await this.authFormEl.submit();
        if (this.isTestedUser) {
            const confirmCode = new ConfirmCode(this.driver);
            await confirmCode.bindElems(true, false, true, false);
            await confirmCode.setCodes();
            await confirmCode.submit();
        }
        await this.driver.wait(
            until.elementLocated(By.css('.panel_slidebar')),
            30000
        );
        const blockUI = new BlockUI(this.driver);
        await blockUI.waitForBlockUIDisabling();
    }

    async logout() {
        await this.driver.wait(
            until.elementLocated(By.css(showLogoutFormCss)),
            10000
        );

        await this.driver.findElement(By.css(showLogoutFormCss)).click();
        await this.driver.wait(
            until.elementLocated(By.css(logoutFormCss)),
            10000
        );
        this.logoutFormEl = await this.driver.findElement(By.css(logoutFormCss));
        await this.logoutFormEl.submit();
    }
}

module.exports = Auth;
