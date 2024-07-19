import { test } from "@fixtures/testScope.fixture";
import { getRandomName } from "@helpers/random.helpers";

test.describe("Folder details", async () => {
	let folderId: string;

	test.beforeEach(async ({ adminAPP }) => {
		await adminAPP.surveysPage.visit();
	});

	test.afterEach(async ({ apiService }) => {
		await apiService.folder.deleteFolder({ folderId });
	});

	test("User is able to create folder in the root folder", async ({ adminAPP }) => {
		const folderName: string = getRandomName("FolderAUT");

		await adminAPP.surveysPage.clickCreateFolderBtn();
		await adminAPP.surveysPage.dialogWithInput.fillItemName(folderName);
		await adminAPP.surveysPage.dialogWithInput.clickSubmitBtn();
		const folderCreationTime = new Date();
		await adminAPP.surveysPage.dialogWithInput.waitForDialogHidden();

		await adminAPP.surveysPage.surveysTable.assertItemInList(folderName);
		const folderRow = await adminAPP.surveysPage.surveysTable.getRowByName(folderName);
		await folderRow.click();

		folderId = await adminAPP.folderDetailsPage.getIdFromPageUrl();
		await adminAPP.folderDetailsPage.assertEmptyStateIsDisplayed();
		await adminAPP.folderDetailsPage.assertFolderNameCorrect(folderName);
		await adminAPP.folderDetailsPage.clickBackBtn();

		await adminAPP.surveysPage.waitForOpened();
		await adminAPP.surveysPage.surveysTable.assertItemInList(folderName);
		await folderRow.assertCommentCount(0);
		await folderRow.assertItemUpdatedAt(folderCreationTime);
		await folderRow.assertSurveyCountInFolder(0);
	});
});
