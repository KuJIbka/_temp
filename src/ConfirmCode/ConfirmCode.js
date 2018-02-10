const {By, Key, until, promise} = require('selenium-webdriver');
const UIKeyboard = require(global.src + 'UIKeyboard/UIKeyboard.js');

const confirmCodeFormCss = '#confirmCodeModalForm';
const confirmCodeInputsCss = confirmCodeFormCss + ' .confirmCodeModal__inputs';
const InputSMSCss = confirmCodeInputsCss + ' input[name="approveCode_1"]';
const InputGoogleCss = confirmCodeInputsCss + ' input[name="approveCode_2"]';
const InputPINCss = confirmCodeInputsCss + ' input[name="approveCode_3"]';
const InputEmailCss = confirmCodeInputsCss + ' input[name="approveCode_4"]';

class ConfirmCode {
    constructor(driver) {
        this.driver = driver;
        this.confirmCodeFormEl = '';
        this.inputSmsEl = '';
        this.inputGoogleEl = '';
        this.inputPINEl = '';
        this.inputEmailEl = '';
    }

    async bindElems(sms = true, google = false, pin = true, email = false) {
        await this.driver.wait(
            until.elementLocated(By.css(confirmCodeFormCss)),
            10000
        );
        await this.driver.sleep(400);
        if (sms) {
            await this.driver.wait(
                until.elementLocated(By.css(InputSMSCss)),
                10000
            );
        }
        if (google) {
            await this.driver.wait(
                until.elementLocated(By.css(InputGoogleCss)),
                10000
            );
        }
        if (pin) {
            await this.driver.wait(
                until.elementLocated(By.css(InputPINCss)),
                10000
            );
        }
        if (email) {
            await this.driver.wait(
                until.elementLocated(By.css(InputEmailCss)),
                10000
            );
        }
        try {
            this.confirmCodeFormEl = await this.driver.findElement(By.css(confirmCodeFormCss));
        } catch(err) {}
        try {
            this.inputSmsEl = await this.driver.findElement(By.css(InputSMSCss));
        } catch(err) {}
        try {
            this.inputGoogleEl = await this.driver.findElement(By.css(InputGoogleCss));
        } catch(err) {}
        try {
            this.inputPINEl = await this.driver.findElement(By.css(InputPINCss));
        } catch(err) {}
        try {
            this.inputEmailEl = await this.driver.findElement(By.css(InputEmailCss));
        } catch(err) {}
    }

    async setCodes(sms = '123456', google = '123456', pin = '123456', email = '123456') {

        if (this.inputSmsEl) {
            await this.inputSmsEl.sendKeys(sms);
        }
        if (this.inputGoogleEl) {
            await this.inputGoogleEl.sendKeys(google);
        }

        if (this.inputPINEl) {
            await this.inputPINEl.click();
            let uiKeyboard = new UIKeyboard(this.driver);
            await uiKeyboard.waitForKeyboard();
            await uiKeyboard.enterCode(pin);
        }

        if (this.inputEmailEl) {
            await this.inputEmailEl.sendKeys(email);
        }
    }

    async submit() {
        return this.confirmCodeFormEl.submit();
    }
}

module.exports = ConfirmCode;