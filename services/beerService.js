import beerRepo from "../repositories/beerRepo.js";

export const getBeers = async () => {
	const beers = await beerRepo.selectAll();

	return beers.rows.map(beer => {
		return 	beers.rowDescription.columns.reduce((acc,el, i) => {
			acc[el.name] = beer[i];
			return acc
		},{});
	});
};

export const getBeer = async beerId => {
	const beers = await beerRepo.selectById(beerId)
	if(!beers || beers?.length===0) return null
	return beers.rowDescription.columns.reduce((acc,el, i) => {
			acc[el.name] = beers.rows[0][i];
			return acc
		},{});
};

export const createBeer = async beerData => {
	const newBeer = {
		name: String(beerData.name),
		brand: String(beerData.brand),
		is_premium: "is_premium" in beerData ? Boolean(beerData.is_premium) : false,
		registration_date: new Date()
	};

	await beerRepo.create(newBeer);

	return newBeer.id;
};

export const updateBeer = async (beerId, beerData) => {
	const beer = await getBeer(beerId);


	if (Object.keys(beer).length === 0 && beer.constructor === Object) {
		throw new Error("Beer not found");
	}

	const updatedBeer = {...beer,...beerData};

	beerRepo.update(beerId, updatedBeer);
};

export const deleteBeer = async beerId => {
	beerRepo.delete(beerId);
};
