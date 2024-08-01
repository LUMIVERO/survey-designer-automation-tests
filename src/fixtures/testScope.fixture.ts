import { getRandomName } from "@helpers/random.helpers";
import { FolderResponse } from "@typedefs/api/folder.typedefs";
import { SurveyResponse } from "@typedefs/api/survey.typedefs";
import { Application } from "@ui/application";
import { test as base } from "./workerScope.fixture";

export const test = base.extend<{
	adminAPP: Application;
	survey: SurveyResponse;
	rootFolder: FolderResponse;
}>({
	adminAPP: async ({ adminContext }, use) => {
		const page = await adminContext.newPage();
		const adminAPP = new Application(page);
		await use(adminAPP);
		await page.close();
	},
	rootFolder: async ({ apiService }, use) => {
		const { items: [folder] } = await apiService.folder.getFolders();
		await use(folder);
	},
	survey: async ({ apiService, rootFolder }, use) => {
		const name: string = getRandomName("SurveyAUT");
		const survey = await apiService.survey.createSurvey({
			name, folderId: rootFolder.id
		});

		await use(survey);
		await apiService.survey.deleteSurvey({ surveyId: survey.id });
	}
});