import { test } from "@fixtures/testScope.fixture";
import { waitAfterAction } from "@helpers/promise.helpers";
import { getRandomName } from "@helpers/random.helpers";
import { expect } from "@playwright/test";
import { QuestionResponse } from "@typedefs/api/question.typedefs";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { SidePanel } from "@ui/components/surveys/sidePanel";
import { SurveyDetailsPage } from "@ui/pages/surveys/surveyDetails.page";
import { questionsUrl } from "src/constants/urls/apiUrls";

test.describe("Create chapter", async () => {
	let surveyDetailsPage: SurveyDetailsPage;
	let sidePanel: SidePanel;

	test.beforeEach(async ({ adminAPP, survey }) => {
		surveyDetailsPage = adminAPP.surveyDetailsPage;
		sidePanel = surveyDetailsPage.sidePanel;

		await surveyDetailsPage.visit(survey.id);
		await surveyDetailsPage.waitForOpened();
	});

	test.only("[48449, 48882, 49071] User can create, rename and delete a chapter", async ({ adminAPP, apiService }) => {
		await surveyDetailsPage.clickSidePanelBtn();
		await sidePanel.getChapter().clickAddNewBtn();
		const { clickAddChapterBtn, addQuestionBtn } = surveyDetailsPage.addNewPopup;
		await clickAddChapterBtn();
		await surveyDetailsPage.clickSidePanelBtn();


		await expect(async () => {
			expect(await surveyDetailsPage.chaptersContainers.count()).toEqual(surveyDetailsPage.chaptersCount);
		}).toPass({ timeout: 2000 });
		let chapter = surveyDetailsPage.getChapter(surveyDetailsPage.lastChapterName);
		await chapter.assertChapterIsVisible();

		const newChapterName = getRandomName("ChapterAUT");
		chapter = await chapter.renameChapter(newChapterName);
		await chapter.assertChapterIsVisible();

		await surveyDetailsPage.clickSidePanelBtn();
		await sidePanel.getChapter(newChapterName).clickAddNewBtn();
		await addQuestionBtn.click();

		const [, resp] = await waitAfterAction(
			async () => await adminAPP.surveyDetailsPage.clickQuestionTypeButton(QuestionType.RadioButton),
			async () => await adminAPP.page.waitForResponse(new RegExp(questionsUrl.questions))
		);

		const { id: questionId } = await resp.json() as QuestionResponse;
		const question = adminAPP.surveyDetailsPage.getFirstQuestion(QuestionType.RadioButton);
		await question.assertIsVisible();
		await surveyDetailsPage.clickSidePanelBtn();

		await chapter.clickTreeDotsBtn();
		await chapter.actionsMenu.waitFor();
		await chapter.actionsMenu.clickDeleteBtn();
		await surveyDetailsPage.dialog.waitForDialogVisible();
		await surveyDetailsPage.dialog.clickSubmitBtn();
		await surveyDetailsPage.dialog.waitForDialogHidden();
		await chapter.assertChapterIsVisible({ visible: false });
		await question.assertIsVisible(false);

		expect(
			await apiService.question.checkQuestionDoesNotExist(questionId)
		).toBeTruthy();
	});
});