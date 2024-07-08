import { test } from "@fixtures/testScope.fixture";
import { getRandomName } from "@helpers/random.helpers";
import { SurveyResponse } from "@typedefs/api/survey.typedefs";
import { SurveyRow } from "@ui/components/tables/surveys/surveysRows";

test.describe("Surveys list", async () => {
	let surveyId: string;

	test.beforeEach(async ({ adminAPP }) => {
		await adminAPP.surveysPage.visit();
	});

	test.afterEach(async ({ apiService }) => {
		await apiService.survey.deleteSurvey({ surveyId });
	});

	test("User is able to create survey in the root folder", async ({ adminAPP }) => {
		const surveyName: string = getRandomName("SurveyAUT");

		await adminAPP.surveysPage.clickCreateSurveyBtn();
		await adminAPP.surveysPage.popupWithInput.fillItemName(surveyName);
		await adminAPP.surveysPage.popupWithInput.clickSubmitBtn();
		const surveyCreationTime = new Date;
		await adminAPP.surveysPage.popupWithInput.waitForPopupHidden();
		await adminAPP.surveyDetailsPage.waitForOpened();
		surveyId = await adminAPP.surveyDetailsPage.getIdFromPageUrl();

		await adminAPP.surveyDetailsPage.assertSurveyNameCorrect(surveyName);
		await adminAPP.surveyDetailsPage.clickMainFolderInBreadCrumbs();

		await adminAPP.surveysPage.waitForOpened();
		await adminAPP.surveysPage.surveysTable.assertSurveyInList(surveyName);
		const surveyRow = await adminAPP.surveysPage.surveysTable.getRowByName(surveyName);
		await surveyRow.assertSurveyCreatedAt(surveyCreationTime);
		await surveyRow.assertCommentCount(0);
		await surveyRow.assertSurveyUpdatedAt(surveyCreationTime);
	});

	test.describe("Edit survey's name and duplicate the survey", async () => {
		let survey: SurveyResponse;
		let surveyRow: SurveyRow;

		test.beforeEach(async ({ apiService, adminAPP }) => {
			const { items: [{ id: folderId }] } = await apiService.folder.getFolders();
			const name: string = getRandomName("SurveyAUT");
			survey = await apiService.survey.createSurvey({
				name, folderId
			});

			surveyId = survey.id;
			surveyRow = await adminAPP.surveysPage.surveysTable.getRowByName(survey.name);
		});

		test("User is able to edit survey's name", async ({ adminAPP }) => {
			await adminAPP.surveysPage.waitForFoldersResponse();
			const { name } = survey;
			await surveyRow.assertSurveyNameCorrect(name);
			const newSurveyName: string = "Renamed-" + name;
			await surveyRow.renameSurvey(newSurveyName);
			const surveyUpdatedDate = new Date();
			await surveyRow.assertSurveyNameCorrect(newSurveyName);
			await surveyRow.assertSurveyUpdatedAt(surveyUpdatedDate);
		});

		test("User is able to duplicate the survey", async ({ adminAPP, apiService }) => {
			const { name } = survey;
			const duplicatedSurveyName: string = name + "_copy";

			await surveyRow.assertSurveyNameCorrect(name);
			await adminAPP.surveysPage.duplicateSurvey({ surveyName: name });

			await adminAPP.surveyDetailsPage.waitForOpened();
			const duplicatedSurveyId = await adminAPP.surveyDetailsPage.getIdFromPageUrl();
			await adminAPP.surveyDetailsPage.assertSurveyNameCorrect(duplicatedSurveyName);
			await adminAPP.surveyDetailsPage.clickMainFolderInBreadCrumbs();

			await adminAPP.surveysPage.waitForOpened();
			await adminAPP.surveysPage.surveysTable.assertSurveyInList(duplicatedSurveyName);
			await adminAPP.surveysPage.surveysTable.assertSurveyInList(name, { exact: true });

			await apiService.survey.deleteSurvey({ surveyId: duplicatedSurveyId });
		});
	});
});
