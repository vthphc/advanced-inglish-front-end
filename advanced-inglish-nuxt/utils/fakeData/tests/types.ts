export type PartType = "Listening" | "Reading";

export interface Question {
    id: string;
    part: number;
    type: PartType;
    question: string;
    options: string[];
    answer: string;
}

export interface TOEICTest {
    [partNumber: string]: Question[];
}
