import { test } from "../../fixtures/testScope.fixture";
import { getRandomName } from "../../helpers/random.data";
import { deleteSurvey } from "../../api/survey";

test.describe("Surveys list", async () => {
	let surveyId: string;

	test.afterEach(async ({ adminAPP }) => {
		await deleteSurvey(adminAPP.page.request, { surveyId });
	});

	test("User is able to create survey in the root folder", async ({ adminAPP }) => {
		const surveyName: string = getRandomName("SurveyAUT");

		await adminAPP.surveysPage.visit();
		await adminAPP.surveysPage.clickCreateSurveyBtn();
		await adminAPP.surveysPage.createSurveyPopup.fillItemName(surveyName);
		await adminAPP.surveysPage.createSurveyPopup.clickSubmitBtn();
		await adminAPP.surveysPage.createSurveyPopup.waitForPopupHidden();
		await adminAPP.surveyDetailsPage.waitForOpened();
		surveyId = await adminAPP.surveyDetailsPage.getIdFromPageUrl();

		//TODO:
		// Add checks for survey name
		// Go to the survey list
		// Assert survey name and last modified date in the surveys list
	});

	test.describe.skip("Edit survey's name and duplicate the survey", async () => {

		test("User is able to edit survey's name", async ({ adminAPP }) => {
		});
		test("User is able to duplicate the survey", async ({ adminAPP }) => {
		});

	});
});
