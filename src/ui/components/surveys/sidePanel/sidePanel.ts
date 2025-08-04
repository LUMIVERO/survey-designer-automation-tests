import { Locator, test, expect } from "@playwright/test";
import { BaseComponent } from "@ui/components/baseComponent";
import { SidePanelChapter } from "@ui/components/surveys/sidePanel/items/sidePanelChapter";
import { SidePanelQuestion } from "@ui/components/surveys/sidePanel/items/sidePanelQuestion";
import { boolean } from "casual";

export class SidePanel extends BaseComponent {
	protected container: Locator = this.page.locator(".sidebar");
	readonly sidePanelBtn: Locator = this.container.locator(".expander-button");
	readonly chapters: Locator = this.container.locator("[data-node-type=\"parent\"]");
	readonly rootChapter: Locator = this.container.locator(".root-node");
	readonly questions: Locator = this.container.locator("[data-node-type=\"leaf\"]");

	async isVisible(visible = true): Promise<boolean> {
		return this.container.getAttribute("class")
			.then((classString) => classString.split(" ").includes(visible ? "expanded" : "collapsed"));
	}

	getChapter(name?: string): SidePanelChapter {
		if (!name) {
			return new SidePanelChapter(this.rootChapter);
		}
		return new SidePanelChapter(this.chapters.filter({ hasText: name }));
	}

	getQuestion(name?: string): SidePanelQuestion {
		if (!name) {
			return new SidePanelQuestion(this.questions.first());
		}

		return new SidePanelQuestion(this.questions.filter({ hasText: name }));
	}

	async assertSidePanelIsVisible({ visible = true } = { visible: boolean }): Promise<void> {
		await test.step(`Assert side panel is ${visible ? "" : "not "}visible`, async () => {
			await this.container.waitFor({ timeout: 100 });
			await expect(this.container).toHaveClass(visible ? /expanded/ : /collapsed/);
		});
	}

	async assertChaptersCount(count: number): Promise<void> {
		await test.step("Assert side panel chapters count", async () => {
			await expect(this.chapters).toHaveCount(count);
		});
	}
}
