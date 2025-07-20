import { Page, Locator } from "@playwright/test";
import { BaseContainer } from "@ui/components/baseComponent";

export class QuestionTypePreview extends BaseContainer {
	readonly title: Locator = this.container.locator(".question-preview-title");
	readonly description: Locator = this.container.locator(".question-preview-description");

	constructor(page: Page) {
		super(page.locator(".question-preview"));
	}
}