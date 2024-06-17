describe("Tandym Application", async () => {
  it("Tandym Application", async () => {
    try {
      await browser.url("https://tandym-osm-stg-store.myshopify.com/");

      await browser.waitUntil(
        async () =>
          (await browser.execute(() => document.readyState)) === "complete",
        {
          timeout: 30000,
          timeoutMsg: "Page did not load within 30 seconds",
        }
      );

      const password = await $("//input[@id='password']");
      await password.setValue("tandym");
      await (await $("//button[@type='submit']")).click();
      await (await $("//span[normalize-space()='Catalog']")).click();
      await (
        await $(
          "//a[@id='CardLink-template--17275749826717__product-grid-8222517395613']"
        )
      ).click();

      await (
        await $("//label[@for='template--17275750252701__main-1-2']")
      ).click();
      await browser.pause(5000);

      const ProductSubmitButton = await $(
        "//button[@id='ProductSubmitButton-template--17275750252701__main']"
      );

      await ProductSubmitButton.waitForDisplayed();
      await ProductSubmitButton.waitForEnabled();
      await ProductSubmitButton.click();

      const CartDrawerCheckout = await $("//button[@id='CartDrawer-Checkout']");
      await CartDrawerCheckout.waitForDisplayed();
      await CartDrawerCheckout.waitForEnabled();
      await CartDrawerCheckout.click();

      await browser.pause(4000);
      await $("//input[@id='email']").setValue("SG@gmail.com");

      const Countrydropdown = await browser.$("//select[@id='Select0']");
      await Countrydropdown.waitForDisplayed({ timeout: 10000 });
      await Countrydropdown.waitForEnabled({ timeout: 10000 });

      await Countrydropdown.scrollIntoView();

      if (
        (await Countrydropdown.isDisplayed()) &&
        (await Countrydropdown.isEnabled())
      ) {
        await Countrydropdown.selectByVisibleText("United States");

        // await dropdown.selectByAttribute('value', 'optionValue');
        // await dropdown.selectByIndex(2);
      } else {
        console.error("Dropdown is not visible or not enabled.");
      }

      await $("//input[@id='TextField1']").setValue("G");

      await $("//input[@id='TextField2']").setValue("suite150");

      await $("//input[@id='TextField4']").setValue("New York");

      const statedropdown = await browser.$("//select[@id='Select1']");

      if (await statedropdown.isExisting()) {
        console.log("Dropdown element is present in the DOM.");
      } else {
        throw new Error("Dropdown element is not present in the DOM.");
      }

      await statedropdown.waitForDisplayed({ timeout: 30000 });
      await statedropdown.waitForEnabled({ timeout: 30000 });
      await statedropdown.scrollIntoView();

      await browser.pause(4000);

      if (
        (await statedropdown.isDisplayed()) &&
        (await statedropdown.isEnabled())
      ) {
        await statedropdown.selectByVisibleText("New York");

        // await dropdown.selectByAttribute('value', 'New York');
        // await dropdown.selectByIndex(2);
      } else {
        console.error("Dropdown is not visible or not enabled.");
      }

      await $("//input[@id='TextField5']").setValue("10003");

      await browser.pause(3000);

      await (
        await $(
          "//button[@class='QT4by _1fragempw rqC98 _1m2hr9gd _1m2hr9ga _7QHNJ VDIfJ j6D1f janiy']"
        )
      ).click();

      await (
        await $(
          "//button[@class='QT4by _1fragempw rqC98 _1m2hr9gd _1m2hr9ga _7QHNJ VDIfJ j6D1f janiy']"
        )
      ).click();

      await browser.pause(3000);

      await expect($("//h2[@id='checkout-main-header']")).toHaveTextContaining(
        "Payment"
      );

      await browser.pause(3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await browser.deleteSession();
    }
  });
});
