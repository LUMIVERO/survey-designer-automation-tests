import { test as teardown } from "@fixtures/workerScope.fixture";
import { deleteFoldersByName, deleteSurveysByName } from "@helpers/survey.helpers";

teardown.describe("Remove data", () => {
	teardown("Remove extra folders", async ({ apiService }) => {
		await deleteFoldersByName(apiService);
	});

	teardown("Remove extra surveys", async ({ apiService }) => {
		await deleteSurveysByName(apiService);
	});
});