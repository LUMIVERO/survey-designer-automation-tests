import { test } from "@fixtures/testScope.fixture";
import { getRandomName } from "@helpers/random.helpers";
import { ItemRow } from "@ui/components/tables/surveys/itemRows";

test.describe("Surveys list", async () => {

	test.beforeEach(async ({ adminAPP }) => {
		await adminAPP.surveysPage.visit();
	});

	test("User is able to create survey in the root folder and open it",
		{ tag: ["@smoke", "@[48444]"] },
		async ({ adminAPP, apiService }) => {
			const surveyName: string = getRandomName("SurveyAUT");

			await adminAPP.surveysPage.clickCreateSurveyBtn();
			await adminAPP.surveysPage.dialogWithInput.fillItemName(surveyName);
			await adminAPP.surveysPage.dialogWithInput.clickSubmitBtn();
			const surveyCreationTime = new Date();
			await adminAPP.surveysPage.dialogWithInput.waitForDialogHidden();
			await adminAPP.surveyDetailsPage.waitForOpened();
			const surveyId = await adminAPP.surveyDetailsPage.getIdFromPageUrl();

			await adminAPP.surveyDetailsPage.assertSurveyNameCorrect(surveyName);
			await adminAPP.surveyDetailsPage.clickMainFolderInBreadCrumbs();

			await adminAPP.surveysPage.waitForOpened();
			await adminAPP.surveysPage.surveysTable.assertItemInList(surveyName);
			const surveyRow = await adminAPP.surveysPage.surveysTable.getRowByName(surveyName);
			await surveyRow.assertSurveyCreatedAt(surveyCreationTime);
			await surveyRow.assertCommentCount(0);
			await surveyRow.assertItemUpdatedAt(surveyCreationTime);
			await apiService.survey.deleteSurvey({ surveyId });
		});

	test.describe("Edit survey's name and duplicate the survey", async () => {
		let surveyRow: ItemRow;

		test.beforeEach(async ({ adminAPP, survey }) => {
			surveyRow = await adminAPP.surveysPage.surveysTable.getRowByName(survey.name);
		});

		test("[49508] User can rename survey", async ({ adminAPP, survey }) => {
			await adminAPP.surveysPage.waitForFoldersResponse();
			const { name } = survey;
			await surveyRow.assertItemNameCorrect(name);
			const newSurveyName: string = "Renamed-" + name;
			await surveyRow.renameItem(newSurveyName);
			const surveyUpdatedDate = new Date();
			await surveyRow.assertItemNameCorrect(newSurveyName);
			await surveyRow.assertItemUpdatedAt(surveyUpdatedDate);
		});

		test.only("[48447] User is able to duplicate the survey", async ({ adminAPP, apiService, survey }) => {
			const { name } = survey;
			const duplicatedSurveyName: string = name + "_copy";

			await surveyRow.assertItemNameCorrect(name);
			await adminAPP.surveysPage.duplicateSurvey({ surveyName: name });
			await adminAPP.surveyDetailsPage.waitForOpened();
			const duplicatedSurveyId = await adminAPP.surveyDetailsPage.getIdFromPageUrl();

			try {
				await adminAPP.surveyDetailsPage.assertSurveyNameCorrect(duplicatedSurveyName);

				await adminAPP.surveyDetailsPage.clickMainFolderInBreadCrumbs();
				await adminAPP.surveysPage.waitForOpened();

				await adminAPP.surveysPage.reload(); //TODO: remove when surveys list update is fixed

				await adminAPP.surveysPage.surveysTable.assertItemInList(name, { exact: true });
				await adminAPP.surveysPage.surveysTable.assertItemInList(duplicatedSurveyName);
			} catch (e) {
				throw e;
			} finally {
				await apiService.survey.deleteSurvey({ surveyId: duplicatedSurveyId });
			}

		});
	});
});
