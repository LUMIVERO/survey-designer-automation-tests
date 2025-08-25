import { Locator, expect } from "@playwright/test";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";

export class Numeric extends BaseAnswer {
	readonly input: Locator = this.page.locator(".k-numerictextbox");

	async assertInputType(): Promise<void> {
		await expect(this.input.first()).toBeVisible();
	}
}