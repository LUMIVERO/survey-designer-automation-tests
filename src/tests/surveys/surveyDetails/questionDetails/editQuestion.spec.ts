import { test } from "@fixtures/testScope.fixture";
import { waitAfterAction } from "@helpers/promise.helpers";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { GridAnswer } from "@ui/components/questions/designQuestions/answers";
import { Question } from "@ui/components/questions/designQuestions/question";
import { GridRow } from "@ui/components/tables/questions/gridRow";
import { questionsUrl } from "src/constants/urls/apiUrls";

test.describe("Edit question", async () => {
	let question: Question;
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
			async () => await adminAPP.page.waitForResponse(new RegExp(questionsUrl.questions))
		);

		await surveyDetailsPage.clickSidePanelBtn();
		question = adminAPP.surveyDetailsPage.getFirstQuestion(QuestionType.Grid);
		answer = question.getFirstAnswer() as GridAnswer;
		topic = answer.table.getRow(0);
	});

	test("[48500, 48503] User can edit text for question, answer and topic", async () => {
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

	test("[48504] User can edit variables for question, answer and topic", async () => {
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

	test("[48502] User can add/delete answer and topic", async ({ adminAPP, apiService }) => {
	});

	test("[48507] User can add, edit, delete instruction for surveyors/scripters", async ({ adminAPP, apiService }) => {
	});
});