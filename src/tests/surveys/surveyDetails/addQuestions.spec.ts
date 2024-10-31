import { test } from "@fixtures/testScope.fixture";
import { getQuestionTestCaseId } from "@helpers/survey.helpers";
import { expect } from "@playwright/test";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";

test.describe("Create questions of all types", async () => {

	test.beforeEach(async ({ adminAPP, survey }) => {
		await adminAPP.surveyDetailsPage.visit(survey.id);
		await adminAPP.surveyDetailsPage.waitForOpened();
	});

	Object.values(QuestionType).forEach((questionType) => {
		test(`[${getQuestionTestCaseId(questionType)}] User is able to create & delete ${questionType} question type in the root chapter`, async ({ adminAPP }) => {
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
