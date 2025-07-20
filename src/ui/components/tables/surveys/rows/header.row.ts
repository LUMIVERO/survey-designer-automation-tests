import { Locator } from "@playwright/test";
import { BaseItemRow } from "@ui/components/tables/surveys/rows/baseItem.row";

export class HeaderRow extends BaseItemRow {
	readonly timestamp: Locator = this.rowContainer.locator(".updated");
	readonly nameSort: Locator = this.name.locator(".sort-trigger");
	readonly timestampSort: Locator = this.timestamp.locator(".sort-trigger");
	readonly commentsSort: Locator = this.comments.locator(".sort-trigger");
}