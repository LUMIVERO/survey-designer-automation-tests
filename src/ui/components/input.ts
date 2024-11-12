import { Locator, Page, test, expect } from "@playwright/test";

export class Input {
	readonly page: Page;

	constructor(readonly locator: Locator, protected placeholder: string = "") {
		this.page = locator.page();
	}

	async removeFocusWithTab(): Promise<void> {
		await test.step("Click out of focus", async () => {
			await this.page.keyboard.press("Tab");
		});
	}

	async clickInput() {
		await expect(async () => {
			await expect(this.locator).toBeVisible();
			await this.locator.click();
			await this.page.waitForTimeout(200);
			await expect(this.input).toBeVisible();
		}).toPass();
	}

	get input(): Locator {
		return this.page.getByPlaceholder(this.placeholder);
	}

	async fill(text: string): Promise<void> {
		await this.clickInput();
		await this.input.fill(text);
		await this.page.waitForTimeout(500);
		await this.removeFocusWithTab();
		await expect(this.input).toBeHidden();
	}
}
