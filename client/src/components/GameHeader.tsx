import { Progress } from "@/components/ui/progress";

interface GameHeaderProps {
  position: number;
  maxPosition: number;
  score: number;
}

export default function GameHeader({ position, maxPosition, score }: GameHeaderProps) {
  const progressPercentage = (position / maxPosition) * 100;
  const progressColor = position >= maxPosition ? "bg-yellow-500" : position >= maxPosition * 0.6 ? "bg-chart-1" : "bg-blue-500";
  
  const positionNames = [
    'Starting Position',
    'Outer Defenses', 
    'The Courtyard',
    'Inner Walls',
    'Castle Gates'
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-4xl font-display text-center mb-8 text-primary" data-testid="title-game">
        Castle Siege Battle
      </h1>
      
      <div className="flex items-center justify-between gap-8 mb-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Battlefield Progress</span>
            <span className="text-sm font-mono font-medium" data-testid="text-position">
              {position}/{maxPosition}
            </span>
          </div>
          <div className="relative">
            <Progress value={progressPercentage} className="h-3" data-testid="progress-position" />
            <div 
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-300 ${progressColor}`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-center">
            <span className="text-sm font-medium text-foreground" data-testid="text-position-name">
              {positionNames[position]}
            </span>
          </div>
          
          {/* Visual battlefield representation */}
          <div className="mt-4 flex items-center justify-between px-2" data-testid="battlefield-visual">
            {Array.from({ length: maxPosition + 1 }, (_, i) => {
              const isCurrentPosition = i === position;
              const isPassed = i < position;
              const isTarget = i === maxPosition;
              
              return (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      isCurrentPosition
                        ? 'bg-primary ring-2 ring-primary ring-offset-2'
                        : isPassed
                        ? 'bg-chart-1'
                        : isTarget
                        ? 'bg-yellow-500 ring-1 ring-yellow-400'
                        : 'bg-muted'
                    }`}
                    data-testid={`position-indicator-${i}`}
                  />
                  <div className="text-xs mt-1 text-muted-foreground">
                    {isTarget ? '🏰' : isPassed || isCurrentPosition ? '⚔️' : '◦'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-display text-primary" data-testid="text-score">
            {score}
          </div>
          <div className="text-sm text-muted-foreground">Siege Score</div>
        </div>
      </div>
    </div>
  );
}