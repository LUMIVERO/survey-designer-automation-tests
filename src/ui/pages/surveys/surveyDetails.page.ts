import { expect, Locator, test } from "@playwright/test";
import { ClickOptions } from "@typedefs/playwright/actions.typedefs";
import { ClickOpenable } from "@typedefs/ui/components.typedefs";
import { Url, QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { BaseDialog } from "@ui/components/dialogs/baseDialog";
import { Chapter } from "@ui/components/questions/chapter";
import { QuestionTypeList, QuestionBankDialog } from "@ui/components/questions/create-question-dialog";
import {
	AutoCompleteListQuestion,
	NumericQuestion,
	Question,
	SingleChoiceQuestion
} from "@ui/components/questions/designQuestions/question";
import { SidePanel } from "@ui/components/surveys/sidePanel";
import { UUID } from "node:crypto";
import { surveysUrl } from "src/constants/urls/apiUrls";
import { surveyUrl } from "src/constants/urls/uiUrls";
import { BaseDetailsPage } from "../baseDetails.page";

export class SurveyDetailsPage extends BaseDetailsPage {
	url = surveyUrl.surveysDetails;

	private _chapterNumber: number = 0;
	readonly pageContentHeader: Locator = this.page.locator(".page-content-header");
	readonly chaptersContainers: Locator = this.page.locator(".chapter-container");
	readonly surveyName: Locator = this.pageContentHeader.locator(".title");
	readonly questions: Locator = this.page.locator(".question-editor");
	readonly chapterFooter: Locator = this.page.locator(".container-footer");
	readonly addQuestionBtn: Locator = this.chapterFooter.locator(".question-btn");

	readonly dialog: BaseDialog = new BaseDialog(this.page);
	readonly questionTypeListDialog: QuestionTypeList = new QuestionTypeList(this.page);
	readonly questionBankDialog: QuestionBankDialog = new QuestionBankDialog(this.page);

	protected readonly sidePanel: SidePanel = new SidePanel(this.page);

	get chaptersCount(): number {
		return this._chapterNumber + 1;
	}

	get lastChapterName(): string {
		return `Chapter #${this._chapterNumber}`;
	}

	get addNewPopup() {
		const popup = this.page.locator(".k-menu-popup:visible");
		const buttons = popup.locator(".k-item");
		const addQuestionBtn = buttons.filter({hasText: "Add question"});
		const addChapterBtn = buttons.filter({hasText: "Add chapter", hasNotText: "Add chapter from Qbank"});
		const addChapterFromQbankBtn = buttons.filter({hasText: "Add chapter from Qbank"}).first();
		const clickAddChapterBtn = async (options?: ClickOptions) => {
			this._chapterNumber++;
			return await addChapterBtn.click(options);
		};

		return {
			popup,
			addQuestionBtn,
			addChapterBtn,
			addChapterFromQbankBtn,
			clickAddChapterBtn,
		};
	}

	getChapter(chapterName?: string): Chapter {
		if (!chapterName) {
			return new Chapter(this.chaptersContainers.first());
		}

		return new Chapter(this.chaptersContainers.filter({hasText: chapterName}));
	}

	getChapterById(id: UUID): Chapter {
		return new Chapter(this.chaptersContainers.filter({has: this.page.locator(`#${id}`)}));
	}

	async addQuestion(questionType: QuestionType): Promise<Question> {
		return test.step(`Add question ${questionType}`, async () => {
			const sidePanel = await this.clickSidePanelBtn();
			await sidePanel.getChapter().clickAddNewBtn()
				.then(menu => menu.clickActionBtn("addQuestionOption"));
			const {id} = await this.questionTypeListDialog.selectQuestionType(QuestionType.RadioButton);

			return this.getQuestionById(id, questionType);
		});
	}

	private getQuestion(locator: Locator, questionType: QuestionType): Question {
		switch (questionType) {
			case QuestionType.Numeric:
				return new NumericQuestion(locator);
			case QuestionType.RadioButton:
			case QuestionType.HighlightBorders:
				return new SingleChoiceQuestion(locator, questionType);
			case QuestionType.AutocompleteList:
				return new AutoCompleteListQuestion(locator, questionType);
			default:
				return new Question(locator, questionType);
		}
	}

	getQuestionById(questionId: UUID, questionType: QuestionType): Question {
		return this.getQuestion(
			this.page.locator(`[data-question-id="${questionId}"]`),
			questionType,
		);
	}

	async getQuestionByText(
		text: string,
		questionType: QuestionType,
	): Promise<Question> {
		return this.getQuestion(
			this.questions.filter({has: this.page.locator(`[value="${text}"]`)}),
			questionType,
		);
	}

	getFirstQuestion(
		questionType: QuestionType,
	): Question {
		return this.getQuestion(
			this.questions.filter({hasText: questionType}).first(),
			questionType,
		);
	}


	async waitForOpened({waitForResponse}: Url = {}): Promise<void> {
		await super.waitForOpened();

		waitForResponse &&
		await this.page.waitForResponse(new RegExp(surveysUrl.details));
	}

	async clickAddQuestionBtn(index: number = 0): Promise<void> {
		await test.step(`Click [Add question] btn`, async () => {
			await this.addQuestionBtn.nth(index).click();
		});
	}

	async clickSidePanelBtn(options?: ClickOpenable): Promise<SidePanel> {
		const {shouldOpen = true} = options || {};
		return test.step("Open side panel", async () => {
			if (await this.sidePanel.isVisible(!shouldOpen)) {
				await this.sidePanel.sidePanelBtn.click();
			}
			return this.sidePanel;
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

			await Promise.all([
				question.clickDeleteQuestion(),
				this.dialog.waitForDialogVisible(),
			]);

			await this.dialog.assertDialogHeaderIsCorrect("Delete Question");
			await this.dialog.clickSubmitBtn({waitForResponse: true});
		});
	}

	async assertSurveyNameCorrect(name: string): Promise<void> {
		await test.step(`Assert survey name is correct`, async () => {
			await expect(this.surveyName).toHaveText(name);
		});
	}

	async assertChaptersCount(count: number): Promise<void> {
		await test.step("Assert chapters count on survey page", async () => {
			await expect(this.chaptersContainers).toHaveCount(count);
		});
	}
}
