import { Endpoint } from "@api/abstractEndpoint";
import { raiseForStatus } from "@helpers/api.helpers";
import { toQueryParams } from "@helpers/url.helpers";
import {
	CreateSurveyOptions,
	SurveyResponse,
	DeleteSurveyOptions,
	GetSurveyOptions,
} from "@typedefs/api/survey.typedefs";
import { surveysUrl } from "src/constants/urls/apiUrls";

export class Survey extends Endpoint {
	readonly url = surveysUrl.root;

	async createSurvey(
		options: CreateSurveyOptions,
	): Promise<SurveyResponse> {

		const response = await this.request.post(this.url, {
			data: options,
		});

		await raiseForStatus(response);

		return response.json();
	}

	async getSurvey({ surveyId, ...queryParams }: GetSurveyOptions): Promise<SurveyResponse> {
		let url = this.detailsUrl(surveyId);
		const query = toQueryParams(queryParams);

		if (query) {
			url += `?${query}`;
		}

		const response = await this.request.get(
			url,
		);

		await raiseForStatus(response);

		return response.json();
	}

	async deleteSurvey(
		{ surveyId }: DeleteSurveyOptions,
	): Promise<void> {

		const response = await this.request.delete(
			this.detailsUrl(surveyId),
		);

		await raiseForStatus(response);
	}
}
