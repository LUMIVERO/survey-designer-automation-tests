import { APIRequestContext } from "@playwright/test";
import { CreateSurveyOptions, SurveyResponse, DeleteSurveyOptions } from "../typedefs/api/survey.typedefs";
import { surveysUrl } from "../data/urls/apiUrls";
import { raiseForStatus } from "../helpers/apiHelpers";
import { setIdOnUrl } from "../helpers/idOnUrl";

export async function createSurvey(
	request: APIRequestContext,
	options: CreateSurveyOptions
): Promise<SurveyResponse> {

	const response = await request.post(surveysUrl.surveys, {
		data: options
	});

	await raiseForStatus(response);

	return (await response.json()).body;
}

export async function deleteSurvey(
	request: APIRequestContext,
	options: DeleteSurveyOptions
): Promise<void> {

	const response = await request.delete(
		setIdOnUrl(surveysUrl.survey, options.surveyId)
	);

	await raiseForStatus(response);
}