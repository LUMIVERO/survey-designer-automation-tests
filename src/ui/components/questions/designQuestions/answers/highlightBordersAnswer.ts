import { expect, Locator, test } from "@playwright/test";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";

export class HighlightBordersAnswer extends BaseAnswer {
	readonly input: Locator = this.container.locator(".answer-text input");

	async assertInputType(): Promise<void> {
	};
}