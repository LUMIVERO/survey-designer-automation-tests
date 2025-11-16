import { test } from "@fixtures/testScope.fixture";
import { waitAfterAction } from "@helpers/promise.helpers";
import { getRandomName } from "@helpers/random.helpers";
import { expect } from "@playwright/test";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { GridAnswer } from "@ui/components/questions/designQuestions/answers";
import { BaseQuestion } from "@ui/components/questions/designQuestions/question";
import { GridRow } from "@ui/components/tables/questions/gridRow";
import { questionsUrl } from "src/constants/urls/apiUrls";

test.describe.skip("Edit question @Sfbbf57e5", async () => {
	let question: BaseQuestion;
	let answer: GridAnswer;
	let topic: GridRow;

	test.beforeEach(async ({ adminAPP, survey }) => {
		const surveyDetailsPage = adminAPP.surveyDetailsPage;
		const sidePanel = surveyDetailsPage.sidePanel;

		await surveyDetailsPage.visit(survey.id);
		await surveyDetailsPage.waitForOpened();
		await surveyDetailsPage.clickSidePanelBtn();
		await sidePanel.getChapter().clickAddNewBtn();
		const { addQuestionBtn } = surveyDetailsPage.addNewPopup;
		await addQuestionBtn.click();

		await waitAfterAction(
			async () => await adminAPP.surveyDetailsPage.clickQuestionTypeButton(QuestionType.Grid),
			async () => await adminAPP.page.waitForResponse(new RegExp(questionsUrl.root)),
		);

		await surveyDetailsPage.clickSidePanelBtn();
		question = adminAPP.surveyDetailsPage.getFirstQuestion(QuestionType.Grid);
		answer = question.getFirstAnswer() as GridAnswer;
		topic = answer.table.getRow(0);
	});

	test("User can edit text for question, answer and topic @T436e2356", async () => {
		const questionText = "Edit-question";
		const answerText = "Edit-answer";
		const topicText = "Edit-topic";

		await question.assertQuestionText();
		await question.editQuestionText(questionText);
		await question.assertQuestionText(questionText);

		await answer.assertAnswerText();
		await answer.editAnswerText(answerText);
		await answer.assertAnswerText(answerText);

		await topic.assertTopicText();
		await topic.editTopicText(topicText);
		await topic.assertTopicText(topicText);
	});

	test("User can edit variables for question, answer and topic @T860e33ed", async () => {
		const questionVarText = "EditQVar";
		const answerVarText = "EditAVar";
		const topicVarText = "EditTVar";

		await question.assertQuestionVariableText();
		await question.editQuestionVarText(questionVarText);
		await question.assertQuestionVariableText(questionVarText);

		await answer.assertAnswerVariableText();
		await answer.editAnswerVarText(answerVarText);
		await answer.assertAnswerVariableText(answerVarText);

		await topic.assertTopicVariableText(`T_1_${questionVarText}`);
		await topic.editTopicVarText(topicVarText);
		await topic.assertTopicVariableText(topicVarText);
	});

	test("User can add/delete answer @T9c1c6d21", async () => {
		const { table } = answer;
		const { headRow } = table;

		for (let i = await headRow.count() - 1; i > 0; i--) {
			const col = headRow.nth(i);
			await col.delete();
			await expect(col.container).toBeVisible({ visible: false });
		}

		const col = headRow.nth(0);
		expect(async () => {
			await col.openActionMenu();
			await col.actionMenu.assertIsVisible();
		}).toPass();
		await col.actionMenu.assertIsVisible("delete", { visible: false });
		expect(await headRow.count()).toEqual(1);

		await question.addNewAnswer("Answer");
		expect(await headRow.count({ timeout: 500 })).toEqual(2);
	});

	test("User can add/delete topic @Tb0502916", async () => {
		const { table } = answer;

		for (let i = await table.rows.count() - 1; i > 0; i--) {
			const row = table.getRow(i);
			await row.delete();
			await expect(row.container).toBeVisible({ visible: false });
		}
		const row = table.getRow(0);
		expect(async () => {
			await row.openActionBtn.click();
			await row.actionMenu.assertIsVisible();
		}).toPass();
		await row.actionMenu.assertIsVisible("delete", { visible: false });
		expect(await table.rowsCount()).toEqual(1);

		await question.addNewTopic("Topic");
		expect(await table.rowsCount({ timeout: 500 })).toEqual(2);
	});


	test("User can add, edit, delete instruction for surveyors/scripters @Te5046890", async () => {
		const surveyorInstructionText: string = getRandomName("Surveyor-");
		const scripterInstructionText: string = getRandomName("Scripter-");

		await question.assertInstructionIconToBeVisible();
		await question.assertInstructionIndicatorIsVisible(false);
		await question.clickInstructionBtn();
		await question.instructionsBox.assertInstructionsBoxIsDisplayed();
		await question.instructionsBox.fillSurveyorInstruction(surveyorInstructionText);
		await question.instructionsBox.closeInstructions();
		await question.instructionsBox.assertInstructionsBoxIsDisplayed({ visible: false });

		await question.clickInstructionBtn();
		await question.instructionsBox.assertInstructionsBoxIsDisplayed();
		await question.instructionsBox.assertInstruction("surveyors", surveyorInstructionText);
		await question.instructionsBox.fillScripterInstruction(scripterInstructionText);
		await question.instructionsBox.closeInstructions();
		await question.assertInstructionIndicatorIsVisible();

		await question.instructionsBox.assertInstructionsBoxIsDisplayed({ visible: false });
		await question.clickInstructionBtn();
		await question.instructionsBox.assertInstructionsBoxIsDisplayed();
		await question.instructionsBox.assertInstruction("surveyors", surveyorInstructionText);
		await question.instructionsBox.assertInstruction("scripters", scripterInstructionText);
		await question.assertInstructionIndicatorIsVisible();

		await question.instructionsBox.deleteSurveyorInstruction();
		await question.instructionsBox.closeInstructions();
		await question.clickInstructionBtn();
		await question.instructionsBox.assertInstruction("surveyors", "");
		await question.instructionsBox.assertInstruction("scripters", scripterInstructionText);

		await question.instructionsBox.deleteScripterInstruction();
		await question.instructionsBox.closeInstructions();
		await question.clickInstructionBtn();
		await question.instructionsBox.assertInstruction("surveyors", "");
		await question.instructionsBox.assertInstruction("scripters", "");
		await question.assertInstructionIndicatorIsVisible(false);
	});
});
