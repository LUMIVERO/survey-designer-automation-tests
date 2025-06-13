import { Endpoint } from "@api/abstractEndpoint";
import { raiseForStatus } from "@helpers/api.helpers";
import { expect } from "@playwright/test";
import {
	GetFolderResponse,
	DeleteFolderOptions,
	CreateFolderOptions,
	FolderResponse,
	GetFolderOptions
} from "@typedefs/api/folder.typedefs";
import { NetworkError } from "@typedefs/api/request.typedefs";
import { foldersUrl } from "src/constants/urls/apiUrls";

export class Folder extends Endpoint {
	readonly url = foldersUrl.root;

	async getFolders(): Promise<GetFolderResponse> {
		const response = await this.request.get(this.url);

		await raiseForStatus(response);

		return response.json();
	}

	async getFolderById({ folderId }: GetFolderOptions): Promise<FolderResponse> {
		const response = await this.request.get(this.detailsUrl(folderId));

		await raiseForStatus(response);

		return await response.json();
	}

	async deleteFolder(
		{ folderId }: DeleteFolderOptions
	): Promise<void> {

		const response = await this.request.delete(this.detailsUrl(folderId));

		await raiseForStatus(response);
	}

	async createFolder(
		options: CreateFolderOptions
	): Promise<FolderResponse> {

		const response = await this.request.post(this.url, {
			data: {
				...options,
				index: 0,
			}
		});

		await raiseForStatus(response);

		return await response.json();
	}

	async assertFolderWasDeleted({ folderId }: DeleteFolderOptions): Promise<void> {
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
