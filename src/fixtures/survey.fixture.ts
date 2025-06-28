import { getRandomName } from "@helpers/random.helpers";
import { SurveyResponse } from "@typedefs/api/survey.typedefs";
import { test as base } from "./folder.fixture";

export const test = base.extend<{
	survey: SurveyResponse;
}>({
	survey: async ({ apiService, rootFolder }, use) => {
		const name: string = getRandomName("SurveyAUT");
		const survey = await apiService.survey.createSurvey({
			name, folderId: rootFolder.id,
		});

		await use(survey);
		await apiService.survey.deleteSurvey({ surveyId: survey.id });
	},
});