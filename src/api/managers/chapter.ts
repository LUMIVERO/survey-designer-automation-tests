import { Endpoint } from "@api/abstractEndpoint";
import { raiseForStatus } from "@helpers/api.helpers";
import { setQuery } from "@helpers/url.helpers";
import { Response, expect } from "@playwright/test";
import {
	GetChaptersResponse,
	GetChaptersOptions,
	ChapterResponse,
	CreateChapterOptions,
	ChapterDetailsOptions,
} from "@typedefs/api/chapter.typedefs";
import { NetworkError } from "@typedefs/api/request.typedefs";
import { chaptersUrl } from "src/constants/urls/apiUrls";

export class Chapter extends Endpoint {
	readonly url = chaptersUrl.root;

	async createChapter(data: CreateChapterOptions): Promise<ChapterResponse> {
		const response = await this.request.post(this.url, { data });

		await raiseForStatus(response);

		return response.json();
	}

	async getChapterById({ chapterId }: ChapterDetailsOptions): Promise<ChapterResponse> {
		const response = await this.request.get(this.detailsUrl(chapterId));

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

	async deleteChapter({ chapterId }: ChapterDetailsOptions): Promise<void> {
		const response = await this.request.get(this.detailsUrl(chapterId));
		await raiseForStatus(response);
	}

	async assertChapterDoesNotExist(options: ChapterDetailsOptions): Promise<void> {
		try {
			const response = await this.getChapterById(options);
			expect(response.id).toBeUndefined();
		} catch (error) {
			if (error instanceof NetworkError) {
				return expect(error.status).toBe(404);
			}
			throw error;
		}
	}

	static async isChaptersDeleteRequest(resp: Response): Promise<boolean> {
		return new RegExp(chaptersUrl.root).test(resp.url()) && resp.request().method() === "DELETE";
	}
}
