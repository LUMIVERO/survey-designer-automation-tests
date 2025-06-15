import { ChapterResponse, CreateChapterOptions } from "@typedefs/api/chapter.typedefs";
import { test as base } from "./survey.fixture";

export const test = base.extend<{
	chapterData: CreateChapterOptions;
	chapter: ChapterResponse;
}>({
	chapterData: async ({ survey }, use) => {
		await use({
			name: "Auto-chapter",
			index: 0,
			surveyId: survey.id,
			parentChapterId: survey.chapters[0].id,
			description: "Automation",
		});
	},
	chapter: async ({ apiService, chapterData }, use) => {
		const chapter = await apiService.chapter.createChapter(chapterData);

		await use(chapter);
		await apiService.chapter.deleteChapter({ chapterId: chapter.id });
	},
});