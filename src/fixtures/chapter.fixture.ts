import { ChapterResponse, CreateChapterOptions } from "@typedefs/api/chapter.typedefs";
import { getChapterData } from "src/testData/chapter.data";
import { test as base } from "./survey.fixture";

export const test = base.extend<{
	chapterData: CreateChapterOptions;
	chapter: ChapterResponse;
}>({
	chapterData: async ({ survey }, use) => {
		await use(getChapterData(survey.id, survey.chapters[0].id));
	},
	chapter: async ({ apiService, chapterData }, use) => {
		const chapter = await apiService.chapter.createChapter(chapterData);

		await use(chapter);
		await apiService.chapter.deleteChapter({ chapterId: chapter.id });
	},
});