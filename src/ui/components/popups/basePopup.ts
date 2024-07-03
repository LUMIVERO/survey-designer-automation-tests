import { test, Page, Locator, expect } from "@playwright/test";

export class BasePopup {
	protected popup: Locator;
	protected popupHeader: Locator;
	protected xBtn: Locator;
	protected submitBtn: Locator;
	protected cancelBtn: Locator;

	constructor(protected readonly page: Page) {
		this.popup = page.locator(".k-window.k-dialog");
		this.popupHeader = this.popup.locator(".k-window-titlebar");
		this.xBtn = this.popup.locator(".k-button-icon");
		this.submitBtn = this.popup.locator(".k-button-solid");
		this.cancelBtn = this.popup.locator(".k-button-outline");
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
