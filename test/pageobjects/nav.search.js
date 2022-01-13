
class NavSearch {

    get topSearch() {
        return $('[data-qa="top_nav_search"]');
    }

    get focusSearch() {
        return $('[data-qa="focusable_search_input"] div');
    }

    get topTabs() {
        return $('[data-qa="tabs_full_width_class"]');
    }

    get leftPanMessages() {
        return $$('[data-qa="saved_flexpane"] [data-qa="virtual-list-item"] .p-rich_text_section');
    }

    async searchText(text) {
        await this.topSearch.click();
        await this.focusSearch.setValue(text);
        await browser.keys('Enter');
        await this.topTabs.waitForDisplayed();
    }

    async extractSavedItems() {
        const messages = await this.leftPanMessages;
        return await Promise.all(
            messages.map( async (msg) => {
                return await msg.getText();
            })
        );
    }
}

const search = new NavSearch();
export { search };