import GameStats from '../GameStats'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
})

export default function GameStatsExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameStats />
    </QueryClientProvider>
  )
}