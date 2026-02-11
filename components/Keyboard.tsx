
import React from 'react';

interface KeyboardProps {
  guessedLetters: string[];
  onGuess: (letter: string) => void;
  disabled: boolean;
  word: string;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const Keyboard: React.FC<KeyboardProps> = ({ guessedLetters, onGuess, disabled, word }) => {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2 md:gap-3 mx-auto max-w-5xl">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && word.includes(letter);
        const isWrong = isGuessed && !word.includes(letter);

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={disabled || isGuessed}
            className={`
              h-14 md:h-16 w-full flex flex-col items-center justify-center font-bold transition-all duration-300 rounded-xl border relative overflow-hidden
              ${isCorrect ? 'bg-green-50 text-green-700 border-green-200 shadow-inner' : ''}
              ${isWrong ? 'bg-gray-100 text-gray-300 border-gray-100 opacity-60' : ''}
              ${!isGuessed ? 'bg-white text-gray-800 border-rose-100 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100 hover:-translate-y-1 active:scale-95' : ''}
              ${disabled && !isGuessed ? 'opacity-30 cursor-not-allowed' : ''}
            `}
          >
            <span className="text-xl md:text-2xl font-black">{letter}</span>
            {isCorrect && <div className="absolute bottom-1 w-1 h-1 bg-green-500 rounded-full"></div>}
            {isWrong && <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-400/20 -rotate-45"></div>}
          </button>
        );
      })}
    </div>
  );
};
