# Guess Word — Hangman

Word guessing game built with React + TypeScript. Zen aesthetic with animated sakura petals.

## How to play

```
1. Start a new game
2. A secret word is randomly picked
3. Guess letters one at a time — on-screen keyboard or physical keyboard
4. 6 wrong guesses and it is game over
5. Reveal the word before that to win (+10 points)
```

## Game states

```
START ──► PLAYING ──► WON   (+10 pts)
                  └──► LOST
```

## Components

| Component | Role |
|-----------|------|
|  | SVG hangman figure, updates per wrong guess |
|  | On-screen letter grid, highlights guessed letters |
|  | Animated cherry blossom particles |
|  | Game / Rules / About navigation |
|  | Styled action button |
|  | Game logo |

## Stack

React · TypeScript · Vite

## Run

```bash
npm install
npm run dev
```

## Structure

```
├── App.tsx           # Game logic and state management
├── types.ts          # GameStatus, GameState types
├── constants.tsx     # WORD_BANK, MAX_ATTEMPTS
└── components/
    ├── HangmanVisual.tsx
    ├── Keyboard.tsx
    ├── SakuraEffect.tsx
    ├── Navbar.tsx
    ├── ZenButton.tsx
    └── Logo.tsx
```

---

Soufiane Filali
