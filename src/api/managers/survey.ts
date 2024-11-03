import { Endpoint } from "@api/abstractEndpoint";
import { raiseForStatus } from "@helpers/api.helpers";
import { CreateSurveyOptions, SurveyResponse, DeleteSurveyOptions } from "@typedefs/api/survey.typedefs";
import { surveysUrl } from "src/constants/urls/apiUrls";

export class Survey extends Endpoint {
	readonly url = surveysUrl.surveys;

	async createSurvey(
		options: CreateSurveyOptions
	): Promise<SurveyResponse> {

		const response = await this.request.post(this.url, {
			data: options
		});

		await raiseForStatus(response);

		return await response.json();
	}

	async deleteSurvey(
		{ surveyId }: DeleteSurveyOptions
	): Promise<void> {

		const response = await this.request.delete(
			this.detailsUrl(surveyId)
		);

		await raiseForStatus(response);
	}
}
