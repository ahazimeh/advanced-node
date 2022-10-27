const puppeteer = require('puppeteer')
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
// require('../services/login');
const Page = require('./helpers/page');

let browser, page;

beforeEach(async () => {
    page = await Page.build();
    // browser = await puppeteer.launch({
    //     headless: false
    // });
    // page = await browser.newPage();
    await page.goto('localhost:3000');
})

afterEach(async () => {
    await page.close();
    // await browser.close();
})

test('the header has the correct text', async () => {
    const text = await page.getContentsOf('a.brand-logo')
    // const text = await page.$eval('a.brand-logo', el => el.innerHTML)

    expect(text).toEqual('Blogster')
})

test('clicking login starts oauth flow', async () => {
    await page.click('.right a')

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
})

test('When signed in, show logout button', async () => {
    // const id = '635539939711130c839d6dc6';

    await page.login1(); // this is from the helper page
    // await page.login(); // this is from the function we monkeypatched
    // const user = await userFactory();
    // const {session, sig} = sessionFactory(user);

    // await page.setCookie({name: 'session', value: session })
    // await page.setCookie({name: 'session.sig', value: sig })
    // await page.goto('localhost:3000');
    // await page.waitFor('a[href="/auth/logout"]'); // pause till the app finish rendering everything on the screen

    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

    expect(text).toEqual('Logout');
});