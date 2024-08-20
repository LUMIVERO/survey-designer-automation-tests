import { Locator, test, expect } from "@playwright/test";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";

export class OpenEndedAnswer extends BaseAnswer {
	readonly input: Locator;
	readonly answerTextInput: Locator;

	constructor(container: Locator) {
		super(container.page().locator(".answer-container"));
	}

	async assertInputType(): Promise<void> {
	};

	async getAnswerVariableText(): Promise<string> {
		return "";
	}

	async getAnswerText(): Promise<string> {
		return "";
	}

	async assertAnswerText(): Promise<void> {
		await test.step(`Assert answer text is ""`, async () => {
			expect(await this.getAnswerText()).toEqual("");
		});
	}

	async assertAnswerVariableText(): Promise<void> {
		await test.step(`Assert answer variable text is ""`, async () => {
			expect(await this.getAnswerVariableText()).toEqual("");
		});
	}
}