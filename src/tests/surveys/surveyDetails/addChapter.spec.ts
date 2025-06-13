import { test } from "@fixtures/testScope.fixture";
import { Chapter } from "@ui/components/questions/chapter";
import { chaptersUrl } from "src/constants/urls/apiUrls";

test.describe("Create chapter", async () => {
	test.beforeEach(async ({ adminAPP, survey }) => {
		await adminAPP.surveyDetailsPage.visit(survey.id);
		await adminAPP.surveyDetailsPage.waitForOpened();
	});

	test("User can create and delete a chapter in the root chapter", async ({ adminAPP }) => {
		const chapterName = Chapter.defaultChapterName;
		const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		await sidePanel.getChapter().clickAddNewBtn()
			.then(menu => menu.clickActionBtn("addChapterOption", { waitForResponse: true }));
		await sidePanel.assertChaptersCount(2);
		await sidePanel.getChapter(chapterName).assertIsVisible();
		await adminAPP.surveyDetailsPage.assertChaptersCount(2);
		const chapter = adminAPP.surveyDetailsPage.getChapter(chapterName);
		await chapter.assertChapterIsVisible();

		await chapter.clickThreeDotsBtn()
			.then(menu => menu.clickDeleteButton());
		await adminAPP.surveyDetailsPage.dialog.assertDialogHeaderIsCorrect("Delete Chapter");
		await adminAPP.surveyDetailsPage.dialog.clickSubmitBtn({
			waitForResponse: true,
			callback: async (resp) => new RegExp(chaptersUrl.root).test(resp.url()) && resp.request().method() === "DELETE",
		});

		await sidePanel.assertChaptersCount(1);
		await chapter.assertChapterIsVisible({ visible: false });
	});

	test("User can delete a chapter from side panel", async ({ adminAPP, apiService, chapterData }) => {
		const chapterName = Chapter.defaultChapterName;
		await apiService.chapter.createChapter({ ...chapterData, name: chapterName });

		const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
		await sidePanel.getChapter(chapterName).clickThreeDotsBtn()
			.then(menu => menu.clickActionBtn("deleteBtn"));

		await adminAPP.surveyDetailsPage.dialog.assertDialogHeaderIsCorrect("Delete Chapter");
		await adminAPP.surveyDetailsPage.dialog.clickSubmitBtn({
			waitForResponse: true,
			callback: async (resp) => new RegExp(chaptersUrl.root).test(resp.url()) && resp.request().method() === "DELETE",
		});

		await sidePanel.assertChaptersCount(1);
		await adminAPP.surveyDetailsPage.getChapter(chapterName)
			.assertChapterIsVisible({ visible: false });
	});

	test("User can create and delete a chapter in the subchapter", async ({ adminAPP, chapter }) => {
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

		await subchapter.clickThreeDotsBtn()
			.then(menu => menu.clickDeleteButton());
		await adminAPP.surveyDetailsPage.dialog.assertDialogHeaderIsCorrect("Delete Chapter");
		await adminAPP.surveyDetailsPage.dialog.clickSubmitBtn({
			waitForResponse: true,
			callback: async (resp) => new RegExp(chaptersUrl.root).test(resp.url()) && resp.request().method() === "DELETE",
		});
		await subchapter.assertChapterIsVisible({ visible: false });
	});

	test("User can rename a chapter", async ({ adminAPP, chapter }) => {
		adminAPP.surveyDetailsPage.getChapter(chapter.name)
	});

	// test("User can create, rename and delete a chapter", async ({ adminAPP, apiService }) => {
	// 	const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
	// 	await sidePanel.getChapter().clickAddNewBtn()
	// 		.then(popup => popup.selectOption("addChapterOption", { waitForResponse: true }));
	// 	await sidePanel.assertChaptersCount(2);
	// 	await adminAPP.surveyDetailsPage.assertChaptersCount(2);
	//
	// 	let chapter = adminAPP.surveyDetailsPage.getChapter(adminAPP.surveyDetailsPage.lastChapterName);
	// await chapter.assertChapterIsVisible();
	//
	// const newChapterName = getRandomName("ChapterAUT");
	// chapter = await chapter.renameChapter(newChapterName);
	// await chapter.assertChapterIsVisible();
	//
	// await adminAPP.surveyDetailsPage.clickSidePanelBtn();
	// await sidePanel.getChapter(newChapterName).clickAddNewBtn();
	// await addQuestionBtn.click();
	//
	// const [, resp] = await waitAfterAction(
	// 	async () => await adminAPP.surveyDetailsPage.clickQuestionTypeButton(QuestionType.RadioButton),
	// 	async () => await adminAPP.page.waitForResponse(new RegExp(questionsUrl.questions)),
	// );
	//
	// const { id: questionId } = await resp.json() as QuestionResponse;
	// const question = adminAPP.surveyDetailsPage.getFirstQuestion(QuestionType.RadioButton);
	// await question.assertIsVisible();
	// await adminAPP.surveyDetailsPage.clickSidePanelBtn();
	//
	// await chapter.clickTreeDotsBtn();
	// await chapter.actionsMenu.waitFor();
	// await chapter.actionsMenu.clickDeleteBtn();
	// await adminAPP.surveyDetailsPage.dialog.waitForDialogVisible();
	// await adminAPP.surveyDetailsPage.dialog.clickSubmitBtn();
	// await adminAPP.surveyDetailsPage.dialog.waitForDialogHidden();
	// await chapter.assertChapterIsVisible({ visible: false });
	// await question.assertIsVisible(false);
	//
	// expect(
	// 	await apiService.question.checkQuestionDoesNotExist({ questionId }),
	// ).toBeTruthy();
	// });

	// test("User can create question in root chapter, add subchapter and question to it", async ({ adminAPP }) => {
	// 	const sidePanel = await adminAPP.surveyDetailsPage.clickSidePanelBtn();
	// 	await sidePanel.getChapter().clickAddNewBtn()
	// 		.then(popup => popup.selectOption("addChapterOption", { waitForResponse: true }));
	//
	// 	await waitAfterAction(
	// 		async () => await adminAPP.surveyDetailsPage.clickQuestionTypeButton(QuestionType.List),
	// 		async () => await adminAPP.page.waitForResponse(new RegExp(questionsUrl.questions)),
	// 	);
	// 	const question1 = adminAPP.surveyDetailsPage.getFirstQuestion(QuestionType.List);
	// 	await question1.assertIsVisible();
	//
	// 	await sidePanel.getChapter().clickAddNewBtn();
	// 	await clickAddChapterBtn();
	// 	await adminAPP.surveyDetailsPage.clickSidePanelBtn();
	//
	// 	await expect(async () => {
	// 		expect(await adminAPP.surveyDetailsPage.chaptersContainers.count()).toEqual(adminAPP.surveyDetailsPage.chaptersCount);
	// 	}).toPass({ timeout: 2000 });
	// 	let chapter = adminAPP.surveyDetailsPage.getChapter(adminAPP.surveyDetailsPage.lastChapterName);
	// 	await chapter.assertChapterIsVisible();
	//
	// 	await adminAPP.surveyDetailsPage.clickSidePanelBtn();
	// 	await sidePanel.getChapter(adminAPP.surveyDetailsPage.lastChapterName).clickAddNewBtn();
	// 	await addQuestionBtn.click();
	//
	// 	await waitAfterAction(
	// 		async () => await adminAPP.surveyDetailsPage.clickQuestionTypeButton(QuestionType.RadioButton),
	// 		async () => await adminAPP.page.waitForResponse(new RegExp(questionsUrl.questions)),
	// 	);
	//
	// 	const question2 = adminAPP.surveyDetailsPage.getFirstQuestion(QuestionType.RadioButton);
	// 	await question2.assertIsVisible();
	// 	await adminAPP.surveyDetailsPage.clickSidePanelBtn();
	//
	// 	await chapter.clickTreeDotsBtn();
	// 	await chapter.actionsMenu.waitFor();
	// 	await chapter.actionsMenu.clickDeleteBtn();
	// 	await adminAPP.surveyDetailsPage.dialog.waitForDialogVisible();
	// 	await adminAPP.surveyDetailsPage.dialog.clickSubmitBtn();
	// 	await adminAPP.surveyDetailsPage.dialog.waitForDialogHidden();
	// 	await chapter.assertChapterIsVisible({ visible: false });
	// 	await question2.assertIsVisible(false);
	// 	await question1.assertIsVisible(true);
	// });
});