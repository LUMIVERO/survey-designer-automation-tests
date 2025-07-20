import { test } from "@fixtures/testScope.fixture";
import { getRandomName } from "@helpers/random.helpers";
import { ItemRow } from "@ui/components/tables/surveys/rows/item.row";
import { UUID } from "node:crypto";
import { getChapterData } from "src/testData/chapter.data";
import { getQuestionData } from "src/testData/question.data";

test.describe("Surveys list @Sdf95633b", async () => {
	let createdSurveys: Array<UUID> = [];

	test.beforeEach(async ({ adminAPP }) => {
		await adminAPP.surveysPage.visit();
	});

	test.afterEach(async ({ apiService }) => {
		await Promise.all(createdSurveys.map(async (surveyId) => await apiService.survey.deleteSurvey({ surveyId })));
		createdSurveys = [];
	});

	test("User is able to create survey in the root folder and open it @smoke @Tc0001b0d",
		async ({ adminAPP }) => {
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
			const surveyRow = await adminAPP.surveysPage.surveysTable.getRowByName(surveyName, { rowType: "survey" });
			await surveyRow.assertSurveyCreatedAt(surveyCreationTime);
			await surveyRow.assertCommentCount(0);
			await surveyRow.assertItemUpdatedAt(surveyCreationTime);
		});

	test("Survey tab | User can delete a survey @T00049673", async ({ adminAPP, apiService, rootFolder }) => {
		const survey = await apiService.survey.createSurvey({
			name: getRandomName("SurveyAUT"),
			folderId: rootFolder.id,
		});
		const [{ id: baseChapterId }] = survey.chapters;
		const {
			id: chapterId,
		} = await apiService.chapter.createChapter(getChapterData(survey.id, baseChapterId));
		const { id: questionId1 } = await apiService.question.createQuestion(getQuestionData(baseChapterId));
		const { id: questionId2 } = await apiService.question.createQuestion(getQuestionData(chapterId));

		await adminAPP.page.reload();
		const surveyRow = await adminAPP.surveysPage.surveysTable.getRowByName(survey.name, { rowType: "survey" });
		await surveyRow.clickActionMenuBtn()
			.then(menu => menu.clickDeleteButton())
			.then(dialog => dialog.clickSubmitBtn());
		await surveyRow.assertIsVisible({ visible: false });

		await apiService.question.assertQuestionDoesNotExist({ questionId: questionId1 });
		await apiService.question.assertQuestionDoesNotExist({ questionId: questionId2 });
		await apiService.chapter.assertChapterDoesNotExist({ chapterId });
	});

	test.describe("Edit survey's name and duplicate the survey", async () => {
		let surveyRow: ItemRow;

		test.beforeEach(async ({ adminAPP, survey }) => {
			surveyRow = await adminAPP.surveysPage.surveysTable.getRowByName(survey.name);
		});

		test("User can rename survey @T9caeaf8a", async ({ adminAPP, survey }) => {
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
		test("User is able to duplicate the survey @Tfdd4a948", async ({ adminAPP, survey }) => {
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
