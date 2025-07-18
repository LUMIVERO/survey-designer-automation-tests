import { Page, Locator, test } from "@playwright/test";
import { QuestionResponse } from "@typedefs/api/question.typedefs";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { BaseContainer } from "@ui/components/baseComponent";
import { questionsUrl } from "src/constants/urls/apiUrls";
import { CreateQuestionDialogHeader } from "./create-question-dialog-header";
import { QuestionTypePreview } from "./question-type-preview";

export class QuestionTypeList extends BaseContainer {
	readonly questionPreview: QuestionTypePreview = new QuestionTypePreview(this.page);
	readonly category: Locator = this.container.locator(".category-title");
	readonly questionTypeBtn: Locator = this.container.locator(".question-button-preview");

	readonly header: CreateQuestionDialogHeader = new CreateQuestionDialogHeader(this.page);


	constructor(page: Page) {
		super(page.locator(".question-types-list"));
	}

	async selectQuestionType(questionType: QuestionType): Promise<QuestionResponse> {
		return test.step(`Click on the ${questionType}`, async () => {
			const [response] = await Promise.all([
				this.page.waitForResponse(questionsUrl.root),
				this.questionTypeBtn.filter({ hasText: new RegExp(`[^a-zA-Z]. ${questionType}`) }).click(),
			]);

			return response.json();
		});
	}
}