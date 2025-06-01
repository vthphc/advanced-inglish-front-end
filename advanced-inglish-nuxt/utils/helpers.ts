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
