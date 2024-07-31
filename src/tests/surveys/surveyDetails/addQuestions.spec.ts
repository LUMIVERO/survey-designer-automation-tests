import { test } from "@fixtures/testScope.fixture";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";

test.describe("Create questions of all types", async () => {

	test.beforeEach(async ({ adminAPP, survey }) => {
		await adminAPP.surveyDetailsPage.visit(survey.id);
		await adminAPP.surveyDetailsPage.waitForOpened();
	});

	Object.values(QuestionType).forEach((questionType) => {
		test(`User is able to create & delete ${questionType} question type in the root chapter`, async ({ adminAPP }) => {
			await adminAPP.surveyDetailsPage.clickAddQuestionBtn();
			await adminAPP.surveyDetailsPage.clickQuestionTypeButton(questionType);
			const question = adminAPP.surveyDetailsPage.getFirstQuestion(questionType);
			const answer = question.getFirstAnswer();

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
