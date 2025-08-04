import { getAnswerType } from "@helpers/survey.helpers";
import { Locator, Page, expect, test } from "@playwright/test";
import { AddGridAnswerOptions, AddGridTopicOptions } from "@typedefs/ui/answer.typedefs";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { ChapterActionMenu } from "@ui/components/actions/actionPopup";
import { AddNewGridItemActionMenu } from "@ui/components/actions/addNewGridItemActionMenu";
import { InputWithPlaceholder } from "@ui/components/inputs";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";
import { InstructionsBox } from "@ui/components/questions/instructions";

export class Question {
	readonly page: Page;
	private _questionLocator: string = ".question-editor";
	readonly AnswerType: new (container: Locator) => BaseAnswer;
	readonly questionVariable: Locator = this.container.locator(".question-editor-header .var-name[title]");
	readonly questionTypeText: Locator = this.container.getByTitle("Question type");
	readonly questionTextArea: Locator = this.container.locator(".question-text");
	readonly saveToQBankBtn: Locator = this.container.locator(".actions input");
	readonly commentsBtn: Locator = this.container.locator(".comments button");
	readonly commentsCount: Locator = this.container.locator(".comments-count");
	readonly instructionBtn: Locator = this.container.getByTitle("Instructions");
	readonly instructionIndicator: Locator = this.instructionBtn.locator(".insturtions-inidicator");
	readonly actionsBtn: Locator = this.container.locator(".actions-btn button");
	readonly answers: Locator = this.container.locator(".answer-item");
	readonly addNewAnswerBtn: Locator = this.container.locator(".add-answer-btn button");
	readonly addNewTopicBtn?: Locator = this.container.locator(".add-topic-btn button");
	readonly actionMenu: ChapterActionMenu;
	readonly addNewGridItemActionMenu: AddNewGridItemActionMenu;
	readonly instructionsBox: InstructionsBox;

	constructor(
		readonly container: Locator,
		readonly questionType: QuestionType
	) {
		this.page = container.page();
		this.AnswerType = getAnswerType(questionType);
		this.actionMenu = new ChapterActionMenu(this.page);
		this.instructionsBox = new InstructionsBox(this.page);
		this.addNewGridItemActionMenu = new AddNewGridItemActionMenu(this.page);
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

	async clickInstructionBtn(): Promise<void> {
		await test.step("Click [Instructions] btn", async () => {
			await this.instructionBtn.click();
		});
	}

	async hoverQuestion(): Promise<void> {
		await test.step("Hover question", async () => {
			await this.container.hover();
		});
	}

	async assertInstructionIconToBeVisible(): Promise<void> {
		await test.step(`Assert instruction icon is visible`, async () => {
			await expect(this.instructionBtn).toBeVisible();
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

	async assertInstructionIndicatorIsVisible(visible: boolean = true): Promise<void> {
		await test.step(`Assert Instruction indicator is ${visible ? "visible" : "hidden"}`, async () => {
			await expect(this.instructionIndicator).toBeVisible({ visible });
		});
	}

	async editQuestionText(text: string): Promise<Question> {
		return await test.step("Edit Question text", async () => {
			const input = new InputWithPlaceholder(this.questionTextArea, "Click to write the question text");
			await input.fill(text);

			return new Question(this.page.locator(this._questionLocator, { hasText: text }), this.questionType);
		});
	}

	async editQuestionVarText(text: string): Promise<Question> {
		return await test.step("Edit Question var text", async () => {
			const input = new InputWithPlaceholder(this.questionVariable, "Question Variable Name");
			await input.fill(text);

			return new Question(this.page.locator(this._questionLocator, { hasText: text }), this.questionType);
		});
	}

	async addNewAnswer(answer: AddGridAnswerOptions): Promise<void> {
		await expect(async () => {
			await this.addNewAnswerBtn.click();
			await this.addNewGridItemActionMenu.assertIsVisible();
		}).toPass();
		await this.addNewGridItemActionMenu.add(answer);
	}

	async addNewTopic(topic: AddGridTopicOptions): Promise<void> {
		await expect(async () => {
			await this.addNewTopicBtn.click();
			await this.addNewGridItemActionMenu.assertIsVisible();
		}).toPass();
		await this.addNewGridItemActionMenu.add(topic);
	}
}