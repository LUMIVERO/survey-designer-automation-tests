import { Page, Locator, test } from "@playwright/test";

export class Input {
	readonly page: Page;

	constructor(readonly locator: Locator) {
		this.page = locator.page();
	}

	async removeFocusWithTab(): Promise<void> {
		await test.step("Click out of focus", async () => {
			await this.page.keyboard.press("Tab");
		});
	}

	async clickInput(): Promise<void> {
		await this.locator.click();
	}

	async fill(text: string): Promise<void> {
		await this.clickInput();
		await this.locator.fill(text);
		await this.page.waitForTimeout(500);
		await this.removeFocusWithTab();
	}
}