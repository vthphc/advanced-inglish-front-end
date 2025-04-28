import { faker } from "@faker-js/faker";
import * as fs from "fs/promises";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// --- Type Definitions ---

/**
 * Represents the structure for phonetic information of a word.
 */
export interface Phonetic {
    text: string;
    audioURL: string;
}

/**
 * Represents the structure of a Flashcard, mirroring the Mongoose schema.
 */
export interface Flashcard {
    user: string;
    topic: string;
    word: string;
    definition: string;
    example?: string;
    category: string;
    phonetics: Phonetic[];
    createdAt: Date;
}

// --- Data Generation Constants ---

export const CATEGORIES: string[] = [
    "noun",
    "verb",
    "adjective",
    "adverb",
    "preposition",
    "conjunction",
    "interjection",
];

// --- Generation Functions ---

/**
 * Generates a single fake Phonetic object.
 * @returns {Phonetic} A fake phonetic object.
 */
const generateFakePhonetic = (): Phonetic => {
    return {
        text: `/${faker.lorem.slug(1)}/`,
        audioURL: faker.internet.url(),
    };
};

/**
 * Generates a single fake Flashcard object.
 * @returns {Flashcard} A fake flashcard object.
 */
const generateFakeFlashcard = (): Flashcard => {
    const word = faker.lorem.word();
    const hasExample = faker.datatype.boolean();
    const phoneticCount = faker.number.int({ min: 1, max: 2 });

    return {
        user: faker.database.mongodbObjectId(),
        topic: faker.lorem.words(faker.number.int({ min: 1, max: 3 })),
        word: word,
        definition: faker.lorem.sentence(),
        example: hasExample
            ? faker.lorem.sentence(5).replace(".", "") + ` ${word}.`
            : undefined,
        category: faker.helpers.arrayElement(CATEGORIES),
        phonetics: Array.from({ length: phoneticCount }, generateFakePhonetic),
        createdAt: faker.date.past(),
    };
};

/**
 * Generates a specified number of fake flashcards and writes them to a JSON file
 * with a dynamic filename based on the current timestamp in the specified directory.
 * @param {number} count - The number of flashcards to generate.
 * @param {string} outputDir - The directory where the output JSON file should be saved.
 */
const generateAndWriteFlashcards = async (
    count: number,
    outputDir: string // Changed parameter name to reflect it's a directory
): Promise<void> => {
    console.log(`Generating ${count} fake flashcards...`);

    // Generate an array of fake flashcards
    const flashcards: Flashcard[] = Array.from(
        { length: count },
        generateFakeFlashcard
    );

    console.log(`Generated ${flashcards.length} flashcards.`);

    try {
        // Ensure the output directory exists
        await fs.mkdir(outputDir, { recursive: true });

        // Create a timestamp for the filename
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
        const formattedTime = `${now
            .getHours()
            .toString()
            .padStart(2, "0")}-${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}-${now.getSeconds().toString().padStart(2, "0")}`;
        const timestamp = `${formattedDate}_${formattedTime}`;
        const filename = `flashcards_${timestamp}.json`;

        // Construct the full file path
        const fullFilePath = path.join(outputDir, filename);

        // Write the array to the dynamically named JSON file
        await fs.writeFile(fullFilePath, JSON.stringify(flashcards, null, 2)); // Use null, 2 for pretty printing
        console.log(`Successfully wrote fake flashcards to ${fullFilePath}`);
    } catch (error) {
        console.error(
            `Error writing flashcards to directory ${outputDir}:`,
            error
        );
    }
};

// --- Example Usage ---

// Set the number of flashcards you want to generate
const numberOfFlashcardsToGenerate = 50;

// Set the desired output DIRECTORY path (relative to where the script is run)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Define the output directory
const outputDirectoryPath = path.join(__dirname, "flashcardsBank");

// Call the function to generate and write the data to the specified directory
generateAndWriteFlashcards(numberOfFlashcardsToGenerate, outputDirectoryPath); // Pass the directory path

// To run this:
// 1. Make sure you have Node.js and npm/yarn installed.
// 2. Install necessary packages: `npm install typescript @types/node @faker-js/faker --save-dev` (or `yarn add ... -D`)
// 3. Compile the TypeScript: `npx tsc ./utils/fakeData/flashcards/flashcardsGenerator.ts --outDir ./dist` (example compile command)
// 4. Run the compiled JavaScript: `node ./dist/utils/fakeData/flashcards/flashcardsGenerator.js`
// OR use tsx: `npx tsx ./utils/fakeData/flashcards/flashcardsGenerator.ts`
