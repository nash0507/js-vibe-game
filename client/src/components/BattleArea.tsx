import { Button } from "@/components/ui/button";

interface BattleAreaProps {
  onMove: (move: 'rock' | 'paper' | 'scissors') => void;
  disabled?: boolean;
  playerMove?: 'rock' | 'paper' | 'scissors' | null;
}

const moveEmojis = {
  rock: '✊',
  paper: '✋', 
  scissors: '✌️'
};

const moveLabels = {
  rock: 'Rock',
  paper: 'Paper',
  scissors: 'Scissors'
};

export default function BattleArea({ onMove, disabled = false, playerMove }: BattleAreaProps) {
  return (
    <div className="text-center" data-testid="battle-area">
      <h3 className="text-xl font-display mb-6 text-foreground">Choose Your Move</h3>
      
      {playerMove && (
        <div className="mb-6 p-4 bg-card border border-card-border rounded-lg" data-testid="player-move">
          <div className="text-sm text-muted-foreground mb-2">You chose:</div>
          <div className="text-3xl mb-1">{moveEmojis[playerMove]}</div>
          <div className="text-sm font-medium">{moveLabels[playerMove]}</div>
        </div>
      )}
      
      <div className="flex gap-4 justify-center">
        {(['rock', 'paper', 'scissors'] as const).map((move) => (
          <Button
            key={move}
            size="lg"
            variant={playerMove === move ? "default" : "outline"}
            disabled={disabled}
            onClick={() => onMove(move)}
            className="flex flex-col items-center gap-2 h-24 w-24 hover-elevate active-elevate-2"
            data-testid={`button-${move}`}
          >
            <span className="text-2xl">{moveEmojis[move]}</span>
            <span className="text-xs">{moveLabels[move]}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}