import { test } from "@playwright/test";
import { BaseContainer } from "@ui/components/baseComponent";

export class Input extends BaseContainer {

	async removeFocusWithTab(): Promise<void> {
		await test.step("Click out of focus", async () => {
			await this.page.keyboard.press("Tab");
		});
	}

	async clickInput(): Promise<void> {
		await this.container.click();
	}

	async fill(text: string): Promise<void> {
		await this.clickInput();
		await this.container.fill(text);
		await this.page.waitForTimeout(500);
		await this.removeFocusWithTab();
	}
}