import client from "../db/database.js";

class BeerRepo {
	create(beer) {
		return client.queryArray
			`INSERT INTO beers (name, brand,is_premium,registration_date) VALUES (${beer.name}, ${beer.brand}, ${beer.is_premium},${beer.registration_date})`;
	}

	selectAll() {
		return client.queryArray`SELECT * FROM beers ORDER BY id`;
	}

	selectById(id) {
		return client.queryArray`SELECT * FROM beers WHERE id = ${id}`;
	}

	update(id, beer) {
		const latestBeer = this.selectById(id);

		return client.queryArray`UPDATE beers SET name = ${beer.name !== undefined ? beer.name : latestBeer.name}, brand = ${beer.brand !== undefined ? beer.brand : latestBeer.brand}, is_premium = ${beer.is_premium !== undefined ? beer.is_premium : latestBeer.is_premium} WHERE id = ${id}`;
	}

	delete(id) {
		return client.queryArray`DELETE FROM beers WHERE id = ${id}`;
	}
}

export default new BeerRepo();
