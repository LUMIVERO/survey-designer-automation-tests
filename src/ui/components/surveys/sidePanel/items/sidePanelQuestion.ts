import { Locator, test, expect } from "@playwright/test";
import { BaseSidePanelItem } from "@ui/components/surveys/sidePanel/items/baseSidePanelItem";

export class SidePanelQuestion extends BaseSidePanelItem {
	readonly varName: Locator = this.container.locator(".var-name");
	readonly title: Locator = this.container.locator(".question .text-wrap[title]");

	async assertVarName(varName: string): Promise<void> {
		await test.step(`Assert question variable name is ${varName}`, async () => {
			await expect(this.varName).toContainText(varName);
		});
	}
}