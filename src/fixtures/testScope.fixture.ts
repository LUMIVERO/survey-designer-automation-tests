import { mergeTests } from "@playwright/test";
import { test as application } from "./application.fixture";
import { test as survey } from "./survey.fixture";

export const test = mergeTests(application, survey);
