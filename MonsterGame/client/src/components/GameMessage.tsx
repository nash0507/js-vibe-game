interface GameMessageProps {
  result: 'advance' | 'hold' | 'draw' | null;
  message: string;
}

export default function GameMessage({ result, message }: GameMessageProps) {
  if (!result) return null;

  const getMessageStyle = () => {
    switch (result) {
      case 'advance':
        return 'text-chart-1 bg-chart-1/10 border-chart-1/20';
      case 'hold':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'draw':
        return 'text-chart-2 bg-chart-2/10 border-chart-2/20';
      default:
        return 'text-foreground bg-muted border-border';
    }
  };

  const getIcon = () => {
    switch (result) {
      case 'advance':
        return '⚔️';  // Sword for successful attack
      case 'hold':
        return '🛡️';  // Shield for successful defense
      case 'draw':
        return '🤝';   // Handshake for stalemate
      default:
        return '🏰';   // Castle as default siege icon
    }
  };

  return (
    <div 
      className={`text-center p-4 rounded-lg border font-medium animate-in fade-in duration-300 ${getMessageStyle()}`}
      data-testid="game-message"
    >
      <div className="text-2xl mb-2" data-testid="message-icon">{getIcon()}</div>
      <div className="text-lg" data-testid="message-text">{message}</div>
    </div>
  );
}