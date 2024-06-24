import {test} from "../fixtures/testScope.fixture";

test.describe("Survey example test", async () => {
	test("Check username", async ({ adminAPP }) => {
		await adminAPP.surveysPage.visit();
		await adminAPP.surveysPage.clickUserInfoDetailsBtn();
		await adminAPP.surveysPage.assertUsername(process.env.USERNAME_ADMIN);
	});
});