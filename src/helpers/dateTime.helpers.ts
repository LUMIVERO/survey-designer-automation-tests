export function isTimeWithinTolerance(actualTime: Date, expectedTime: Date, toleranceInSeconds: number): boolean {
	const diffInSeconds = Math.abs((actualTime.getTime() - expectedTime.getTime()) / 1000);
	return diffInSeconds <= toleranceInSeconds;
}
