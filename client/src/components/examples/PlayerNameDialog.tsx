import PlayerNameDialog from '../PlayerNameDialog'

export default function PlayerNameDialogExample() {
  return (
    <PlayerNameDialog 
      isOpen={true} 
      onSubmit={(name) => console.log(`Player name submitted: ${name}`)} 
    />
  )
}