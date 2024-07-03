import { APIRequestContext } from "@playwright/test";
import { foldersUrl } from "../data/urls/apiUrls";
import { raiseForStatus } from "../helpers/apiHelpers";
import { GetFolderResponse } from "../typedefs/api/folder.typedefs";

export async function getFolders(request: APIRequestContext): Promise<GetFolderResponse> {
	const response = await request.get(foldersUrl.folders);

	await raiseForStatus(response);

	return (await response.json()).data;
}