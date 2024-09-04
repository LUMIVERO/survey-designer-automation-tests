import { expect, Locator, test } from "@playwright/test";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";

export class AutoCompleteList extends BaseAnswer {
	readonly input: Locator = this.container.locator(".answer-text input");

	async assertInputType(): Promise<void> {
		await test.step("Assert input type is textbox", async () => {
			await expect(this.input).toBeVisible();
			expect(await this.input.getAttribute("role")).toEqual("textbox");
		});
	}
}