export type PartType = "Listening" | "Reading";

// Existing Question interface - updated with optional URLs
export interface Question {
    id: string;
    part: number; // Part number the question belongs to
    type: PartType; // Listening or Reading
    question: string; // The question text or description
    options: string[]; // Array of possible answers (e.g., A, B, C, D)
    answer: string; // The correct option from the options array
    imageURL?: string; // Optional: URL for image (e.g., Part 1)
    audioURL?: string; // Optional: URL for audio (e.g., Listening parts)
    // Add other potential fields like passage (Reading) if needed
}

// New interface for a single part within the lessonsList
export interface TOEICTestPart {
    partNumber: number;
    type: PartType;
    questions: Question[]; // Array of questions for this part
}

// New interface for the overall generated test structure
export interface GeneratedTest {
    uid: string; // Unique ID for the test
    title: string; // Title of the test
    createdAt: Date; // Creation date
    lessonsList: TOEICTestPart[]; // Array containing all 7 parts
}

// Optional: Keep the old TOEICTest type if it's used elsewhere,
// otherwise, you might consider removing or renaming it to avoid confusion.
// export interface TOEICTest {
//     [partNumber: string]: Question[];
// }
