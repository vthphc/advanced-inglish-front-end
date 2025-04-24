import type { TOEICTest } from "./types";
import { generatePart } from "./questionGenerator";

export function generateTOEICTest(): TOEICTest {
    return {
        Part1: generatePart(1, "Listening", 10),
        Part2: generatePart(2, "Listening", 10),
        Part3: generatePart(3, "Listening", 10),
        Part4: generatePart(4, "Listening", 10),
        Part5: generatePart(5, "Reading", 10),
        Part6: generatePart(6, "Reading", 10),
        Part7: generatePart(7, "Reading", 10),
    };
}
