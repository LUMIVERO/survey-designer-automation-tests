export async function waitAfterAction<T>(
	action: () => Promise<T>,
	waitAfter: () => Promise<void>,
): Promise<T> {
	const promise = waitAfter();
	const result = await action();
	await promise;

	return result;
}