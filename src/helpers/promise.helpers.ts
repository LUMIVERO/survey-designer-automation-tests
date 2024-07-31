export async function waitForPromise<T>(
	action: () => Promise<T>,
	promise: () => Promise<void>,
): Promise<T> {
	const waiting = promise();
	const result = await action();
	await waiting;

	return result;
}