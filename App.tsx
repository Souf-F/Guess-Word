
import React, { useState, useCallback, useEffect } from 'react';
import { GameStatus, GameState } from './types';
import { WORD_BANK, MAX_ATTEMPTS } from './constants';
import { ZenButton } from './components/ZenButton';
import { HangmanVisual } from './components/HangmanVisual';
import { Keyboard } from './components/Keyboard';
import { Navbar } from './components/Navbar';
import { SakuraEffect } from './components/SakuraEffect';
import { Logo } from './components/Logo';

type View = 'game' | 'rules' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('game');
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>({
    word: '',
    guessedLetters: [],
    maxAttempts: MAX_ATTEMPTS,
    status: GameStatus.START
  });

  const startGame = useCallback(() => {
    const randomWord = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
    setGameState({
      word: randomWord,
      guessedLetters: [],
      maxAttempts: MAX_ATTEMPTS,
      status: GameStatus.PLAYING
    });
    setCurrentView('game');
  }, []);

  const goHome = useCallback(() => {
    setGameState(prev => ({ ...prev, status: GameStatus.START }));
    setCurrentView('game');
  }, []);

  const handleGuess = useCallback((letter: string) => {
    if (gameState.status !== GameStatus.PLAYING || currentView !== 'game') return;
    if (gameState.guessedLetters.includes(letter)) return;

    setGameState(prev => {
      const newGuessed = [...prev.guessedLetters, letter];
      const wrongGuesses = newGuessed.filter(l => !prev.word.includes(l));
      
      let newStatus = prev.status;
      let scoreBonus = 0;

      if (wrongGuesses.length >= prev.maxAttempts) {
        newStatus = GameStatus.LOST;
      } else if (prev.word.split('').every(l => newGuessed.includes(l))) {
        newStatus = GameStatus.WON;
        scoreBonus = 10;
      }

      if (scoreBonus > 0) {
        setScore(s => s + scoreBonus);
      }

      return {
        ...prev,
        guessedLetters: newGuessed,
        status: newStatus
      };
    });
  }, [gameState, currentView]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        handleGuess(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGuess]);

  const wrongGuesses = gameState.guessedLetters.filter(l => !gameState.word.includes(l)).length;

  const renderGame = () => {
    if (gameState.status === GameStatus.START) {
      return (
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
          <div className="relative mb-12 flex flex-col items-center">
            <h1 className="text-8xl md:text-[12rem] font-black tracking-tightest leading-none text-gray-900 logo-font mt-8">
              GUESS WORD
            </h1>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-2 bg-[#bc002d] rounded-full"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mb-12 leading-relaxed mt-12">
            Challenge your mind. Decrypt the secret words. <br/>
            Stay focused. Don't let the counter reach zero.
          </p>
          <ZenButton onClick={startGame} variant="primary" className="scale-125">
            START GAME
          </ZenButton>
        </div>
      );
    }

    return (
      <div className="flex-grow flex flex-col justify-between py-12 px-8 max-w-[1920px] mx-auto w-full animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-8 mb-8">
           <div className="flex flex-col mb-4 md:mb-0">
              <span className="text-xs text-rose-400 font-bold uppercase tracking-widest mb-2">Life Support</span>
              <div className="flex gap-2">
                {[...Array(MAX_ATTEMPTS)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-12 h-2 rounded-full transition-all duration-500 ${i < MAX_ATTEMPTS - wrongGuesses ? 'bg-[#bc002d] shadow-[0_2px_10px_rgba(188,0,45,0.2)]' : 'bg-gray-100'}`}
                  ></div>
                ))}
              </div>
           </div>
           <div className="text-right">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-1">Current State</span>
              <p className={`text-3xl font-black uppercase tracking-tighter ${gameState.status === GameStatus.LOST ? 'text-red-600' : gameState.status === GameStatus.WON ? 'text-green-600' : 'text-gray-900'}`}>
                {gameState.status === GameStatus.PLAYING ? 'Analysing...' : gameState.status === GameStatus.WON ? 'Success' : 'Failure'}
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-grow">
          <div className="flex justify-center scale-110 lg:scale-125">
            <HangmanVisual wrongCount={wrongGuesses} />
          </div>

          <div className="flex flex-col items-center justify-center space-y-20">
            {/* Word Display */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {gameState.word.split('').map((letter, i) => (
                <div 
                  key={i} 
                  className={`
                    w-12 h-16 md:w-20 md:h-24 flex items-center justify-center border-b-[6px] text-5xl md:text-7xl font-black transition-all duration-700
                    ${gameState.guessedLetters.includes(letter) || gameState.status === GameStatus.LOST ? 'border-[#bc002d] text-gray-900' : 'border-gray-100 text-transparent'}
                    ${gameState.status === GameStatus.LOST && !gameState.guessedLetters.includes(letter) ? 'text-red-400 border-red-200' : ''}
                  `}
                >
                  {gameState.status === GameStatus.LOST || gameState.guessedLetters.includes(letter) ? letter : ''}
                </div>
              ))}
            </div>

            {gameState.status !== GameStatus.PLAYING && (
              <div className="flex gap-4 animate-in slide-in-from-bottom duration-500">
                <ZenButton onClick={startGame} variant={gameState.status === GameStatus.WON ? 'secondary' : 'danger'} className="scale-110">
                  {gameState.status === GameStatus.WON ? 'NEXT WORD' : 'TRY AGAIN'}
                </ZenButton>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 w-full">
          <Keyboard 
            guessedLetters={gameState.guessedLetters} 
            onGuess={handleGuess} 
            disabled={gameState.status !== GameStatus.PLAYING}
            word={gameState.word}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-screen flex flex-col relative">
      <SakuraEffect />
      <Navbar currentView={currentView} setView={setCurrentView} score={score} onLogoClick={goHome} />

      <main className="relative z-10 w-full flex-grow flex flex-col pt-20 overflow-x-hidden">
        {currentView === 'game' && renderGame()}
        
        {currentView === 'rules' && (
          <div className="max-w-4xl mx-auto py-24 px-8 space-y-16 animate-in fade-in slide-in-from-right duration-700">
            <h2 className="text-7xl font-black tracking-tightest border-l-[12px] border-[#bc002d] pl-8 flex flex-col logo-font">
              GAME RULES
            </h2>
            <div className="grid gap-8 text-lg font-medium text-gray-600">
              <section className="bg-white p-10 rounded-3xl shadow-sm border border-rose-50 hover:shadow-xl hover:shadow-rose-100 transition-all">
                <h3 className="text-gray-900 font-bold text-2xl mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-sm font-bold">1</div>
                  OBJECTIVE
                </h3>
                <p className="leading-relaxed">Guess the hidden word letter by letter. You have <span className="text-[#bc002d] font-bold">6 attempts</span> before the game ends.</p>
              </section>
              <section className="bg-white p-10 rounded-3xl shadow-sm border border-rose-50 hover:shadow-xl hover:shadow-rose-100 transition-all">
                <h3 className="text-gray-900 font-bold text-2xl mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-sm font-bold">2</div>
                  SCORING
                </h3>
                <p className="leading-relaxed">Earn <span className="text-green-600 font-bold">+10 points</span> for every correctly deciphered word. Keep your streak alive to reach the top of the leaderboard.</p>
              </section>
            </div>
            <div className="flex justify-center">
              <ZenButton onClick={() => setCurrentView('game')} variant="primary">GO BACK</ZenButton>
            </div>
          </div>
        )}

        {currentView === 'about' && (
          <div className="max-w-4xl mx-auto py-24 px-8 space-y-16 animate-in fade-in slide-in-from-left duration-700 text-center">
            <h2 className="text-7xl font-black tracking-tightest flex flex-col items-center logo-font">
              THE AUTHOR
            </h2>
            <div className="bg-white p-16 rounded-[4rem] shadow-2xl shadow-rose-100 border-2 border-rose-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-[#bc002d] rotate-45 translate-x-32 -translate-y-32"></div>
               <p className="text-2xl text-gray-500 mb-8 font-medium">This experience was created by</p>
               <a 
                 href="https://github.com/Souf-F" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-6xl md:text-8xl font-black text-gray-900 hover:text-[#bc002d] transition-all duration-300 block mb-12 relative z-10 tracking-tighter"
               >
                 Souf-F
               </a>
               <div className="flex justify-center gap-8 text-gray-400">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest font-bold">Github</span>
                    <span className="text-sm">Public Archive</span>
                  </div>
                  <div className="w-[1px] h-10 bg-gray-100"></div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest font-bold">Version</span>
                    <span className="text-sm">2025.02.GLOBAL</span>
                  </div>
               </div>
            </div>
            <div className="flex justify-center">
              <ZenButton onClick={() => setCurrentView('game')} variant="secondary">RETURN TO GAME</ZenButton>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 w-full p-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-[0.2em] font-bold uppercase text-gray-400 border-t border-gray-100 bg-white/30 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Logo className="scale-50 grayscale opacity-40" />
          <span className="text-gray-200">|</span>
          <span>SOUF_DESIGN_LAB</span>
        </div>
        <div className="text-center md:text-right flex flex-col items-center md:items-end gap-2">
          <p>© 2025 GUESS WORD CORE</p>
          <a 
            href="https://github.com/Souf-F" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#bc002d] hover:text-black transition-colors font-bold"
          >
            Developed by Souf-F
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
