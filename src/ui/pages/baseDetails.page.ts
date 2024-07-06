import { getIdFromString, setIdOnUrl } from "@helpers/url.helpers";
import { test } from "@playwright/test";
import { LoggedInBasePage } from "./loggedIn.base.page";

export abstract class BaseDetailsPage extends LoggedInBasePage {
	public pageId: string | number;

	setId(pageId: number | string): string {
		this.pageId = `${pageId}`;
		this.url = setIdOnUrl(this.url, pageId);

		return this.url;
	}

	checkId(pageId?: number | string) {

		if (!this.pageId && !pageId) {
			throw new Error("Before visiting the page, you need to set the page id");
		}
		if (pageId) {
			this.setId(pageId);
		}
	}

	async visit(pageId?: number | string) {
		await test.step(`Visit page by id=${pageId}`, async () => {
			this.checkId(pageId);
			await super.visit();
		});
	}

	async getIdFromPageUrl(): Promise<string> {
		return getIdFromString(this.page.url());
	}
}
