import { setIdOnUrl, getIdFromString } from "@helpers/url.helpers";
import { test } from "@playwright/test";
import { FoldersBreadCrumbs } from "@ui/components/breadCrumbs";
import { UUID } from "node:crypto";
import { LoggedInBasePage } from "./loggedIn.base.page";

export abstract class BaseDetailsPage extends LoggedInBasePage {
	public pageId: string | number;
	readonly breadCrumbs = new FoldersBreadCrumbs(this.page.locator(".breadcrumbs-wrapper"));

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

	async getIdFromPageUrl(): Promise<UUID> {
		return getIdFromString(this.page.url()) as UUID;
	}

	async clickMainFolderInBreadCrumbs(): Promise<void> {
		await test.step("Click All in folder breadcrumbs", async () => {
			await this.breadCrumbs.clickOnBaseItem();
		});
	}
}
