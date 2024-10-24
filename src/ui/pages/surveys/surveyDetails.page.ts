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
	readonly sidePanel: Locator = this.page.locator(".tree-view-panel");
	readonly sidePanelBtn: Locator = this.sidePanel.locator(".expander-button");
	private readonly chaptersSelector: string = ".treeview-chapter";
	readonly chapters: Locator = this.sidePanel.locator(this.chaptersSelector);
	readonly rootChapter: Locator = this.sidePanel.locator(`.k-treeview-top${this.chaptersSelector}`);
	readonly addNewBtn: (chapter: Locator) => Locator = chapter => chapter.locator("button");

	readonly pageContentHeader: Locator = this.page.locator(".page-content-header");
	readonly chapterContainer: Locator = this.page.locator(".chapter-container");
	readonly surveyName: Locator = this.pageContentHeader.locator(".title");
	readonly questionTypesList: Locator = this.page.locator(".question-types-list");
	readonly questionTypeButtons: Locator = this.questionTypesList.locator(".question-button-preview");
	readonly questions: Locator = this.page.locator(".question-editor");
	readonly chapterFooter: Locator = this.page.locator(".container-footer");
	readonly addQuestionBtn: Locator = this.chapterFooter.locator(".question-btn");
	readonly dialog: BaseDialog = new BaseDialog(this.page);

	get addNewPopup(): {
		popup: Locator;
		addQuestionBtn: Locator;
		addChapterBtn: Locator;
	} {
		const popup = this.page.locator(".k-menu-popup:visible");
		const buttons = popup.locator(".k-item");
		const addQuestionBtn = buttons.filter({ hasText: "Add question" });
		const addChapterBtn = buttons.filter({ hasText: "Add chapter" });

		return {
			popup,
			addQuestionBtn,
			addChapterBtn,
		};
	}

	async waitForOpened(options?: Url): Promise<void> {
		const { url, waitForResponse } = options ?? {};
		await super.waitForOpened({ url });

		waitForResponse &&
		await this.page.waitForResponse(new RegExp(surveysUrl.survey));
	}

	async clickQuestionTypeButton(questionType: QuestionType): Promise<void> {
		await test.step(`Click on the ${questionType} question type`, async () => {
			await this.questionTypesList.isVisible();

			this.questionTypeButtons.filter({ hasText: new RegExp(`[^a-zA-Z]. ${questionType}`) }).click();
		});
	}

	async clickAddQuestionBtn(index: number = 0): Promise<void> {
		await test.step(`Click [Add question] btn`, async () => {
			await this.addQuestionBtn.nth(index).click();
		});
	}

	async clickSidePanelBtn() {
		await test.step("Click on the side panel", async () => {
			await this.sidePanelBtn.click();
		});
	}

	async clickAddNewBtn(chapter: Locator) {
		await test.step("Click on the [Add new] btn", async () => {
			await this.addNewBtn(chapter).click();
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

	async assertSidePanelIsVisible({ visible = true }): Promise<void> {
		await test.step(`Assert side panel is ${visible ? "" : "not "}visible`, async () => {
			if (visible) {
				await expect(this.sidePanel).toHaveClass(/expanded/);
			} else {
				await expect(this.sidePanel).not.toHaveClass(/expanded/);
			}
		});
	}
}
