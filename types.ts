
export enum GameStatus {
  START = 'START',
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST'
}

export interface GameState {
  word: string;
  guessedLetters: string[];
  maxAttempts: number;
  status: GameStatus;
}
