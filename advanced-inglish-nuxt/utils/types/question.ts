export interface Question {
    _id: string;
    type: string;
    content: string; // content for text-based questions or instructions for audio-based questions
    audioURL?: string;
    imageURL?: string;
    difficulty: string;
    question: string; // question such as "What is the capital of France?"
    options: string[];
    correctAnswer: string;
    explanation: string;
}
