import { Locator, expect } from "@playwright/test";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { Question } from "@ui/components/questions/designQuestions/question";

export class NumericQuestion extends Question {
	readonly textBefore: Locator = this.container.locator("[id^=\"text_before_\"]");
	readonly textAfter: Locator = this.container.locator("[id^=\"text_after_\"]");
	readonly rangeInput: Locator = this.container.locator(".k-numerictextbox");

	constructor(container: Locator) {
		super(container, QuestionType.Numeric);
	}

	async assertQuestionType(questionType: QuestionType = QuestionType.Numeric): Promise<void> {
		await super.assertQuestionType(questionType);
		await expect(this.textBefore).toBeVisible();
		await expect(this.textBefore).toHaveAttribute("placeholder", "Text Before");
		await expect(this.textAfter).toBeVisible();
		await expect(this.textAfter).toHaveAttribute("placeholder", "Text After");
		await expect(this.rangeInput).toHaveCount(2);
	}
}