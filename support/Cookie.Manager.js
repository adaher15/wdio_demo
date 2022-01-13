class Cookies {
    async setCookie(key, value) {
        const url = browser.config.baseUrl;
        const baseurl = url.split('/')[2];
        return browser.setCookies([{
            name: key,
            value: value,
            domain: baseurl,
            secure: true,
          }]);
    }

}

const cookieUtil = new Cookies();
export { cookieUtil };