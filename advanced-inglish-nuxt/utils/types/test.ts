import type { Lesson } from "./lesson";
import type { Comment, PopulatedComment } from "./comment";

export interface Test {
	_id: string;
	type: string;
	topic: string;
	title: string;
	difficulty: string;
	lessonList: string[];
	comments: string[];
	createdAt: string;
}

export interface PopulatedTest {
	_id: string;
	type: string;
	topic: string;
	title: string;
	difficulty: string;
	lessonList: Lesson[];
	comments: PopulatedComment[];
	createdAt: string;
}

export interface TakenTestQuestion {
	question: string;
	selectedAnswer: string;
	_id: string;
}

export interface TakenTestLesson {
	lesson: string;
	questions: TakenTestQuestion[];
	_id: string;
}

export interface TakenTest {
	test: Test;
	score: number;
	takenAt: string;
	lessons: TakenTestLesson[];
	_id: string;
}

export interface TakenTestsResponse {
	takenTests: TakenTest[];
}
