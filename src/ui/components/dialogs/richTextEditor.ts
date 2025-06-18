import { test } from "@playwright/test";
import { BaseDialog } from "@ui/components/dialogs/baseDialog";

export class RichTextEditor extends BaseDialog {
	readonly input = this.container.getByRole("textbox");
	protected submitBtn = this.container.locator(".qdt-btn-primary");
	private readonly toolbar = this.container.locator(".k-editor-toolbar");

	async fill(text: string): Promise<void> {
		await test.step("Fill tex in textbox", async () => {
			await this.input.fill(text);
			await this.page.waitForTimeout(500);
		});
	}
}