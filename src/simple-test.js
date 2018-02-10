global.src = __dirname + '/';

require('chromedriver');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const wb = require('selenium-webdriver');
const {By, Key, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

const Cdriver = new wb.Builder()
    .withCapabilities(wb.Capabilities.chrome())
    .build();

const Auth = require(global.src + 'Auth/Auth.js');
const Exchange = require(global.src + 'Exchange/Exchange.js');
const Noty = require(global.src + 'Noty/Noty.js');

test.describe('Test suit', function() {
    this.timeout(0);

    test.it('Login and logout test', async () => {
        const auth = new Auth(Cdriver);
        await auth.get();
        await auth.setAuth('+70000000001', 'test', true);
        await auth.submit();
        await auth.logout();

        return Cdriver.wait(
            until.elementLocated(By.css('.jsGoToSignIn')),
            30000
        );
    });

    test.it('Exchange test', async () => {
        const auth = new Auth(Cdriver);
        await auth.get();
        await auth.setAuth('+70000000001', 'test', true);
        await auth.submit();

        let exchange = new Exchange(Cdriver);
        await exchange.get();
        await exchange.setValues(50);
        await exchange.submit();

        let noty = new Noty(Cdriver);
        return noty.isSuccess();
    });

    test.after(() => {
        Cdriver.quit();
    })
});
