import { Locator, Page, test, expect } from "@playwright/test";
import { AssertIsVisible } from "@typedefs/playwright/expect.typedefs";
import { Input } from "@ui/components/inputs";

export class InstructionsBox {
	protected readonly instructionsContainer: Locator = this.page.locator(".instruction-box");
	readonly closeInstructionsBtn: Locator = this.page.locator(".close");
	readonly surveyorsInstructionsInput: Input = new Input(this.page.getByLabel("Instruction for surveyors"));
	readonly scriptersInstructionsInput: Input = new Input(this.page.getByLabel("Instruction for scripter"));

	constructor(readonly page: Page) {
	}

	async assertInstructionsBoxIsDisplayed(options?: AssertIsVisible): Promise<void> {
		await test.step(`Assert instructions box is visible`, async () => {
			await expect(this.instructionsContainer).toBeVisible(options);
		});
	}

	async closeInstructions(): Promise<void> {
		await test.step("Close instructions", async () => {
			await this.closeInstructionsBtn.click();
			await expect(this.instructionsContainer).toBeHidden();
		});
	}

	async fillSurveyorInstruction(text: string): Promise<void> {
		await test.step("Fill surveyor instruction", async () => {
			await this.surveyorsInstructionsInput.fill(text);
		});
	}

	async deleteSurveyorInstruction(): Promise<void> {
		await test.step("Delete surveyor instruction", async () => {
			await this.surveyorsInstructionsInput.fill("");
		});
	}

	async deleteScripterInstruction(): Promise<void> {
		await test.step("Delete scripter instruction", async () => {
			await this.scriptersInstructionsInput.fill("");
		});
	}

	async fillScripterInstruction(text: string): Promise<void> {
		await test.step("Fill scripter instruction", async () => {
			await this.scriptersInstructionsInput.fill(text);
		});
	}

	async assertInstruction(instructions: "surveyors" | "scripters", text: string): Promise<void> {
		await test.step(`Assert ${instructions} instruction is "${text}"`, async () => {
			await expect(this[`${instructions}InstructionsInput`].locator).toHaveValue(text);
		});
	}

}