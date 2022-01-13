import { loginPage, search, mainMessage, channels} from '../pageobjects';
import { cookieUtil } from '../../support';

describe('Validate Slack Web Messaging', () => {
    let messageValue;
    before(async () => {
        await loginPage.open();
        await cookieUtil.setCookie('shown_download_ssb_modal', '1');
        await cookieUtil.setCookie('show_download_ssb_banner', '1');
        await cookieUtil.setCookie('no_download_ssb_banner', '1');
        await loginPage.login(process.env.email, process.env.password);
        // await browser.dismissAlert();
        await loginPage.slackBrowser.waitForClickable({ timeout: 30000 });
        await loginPage.slackBrowser.click();
        await channels.navigateToGeneralChannel();
        await mainMessage.deleteAllMessages();
    });
    beforeEach( async() => {
        await channels.navigateToGeneralChannel();
    })
    after( async() => {
        await channels.navigateToGeneralChannel();
        await mainMessage.deleteMessage(messageValue);
    })
    it('Should post and save message', async () => {
        messageValue = `Hello World ${new Date().getTime()}`;
        await mainMessage.sendMessage(messageValue);
        // Make sure message was posted
        const msg = await mainMessage.messageByValue(messageValue);
        await msg.waitForDisplayed();
        await expect(await msg.getText()).toEqual(messageValue);
        // Save the message
        await mainMessage.saveMessage(messageValue);
        
    });
    it('Should search saved message', async () => {
        // Search for saved message
        await search.searchText('has:star');
        const array = await mainMessage.extractListedMessages(messageValue);
        await expect(array).toBeTruthy();
        await expect(array.includes(messageValue)).toBeTruthy();
    });
    it('Should view list of Saved Items', async () => {
        // Search for saved message
        await channels.savedItemsChannel.click();
        await browser.pause(500);
        const array = await search.extractSavedItems();
        await expect(array).toBeTruthy();
        await expect(array.includes(messageValue)).toBeTruthy();
    })
});


