import { Locator, test, expect } from "@playwright/test";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";

export class StarBarAnswer extends BaseAnswer {
	readonly input: Locator = this.container.locator(".answer-stars");
	readonly answerTextInput: Locator = this.container.locator(".topic-text");

	constructor(container: Locator) {
		super(container.page().locator(".topic-item").first());
	}

	async assertInputType(): Promise<void> {
		await test.step("Assert input type is star bar", async () => {
			await expect(this.input).toBeVisible();
			await expect(this.input.locator(".ti-star").first()).toBeVisible();
		});
	}

	async assertAnswerVariableText(text: string = "T_1_Q_1"): Promise<void> {
		return super.assertAnswerVariableText(text);
	}

	async assertAnswerText(): Promise<void> {
		await test.step(`Assert topic text is "Topic #1"`, async () => {
			expect(await this.getAnswerText()).toEqual("Topic #1");
		});
	}
}