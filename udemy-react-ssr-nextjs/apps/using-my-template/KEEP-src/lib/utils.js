//

export default function capitalize(s) {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
}

export function createName(s) {
	if (typeof s !== 'string') return '';
	const arr = [];
	s.split('-').forEach((item) => {
		arr.push(this.capitalize(item));
	});
	const result = arr.join('');
	// console.log('createName; result ', result);
	return result;
}

export function improveText(s, replacement) {
	if (typeof s !== 'string') return '';
	const arr = [];
	s.split(' ').forEach((item) => {
		arr.push(capitalize(item));
	});
	return arr.join(replacement);
}

export function splitter(str) {
	// const result = str.match(/^([\d]{4}-[\d]{2}-[\d]{2})$/);
	// const result = str.match(/^([\d]{4}-[\d]{2}-[\d]{2})(.+)$/);
	// const result = str.match(/^([\d]{4}-[\d]{2}-[\d]{2}-)(.+)$/);
	const result = str.match(/^([\d]{4}-[\d]{2}-[\d]{2})-(.+)$/);
	return result;
}

function getMonth(date) {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	return months[date.getMonth()];
}

export function formatDate(date) {
	return `${getMonth(date)} ${date.getDate()}, ${date.getFullYear()}`;
}

export function calculateUnsortedCategories(edges) {
	// console.log('calculateUnsortedCategories; edges ', edges);
	const notSorted = {};
	edges.forEach((edge) => {
		const { category: arrayCat, title, permalink } = edge.node.frontmatter;
		// console.log('arrayCat ', arrayCat, ' length ', arrayCat.length);
		arrayCat.forEach((arrayItem) => {
			const item = capitalize(arrayItem.toLowerCase());
			const subcat = notSorted[item];
			if (subcat) {
				subcat[permalink] = { title };
			} else {
				const cat = {};
				cat[permalink] = { title };
				notSorted[item] = cat;
			}
		});
	});
	return notSorted;
}

export function calculateCategories(edges) {
	const notSorted = calculateUnsortedCategories(edges);
	// console.log('got a notSorted');

	const categories = Object.keys(notSorted)
		.sort()
		.reduce((acc, key) => {
			// console.log('key ', key, ' acc ', acc);
			// console.log('notSorted[key] ', notSorted[key]);
			const value = notSorted[key];
			// console.log('key ', key, ' value ', value);

			const arrNotSorted = [];
			Object.keys(value).forEach((item) => {
				const itemObj = value[item];
				arrNotSorted.push({ key: item, value: itemObj.title });
			});
			const arr = arrNotSorted.sort((a, b) => a.value.toLowerCase().localeCompare(b.value.toLowerCase()));

			const obj = {};
			obj.count = Object.keys(value).length;
			obj.key = key;
			obj.list = arr;
			return { ...acc, [key]: obj };
		}, {});
	// console.log('categories ', categories);
	return categories;
}
