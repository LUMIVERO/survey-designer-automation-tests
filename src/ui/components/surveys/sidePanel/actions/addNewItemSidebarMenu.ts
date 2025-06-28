import { Locator, test } from "@playwright/test";
import { Locators } from "@typedefs/common/main.typedefs";
import { ClickOptions } from "@typedefs/playwright/actions.typedefs";
import { WaitForResponse } from "@typedefs/ui/components.typedefs";
import { BaseActionMenuPopup } from "@ui/components/actions/baseActionMenu";
import { chaptersUrl, questionsUrl } from "src/constants/urls/apiUrls";


export class AddNewItemSidebarMenu extends BaseActionMenuPopup {
	readonly addChapterOption: Locator = this.actions.locator(".ti-folder-filled").first();
	readonly addChapterFromQbankOption: Locator = this.actions.locator(".ti-folder-filled").last();
	readonly addQuestionOption: Locator = this.actions.locator(".ti-clipboard-plus");

	async clickActionBtn(option: Locators<AddNewItemSidebarMenu>, options?: ClickOptions & WaitForResponse): Promise<void> {
		await test.step(`Click ${option}`, async () => {
			await Promise.all([
				this[option].click(options),
				options?.waitForResponse && this.page.waitForResponse(options?.callback ?? new RegExp(this.getResponseEndpoint(option))),
			].filter(Boolean));
		});
	}

	private getResponseEndpoint(option: Locators<AddNewItemSidebarMenu>): string {
		switch (option) {
			case "addChapterOption":
				return chaptersUrl.root;
			case "addChapterFromQbankOption":
				return chaptersUrl.qBank;
			case "addQuestionOption":
				return questionsUrl.root;
			default:
				throw new Error("Not valid type of new item");
		}
	}
}
