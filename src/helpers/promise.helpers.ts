export async function waitAfterAction<T, K>(
	action: () => Promise<T>,
	waitAfter: () => Promise<K>,
): Promise<[T, K]> {
	const waiting = waitAfter();
	const result = await action();
	const afterResult = await waiting;

	return [result, afterResult]
}