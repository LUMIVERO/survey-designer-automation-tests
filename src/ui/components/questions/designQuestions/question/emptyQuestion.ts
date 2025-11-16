import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { expect, Locator, Page, test } from "@playwright/test";
import { ChapterActionMenu } from "@ui/components/actions/actionPopup";
import { InstructionsBox } from "@ui/components/questions/instructions";
import { InputWithActiveMode } from "@ui/components/inputs";
import { Constructor } from "@typedefs/common/main.typedefs";

//TODO: check class locators
export class EmptyQuestion {
	protected _questionLocator: string = ".question-editor";
	readonly page: Page;
	readonly actionMenu: ChapterActionMenu;
	readonly instructionsBox: InstructionsBox;

	readonly questionVariable: Locator = this.container.locator(".question-editor-header .var-name[title]");
	readonly questionTypeText: Locator = this.container.getByTitle("Question type");
	readonly questionTextArea: Locator = this.container.locator(".question-text");
	readonly saveToQBankBtn: Locator = this.container.locator(".actions input");
	readonly commentsBtn: Locator = this.container.locator(".comments button");
	readonly commentsCount: Locator = this.container.locator(".comments-count");
	readonly instructionBtn: Locator = this.container.getByTitle("Instructions");
	readonly instructionIndicator: Locator = this.instructionBtn.locator(".insturtions-inidicator");
	readonly actionsBtn: Locator = this.container.locator(".actions-btn button");

	constructor(
		readonly container: Locator,
	) {
		this.page = container.page();
		this.actionMenu = new ChapterActionMenu(this.page);
		this.instructionsBox = new InstructionsBox(this.page);
	}

	async getQuestionText(): Promise<string> {
		return this.questionTextArea.innerText();
	}

	async getQuestionVariableText(): Promise<string> {
		return this.questionVariable.innerText();
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

	async editQuestionText(text: string): Promise<this> {
		return await test.step("Edit Question text", async () => {
			const input = new InputWithActiveMode(this.questionTextArea, "Div edit mode");
			await input.fill(text);

			const ctor = this.constructor as Constructor<this>;
			return new ctor(this.page.locator(this._questionLocator, { hasText: text }));
		});
	}

	async editQuestionVarText(text: string): Promise<this> {
		return await test.step("Edit Question var text", async () => {
			const input = new InputWithActiveMode(this.questionVariable, "Question Variable Name");
			await input.fill(text);

			const ctor = this.constructor as Constructor<this>;
			return new ctor(this.page.locator(this._questionLocator, { hasText: text }));
		});
	}

	async assertQuestionType(questionType: QuestionType): Promise<void> {
		await test.step(`Assert question type is "${questionType}"`, async () => {
			expect(await this.questionTypeText.innerText()).toEqual(questionType);
		});
	}

	async assertInstructionIconToBeVisible(): Promise<void> {
		await test.step(`Assert instruction icon is visible`, async () => {
			await expect(this.instructionBtn).toBeVisible();
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
}