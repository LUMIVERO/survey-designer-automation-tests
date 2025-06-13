import { Endpoint } from "@api/abstractEndpoint";
import { raiseForStatus } from "@helpers/api.helpers";
import { setQuery } from "@helpers/url.helpers";
import {
	GetChaptersResponse,
	GetChaptersOptions,
	ChapterResponse,
	CreateChapterOptions,
	DeleteChapterOptions,
} from "@typedefs/api/chapter.typedefs";
import { chaptersUrl } from "src/constants/urls/apiUrls";

export class Chapter extends Endpoint {
	readonly url = chaptersUrl.root;

	async createChapter(data: CreateChapterOptions): Promise<ChapterResponse> {
		const response = await this.request.post(this.url, { data });

		await raiseForStatus(response);

		return response.json();
	}

	async getChapters(options: GetChaptersOptions): Promise<GetChaptersResponse> {
		const response = await this.request.get(
			setQuery(this.url, options),
		);

		await raiseForStatus(response);

		return response.json();
	}

	async deleteChapter({ chapterId }: DeleteChapterOptions): Promise<void> {
		const response = await this.request.get(this.detailsUrl(chapterId));
		await raiseForStatus(response);
	}
}
