import { test } from "@fixtures/testScope.fixture";
import { getRandomName } from "@helpers/random.helpers";
import { SurveyResponse } from "@typedefs/api/survey.typedefs";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";

test.describe("Create questions of all types", async () => {
	let survey: SurveyResponse;
	let surveyId: string;
	let name: string;

	test.beforeEach(async ({ apiService, adminAPP }) => {
		const { items: [{ id: folderId }] } = await apiService.folder.getFolders();
		name = getRandomName("SurveyAUT");
		survey = await apiService.survey.createSurvey({
			name, folderId
		});

		surveyId = survey.id;
		await adminAPP.surveyDetailsPage.visit(surveyId);
		await adminAPP.surveyDetailsPage.waitForOpened();
	});

	test.afterEach(async ({ apiService }) => {
		await apiService.survey.deleteSurvey({ surveyId });
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
