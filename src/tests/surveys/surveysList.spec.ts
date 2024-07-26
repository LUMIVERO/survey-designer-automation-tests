import { test } from "@fixtures/testScope.fixture";
import { getRandomName } from "@helpers/random.helpers";
import { SurveyResponse } from "@typedefs/api/survey.typedefs";
import { ItemRow } from "@ui/components/tables/surveys/itemRows";

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
		await adminAPP.surveysPage.dialogWithInput.fillItemName(surveyName);
		await adminAPP.surveysPage.dialogWithInput.clickSubmitBtn();
		const surveyCreationTime = new Date();
		await adminAPP.surveysPage.dialogWithInput.waitForDialogHidden();
		await adminAPP.surveyDetailsPage.waitForOpened();
		surveyId = await adminAPP.surveyDetailsPage.getIdFromPageUrl();

		await adminAPP.surveyDetailsPage.assertSurveyNameCorrect(surveyName);
		await adminAPP.surveyDetailsPage.clickMainFolderInBreadCrumbs();

		await adminAPP.surveysPage.waitForOpened();
		await adminAPP.surveysPage.surveysTable.assertItemInList(surveyName);
		const surveyRow = await adminAPP.surveysPage.surveysTable.getRowByName(surveyName);
		await surveyRow.assertSurveyCreatedAt(surveyCreationTime);
		await surveyRow.assertCommentCount(0);
		await surveyRow.assertItemUpdatedAt(surveyCreationTime);
	});

	test.describe("Edit survey's name and duplicate the survey", async () => {
		let survey: SurveyResponse;
		let surveyRow: ItemRow;

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
			await surveyRow.assertItemNameCorrect(name);
			const newSurveyName: string = "Renamed-" + name;
			await surveyRow.renameItem(newSurveyName);
			const surveyUpdatedDate = new Date();
			await surveyRow.assertItemNameCorrect(newSurveyName);
			await surveyRow.assertItemUpdatedAt(surveyUpdatedDate);
		});

		test("User is able to duplicate the survey", async ({ adminAPP, apiService }) => {
			const { name } = survey;
			const duplicatedSurveyName: string = name + "_copy";

			await surveyRow.assertItemNameCorrect(name);
			await adminAPP.surveysPage.duplicateSurvey({ surveyName: name });

			await adminAPP.surveyDetailsPage.waitForOpened();
			const duplicatedSurveyId = await adminAPP.surveyDetailsPage.getIdFromPageUrl();
			await adminAPP.surveyDetailsPage.assertSurveyNameCorrect(duplicatedSurveyName);
			const waitForSurveysPageOpened = adminAPP.surveysPage.waitForOpened({ waitForResponse: true });
			await adminAPP.surveyDetailsPage.clickMainFolderInBreadCrumbs();
			await waitForSurveysPageOpened;
			await adminAPP.surveysPage.surveysTable.assertItemInList(duplicatedSurveyName);
			await adminAPP.surveysPage.surveysTable.assertItemInList(name, { exact: true });

			await apiService.survey.deleteSurvey({ surveyId: duplicatedSurveyId });
		});
	});
});
