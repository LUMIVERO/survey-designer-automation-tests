import { raiseForStatus } from "@helpers/api.helpers";
import { setIdOnUrl } from "@helpers/url.helpers";
import { APIRequestContext } from "@playwright/test";
import { QuestionResponse, GetQuestionOptions } from "@typedefs/api/question.typedefs";
import { NetworkError } from "@typedefs/api/request.typedefs";
import { questionsUrl } from "src/constants/urls/apiUrls";

export class Question {

	constructor(readonly request: APIRequestContext) {
	}

	async getQuestions(): Promise<QuestionResponse> {
		const response = await this.request.get(questionsUrl.questions);

		await raiseForStatus(response, 200);

		return await response.json();
	}

	async getQuestionById({ questionId }: GetQuestionOptions): Promise<QuestionResponse> {
		const response = await this.request.get(
			setIdOnUrl(questionsUrl.question, questionId),
		);

		await raiseForStatus(response, 200);

		return await response.json();
	}

	async deleteQuestion({ questionId }: GetQuestionOptions): Promise<void> {

		const response = await this.request.delete(
			setIdOnUrl(questionsUrl.question, questionId)
		);

		await raiseForStatus(response, 200);
	}

	async checkQuestionDoesNotExist(questionId: string): Promise<boolean> {
		try {
			await this.getQuestionById({ questionId });
			return false;
		} catch (e) {
			if (e instanceof NetworkError && e.status === 404) {
				return true;
			}
			throw e;
		}
	}
}
