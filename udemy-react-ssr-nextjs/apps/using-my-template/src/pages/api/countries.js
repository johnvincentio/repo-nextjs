
const countries = [
	{
		label: 'us',
		name: 'United States',
	},
	{
		label: 'br',
		name: 'Brazil',
	}
]

export default (req, res) => {
	res.statusCode = 200;
	res.json(countries);
}
