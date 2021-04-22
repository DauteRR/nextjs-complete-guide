export function removeDuplicatesAndSort<T extends {}>(array: T[], property: keyof T): T[] {
	return array
		.filter((obj, pos, arr) => {
			return arr.map(object => object[property]).indexOf(obj[property]) === pos;
		})
		.sort((first, second) => (first[property] < second[property] ? -1 : 1));
}
