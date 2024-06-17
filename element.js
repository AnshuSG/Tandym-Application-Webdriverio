const { remote } = require('webdriverio');

(async () => {
    const browser = await remote({
        logLevel: 'info',
        capabilities: {
            browserName: 'chrome'
        }
    });

    try {
        await browser.url('https://tandym-osm-stg-store.myshopify.com/'); // Replace with your URL

        // Wait for the page to be fully loaded
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === 'complete',
            {
                timeout: 30000, // 30 seconds
                timeoutMsg: 'Page did not load within 30 seconds'
            }
        );

        // Locate the dropdown element
        const dropdown = await browser.$("//select[@id='Select2']");
        
        // Log element presence in DOM
        if (await dropdown.isExisting()) {
            console.log('Dropdown element is present in the DOM.');
        } else {
            throw new Error('Dropdown element is not present in the DOM.');
        }

        // Wait for the dropdown element to be displayed and enabled
        await dropdown.waitForDisplayed({ timeout: 30000 });
        await dropdown.waitForEnabled({ timeout: 30000 });

        // Scroll the dropdown into view
        await dropdown.scrollIntoView();

        // Check if the dropdown is visible and enabled
        if (await dropdown.isDisplayed() && await dropdown.isEnabled()) {
            // Select option by visible text
            await dropdown.selectByVisibleText('Option Text'); // Replace with the text of the option

            // You can also use the other methods if needed
            // await dropdown.selectByAttribute('value', 'optionValue');
            // await dropdown.selectByIndex(2);
        } else {
            console.error('Dropdown is not visible or not enabled.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.deleteSession();
    }
})();
