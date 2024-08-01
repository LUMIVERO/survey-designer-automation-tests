import { Locator, test, expect, Page } from "@playwright/test";

export abstract class BaseAnswer {
	abstract readonly input: Locator;

	abstract assertInputType(): Promise<void>;

	readonly page: Page;
	readonly answerVariable: Locator = this.container.getByPlaceholder("Variable name");
	readonly answerTextInput: Locator = this.container.locator(".answer-text input");
	readonly deleteAnswerBtn: Locator = this.container.locator(".answer-text button");

	constructor(protected container: Locator) {
		this.page = container.page();
	}

	async getAnswerVariableText(): Promise<string> {
		return await this.answerVariable.inputValue();
	}

	async getAnswerText(): Promise<string> {
		return await this.answerTextInput.inputValue();
	}

	async deleteAnswer(): Promise<void> {
		await this.deleteAnswerBtn.click();
	}

	async assertAnswerText(text: string = "Option #1"): Promise<void> {
		await test.step(`Assert question text is "${text}"`, async () => {
			expect(await this.getAnswerText()).toEqual(text);
		});
	}

	async assertAnswerVariableText(text: string = "A_1_Q_1"): Promise<void> {
		await test.step(`Assert question variable text is "${text}"`, async () => {
			expect(await this.getAnswerVariableText()).toEqual(text);
		});
	}
}