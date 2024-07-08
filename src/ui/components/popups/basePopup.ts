import { test, Page, Locator, expect } from "@playwright/test";

export class BasePopup {
	readonly popup: Locator = this.page.locator(".k-window.k-dialog");
	readonly popupHeader: Locator = this.popup.locator(".k-window-titlebar");
	readonly xBtn: Locator = this.popup.locator(".k-button-icon");
	readonly submitBtn: Locator = this.popup.locator(".k-button-solid");
	readonly cancelBtn: Locator = this.popup.locator(".k-button-outline");

	constructor(protected readonly page: Page) {
	};

	async waitForPopupVisible() {
		await test.step("Wait for the popup to be visible", async () => {
			await this.popup.waitFor({ state: "visible" });
		});
	}

	async waitForPopupHidden() {
		await test.step("Wait for the popup to be hidden", async () => {
			await this.popup.waitFor({ state: "hidden" });
		});
	}

	async clickXBtn() {
		await test.step("Click the [x] button on the popup", async () => {
			await this.xBtn.click();
			await this.waitForPopupHidden();
		});
	}

	async clickSubmitBtn() {
		await test.step("Click on the [Submit] button on the popup", async () => {
			await this.submitBtn.click();
		});
	}

	async clickCancelBtn() {
		await test.step("Click on the [Cancel] button on the popup", async () => {
			await this.cancelBtn.click();
		});
	}

	async assertPopHeaderIsCorrect(text: string) {
		await test.step(`Assert pop-up header has title - ${text}`, async () => {
			expect(await this.popupHeader.innerText()).toEqual(text);
		});
	}
}
