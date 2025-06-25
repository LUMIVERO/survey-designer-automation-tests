import { test } from "@fixtures/testScope.fixture";
import { getQuestionTestCaseId } from "@helpers/survey.helpers";
import { expect } from "@playwright/test";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";

test.describe("Create questions", async () => {

	test.beforeEach(async ({ adminAPP, survey }) => {
		await adminAPP.surveyDetailsPage.visit(survey.id);
		await adminAPP.surveyDetailsPage.waitForOpened();
	});

	test("User can create question in root chapter, add subchapter and question to it", async ({ adminAPP }) => {
		const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		await sidePanel.getChapter().clickAddNewBtn()
			.then(menu => menu.clickActionBtn("addQuestionOption" ));
		// TODO: add test logic
		// test("User can create question in root chapter, add subchapter and question to it", async ({ adminAPP }) => {
		// 	const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		// 	await sidePanel.getChapter().clickAddNewBtn()
		// 		.then(popup => popup.selectOption("addChapterOption", { waitForResponse: true }));
		//
		// 	await waitAfterAction(
		// 		async () => await adminAPP.surveyDetailsPage.clickQuestionTypeButton(QuestionType.List),
		// 		async () => await adminAPP.page.waitForResponse(new RegExp(questionsUrl.questions)),
		// 	);
		// 	const question1 = adminAPP.surveyDetailsPage.getFirstQuestion(QuestionType.List);
		// 	await question1.assertIsVisible();
		//
		// 	await sidePanel.getChapter().clickAddNewBtn();
		// 	await clickAddChapterBtn();
		// 	await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		//
		// 	await expect(async () => {
		// 		expect(await adminAPP.surveyDetailsPage.chaptersContainers.count()).toEqual(adminAPP.surveyDetailsPage.chaptersCount);
		// 	}).toPass({ timeout: 2000 });
		// 	let chapter = adminAPP.surveyDetailsPage.getChapter(adminAPP.surveyDetailsPage.lastChapterName);
		// 	await chapter.assertChapterIsVisible();
		//
		// 	await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		// 	await sidePanel.getChapter(adminAPP.surveyDetailsPage.lastChapterName).clickAddNewBtn();
		// 	await addQuestionBtn.click();
		//
		// 	await waitAfterAction(
		// 		async () => await adminAPP.surveyDetailsPage.clickQuestionTypeButton(QuestionType.RadioButton),
		// 		async () => await adminAPP.page.waitForResponse(new RegExp(questionsUrl.questions)),
		// 	);
		//
		// 	const question2 = adminAPP.surveyDetailsPage.getFirstQuestion(QuestionType.RadioButton);
		// 	await question2.assertIsVisible();
		// 	await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		//
		// 	await chapter.clickTreeDotsBtn();
		// 	await chapter.actionsMenu.waitFor();
		// 	await chapter.actionsMenu.clickDeleteBtn();
		// 	await adminAPP.surveyDetailsPage.dialog.waitForDialogVisible();
		// 	await adminAPP.surveyDetailsPage.dialog.clickSubmitBtn();
		// 	await adminAPP.surveyDetailsPage.dialog.waitForDialogHidden();
		// 	await chapter.assertChapterIsVisible({ visible: false });
		// 	await question2.assertIsVisible(false);
		// 	await question1.assertIsVisible(true);
		// });
		// await adminAPP.surveyDetailsPage.clickQuestionTypeButton(QuestionType.RadioButton);

	});


	Object.values(QuestionType).forEach((questionType) => {
		test.skip(`[${getQuestionTestCaseId(questionType)}] User is able to create & delete ${questionType} question type in the root chapter`, async ({ adminAPP }) => {
			const { surveyDetailsPage } = adminAPP;
			const { sidePanel } = surveyDetailsPage;
			await surveyDetailsPage.clickSidePanelBtn();
			await sidePanel.getChapter().clickAddNewBtn();
			const { addQuestionBtn } = surveyDetailsPage.addNewPopup;
			await addQuestionBtn.click();
			await adminAPP.surveyDetailsPage.clickQuestionTypeButton(questionType);
			const question = adminAPP.surveyDetailsPage.getFirstQuestion(questionType);
			const answer = question.getFirstAnswer();

			await expect(async () => {
				await surveyDetailsPage.clickSidePanelBtn();
				await sidePanel.assertSidePanelIsVisible({ visible: false });
			}).toPass();

			await question.hoverQuestion();
			await question.assertSaveToQBankIsVisible();
			await question.assertQuestionType(questionType);
			await question.assertQuestionText();
			await question.assertQuestionVariableText();
			await question.assertCommentsCount();
			await question.assertInstructionIconToBeVisible();
			await answer.assertInputType();
			await answer.assertAnswerVariableText();
			await answer.assertAnswerText();

			await test.step(`User is able to delete ${questionType} question type`, async () => {
				await adminAPP.surveyDetailsPage.deleteQuestion(question);
				await question.assertIsVisible(false);
			});
		});
	});
});
