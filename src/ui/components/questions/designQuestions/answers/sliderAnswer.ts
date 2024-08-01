import { Locator, expect, test } from "@playwright/test";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";

export class SliderAnswer extends BaseAnswer {
	readonly input: Locator = this.page.locator(".range-slider input")
	readonly answerTextInput: Locator = this.container.locator(".answer-text textarea");

	async assertInputType(): Promise<void>{
		await test.step("Assert input type is slider", async () => {
      await expect(this.input).toBeVisible();
      expect(await this.input.getAttribute("type")).toEqual("range");
    });
	}
}