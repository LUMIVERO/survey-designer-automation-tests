import { test, Page, Locator, expect, Response } from "@playwright/test";
import { WaitForResponse, ResponseBooleanCallback } from "@typedefs/ui/components.typedefs";
import { BaseContainer } from "@ui/components/baseComponent";

export class BaseDialog extends BaseContainer {
	readonly dialogHeader: Locator = this.container.locator(".k-dialog-title");
	protected xBtn: Locator = this.container.locator(".ti-x");
	protected submitBtn: Locator = this.container.locator(".k-button-solid");
	protected cancelBtn: Locator = this.container.locator(".k-button-outline");

	constructor(page: Page) {
		super(page.locator(".k-window.k-dialog"))
	};

	async waitForDialogVisible() {
		await test.step("Wait for the dialog to be visible", async () => {
			await this.container.waitFor({ state: "visible" });
		});
	}

	async waitForDialogHidden() {
		await test.step("Wait for the dialog to be hidden", async () => {
			await this.container.waitFor({ state: "hidden" });
		});
	}

	async clickXBtn() {
		await test.step("Click the [x] button on the dialog", async () => {
			await this.xBtn.click();
			await this.waitForDialogHidden();
		});
	}

	async clickSubmitBtn({
	  waitForResponse,
		callback,
	}: WaitForResponse = { waitForResponse: false }): Promise<Response | void> {
		return test.step("Click on the [Submit] button on the dialog", async () => {
			const [response] = await Promise.all([
				waitForResponse && this.waitForSuccessResponse(callback),
				this.submitBtn.click(),
			].filter(Boolean));

			return response;
		});
	}

	async clickCancelBtn() {
		await test.step("Click on the [Cancel] button on the dialog", async () => {
			await this.cancelBtn.click();
		});
	}

	async assertDialogHeaderIsCorrect(text: string) {
		await test.step(`Assert dialog header has title - ${text}`, async () => {
			await expect(this.dialogHeader).toHaveText(text);
		});
	}

	protected async waitForSuccessResponse(callback?: ResponseBooleanCallback): Promise<Response> {
		return test.step("Wait for success response", async () => {
			return this.page.waitForResponse(callback || (async response => response.ok()));
		});
	}
}
