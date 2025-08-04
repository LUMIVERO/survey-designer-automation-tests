import { Chapter as ChapterApiManager } from "@api/managers";
import { test } from "@fixtures/testScope.fixture";
import { getRandomName } from "@helpers/random.helpers";
import { Chapter } from "@ui/components/questions/chapter";
import { chaptersUrl } from "src/constants/urls/apiUrls";
import { getQuestionData } from "src/testData/question.data";

test.describe("Chapter @Se1e770f9", async () => {
	test.beforeEach(async ({ adminAPP, survey }) => {
		await adminAPP.surveyDetailsPage.visit(survey.id);
		await adminAPP.surveyDetailsPage.waitForOpened();
	});

	test("User can create and delete a chapter in the root chapter from sidebar @T49dbd2d5", async ({ adminAPP }) => {
		const chapterName = Chapter.defaultChapterName;
		const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		await sidePanel.getChapter().clickAddNewBtn()
			.then(menu => menu.clickActionBtn("addChapterOption", { waitForResponse: true }));
		await sidePanel.assertChaptersCount(2);
		const sidePanelChapter = sidePanel.getChapter(chapterName);
		await sidePanelChapter.assertIsVisible();
		await adminAPP.surveyDetailsPage.assertChaptersCount(2);

		const chapter = adminAPP.surveyDetailsPage.getChapter(chapterName);
		await chapter.assertChapterIsVisible();

		await sidePanelChapter.clickThreeDotsBtn()
			.then(menu => menu.clickActionBtn("deleteBtn"));
		await adminAPP.surveyDetailsPage.dialog.assertDialogHeaderIsCorrect("Delete Chapter");
		await adminAPP.surveyDetailsPage.dialog.clickSubmitBtn({
			waitForResponse: true,
			callback: async (resp) => new RegExp(chaptersUrl.root).test(resp.url()) && resp.request().method() === "DELETE",
		});

		await sidePanel.assertChaptersCount(1);
		await chapter.assertChapterIsVisible({ visible: false });
	});

	test("User can create and delete a chapter in the subchapter from sidebar @Tfd743665", async ({
		adminAPP,
		chapter,
	}) => {
		const chapterName = Chapter.defaultChapterName;
		const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		const sidePanelChapter = sidePanel.getChapter(chapter.name);
		await sidePanelChapter.clickAddNewBtn()
			.then(menu => menu.clickActionBtn("addChapterOption", { waitForResponse: true }));
		await sidePanelChapter.expand();

		await sidePanel.assertChaptersCount(3);
		await sidePanelChapter.getSubChapter(chapterName)
			.then(chapter => chapter.assertIsVisible());
		await adminAPP.surveyDetailsPage.assertChaptersCount(3);
		const subchapter = adminAPP.surveyDetailsPage.getChapter(chapterName);
		await subchapter.assertChapterIsVisible();

		await sidePanel.getChapter(chapterName).clickThreeDotsBtn()
			.then(menu => menu.clickActionBtn("deleteBtn"));
		await adminAPP.surveyDetailsPage.dialog.assertDialogHeaderIsCorrect("Delete Chapter");
		await adminAPP.surveyDetailsPage.dialog.clickSubmitBtn({
			waitForResponse: true,
			callback: ChapterApiManager.isChaptersDeleteRequest,
		});
		await subchapter.assertChapterIsVisible({ visible: false });
	});

	test("User can create and delete a second chapter in the root chapter from sidebar @T9e4599eb", async ({
		adminAPP,
		chapter: first,
	}) => {
		const chapterName = "Chapter #2";
		const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		await sidePanel.getChapter().clickAddNewBtn()
			.then(menu => menu.clickActionBtn("addChapterOption", { waitForResponse: true }));
		await sidePanel.assertChaptersCount(3);
		const sidePanelChapter = sidePanel.getChapter(chapterName);
		await sidePanelChapter.assertIsVisible();
		await adminAPP.surveyDetailsPage.assertChaptersCount(3);

		const chapter = adminAPP.surveyDetailsPage.getChapter(chapterName);
		await chapter.assertChapterIsVisible();

		await sidePanelChapter.clickThreeDotsBtn()
			.then(menu => menu.clickActionBtn("deleteBtn"));
		await adminAPP.surveyDetailsPage.dialog.assertDialogHeaderIsCorrect("Delete Chapter");
		await adminAPP.surveyDetailsPage.dialog.clickSubmitBtn({
			waitForResponse: true,
			callback: async (resp) => new RegExp(chaptersUrl.root).test(resp.url()) && resp.request().method() === "DELETE",
		});

		await sidePanel.assertChaptersCount(2);
		await chapter.assertChapterIsVisible({ visible: false });
	});

	test("User can rename a root chapter @T68019e22", async ({ adminAPP }) => {
		const newChapterName = getRandomName("ChapterAUT");
		const chapterElement = adminAPP.surveyDetailsPage.getChapter();
		await chapterElement.renameChapter(newChapterName);
		await chapterElement.assertChapterName(newChapterName);

		const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		await sidePanel.getChapter(newChapterName).assertChapterName(newChapterName);
	});

	test("User can rename a subchapter @T003c8264", async ({ adminAPP, chapter }) => {
		const newChapterName = getRandomName("ChapterAUT");
		const chapterElement = await adminAPP.surveyDetailsPage.getChapter(chapter.name)
			.renameChapter(newChapterName);
		await chapterElement.assertChapterName(newChapterName);

		const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		await sidePanel.getChapter(newChapterName).assertChapterName(newChapterName);
		await sidePanel.getChapter(chapter.name).assertIsVisible({ visible: false });
	});

	test("User can rename a chapter from rich text dialog @Td58e20a8", async ({ adminAPP, chapter }) => {
		const newChapterName = getRandomName("ChapterAUT");
		const dialog = await adminAPP.surveyDetailsPage.getChapter(chapter.name)
			.clickEditBtn();
		await dialog.fill(newChapterName);
		await dialog.clickSubmitBtn();

		await adminAPP.surveyDetailsPage.getChapter(newChapterName)
			.assertChapterName(newChapterName);
		const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		await sidePanel.getChapter(newChapterName).assertChapterName(newChapterName);
		await sidePanel.getChapter(chapter.name).assertIsVisible({ visible: false });
	});

	test("User can delete a chapter from main area @T80239320", async ({ adminAPP, apiService, chapterData }) => {
		const chapterName = Chapter.defaultChapterName;
		await apiService.chapter.createChapter({ ...chapterData, name: chapterName });

		await adminAPP.surveyDetailsPage.getChapter(chapterName).clickThreeDotsBtn()
			.then(menu => menu.clickDeleteButton());

		await adminAPP.surveyDetailsPage.dialog.assertDialogHeaderIsCorrect("Delete Chapter");
		await adminAPP.surveyDetailsPage.dialog.clickSubmitBtn({
			waitForResponse: true,
			callback: ChapterApiManager.isChaptersDeleteRequest,
		});

		await adminAPP.surveyDetailsPage.getChapter(chapterName)
			.assertChapterIsVisible({ visible: false });
	});

	test("User can delete a chapter with subchapter and question @Tf82cbe8a", async ({
		chapterData,
		apiService,
		adminAPP,
	}) => {
		const { id: chapterId, name: chapterName } = await apiService.chapter.createChapter(chapterData);
		const { id: subchapterId } = await apiService.chapter.createChapter({
			...chapterData,
			parentChapterId: chapterId,
			name: getRandomName("Sub-Chapter"),
		});
		const { id: questionId } = await apiService.question.createQuestion(getQuestionData(chapterId));

		const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		const sidePanelChapter = sidePanel.getChapter(chapterName);
		const chapter = adminAPP.surveyDetailsPage.getChapter(chapterName);
		await chapter.assertChapterIsVisible();

		await sidePanelChapter.clickThreeDotsBtn()
			.then(menu => menu.clickActionBtn("deleteBtn"));
		await adminAPP.surveyDetailsPage.dialog.assertDialogHeaderIsCorrect("Delete Chapter");
		await adminAPP.surveyDetailsPage.dialog.clickSubmitBtn({
			waitForResponse: true,
			callback: ChapterApiManager.isChaptersDeleteRequest,
		});

		await sidePanel.assertChaptersCount(1);
		await chapter.assertChapterIsVisible({ visible: false });
		await apiService.chapter.assertChapterDoesNotExist({ chapterId });
		await apiService.chapter.assertChapterDoesNotExist({ chapterId: subchapterId });
		await apiService.question.assertQuestionDoesNotExist({ questionId });
	});
});