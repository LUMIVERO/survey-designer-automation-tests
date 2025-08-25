import { Locator, test, expect } from "@playwright/test";
import { AssertInputTypeOptions } from "@typedefs/ui/answer.typedefs";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";

export class Carousel extends BaseAnswer {
	readonly input: Locator = this.container.locator(".type-icon input");

	async assertInputType(options?: AssertInputTypeOptions): Promise<void> {
		await test.step("Assert input type is radio", async () => {
			await expect(this.input).toBeVisible();
			expect(await this.input.getAttribute("type")).toEqual("radio");
			options?.answerText && await this.assertAnswerText(options.answerText);
			options?.code && await this.assertAnswerCode(options.code);
			options?.varText && await this.assertAnswerVariableText(options.varText);
		});
	}
}