import type { Question } from "./question";
import type { Comment, PopulatedComment } from "./comment";

type ListeningPart = "Part 1" | "Part 2" | "Part 3" | "Part 4";
type ReadingPart = "Part 5" | "Part 6" | "Part 7";
type LessonPart = ListeningPart | ReadingPart;

export interface Lesson {
    _id: string;
    topic: string;
    title: LessonPart;
    difficulty: string;
    questionsList: string[]; // Array of MongoDB ObjectIds as strings
    comments: string[];
    createdAt: string; // ISO date string
}

// For populated lessons where questions and comments are populated with actual objects
export interface PopulatedLesson {
    _id: string;
    topic: string;
    title: LessonPart;
    difficulty: string;
    questionsList: Question[];
    comments: PopulatedComment[];
    createdAt: string;
}
