import { raiseForStatus } from "@helpers/api.helpers";
import { setIdOnUrl } from "@helpers/url.helpers";
import { APIRequestContext, expect } from "@playwright/test";
import {
	GetFolderResponse,
	DeleteFolderOptions,
	CreateFolderOptions,
	FolderResponse,
	GetFolderOptions
} from "@typedefs/api/folder.typedefs";
import { NetworkError } from "@typedefs/api/request.typedefs";
import { foldersUrl } from "src/constants/urls/apiUrls";

export class Folder {

	constructor(readonly request: APIRequestContext) {
	}

	async getFolders(): Promise<GetFolderResponse> {
		const response = await this.request.get(foldersUrl.folders);

		await raiseForStatus(response);

		return await response.json();
	}

	async getFolderById({ folderId }: GetFolderOptions): Promise<FolderResponse> {
		const response = await this.request.get(
			setIdOnUrl(foldersUrl.folder, folderId)
		);

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
			data: {
				...options,
				index: 0,
			}
		});

		await raiseForStatus(response);

		return await response.json();
	}

	async assertFolderWasDeleted(folderId: string): Promise<void> {
		try {
			const response = await this.getFolderById({ folderId });
			expect(response.id).toBeFalsy();
		} catch (error) {
			if (error instanceof NetworkError) {
				expect(error.status).toBe(404);
				return;
			} else {
				throw error;
			}
		}
	}

}
