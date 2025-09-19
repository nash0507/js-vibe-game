import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PlayerNameDialogProps {
  isOpen: boolean;
  onSubmit: (name: string) => void;
}

export default function PlayerNameDialog({ isOpen, onSubmit }: PlayerNameDialogProps) {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onSubmit(playerName.trim());
      setPlayerName('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-player-name">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-center">
            Enter Battle Arena! ⚔️
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter your warrior name to begin your monster battle journey.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="playerName" className="font-medium">
              Warrior Name
            </Label>
            <Input
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name..."
              className="text-center"
              maxLength={20}
              data-testid="input-player-name"
              autoFocus
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="submit"
              disabled={!playerName.trim()}
              className="w-full"
              size="lg"
              data-testid="button-start-game"
            >
              Start Battle! 🎮
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}