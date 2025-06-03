import type { Question } from "./question";
import type { Comment, PopulatedComment } from "./comment";

export interface Lesson {
    _id: string;
    topic: string;
    title: string;
    difficulty: string;
    questionsList: string[]; // Array of MongoDB ObjectIds as strings
    comments: string[];
    createdAt: string; // ISO date string
}

// For populated lessons where questions and comments are populated with actual objects
export interface PopulatedLesson {
    _id: string;
    topic: string;
    title: string;
    difficulty: string;
    questionsList: Question[];
    comments: PopulatedComment[];
    createdAt: string;
}
