import { Locator, test } from "@playwright/test";
import { BaseContainer } from "@ui/components/baseComponent";

export class DropdownAddBnt extends BaseContainer {
	readonly addNewBtn = this.container.locator(".main-btn");
	readonly dropdownBtn = this.container.locator(".arrow-btn");

	constructor(questionContainer: Locator) {
		super(questionContainer.locator(".dropdown-button-container"));
	}

	async click(): Promise<void> {
		await test.step("Click add new answer btn", async () => {
			await this.addNewBtn.click();
		});
	}
}