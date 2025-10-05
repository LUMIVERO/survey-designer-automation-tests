import { isTimeWithinTolerance } from "@helpers/dateTime.helpers";
import { expect, test, Locator, Page } from "@playwright/test";
import { AssertIsVisible } from "@typedefs/playwright/expect.typedefs";
import { Exact } from "@typedefs/playwright/service.typedefs";
import { DashboardItemActionMenu } from "@ui/components/actions/surveysDashboard/dashboardItemActionMenu";
import { BaseItemRow } from "@ui/components/tables/surveys/rows/baseItem.row";
import { parse } from "date-fns";
import { dateTimeFormat } from "src/constants/dateTime.data";
import { WaitForResponse } from "@typedefs/ui/components.typedefs";


export class ItemRow<TMenu extends DashboardItemActionMenu = DashboardItemActionMenu> extends BaseItemRow {
	readonly actionsMenuBtn: Locator = this.rowContainer.locator(".actions-menu button");

	protected actionsMenu: TMenu;

	constructor(
		container: Locator,
		MenuClass: new (page: Page) => TMenu = DashboardItemActionMenu as any,
	) {
		super(container);
		this.actionsMenu = new MenuClass(this.page);
	}

	protected static getRowLocator(page: Page, { name, selector, ...options }: Exact & {
		selector: string,
		name: string
	}): Locator {
		return page.locator(selector).filter({
			has: page.getByTitle(name, options),
		});
	}


	async getName(): Promise<string> {
		return await this.name.getAttribute("title");
	}

	async clickActionMenuBtn(): Promise<TMenu> {
		await test.step("Click action menu button", async () => {
			await expect(async () => {
				await this.actionsMenuBtn.click();
				await this.page.waitForTimeout(500);
				await this.actionsMenu.assertIsVisible();
			}).toPass();
		});

		return this.actionsMenu;
	}

	async renameItem(name: string, options?: WaitForResponse): Promise<void> {
		await test.step("Rename item", async () => {
			await expect(async () => {
				await this.nameInput.click();
				await expect(this.name.locator("span")).toHaveClass(/k-focus/);
			}).toPass();

			await this.nameInput.fill(name);
			await this.page.waitForTimeout(500);
			await Promise.all([
				this.nameInput.press("Enter"),
				options?.waitForResponse && await this.page.waitForResponse(
					options?.callback ?? ((response) => response.request().method() === "PUT")
				)
			].filter(Boolean));
		});
	}

	async assertActionMenuBtnIsVisible(options?: AssertIsVisible): Promise<void> {
		await test.step("Assert action menu is not visible", async () => {
			await expect(this.actionsMenuBtn).toBeVisible(options);
		});
	}

	async assertItemNameCorrect(name: string): Promise<void> {
		await test.step(`Assert item name is correct`, async () => {
			expect(await this.getName()).toEqual(name);
		});
	}

	async assertCommentCount(commentCount: number): Promise<void> {
		await test.step("Assert survey's or folder's comment count equals passed count", async () => {
			await expect(this.comments).toHaveText(commentCount.toString());
		});
	}

	async assertItemUpdatedAt(date: Date = new Date()): Promise<void> {
		await test.step("Assert item's updatedAt date equals passed date", async () => {
			const actualDate = parse(
				await this.timestamp.textContent(),
				dateTimeFormat,
				new Date(),
			);

			expect(isTimeWithinTolerance(
				actualDate, date, 5,
			), `Assert time on the page ${actualDate.toLocaleTimeString()} equals real action date ${date.toLocaleTimeString()}`).toBeTruthy();
		});
	}
}
