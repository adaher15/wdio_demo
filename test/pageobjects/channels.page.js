import Page from './page';

class ChannelPage extends Page {

    get channels() {
        return $('div[data-qa="channels"]');
    }
    get generalChannel() {
        return $('span[data-qa="channel_sidebar_name_general"]');
    }
    get savedItemsChannel() {
        return $('[data-qa="channel_sidebar_name_page_psaved"]');
    }

    async navigateToGeneralChannel() {
        await this.channels.waitForDisplayed({timeout: 30000});
        await this.generalChannel.waitForClickable();
        await this.generalChannel.click();
    }
}

const channels = new ChannelPage();
export { channels };
