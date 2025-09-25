import BattleArea from '../BattleArea'

export default function BattleAreaExample() {
  return (
    <BattleArea 
      onMove={(move) => console.log(`Player chose: ${move}`)}
      playerMove="rock"
      disabled={false}
    />
  )
}