import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import GameHeader from '@/components/GameHeader';
import Monster from '@/components/Monster';
import BattleArea from '@/components/BattleArea';
import GameMessage from '@/components/GameMessage';
import GameOverModal from '@/components/GameOverModal';
import PlayerNameDialog from '@/components/PlayerNameDialog';
import HighScores from '@/components/HighScores';
import GameStats from '@/components/GameStats';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';

type Move = 'rock' | 'paper' | 'scissors';
type GameResult = 'advance' | 'hold' | 'draw' | null;
type MonsterMood = 'angry' | 'confident' | 'worried' | 'neutral';

const defenderNames = [
  'Captain Ironwall',
  'Sir Stonehold', 
  'Commander Fortress',
  'Guardian Bulwark',
  'Marshal Rampart',
  'Defender Kane',
  'Warden Steel',
  'Keeper Bastion'
];

const getRandomMove = (): Move => {
  const moves: Move[] = ['rock', 'paper', 'scissors'];
  return moves[Math.floor(Math.random() * moves.length)];
};

const getRandomDefenderName = () => {
  return defenderNames[Math.floor(Math.random() * defenderNames.length)];
};

const getWinner = (playerMove: Move, monsterMove: Move): 'player' | 'monster' | 'draw' => {
  if (playerMove === monsterMove) return 'draw';
  
  const winConditions = {
    rock: 'scissors',
    paper: 'rock', 
    scissors: 'paper'
  };
  
  return winConditions[playerMove] === monsterMove ? 'player' : 'monster';
};

const getDefenderMood = (position: number): MonsterMood => {
  if (position === 0) return 'confident'; // Far from castle
  if (position <= 2) return 'neutral';   // Approaching
  if (position <= 3) return 'worried';   // Close to walls
  return 'angry';                        // At the gates!
};

export default function Game() {
  const [position, setPosition] = useState(0); // 0 = start, 4 = castle captured
  const [maxPosition] = useState(4);
  const [score, setScore] = useState(0);
  const [playerMove, setPlayerMove] = useState<Move | null>(null);
  const [monsterMove, setMonsterMove] = useState<Move | null>(null);
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [message, setMessage] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [defenderName, setDefenderName] = useState(getRandomDefenderName());
  const [roundCount, setRoundCount] = useState(0);
  const [playerName, setPlayerName] = useState<string>('');
  const [showNameDialog, setShowNameDialog] = useState(true);
  const [showStats, setShowStats] = useState(false);

  const queryClient = useQueryClient();

  const saveGameMutation = useMutation({
    mutationFn: (gameData: { playerName: string; finalScore: number; maxPosition: number; roundsPlayed: number }) =>
      apiRequest('POST', '/api/game-sessions', gameData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/high-scores'] });
      queryClient.invalidateQueries({ queryKey: ['/api/game-stats'] });
    },
  });

  const handlePlayerNameSubmit = (name: string) => {
    setPlayerName(name);
    setShowNameDialog(false);
  };

  const resetGame = () => {
    setPosition(0);
    setScore(0);
    setPlayerMove(null);
    setMonsterMove(null);
    setGameResult(null);
    setMessage('');
    setIsGameOver(false);
    setIsProcessing(false);
    setDefenderName(getRandomDefenderName());
    setRoundCount(0);
  };

  const handleGameComplete = () => {
    // Save game session to backend (castle captured!)
    saveGameMutation.mutate({
      playerName: playerName,
      finalScore: score,
      maxPosition: maxPosition,
      roundsPlayed: roundCount,
    });
  };

  const handleMove = (move: Move) => {
    if (isProcessing || isGameOver) return;
    
    setIsProcessing(true);
    setPlayerMove(move);
    
    // Simulate battle delay
    setTimeout(() => {
      const newMonsterMove = getRandomMove();
      setMonsterMove(newMonsterMove);
      
      const winner = getWinner(move, newMonsterMove);
      let newPosition = position;
      let newScore = score;
      let result: GameResult;
      let resultMessage = '';
      
      if (winner === 'player') {
        newPosition = Math.min(position + 1, maxPosition);
        newScore += 20; // Higher reward for advancing
        result = 'advance';
        
        if (newPosition === maxPosition) {
          resultMessage = `Breakthrough! You've captured the castle! Final score: ${newScore}`;
        } else {
          const positionNames = ['the battlefield', 'the outer defenses', 'the courtyard', 'the inner walls'];
          resultMessage = `Advance! You push forward to ${positionNames[newPosition]}! (+20 points)`;
        }
      } else if (winner === 'monster') {
        // Stay in current position on loss
        result = 'hold';
        resultMessage = 'The defender holds their ground! You cannot advance this round.';
      } else {
        result = 'draw';
        resultMessage = 'Stalemate! Both warriors chose the same strategy.';
      }
      
      setPosition(newPosition);
      setScore(newScore);
      setGameResult(result);
      setMessage(resultMessage);
      setRoundCount(prev => prev + 1);
      
      // Check for victory (castle captured)
      if (newPosition >= maxPosition) {
        setTimeout(() => {
          setIsGameOver(true);
          handleGameComplete();
        }, 1500);
      } else {
        // Reset for next round after showing result
        setTimeout(() => {
          setPlayerMove(null);
          setMonsterMove(null);
          setGameResult(null);
          setMessage('');
          setIsProcessing(false);
          
          // Change defender name occasionally for variety
          if (roundCount % 5 === 0 && roundCount > 0) {
            setDefenderName(getRandomDefenderName());
          }
        }, 2500);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowStats(!showStats)}
            data-testid="button-toggle-stats"
          >
            {showStats ? 'Hide Stats' : 'Show Stats'} 📊
          </Button>
          <div className="text-center">
            <span className="text-lg font-display text-primary">Welcome, {playerName}!</span>
          </div>
          <div className="w-24"></div>
        </div>

        <div className={`grid gap-8 mb-8 ${showStats ? 'lg:grid-cols-4' : 'lg:grid-cols-1'}`}>
          <div className={showStats ? 'lg:col-span-3' : 'lg:col-span-1'}>
            <GameHeader position={position} maxPosition={maxPosition} score={score} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="p-8 text-center">
                <Monster 
                  name={defenderName}
                  mood={getDefenderMood(position)}
                  move={monsterMove}
                  isDefender={true}
                />
              </Card>
              
              <Card className="p-8">
                <BattleArea 
                  onMove={handleMove}
                  disabled={isProcessing || isGameOver}
                  playerMove={playerMove}
                />
              </Card>
            </div>
            
            {gameResult && (
              <div className="mb-8">
                <GameMessage result={gameResult} message={message} />
              </div>
            )}
          </div>

          {showStats && (
            <div className="lg:col-span-1 space-y-6">
              <HighScores />
              <GameStats />
            </div>
          )}
        </div>
        
        <PlayerNameDialog
          isOpen={showNameDialog}
          onSubmit={handlePlayerNameSubmit}
        />
        
        <GameOverModal 
          isOpen={isGameOver}
          finalScore={score}
          onRestart={resetGame}
        />
      </div>
    </div>
  );
}