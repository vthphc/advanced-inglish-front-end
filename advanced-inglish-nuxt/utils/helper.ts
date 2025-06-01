// Helper functions for the application
import type {
	GeneratedTest,
	PartType,
	TOEICTestPart,
} from "./fakeData/tests/types";

/**
 * Counts the number of parts in a test, optionally filtering by part type
 * @param test - The test object to count parts from
 * @param type - Optional parameter to filter by part type (Listening or Reading)
 * @returns The count of parts in the test matching the criteria
 */
export function countTestParts(test: GeneratedTest, type?: PartType): number {
	if (!test || !test.lessonsList) {
		return 0;
	}

	// If no type specified, return total number of parts
	if (!type) {
		return test.lessonsList.length;
	}

	// Filter parts by type and return count
	return test.lessonsList.filter((part) => part.type === type).length;
}

/**
 * Gets parts of a specific type from a test
 * @param test - The test object to get parts from
 * @param type - The part type to filter by (Listening or Reading)
 * @returns Array of test parts matching the specified type
 */
export function getTestPartsByType(
	test: GeneratedTest,
	type: PartType
): TOEICTestPart[] {
	if (!test || !test.lessonsList) {
		return [];
	}

	return test.lessonsList.filter((part) => part.type === type);
}

/**
 * Counts the total number of questions in a test, optionally filtering by part type
 * @param test - The test object to count questions from
 * @param type - Optional parameter to filter by part type (Listening or Reading)
 * @returns The count of questions in the test matching the criteria
 */
export function countTestQuestions(
	test: GeneratedTest,
	type?: PartType
): number {
	if (!test || !test.lessonsList) {
		return 0;
	}

	const partsToCount = type
		? test.lessonsList.filter((part) => part.type === type)
		: test.lessonsList;

	return partsToCount.reduce(
		(total, part) => total + part.questions.length,
		0
	);
}
