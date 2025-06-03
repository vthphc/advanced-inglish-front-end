import type { User } from "./user";

export interface Comment {
    _id: string;
    user: string; // MongoDB ObjectId as string
    content: string;
    likes: string[]; // Array of MongoDB ObjectIds as strings
    createdAt: string; // ISO date string
}

// For populated comments where user and likes are populated with actual User objects
export interface PopulatedComment {
    _id: string;
    user: User;
    content: string;
    likes: User[];
    createdAt: string;
}
