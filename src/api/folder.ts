import { raiseForStatus } from "@helpers/api.helpers";
import { setIdOnUrl } from "@helpers/url.helpers";
import { APIRequestContext } from "@playwright/test";
import {
	GetFolderResponse,
	DeleteFolderOptions,
	CreateFolderOptions,
	FolderResponse
} from "@typedefs/api/folder.typedefs";
import { foldersUrl } from "src/constants/urls/apiUrls";

export class Folder {

	constructor(readonly request: APIRequestContext) {
	}

	async getFolders(): Promise<GetFolderResponse> {
		const response = await this.request.get(foldersUrl.folders);

		await raiseForStatus(response);

		return await response.json();
	}

	async deleteFolder(
		options: DeleteFolderOptions
	): Promise<void> {

		const response = await this.request.delete(
			setIdOnUrl(foldersUrl.folder, options.folderId)
		);

		await raiseForStatus(response);
	}

	async createFolder(
		options: CreateFolderOptions
	): Promise<FolderResponse> {

		const response = await this.request.post(foldersUrl.folders, {
			data: options
		});

		await raiseForStatus(response);

		return await response.json();
	}
}
