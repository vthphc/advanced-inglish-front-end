import { faker } from "@faker-js/faker";
// Import the new types
import type { GeneratedTest, TOEICTestPart, PartType } from "./types";
import { generatePart } from "./questionGenerator"; // Keep this import

/**
 * Generates one or more TOEIC test structures with fake data.
 * @param count The number of tests to generate. Defaults to 1.
 * @returns A single test object if count is 1, otherwise an array of test objects.
 */
export function generateTOEICTests(
    count: number = 1
): GeneratedTest | GeneratedTest[] {
    const tests: GeneratedTest[] = [];

    // Define configurations for each TOEIC part (adjust numQuestions for realism)
    const partConfigs: {
        partNumber: number;
        type: PartType;
        numQuestions: number;
    }[] = [
        { partNumber: 1, type: "Listening", numQuestions: 6 },
        { partNumber: 2, type: "Listening", numQuestions: 25 },
        { partNumber: 3, type: "Listening", numQuestions: 39 },
        { partNumber: 4, type: "Listening", numQuestions: 30 },
        { partNumber: 5, type: "Reading", numQuestions: 30 },
        { partNumber: 6, type: "Reading", numQuestions: 16 },
        { partNumber: 7, type: "Reading", numQuestions: 54 }, // Combines single, double, triple passages
    ];

    for (let i = 0; i < count; i++) {
        // Generate the list of lessons (parts) for the current test
        const lessonsList: TOEICTestPart[] = partConfigs.map((config) => ({
            partNumber: config.partNumber,
            type: config.type,
            // generatePart from questionGenerator.ts creates the questions array
            questions: generatePart(
                config.partNumber,
                config.type,
                config.numQuestions
            ),
        }));

        // Assemble the complete test object
        const test: GeneratedTest = {
            uid: faker.string.uuid(),
            title: `TOEIC Practice Test - ${faker.word.adjective()} Set #${
                i + 1
            }`,
            createdAt: faker.date.past({ years: 1 }), // Generate a date within the last year
            lessonsList: lessonsList,
        };
        tests.push(test);
    }

    // Return a single object if only one test was requested, otherwise the full array
    return count === 1 ? tests[0] : tests;
}

// Remove or comment out the old function if no longer needed
// export function generateTOEICTest(): TOEICTest {
//     return {
//         Part1: generatePart(1, "Listening", 10),
//         Part2: generatePart(2, "Listening", 10),
//         Part3: generatePart(3, "Listening", 10),
//         Part4: generatePart(4, "Listening", 10),
//         Part5: generatePart(5, "Reading", 10),
//         Part6: generatePart(6, "Reading", 10),
//         Part7: generatePart(7, "Reading", 10),
//     };
// }
