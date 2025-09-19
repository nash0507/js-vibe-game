import GameOverModal from '../GameOverModal'

export default function GameOverModalExample() {
  return (
    <GameOverModal 
      isOpen={true} 
      finalScore={750} 
      onRestart={() => console.log('Restart game')} 
    />
  )
}