import { getRandomName } from "@helpers/random.helpers";
import { ChapterResponse, CreateChapterOptions } from "@typedefs/api/chapter.typedefs";
import { FolderResponse, CreateFolderOptions } from "@typedefs/api/folder.typedefs";
import { SurveyResponse } from "@typedefs/api/survey.typedefs";
import { UUID } from "node:crypto";
import { test as base } from "./workerScope.fixture";

export const test = base.extend<{
	chapterData: CreateChapterOptions;
	survey: SurveyResponse;
	rootFolder: FolderResponse;
	newFolder: (options?: Partial<CreateFolderOptions>) => Promise<FolderResponse>;
	chapter: ChapterResponse;
}>({
	rootFolder: async ({ apiService }, use) => {
		const { items: [folder] } = await apiService.folder.getFolders();
		await use(folder);
	},
	survey: async ({ apiService, rootFolder }, use) => {
		const name: string = getRandomName("SurveyAUT");
		const survey = await apiService.survey.createSurvey({
			name, folderId: rootFolder.id,
		});

		await use(survey);
		await apiService.survey.deleteSurvey({ surveyId: survey.id });
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