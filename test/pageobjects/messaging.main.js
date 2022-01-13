import { search } from './nav.search';

class MainMessages {

    get messageContainer() {
        return $('[data-qa="message_container"] div[data-qa="message_content"]');
    }

    get messagesInMain() {
        return $$('div[data-qa="message_content"] div.p-rich_text_section')
    }

    messageByValue(value) {
        return $(`.p-rich_text_section*=${value}`);
    }

    get moreMenu() {
        return $('[data-qa="more_message_actions"]');
    }

    get deleteButton() {
        return $('[data-qa="delete_message"]');
    }

    get confirmDelete() {
        return $('button[data-qa="dialog_go"]');
    }
    get saveIcon() {
        return $('[data-qa="save_message"]');
    }  

    get inputMessage() {
        return $('[data-qa="message_input"] div.ql-editor');
    }

    get sendButton() {
        return $('[data-qa="texty_send_button"]');
    }

    get listedMessages() {
        return $$('div.p-rich_text_section');
    }

    async sendMessage(messageValue) {
        await this.inputMessage.click();
        await browser.pause(1000);
        await this.inputMessage.setValue(messageValue);
        await this.sendButton.click();
    }

    async saveMessage(value) {
        const msg = await this.messageByValue(value);
        await msg.waitForDisplayed();
        await msg.click();
        await this.saveIcon.click();
    }

    /**
     * Extract messages from search results. If a message is specified
     * retry the search few times until the message is displayed.
     * This is due to a caching error with Slack
     * @param {string} message 
     */
    async extractListedMessages(message, retry = 20, key = 'has:star') {
        const messages = await this.listedMessages;
        const array = await Promise.all(messages.map( async(msg) => {
            return await msg.getText();
        }))
        console.log('__ ARRAY ', array);
        if(message && message.length > 0 && retry > 0){
            if(! array.includes(message)){
                // wait 3 sec and retry again
                await browser.pause(5000);
                await search.searchText('has:star');
                return await this.extractListedMessages(message, retry-1); 
            }else{
                return array;
            }
        }
    }

    async deleteMessage(value) {
        const message = await this.messageByValue(value);
        await message.waitForClickable();
        await message.click();
        await this.moreMenu.click();
        await this.deleteButton.click();
        await this.confirmDelete.click();

    }
    async deleteAllMessages() {
        const messages = await this.messagesInMain;
        const array = await Promise.all(messages.map( async (msg) => {
            return await msg.getText();
        }));
        for (const msg of array) {
            await this.deleteMessage(msg);
        }
    }

}

const mainMessage = new MainMessages();
export { mainMessage };
