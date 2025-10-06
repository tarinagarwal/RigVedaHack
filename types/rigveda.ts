export interface RigvedaVerse {
  veda: string;
  mandala: number;
  sukta: number;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  verse?: RigvedaVerse;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
