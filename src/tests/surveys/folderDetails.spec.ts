import { test } from "@fixtures/testScope.fixture";
import { getRandomName } from "@helpers/random.helpers";
import { FolderResponse } from "@typedefs/api/folder.typedefs";
import { ItemRow } from "@ui/components/tables/surveys/itemRows";

test.describe("Folder details", async () => {
	let childFolderId: string;

	test.beforeEach(async ({ adminAPP }) => {
		await adminAPP.surveysPage.visit();
	});

	test.afterEach(async ({ apiService }) => {
		await apiService.folder.deleteFolder({ folderId: childFolderId });
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

		childFolderId = await adminAPP.folderDetailsPage.getIdFromPageUrl();
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
		let childFolder: FolderResponse;
		let folderRow: ItemRow;

		test.beforeEach(async ({ apiService, adminAPP }) => {
			const { items: [{ id: folderId }] } = await apiService.folder.getFolders();
			const name: string = getRandomName("FolderAUT");
			childFolder = await apiService.folder.createFolder({
				name, parentFolderId: folderId
			});

			childFolderId = childFolder.id;
			folderRow = await adminAPP.surveysPage.surveysTable.getRowByName(childFolder.name);
		});

		test("User is able to edit folder's name", async ({ adminAPP }) => {
			await adminAPP.surveysPage.waitForFoldersResponse();
			const { name } = childFolder;
			await folderRow.assertItemNameCorrect(name);
			const newFolderName: string = "Renamed-" + name;
			await folderRow.renameItem(newFolderName);
			const folderUpdatedDate = new Date();
			await folderRow.assertItemNameCorrect(newFolderName);
			await folderRow.assertItemUpdatedAt(folderUpdatedDate);
		});
	});
});
