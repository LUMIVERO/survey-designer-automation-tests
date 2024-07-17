import { test, Page, Locator, expect } from "@playwright/test";

export class BaseDialog {
	readonly dialog: Locator = this.page.locator(".k-window.k-dialog");
	readonly dialogHeader: Locator = this.dialog.locator(".k-window-titlebar");
	readonly xBtn: Locator = this.dialog.locator(".k-button-icon");
	readonly submitBtn: Locator = this.dialog.locator(".k-button-solid");
	readonly cancelBtn: Locator = this.dialog.locator(".k-button-outline");

	constructor(protected readonly page: Page) {
	};

	async waitForDialogVisible() {
		await test.step("Wait for the dialog to be visible", async () => {
			await this.dialog.waitFor({ state: "visible" });
		});
	}

	async waitForDialogHidden() {
		await test.step("Wait for the dialog to be hidden", async () => {
			await this.dialog.waitFor({ state: "hidden" });
		});
	}

	async clickXBtn() {
		await test.step("Click the [x] button on the dialog", async () => {
			await this.xBtn.click();
			await this.waitForDialogHidden();
		});
	}

	async clickSubmitBtn() {
		await test.step("Click on the [Submit] button on the dialog", async () => {
			await this.submitBtn.click();
		});
	}

	async clickCancelBtn() {
		await test.step("Click on the [Cancel] button on the dialog", async () => {
			await this.cancelBtn.click();
		});
	}

	async assertDialogHeaderIsCorrect(text: string) {
		await test.step(`Assert dialog header has title - ${text}`, async () => {
			expect(await this.dialogHeader.innerText()).toEqual(text);
		});
	}
}
