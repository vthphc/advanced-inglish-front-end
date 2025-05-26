// Phonetics interface for pronunciation data
export interface Phonetic {
	text: string; // IPA representation of pronunciation
	audio: string | null; // URL to audio file or null if not available
}

// Main Flashcard interface
export interface Flashcard {
	_id: string; // MongoDB ObjectId as string
	user: string; // User ID (reference to user collection)
	topic: string; // Topic category of the flashcard
	word: string; // The word or phrase being studied
	definition: string; // Definition of the word
	example: string; // Example sentence using the word
	category: string; // Part of speech (noun, verb, adjective, etc.)
	phonetics: Phonetic[]; // Array of phonetic pronunciations
	createdAt: string; // ISO date string of creation time
}

// Response type for API endpoints that return a flashcard
export interface FlashcardResponse {
	flashcard: Flashcard;
}

// Response type for API endpoints that return multiple flashcards
export interface FlashcardsResponse {
	flashcards: Flashcard[];
	total?: number;
	page?: number;
	limit?: number;
}
