import { foldersUrl } from "@data/urls/apiUrls";
import { raiseForStatus } from "@helpers/api.helpers";
import { APIRequestContext } from "@playwright/test";
import { GetFolderResponse } from "@typedefs/api/folder.typedefs";

export class Folder {

	constructor(readonly request: APIRequestContext) {
	}

	async getFolders(): Promise<GetFolderResponse> {
		const response = await this.request.get(foldersUrl.folders);

		await raiseForStatus(response);

		return await response.json();
	}
}
