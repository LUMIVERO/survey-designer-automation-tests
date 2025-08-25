import { test } from "@fixtures/testScope.fixture";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { Chapter } from "@ui/components/questions/chapter";
import { questionTypeInputAssertions } from "src/testData/questionType.data";

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

	// TODO: add question classes like NumericQuestion for uniq questions;
	Object.values(QuestionType).forEach((questionType) => {
		test(`User is able to create & delete ${questionType} question type in the root chapter @T4ff41f97`, async ({
			adminAPP: app,
			apiService,
		}) => {
			const sidePanel = await app.surveyDetailsPage.clickSidePanelBtn();
			await sidePanel.getChapter().clickAddNewBtn()
				.then(menu => menu.clickActionBtn("addQuestionOption"));
			const {
				id: questionId,
				...questionResponse
			} = await app.surveyDetailsPage.questionTypeListDialog.selectQuestionType(questionType);
			const question = app.surveyDetailsPage.getQuestionById(questionId, questionType);
			await question.assertIsVisible();
			await question.assertQuestionText();
			await question.assertQuestionVariableText();
			await question.assertQuestionType(questionType);

			await question.hoverQuestion();
			await question.assertSaveToQBankIsVisible();
			await question.assertCommentsCount();
			await question.assertInstructionIconToBeVisible();

			const answer = question.getFirstAnswer();
			await answer.assertInputType(questionTypeInputAssertions[questionType]);

			const sidePanelQuestion = sidePanel.getQuestion();
			await sidePanelQuestion.assertItemName(questionResponse.text);
			await sidePanelQuestion.assertVarName(questionResponse.variableName);

			await test.step(`User is able to delete ${questionType} question type in root chapter from main area`, async () => {
				await app.surveyDetailsPage.deleteQuestion(question);
				await question.assertIsVisible(false);

				await apiService.question.assertQuestionDoesNotExist({ questionId });
			});
		});

		// 	TODO: add test - user can delete question from sidebar
	});
});
