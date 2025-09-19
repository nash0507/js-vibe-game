import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameSession {
  id: string;
  playerName: string;
  finalScore: number;
  maxHealth: number;
  roundsPlayed: number;
  createdAt: string;
}

export default function HighScores() {
  const { data: highScores, isLoading } = useQuery<GameSession[]>({
    queryKey: ['/api/high-scores'],
    queryFn: () => fetch('/api/high-scores?limit=5').then(res => res.json()),
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-display">🏆 High Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!highScores || highScores.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-display">🏆 High Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">No scores yet!</div>
        </CardContent>
      </Card>
    );
  }

  const getMedalEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈'; 
      case 2: return '🥉';
      default: return '🏅';
    }
  };

  return (
    <Card data-testid="high-scores">
      <CardHeader>
        <CardTitle className="text-lg font-display">🏆 High Scores</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {highScores.map((session, index) => (
          <div 
            key={session.id} 
            className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
            data-testid={`score-entry-${index}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{getMedalEmoji(index)}</span>
              <div>
                <div className="font-medium text-sm" data-testid={`player-name-${index}`}>
                  {session.playerName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {session.roundsPlayed} rounds played
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="font-mono" data-testid={`score-${index}`}>
              {session.finalScore}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}