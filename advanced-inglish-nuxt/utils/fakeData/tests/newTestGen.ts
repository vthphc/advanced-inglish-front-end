// src/generateFakeData.ts

import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// --- 1. Define TypeScript Types ---

// Define specific types for fields with limited options
type QuestionType = "Reading" | "Listening";
type Difficulty = "Easy" | "Medium" | "Hard";

// Define the main Question interface based on the Mongoose schema
interface Question {
    _id?: string; // Optional: If you want to simulate MongoDB IDs
    type: QuestionType;
    content: string;
    audioURL?: string | null; // Optional, especially for Reading
    imageURL?: string | null; // Optional
    difficulty: Difficulty;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string | null; // Optional
}

// --- 2. Generation Function ---

const generateFakeQuestion = (): Question => {
    const questionType = faker.helpers.arrayElement<QuestionType>([
        "Reading",
        "Listening",
    ]);
    const difficulty = faker.helpers.arrayElement<Difficulty>([
        "Easy",
        "Medium",
        "Hard",
    ]);

    let content: string;
    let audioURL: string | null = null;

    // Generate content and audioURL based on type
    if (questionType === "Listening") {
        content = faker.lorem.sentence({ min: 5, max: 15 }); // Shorter instructions for listening
        // Generate a fake audio URL (can customize pattern)
        audioURL = `${faker.internet.url()}/${faker.system.commonFileName(
            "mp3"
        )}`;
    } else {
        // Reading
        content = faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })); // Longer text for reading
    }

    // Generate 4 multiple choice options
    const options = Array.from(
        { length: 4 },
        () => faker.lorem.sentence({ min: 3, max: 10 }).replace(/\.$/, "") // Remove trailing period
    );

    // Select one option as the correct answer
    const correctAnswer = faker.helpers.arrayElement(options);

    // Optionally add an image URL (e.g., 25% chance)
    const imageURL =
        faker.helpers.maybe(
            () => faker.image.urlLoremFlickr({ category: "business" }),
            { probability: 0.25 }
        ) ?? null;

    // Generate the main question text
    const questionText = `${faker.lorem
        .sentence({ min: 5, max: 15 })
        .replace(/\.$/, "")}?`; // Ensure it ends with a question mark

    // Optionally add an explanation (e.g., 60% chance)
    const explanation =
        faker.helpers.maybe(() => faker.lorem.sentence({ min: 10, max: 25 }), {
            probability: 0.6,
        }) ?? "No explanation provided."; // Provide default if none generated

    // Construct the question object
    const fakeQuestion: Question = {
        _id: faker.string.uuid(), // Simulate a MongoDB ObjectId (use string UUID for simplicity)
        type: questionType,
        content: content,
        audioURL: audioURL, // Will be null for Reading type
        imageURL: imageURL,
        difficulty: difficulty,
        question: questionText,
        options: options,
        correctAnswer: correctAnswer,
        explanation: explanation,
    };

    return fakeQuestion;
};

// --- 3. Generate Multiple Questions ---

const generateMultipleQuestions = (count: number): Question[] => {
    const questions: Question[] = [];
    console.log(`Generating ${count} fake questions...`);
    for (let i = 0; i < count; i++) {
        questions.push(generateFakeQuestion());
        // Log progress for large numbers
        if ((i + 1) % 100 === 0) {
            console.log(`Generated ${i + 1}/${count} questions...`);
        }
    }
    console.log(`Finished generating ${count} questions.`);
    return questions;
};

// --- 4. Write to File ---

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const writeDataToFile = (data: Question[], filename: string): void => {
    const outputDir = path.dirname(filename);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Created directory: ${outputDir}`);
    }

    const jsonData = JSON.stringify(data, null, 2); // Pretty print JSON with 2 spaces indentation

    try {
        fs.writeFileSync(filename, jsonData, "utf-8");
        console.log(
            `Successfully wrote ${data.length} fake questions to ${filename}`
        );
    } catch (error) {
        console.error(`Error writing data to file ${filename}:`, error);
    }
};

// --- 5. Main Execution ---

const now = new Date();
const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
const formattedTime = `${now.getHours().toString().padStart(2, "0")}-${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}-${now.getSeconds().toString().padStart(2, "0")}`;
const timestamp = `${formattedDate}_${formattedTime}`;

const filename = `toeic_test_${timestamp}.json`;

const NUMBER_OF_QUESTIONS_TO_GENERATE = 100; // <--- Set how many questions you want
const OUTPUT_FILENAME = path.join(__dirname, "testBank", filename); // <--- Set output path (e.g., project_root/output/...)

const fakeQuestionsData = generateMultipleQuestions(
    NUMBER_OF_QUESTIONS_TO_GENERATE
);
writeDataToFile(fakeQuestionsData, OUTPUT_FILENAME);
