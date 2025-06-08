export const formatDate = (dateString: string | null): string => {
	if (!dateString) return "";

	const date = new Date(dateString);
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
};

export const formatDateToISO = (dateString: string): string => {
	if (!dateString) return "";

	const [day, month, year] = dateString.split("/");
	return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const countTestParts = (array: any[]): number => {
	if (!array) return 0;
	return array.length;
};

export const capitalizeFirstLetter = (word: string): string => {
	// 1. Check if the string is empty or null/undefined
	if (!word) {
		return "";
	}

	// 2. Take the first character and make it uppercase
	const firstLetter = word.charAt(0).toUpperCase();

	// 3. Take the rest of the string (from the second character onwards)
	const restOfString = word.slice(1);

	// 4. Concatenate them and return the result
	return `${firstLetter}${restOfString}`;
};
