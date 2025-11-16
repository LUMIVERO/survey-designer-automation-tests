import { Locator, expect } from "@playwright/test";
import { Input } from "src/ui/components/inputs/input";

export class InputWithPlaceholder extends Input {

	protected input = this.page.getByPlaceholder(this.placeholder);

	constructor(locator: Locator, protected placeholder: string = "") {
		super(locator);
	}

	async clickInput() {
		await expect(async () => {
			await expect(this.container).toBeVisible();
			await super.clickInput();
			await this.page.waitForTimeout(200);
			await expect(this.input).toBeVisible();
		}).toPass();
	}

	async fill(text: string): Promise<void> {
		await this.clickInput();
		await this.input.fill(text);
		await this.page.waitForTimeout(500);
		await this.removeFocusWithTab();
		await expect(this.input).toBeHidden();
	}
}
