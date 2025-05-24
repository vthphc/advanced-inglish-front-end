export interface UserProfile {
	name: string;
	avatar: string;
	dob: string | null;
	gender: string;
	bio: string;
}

export interface Subscription {
	status: string;
	expiresAt: string | null;
}

export interface LearningPlan {
	currentLevel: string;
	targetLevel: string;
	curriculum: string[]; // Will be more specific when the actual type is defined
}

export interface SupportMaterials {
	dialogues: string[]; // Will be more specific when the actual type is defined
	flashcards: string[]; // Will be more specific when the actual type is defined
}

export interface User {
	_id: string;
	email: string;
	role: string;
	isVerified: boolean;
	profile: UserProfile;
	subscription: Subscription;
	learningPlan: LearningPlan;
	suppportMaterials: SupportMaterials;
	testsTaken: string[]; // Will be more specific when the actual type is defined
	reports: string[]; // Will be more specific when the actual type is defined
	createdAt: string;
	updatedAt: string;
}

export interface LoginResponse {
	message: string;
	accessToken?: string;
	refreshToken?: string;
	isVerified?: boolean;
	userId?: string;
}

export interface AuthResponse {
	user?: User;
}