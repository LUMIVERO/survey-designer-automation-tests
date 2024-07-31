import { Locator } from "@playwright/test";

export abstract class BaseGridRow { // TODO: Add implementation for GridRow
	constructor(readonly container: Locator) {
	}
}

export class HeadGridRow extends BaseGridRow { // TODO: Add implementation for GridRow
}

export class GridRow extends BaseGridRow { // TODO: Add implementation for GridRow
	readonly topic: Locator = this.container.locator(".topic-item");
	readonly topicVariable: Locator = this.topic.locator(".var-name input");
	readonly topicText: Locator = this.topic.locator(".");
	readonly options: Locator = this.container.locator("td>input");
}