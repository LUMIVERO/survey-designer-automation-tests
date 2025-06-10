import { test } from "@fixtures/testScope.fixture";
import { getRandomName } from "@helpers/random.helpers";
import { ItemRow } from "@ui/components/tables/surveys/itemRows";
import { UUID } from "node:crypto";

test.describe("Surveys list", async () => {
	let createdSurveys: Array<UUID> = [];

	test.beforeEach(async ({ adminAPP }) => {
		await adminAPP.surveysPage.visit();
	});

	test.afterEach(async ({ apiService }) => {
		await Promise.all(createdSurveys.map(async (surveyId) => await apiService.survey.deleteSurvey({ surveyId })));
		createdSurveys = [];
	});

	test("User is able to create survey in the root folder and open it @smoke",
		async ({ adminAPP, apiService }) => {
			const surveyName: string = getRandomName("SurveyAUT");

			await adminAPP.surveysPage.clickCreateSurveyBtn();
			await adminAPP.surveysPage.dialogWithInput.fillItemName(surveyName);
			await adminAPP.surveysPage.dialogWithInput.clickSubmitBtn();
			const surveyCreationTime = new Date();
			await adminAPP.surveyDetailsPage.waitForOpened();
			createdSurveys.push(await adminAPP.surveyDetailsPage.getIdFromPageUrl());

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
		let surveyRow: ItemRow;

		test.beforeEach(async ({ adminAPP, survey }) => {
			surveyRow = await adminAPP.surveysPage.surveysTable.getRowByName(survey.name);
		});

		test("User can rename survey", async ({ adminAPP, survey }) => {
			await adminAPP.surveysPage.waitForFoldersResponse();
			const { name } = survey;
			await surveyRow.assertItemNameCorrect(name);
			const newSurveyName: string = "Renamed-" + name;
			await surveyRow.renameItem(newSurveyName);
			const surveyUpdatedDate = new Date();
			await surveyRow.assertItemNameCorrect(newSurveyName);
			await surveyRow.assertItemUpdatedAt(surveyUpdatedDate);
		});

		//TODO: add questions and chapters to the original survey + assert these items are duplicated with the new survey
		test("User is able to duplicate the survey", async ({ adminAPP, apiService, survey }) => {
			const { name } = survey;
			const duplicatedSurveyName: string = name + "_copy";

			await surveyRow.assertItemNameCorrect(name);
			await adminAPP.surveysPage.duplicateSurvey({ surveyName: name }).then((survey => createdSurveys.push(survey.id)));
			await adminAPP.surveysPage.dialogWithInput.waitForDialogHidden();
			await adminAPP.surveysPage.surveysTable.assertItemInList(name, { exact: true });
			await adminAPP.surveysPage.surveysTable.assertItemInList(duplicatedSurveyName);

			const duplicatedSurveyRow = await adminAPP.surveysPage.surveysTable.getRowByName(duplicatedSurveyName);
			await duplicatedSurveyRow.click();
			await adminAPP.surveyDetailsPage.waitForOpened();

			await adminAPP.surveyDetailsPage.assertSurveyNameCorrect(duplicatedSurveyName);
			await adminAPP.surveyDetailsPage.clickMainFolderInBreadCrumbs();
			await adminAPP.surveysPage.waitForOpened();
		});
	});
});
