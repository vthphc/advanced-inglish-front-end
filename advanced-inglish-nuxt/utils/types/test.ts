import type { Lesson } from "./lesson";
import type { Comment, PopulatedComment } from "./comment";

export interface Test {
    _id: string;
    topic: string;
    title: string;
    difficulty: string;
    lessonList: string[];
    comments: string[];
    createdAt: string;
}

export interface PopulatedTest {
    _id: string;
    topic: string;
    title: string;
    difficulty: string;
    lessonList: Lesson[];
    comments: PopulatedComment[];
    createdAt: string;
}
