import { Endpoint } from "@api/abstractEndpoint";
import { raiseForStatus } from "@helpers/api.helpers";
import { expect } from "@playwright/test";
import { QuestionResponse, QuestionDetailsOptions, CreateQuestionOptions } from "@typedefs/api/question.typedefs";
import { NetworkError } from "@typedefs/api/request.typedefs";
import { questionsUrl } from "src/constants/urls/apiUrls";

export class Question extends Endpoint {
	readonly url = questionsUrl.root;

	async createQuestion(data: CreateQuestionOptions): Promise<QuestionResponse> {
		const response = await this.request.post(this.url, { data });

		await raiseForStatus(response, 200);

		return response.json();
	}

	async getQuestions(): Promise<QuestionResponse> {
		const response = await this.request.get(this.url);

		await raiseForStatus(response, 200);

		return await response.json();
	}

	async getQuestionById({ questionId }: QuestionDetailsOptions): Promise<QuestionResponse> {
		const response = await this.request.get(
			this.detailsUrl(questionId),
		);

		await raiseForStatus(response, 200);

		return await response.json();
	}

	async deleteQuestion({ questionId }: QuestionDetailsOptions): Promise<void> {

		const response = await this.request.delete(this.detailsUrl(questionId));

		await raiseForStatus(response, 200);
	}

	async assertQuestionDoesNotExist({ questionId }: QuestionDetailsOptions): Promise<void> {
		try {
			const response = await this.getQuestionById({ questionId });
			expect(response.id).toBeUndefined();
		} catch (error) {
			if (error instanceof NetworkError) {
				return expect(error.status).toBe(404);
			}
			throw error;
		}
	}
}
