import { Locator, test, expect } from "@playwright/test";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";

export class EmptyAnswer extends BaseAnswer {
	readonly input: Locator;
	readonly answerTextInput: Locator;
	readonly deleteAnswerBtn: Locator;

	async assertInputType(): Promise<void> {
		await test.step("Assert input type is empty", async () => {
			await expect(this.container).toBeHidden();
		});
	}

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