export default function () {
	process.env.BASE_URL = process.env.BASE_URL.replace("[ENV]", process.env.ENV);

	console.log(`Base url was initialized - ${process.env.BASE_URL}`);
}
