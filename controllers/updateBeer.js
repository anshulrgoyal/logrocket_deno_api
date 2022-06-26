import { updateBeer } from "../services/beerService.js";

export default async ({ params, request, response }) => {
	const beerId = params.id;

	if (!beerId) {
		response.status = 400;
		response.body = { msg: "Invalid beer id" };
		return;
	}

	if (!request.hasBody) {
		response.status = 400;
		response.body = { msg: "Invalid beer data" };
		return;
	}

	const body =  request.body();

	const beer = await body.value

	await updateBeer(beerId, beer);

	response.body = { msg: "Beer updated" };
};
