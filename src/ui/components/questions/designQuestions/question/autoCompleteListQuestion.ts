import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { expect } from "@playwright/test";
import { SingleChoiceQuestion } from "./singleChoiseQuestion";

export class AutoCompleteListQuestion extends SingleChoiceQuestion {
	protected head = this.container.locator(".head");
	protected settings = this.container.locator(".settings");
	readonly search = this.head.getByRole("textbox");
	readonly searchMode = this.settings.locator(".search-mode");
	readonly answersVisibility = this.settings.locator(".answers-visibility");

	async assertQuestionType(questionType: QuestionType = QuestionType.AutocompleteList): Promise<void> {
		await super.assertQuestionType(questionType);
		await expect(this.search).toBeVisible();
		await expect(this.searchMode).toBeVisible();
		await expect(this.answersVisibility).toBeVisible();
	}
}