import { getRandomName } from "@helpers/random.helpers";
import { FolderResponse, CreateFolderOptions } from "@typedefs/api/folder.typedefs";
import { UUID } from "node:crypto";
import { test as base } from "./workerScope.fixture";

export const test = base.extend<{
	rootFolder: FolderResponse;
	newFolder: (options?: Partial<CreateFolderOptions>) => Promise<FolderResponse>;
}>({
	rootFolder: async ({ apiService }, use) => {
		const { items: [folder] } = await apiService.folder.getFolders();
		await use(folder);
	},
	newFolder: async ({ apiService, rootFolder }, use) => {
		const folderName = getRandomName("FolderAUTF");
		let folderId: UUID;

		await use(async (options?: CreateFolderOptions) => {
			const { name = folderName, parentFolderId = rootFolder.id } = options ?? {};
			const folder = await apiService.folder.createFolder({ name, parentFolderId });
			folderId = folder.id;

			return folder;
		});

		await apiService.folder.deleteFolder({ folderId });
	},
});