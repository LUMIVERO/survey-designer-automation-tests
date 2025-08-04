import { Locator, test, expect, Page } from "@playwright/test";
import { InputWithPlaceholder } from "@ui/components/inputs";

export abstract class BaseAnswer {
	abstract readonly input: Locator;
	protected _answerLocator = ".answer";

	abstract assertInputType(options?: Record<string, any>): Promise<void>;

	readonly page: Page;
	readonly answerVariable: Locator = this.container.locator(".var-name");
	readonly answerTextInput: Locator = this.container.locator(".answer-text");
	readonly deleteAnswerBtn: Locator = this.container.locator(".answer-text button");
	readonly answerCode: Locator = this.container.locator(".answer-code");

	constructor(protected container: Locator) {
		this.page = container.page();
	}

	async getAnswerVariableText(): Promise<string> {
		return await this.answerVariable.innerText();
	}

	async getAnswerText(): Promise<string> {
		return await this.answerTextInput.innerText();
	}

	async getAnswerCode(): Promise<string> {
		return this.answerCode.getAttribute("title");
	}

	async deleteAnswer(): Promise<void> {
		await this.deleteAnswerBtn.click();
	}


	async editAnswerText(text: string): Promise<BaseAnswer> {
		await test.step(`Edit answer text with text - "${text}"`, async () => {
			const input = new InputWithPlaceholder(this.answerTextInput, "Click to write the answer option");
			await input.fill(text);
		});

		return this;
	}

	async editAnswerVarText(text: string): Promise<BaseAnswer> {
		await test.step(`Edit answer var text with text - "${text}"`, async () => {
			const input = new InputWithPlaceholder(this.answerVariable, "Variable name");
			await input.fill(text);
		});

		return this;
	}

	async assertAnswerText(text: string = "Option #1"): Promise<void> {
		await test.step(`Assert answer text is "${text}"`, async () => {
			expect(await this.getAnswerText()).toEqual(text);
		});
	}

	async assertAnswerCode(num: number): Promise<void> {
		await test.step(`Assert answer code is ${num}`, async () => {
			const code = await this.getAnswerCode();
			expect(code).toContain(`${num}`);
		});
	}

	async assertAnswerVariableText(text: string = "A_1_Q_1"): Promise<void> {
		await test.step(`Assert answer variable text is "${text}"`, async () => {
			expect(await this.getAnswerVariableText()).toEqual(text);
		});
	}
}