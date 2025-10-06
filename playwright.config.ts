import { AzureReporterOptions } from "@alex_neo/playwright-azure-reporter/dist/playwright-azure-reporter";
import { defineConfig, devices } from "@playwright/test";
import * as process from "node:process";


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./src/tests",
	/* Run tests in files in parallel */
	fullyParallel: false,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : 1,
	timeout: 100 * 1000,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		["html", { open: "never" }],
		// ["allure-playwright"],
		// [
		// 	"@alex_neo/playwright-azure-reporter",
		// 	{
		// 		orgUrl: "https://dev.azure.com/Dooblo",
		// 		token: process.env.AZURE_TOKEN,
		// 		planId: 48439,
		// 		projectName: "Survey Designer",
		// 		environment: "AQA",
		// 		testRunTitle: "Playwright Test Run",
		// 		publishTestResultsMode: "testRun",
		// 		uploadAttachments: true,
		// 		attachmentsType: ["screenshot", "video", "trace"],
		// 		testRunConfig: {
		// 			owner: {
		// 				displayName: "Marina Bidenko",
		// 			},
		// 			comment: "Playwright Test Run",
		// 			configurationIds: [7],
		// 		},
		// 	} as AzureReporterOptions,
		// ],
		["./node_modules/@testomatio/reporter/lib/adapter/playwright.js", {
			apiKey: process.env.TESTOMATIO,
		}]
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	globalSetup: require.resolve("./env-setup.ts"),
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.BASE_URL,
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},

	/* Configure projects for major browsers */
	projects: [
		{ name: "setup", testMatch: /.*\.setup\.ts/, teardown: "teardown" },
		{ name: "teardown", testMatch: /.*\.teardown\.ts/ },
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
			},
			dependencies: ["setup"],
			// timeout: 10 * 1000,
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
			dependencies: ["setup"],
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
			dependencies: ["setup"],
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
