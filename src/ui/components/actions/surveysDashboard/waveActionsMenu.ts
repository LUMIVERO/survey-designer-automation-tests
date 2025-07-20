import { DashboardItemActionMenu } from "@ui/components/actions/surveysDashboard/dashboardItemActionMenu";
import { foldersUrl } from "src/constants/urls/apiUrls";

export class WaveActionsMenu extends DashboardItemActionMenu {

	async clickDeleteButton(): Promise<void> {
		await Promise.all([
			super.clickDeleteButton(),
			this.page.waitForResponse((response) => {
				return response.request().method() === "DELETE"
					&& new RegExp(foldersUrl.details).test(response.url());
			})
		])
	}
}