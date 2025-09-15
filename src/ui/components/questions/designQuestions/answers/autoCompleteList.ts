import { Locator, test } from "@playwright/test";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";
import { AssertInputTypeOptions } from "@typedefs/ui/answer.typedefs";

export class AutoCompleteList extends BaseAnswer {
	readonly input: Locator = this.container.locator(".answer-text .k-input");

	async assertInputType(options?: AssertInputTypeOptions): Promise<void> {
		await test.step("Assert input type is auto complete list", async () => {
			options?.answerText && await this.assertAnswerText(options.answerText);
			options?.code && await this.assertAnswerCode(options.code);
			options?.varText && await this.assertAnswerVariableText(options.varText);
		});
	};
}