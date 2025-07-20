import { test } from "@fixtures/testScope.fixture";
import { expect } from "@playwright/test";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { Chapter } from "@ui/components/questions/chapter";

test.describe("Create questions @Sf6b783d5", async () => {

	test.beforeEach(async ({ adminAPP, survey }) => {
		await adminAPP.surveyDetailsPage.visit(survey.id);
		await adminAPP.surveyDetailsPage.waitForOpened();
	});

	test("User can create question in root chapter, add subchapter and question to it @Tf16c68eb", async ({ adminAPP }) => {
		const radioButtonsQuestionType = QuestionType.RadioButton;
		const chapterName = Chapter.defaultChapterName;

		const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		const rootChapter = sidePanel.getChapter();
		await rootChapter.clickAddNewBtn()
			.then(menu => menu.clickActionBtn("addQuestionOption"));
		const { id: questionId1 } = await adminAPP.surveyDetailsPage.questionTypeListDialog.selectQuestionType(radioButtonsQuestionType);
		const question1 = adminAPP.surveyDetailsPage.getQuestionById(questionId1, radioButtonsQuestionType);
		await question1.assertIsVisible();

		await rootChapter.clickAddNewBtn()
			.then(menu => menu.clickActionBtn("addChapterOption"));
		const chapter = sidePanel.getChapter(chapterName);
		await chapter.clickAddNewBtn()
			.then(menu => menu.clickActionBtn("addQuestionOption"));

		const { id: questionId2 } = await adminAPP.surveyDetailsPage.questionTypeListDialog.selectQuestionType(radioButtonsQuestionType);
		const question2 = adminAPP.surveyDetailsPage.getQuestionById(questionId2, radioButtonsQuestionType);
		await question2.assertIsVisible();
	});


	Object.values(QuestionType).forEach((questionType) => {
		test.skip(`User is able to create & delete ${questionType} question type in the root chapter`, async ({ adminAPP }) => {
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
