import { getAnswerType } from "@helpers/survey.helpers";
import { Locator, Page, expect, test } from "@playwright/test";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { ActionMenuPopup } from "@ui/components/actionPopup";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";

export class Question {
	readonly page: Page;
	readonly AnswerType: new (container: Locator) => BaseAnswer;
	readonly questionVariable: Locator = this.container.locator(".question-editor-header .var-name");
	readonly questionTypeText: Locator = this.container.getByTitle("Question type");
	readonly questionTextArea: Locator = this.container.locator(".question-text");
	readonly addAnswerBtn: Locator = this.container.locator(".answers .button");
	readonly saveToQBankBtn: Locator = this.container.locator(".actions input");
	readonly commentsBtn: Locator = this.container.locator(".comments button");
	readonly commentsCount: Locator = this.container.locator(".comments-count");
	readonly instructionBnt: Locator = this.container.getByTitle("Instructions");
	readonly actionsBtn: Locator = this.container.locator(".question-editor-header button");
	readonly answers: Locator = this.container.locator(".answer-item");
	readonly actionMenu: ActionMenuPopup;

	constructor(
		readonly container: Locator,
		readonly questionType: QuestionType
	) {
		this.page = container.page();
		this.AnswerType = getAnswerType(questionType);
		this.actionMenu = new ActionMenuPopup(this.page);
	}

	getAnswerByText(text: string): BaseAnswer {
		return new this.AnswerType(
			this.answers.filter({ has: this.page.locator(`[value="${text}"]`) })
		);
	}

	getFirstAnswer(): BaseAnswer {
		return new this.AnswerType(this.answers.first());
	}

	async getQuestionText(): Promise<string> {
		return await this.questionTextArea.innerText();
	}

	async getQuestionVariableText(): Promise<string> {
		return await this.questionVariable.innerText();
	}

	async clickDeleteQuestion(): Promise<void> {
		await test.step("Delete question", async () => {
			await this.actionsBtn.click();
			await this.actionMenu.clickDeleteBtn();
		});
	}

	async hoverQuestion(): Promise<void> {
		await test.step("Hover question", async () => {
			await this.container.hover();
		});
	}

	async assertInstructionIconToBeVisible(): Promise<void> {
		await test.step(`Assert instruction icon is visible`, async () => {
			await expect(this.instructionBnt).toBeVisible();
		});
	}

	async assertQuestionType(questionType: QuestionType): Promise<void> {
		await test.step(`Assert question type is "${questionType}"`, async () => {
			expect(await this.questionTypeText.innerText()).toEqual(questionType);
		});
	}

	async assertQuestionText(text: string = "Question #1?"): Promise<void> {
		await test.step(`Assert question text is "${text}"`, async () => {
			expect(await this.getQuestionText()).toEqual(text);
		});
	}

	async assertQuestionVariableText(text: string = "Q_1") {
		await test.step(`Assert question variable text is "${text}"`, async () => {
			expect(await this.getQuestionVariableText()).toEqual(text);
		});
	}

	async assertCommentsCount(commentsCount?: number): Promise<void> {
		await test.step(`Assert comments count is ${commentsCount}`, async () => {
			if (commentsCount) {
				await expect(this.commentsCount).toHaveText(`${commentsCount}`);
			} else {
				await expect(this.commentsCount).toBeHidden();
			}
		});
	}

	async assertIsVisible(visible: boolean = true): Promise<void> {
		await test.step(`Assert question visibility is "${visible ? "visible" : "hidden"}"`, async () => {
			await expect(this.container).toBeVisible({ visible });
		});
	}

	async assertSaveToQBankIsVisible(visible: boolean = true): Promise<void> {
		await test.step(`Assert save to QBank button is ${visible ? "visible" : "hidden"}`, async () => {
			await expect(this.saveToQBankBtn).toBeVisible({ visible });
		});
	}
}