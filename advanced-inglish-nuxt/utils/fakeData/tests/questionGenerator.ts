// questionGenerator.ts
import { faker } from "@faker-js/faker";
import type { Question, PartType } from "./types";

export function generateFakeQuestion(part: number, type: PartType): Question {
    const options = faker.helpers.uniqueArray(() => faker.word.noun(), 4);
    const questionBase: Question = {
        id: faker.string.uuid(),
        part,
        type,
        question: faker.lorem.sentence({ min: 5, max: 15 }), // Slightly longer questions
        options,
        answer: faker.helpers.arrayElement(options),
    };

    // Conditionally add imageURL for Part 1
    if (part === 1) {
        // Add image URL for ~80% of Part 1 questions
        if (Math.random() < 0.8) {
            questionBase.imageURL = faker.image.urlLoremFlickr({
                category: "business",
                width: 640,
                height: 480,
            });
        }
    }

    // Conditionally add audioURL for Listening parts (Parts 1-4)
    if (type === "Listening") {
        // Add audio URL for ~90% of Listening questions
        if (Math.random() < 0.9) {
            // Using a placeholder - replace with actual audio file generation/hosting if needed
            questionBase.audioURL =
                faker.internet.url({ appendSlash: false, protocol: "https" }) +
                `/audio_${faker.string.alphanumeric(8)}.mp3`;
        }
    }

    // Add placeholder passage for Reading parts (Parts 5-7) - Example
    // if (type === "Reading") {
    //     questionBase.passage = faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }));
    // }

    return questionBase;
}

export function generatePart(
    part: number,
    type: PartType,
    count: number
): Question[] {
    return Array.from({ length: count }, () =>
        generateFakeQuestion(part, type)
    );
}
