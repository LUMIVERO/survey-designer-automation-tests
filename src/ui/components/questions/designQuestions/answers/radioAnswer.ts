import { expect, Locator, test } from "@playwright/test";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";

export class RadioAnswer extends BaseAnswer {
	readonly input: Locator = this.container.locator(".type-icon input");

	async assertInputType(): Promise<void> {
		await test.step("Assert input type is radio", async () => {
			await expect(this.input).toBeVisible();
			expect(await this.input.getAttribute("type")).toEqual("radio");
		});
	}
}