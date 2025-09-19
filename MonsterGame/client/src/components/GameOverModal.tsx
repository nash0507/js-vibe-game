import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GameOverModalProps {
  isOpen: boolean;
  finalScore: number;
  onRestart: () => void;
}

export default function GameOverModal({ isOpen, finalScore, onRestart }: GameOverModalProps) {
  const getScoreMessage = (score: number) => {
    if (score >= 1000) return "Castle Conqueror! 🏆";
    if (score >= 500) return "Siege Master! ⚔️";
    if (score >= 200) return "Fortress Breaker! 🏰";
    if (score >= 50) return "Wall Climber! 🗡️";
    return "Castle Captured! 🎉";
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" data-testid="modal-game-over">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-display text-primary">
            Victory! Castle Captured!
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            You have successfully breached the castle defenses and claimed victory!
          </DialogDescription>
        </DialogHeader>
        
        <div className="text-center py-6">
          <div className="text-6xl mb-4">🏰</div>
          <div className="text-3xl font-display text-primary mb-2" data-testid="text-final-score">
            {finalScore}
          </div>
          <div className="text-sm text-muted-foreground mb-4">Siege Score</div>
          <div className="text-lg font-medium text-chart-1" data-testid="text-score-message">
            {getScoreMessage(finalScore)}
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={onRestart}
            className="w-full hover-elevate active-elevate-2"
            size="lg"
            data-testid="button-restart"
          >
            Start New Siege
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}