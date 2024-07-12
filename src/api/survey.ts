import { surveysUrl } from "@data/urls/apiUrls";
import { raiseForStatus } from "@helpers/api.helpers";
import { setIdOnUrl } from "@helpers/url.helpers";
import { APIRequestContext } from "@playwright/test";
import { CreateSurveyOptions, SurveyResponse, DeleteSurveyOptions } from "@typedefs/api/survey.typedefs";

export class Survey {

	constructor(readonly request: APIRequestContext) {
	}

	async createSurvey(
		options: CreateSurveyOptions
	): Promise<SurveyResponse> {

		const response = await this.request.post(surveysUrl.surveys, {
			data: options
		});

		await raiseForStatus(response);

		return await response.json();
	}

	async deleteSurvey(
		options: DeleteSurveyOptions
	): Promise<void> {

		const response = await this.request.delete(
			setIdOnUrl(surveysUrl.survey, options.surveyId)
		);

		await raiseForStatus(response);
	}
}
