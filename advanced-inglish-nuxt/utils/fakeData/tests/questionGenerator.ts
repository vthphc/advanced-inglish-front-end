// questionGenerator.ts
import { faker } from "@faker-js/faker";
import type { Question, PartType } from "./types";

export function generateFakeQuestion(part: number, type: PartType): Question {
    const options = faker.helpers.uniqueArray(() => faker.word.noun(), 4);
    return {
        id: faker.string.uuid(),
        part,
        type,
        question: faker.lorem.sentence(),
        options,
        answer: faker.helpers.arrayElement(options),
    };
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
