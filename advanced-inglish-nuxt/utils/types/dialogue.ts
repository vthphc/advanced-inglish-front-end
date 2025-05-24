export interface DialogueLine {
	speaker: "A" | "B";
	line: string;
}

export interface Dialogue {
	_id: string;
	user: string;
	topic: string;
	dialogue: DialogueLine[];
	feedback: string;
	createdAt: string;
}

export type DialogueResponse = Dialogue[];
