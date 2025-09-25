import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GameStatsData {
  totalGames: number;
  averageScore: number;
  highestScore: number;
  totalRounds: number;
}

export default function GameStats() {
  const { data: stats, isLoading } = useQuery<GameStatsData>({
    queryKey: ['/api/game-stats'],
    queryFn: () => fetch('/api/game-stats').then(res => res.json()),
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-display">📊 Game Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-display">📊 Game Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">No data available</div>
        </CardContent>
      </Card>
    );
  }

  const statItems = [
    { label: 'Total Games', value: stats.totalGames, icon: '🎮' },
    { label: 'Average Score', value: stats.averageScore, icon: '📈' },
    { label: 'Best Score', value: stats.highestScore, icon: '⭐' },
    { label: 'Total Rounds', value: stats.totalRounds, icon: '⚔️' },
  ];

  return (
    <Card data-testid="game-stats">
      <CardHeader>
        <CardTitle className="text-lg font-display">📊 Game Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {statItems.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center p-3 bg-muted/50 rounded-md"
              data-testid={`stat-${index}`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-lg font-mono font-bold text-primary" data-testid={`stat-value-${index}`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}