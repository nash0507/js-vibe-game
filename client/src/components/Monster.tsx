interface MonsterProps {
  name: string;
  mood: 'angry' | 'confident' | 'worried' | 'neutral';
  move?: 'rock' | 'paper' | 'scissors' | null;
  isDefender?: boolean;
}

const defenderEmojis = {
  angry: '🛡️',     // Angry shield bearer
  confident: '🏰',   // Confident castle guardian
  worried: '⚔️',     // Worried sword defender 
  neutral: '🛡️'     // Neutral shield bearer
};

const monsterEmojis = {
  angry: '👹',
  confident: '😈', 
  worried: '😰',
  neutral: '👾'
};

const moveEmojis = {
  rock: '✊',
  paper: '✋', 
  scissors: '✌️'
};

export default function Monster({ name, mood, move, isDefender = false }: MonsterProps) {
  const displayEmojis = isDefender ? defenderEmojis : monsterEmojis;
  return (
    <div className="text-center" data-testid="monster-display">
      <div className="mb-4">
        <div className="text-6xl mb-2" data-testid="monster-emoji">
          {displayEmojis[mood]}
        </div>
        <h2 className="text-2xl font-display text-foreground" data-testid="monster-name">
          {name}
        </h2>
        <p className="text-sm text-muted-foreground capitalize" data-testid="monster-mood">
          {isDefender ? `${mood} defender` : mood}
        </p>
      </div>
      
      {move && (
        <div className="mt-4" data-testid="monster-move">
          <div className="text-sm text-muted-foreground mb-1">{isDefender ? 'Defender chooses:' : 'Monster chooses:'}</div>
          <div className="text-4xl">{moveEmojis[move]}</div>
          <div className="text-sm font-medium capitalize">{move}</div>
        </div>
      )}
    </div>
  );
}