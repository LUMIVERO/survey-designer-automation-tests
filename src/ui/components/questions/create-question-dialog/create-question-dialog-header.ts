import { Page, test, Locator } from "@playwright/test";
import { Locators } from "@typedefs/common/main.typedefs";
import { BaseContainer } from "@ui/components/baseComponent";

export class CreateQuestionDialogHeader extends BaseContainer {
	readonly basic: Locator = this.container.getByTitle("Basic");
	readonly qBank: Locator = this.container.getByTitle("QBank");

	constructor(page: Page) {
		super(page.locator("#create-question-dialog"));
	}

	async clickOnTab(tab: Locators<CreateQuestionDialogHeader>): Promise<void> {
		await test.step(`Click on ${tab}`, async () => {
			await this[tab].click();
		});
	}
}