import { test } from "@fixtures/testScope.fixture";
import { getRandomName } from "@helpers/random.helpers";
import { FolderResponse } from "@typedefs/api/folder.typedefs";
import { ItemRow } from "@ui/components/tables/surveys/itemRows";

test.describe("Folder", async () => {
	let folderId: string;
	let skipDelete: boolean = false;

	test.beforeEach(async ({ adminAPP }) => {
		await adminAPP.surveysPage.visit();
	});

	test.afterEach(async ({ apiService }) => {
		if (!skipDelete) {
			await apiService.folder.deleteFolder({ folderId });
		}

		skipDelete = false;
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

	test.describe("Edit folder's name and delete the folder", async () => {
		let folder: FolderResponse;
		let folderRow: ItemRow;

		test.beforeEach(async ({ apiService, adminAPP, rootFolder }) => {
			const name: string = getRandomName("FolderAUT");
			folder = await apiService.folder.createFolder({
				name, parentFolderId: rootFolder.id
			});
			await adminAPP.surveysPage.waitForFoldersResponse();

			folderId = folder.id;
			await adminAPP.surveysPage.surveysTable.assertItemInList(name);
			folderRow = await adminAPP.surveysPage.surveysTable.getRowByName(name);
		});

		test("User is able to edit folder's name", async () => {
			const { name } = folder;
			await folderRow.assertItemNameCorrect(name);
			const newFolderName: string = "Renamed-" + name;
			await folderRow.renameItem(newFolderName);
			const folderUpdatedDate = new Date();
			await folderRow.assertItemNameCorrect(newFolderName);
			await folderRow.assertItemUpdatedAt(folderUpdatedDate);
		});

		test("User is able to delete folder without surveys", async ({ adminAPP, apiService }) => {
			skipDelete = true;
			const subFolder = await apiService.folder.createFolder({
				name: "SubFolderAUT", parentFolderId: folderId
			});

			await adminAPP.surveysPage.deleteFolder({ name: folder.name });
			await adminAPP.surveysPage.surveysTable.assertItemNotInList(folder.name);
			await apiService.folder.assertFolderWasDeleted(folder.id);
			await apiService.folder.assertFolderWasDeleted(subFolder.id);
		});

		test("User is not able to delete folder with surveys", async ({ apiService, adminAPP }) => {
			const survey = await apiService.survey.createSurvey({
				name: "SurveyAUT", folderId
			});

			await adminAPP.surveysPage.reload();
			await folderRow.assertActionMenuNotVisible();
			await apiService.survey.deleteSurvey({ surveyId: survey.id });
		});
	});
});
