const puppeteer = require('puppeteer')
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');

let browser, page;

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto('localhost:3000');
})

afterEach(async () => {
    await browser.close();
})

test('the header has the correct text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML)

    expect(text).toEqual('Blogster')
})

test('clicking login starts oauth flow', async () => {
    await page.click('.right a')

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
})

test('When signed in, show logout button', async () => {
    // const id = '635539939711130c839d6dc6';

    const user = await userFactory();
    const {session, sig} = sessionFactory(user);

    await page.setCookie({name: 'session', value: session })
    await page.setCookie({name: 'session.sig', value: sig })
    await page.goto('localhost:3000');
    await page.waitFor('a[href="/auth/logout"]'); // pause till the app finish rendering everything on the screen

    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

    expect(text).toEqual('Logout');
});