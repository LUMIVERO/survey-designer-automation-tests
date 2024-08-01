import { waitAfterAction } from "@helpers/promise.helpers";
import { expect, Locator, test } from "@playwright/test";
import { Url, QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { BaseDialog } from "@ui/components/dialogs/baseDialog";
import { Question } from "@ui/components/questions/designQuestions/question";
import { surveysUrl } from "src/constants/urls/apiUrls";
import { surveyUrl } from "src/constants/urls/uiUrls";
import { BaseDetailsPage } from "../baseDetails.page";

export class SurveyDetailsPage extends BaseDetailsPage {
	url = surveyUrl.surveysDetails;
	readonly pageContentHeader: Locator = this.page.locator(".page-content-header");
	readonly chapterContainer: Locator = this.page.locator(".chapter-container");
	readonly surveyName: Locator = this.pageContentHeader.locator(".title");
	readonly addQuestionBtn: Locator = this.chapterContainer.locator(".qdt-btn-primary");
	readonly previewsList: Locator = this.page.locator(".previews-list");
	readonly questionTypeButtons = this.previewsList.locator(".question-button-preview");
	readonly questions: Locator = this.page.locator(".question-editor");
	readonly dialog: BaseDialog = new BaseDialog(this.page);

	async waitForOpened(options?: Url): Promise<void> {
		const { url, waitForResponse } = options ?? {};
		await super.waitForOpened({ url });

		waitForResponse &&
		await this.page.waitForResponse(new RegExp(surveysUrl.survey));
	}

	async clickQuestionTypeButton(questionType: QuestionType): Promise<void> {
		await test.step(`Click on the ${questionType} question type`, async () => {
			await this.previewsList.isVisible();
			await this.questionTypeButtons.filter({ hasText: questionType }).click();
		});
	}

	async clickAddQuestionBtn(): Promise<void> {
		await test.step(`Click [Add question] btn`, async () => {
			await this.addQuestionBtn.click();
		});
	}

	private async determineQuestion(questionOrTypeOrText: Question | QuestionType | string, questionType?: QuestionType): Promise<Question> {
		if (questionOrTypeOrText instanceof Question) {
			return questionOrTypeOrText;
		} else if (typeof questionOrTypeOrText === "string") {
			return await this.getQuestionByText(questionOrTypeOrText, questionType);
		} else {
			return this.getFirstQuestion(questionOrTypeOrText);
		}
	}

	async deleteQuestion(question: Question): Promise<void>;
	async deleteQuestion(questionType: QuestionType): Promise<void>;
	async deleteQuestion(questionText: string, questionType: QuestionType): Promise<void>;
	async deleteQuestion(questionOrTypeOrText: Question | QuestionType | string, questionType?: QuestionType): Promise<void> {
		let question: Question = await this.determineQuestion(questionOrTypeOrText, questionType);

		await test.step(`Delete question ${await question.getQuestionText()}`, async () => {

			await waitAfterAction(
				async () => await question.clickDeleteQuestion(),
				async () => await this.dialog.waitForDialogVisible()
			);

			await this.dialog.assertDialogHeaderIsCorrect("Delete Question");

			await waitAfterAction(
				async () => await this.dialog.clickSubmitBtn(),
				async () => await this.dialog.waitForDialogHidden()
			);
		});
	}

	async getQuestionByText(
		text: string,
		questionType: QuestionType
	): Promise<Question> {
		return new Question(
			this.questions.filter({ has: this.page.locator(`[value=${text}]`) }),
			questionType
		);
	}

	getFirstQuestion(
		questionType: QuestionType
	): Question {
		return new Question(this.questions.first(), questionType);
	}

	async assertSurveyNameCorrect(name: string): Promise<void> {
		await test.step(`Assert survey name is correct`, async () => {
			await expect(this.surveyName).toHaveText(name);
		});
	}
}
