import { test } from "@fixtures/testScope.fixture";
import { getRandomName } from "@helpers/random.helpers";
import { FolderResponse } from "@typedefs/api/folder.typedefs";
import { FolderRow } from "@ui/components/tables/surveys/rows";
import { UUID } from "node:crypto";

test.describe("Folder @S406e3299", async () => {
	let folderId: UUID;
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

	test("User is able to create folder in the root folder and open it @Tb17146c1", async ({ adminAPP }) => {
		const folderName: string = getRandomName("FolderAUT");
		await adminAPP.surveysPage.clickCreateFolderBtn();
		await adminAPP.surveysPage.dialogWithInput.fillItemName(folderName);
		await adminAPP.surveysPage.dialogWithInput.clickSubmitBtn();
		const folderCreationTime = new Date();
		await adminAPP.surveysPage.dialogWithInput.waitForDialogHidden();
		await adminAPP.surveysPage.reload();
		await adminAPP.surveysPage.surveysTable.assertItemInList(folderName);
		const folderRow = await adminAPP.surveysPage.surveysTable.getRowByName(folderName, { rowType: "folder" });
		await folderRow.click();

		folderId = await adminAPP.folderDetailsPage.getIdFromPageUrl();
		await adminAPP.folderDetailsPage.assertEmptyStateIsDisplayed();
		await adminAPP.folderDetailsPage.assertFolderNameCorrect(folderName);
		await adminAPP.folderDetailsPage.clickBackBtn();

		await adminAPP.surveysPage.waitForOpened();
		await adminAPP.reloadAndRetry(async () => {
			await adminAPP.surveysPage.surveysTable.assertItemInList(folderName, { timeout: 5000 });
		});
		await folderRow.assertCommentCount(0);
		await folderRow.assertItemUpdatedAt(folderCreationTime);
		await folderRow.assertSurveysCount(0);
	});

	test.describe("Rename and delete folder", async () => {
		let folder: FolderResponse;
		let folderRow: FolderRow;

		test.beforeEach(async ({ apiService, adminAPP, rootFolder }) => {
			const name: string = getRandomName("FolderAUT");
			folder = await apiService.folder.createFolder({
				name, parentFolderId: rootFolder.id,
			});
			await adminAPP.surveysPage.waitForFoldersResponse();

			folderId = folder.id;
			await adminAPP.surveysPage.surveysTable.assertItemInList(name);
			folderRow = await adminAPP.surveysPage.surveysTable.getRowByName(name, { rowType: "folder" });
		});

		test("User is able to rename the folder @Teaf27fdd", async () => {
			const { name } = folder;
			await folderRow.assertItemNameCorrect(name);
			const newFolderName: string = "Renamed-" + name;
			await folderRow.renameItem(newFolderName);
			const folderUpdatedDate = new Date();
			await folderRow.assertItemNameCorrect(newFolderName);
			await folderRow.assertItemUpdatedAt(folderUpdatedDate);
		});

		test("User is able to delete folder without surveys @T6ab97513", async ({ adminAPP, apiService }) => {
			skipDelete = true;
			const subFolder = await apiService.folder.createFolder({
				name: "SubFolderAUT", parentFolderId: folderId,
			});

			await adminAPP.surveysPage.deleteFolder({ name: folder.name });
			await adminAPP.surveysPage.surveysTable.assertItemNotInList(folder.name);
			await apiService.folder.assertFolderDoesNotExist({ folderId: folder.id });
			await apiService.folder.assertFolderDoesNotExist({ folderId: subFolder.id });
		});

		test("User is not able to delete folder with surveys @Tf24de971", async ({ apiService, adminAPP }) => {
			const survey = await apiService.survey.createSurvey({
				name: "SurveyAUT", folderId,
			});

			await adminAPP.surveysPage.reload();
			await folderRow.assertActionMenuBtnIsVisible({ visible: false });
			await apiService.survey.deleteSurvey({ surveyId: survey.id });
		});
	});
});
