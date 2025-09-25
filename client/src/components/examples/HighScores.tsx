import HighScores from '../HighScores'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
})

export default function HighScoresExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <HighScores />
    </QueryClientProvider>
  )
}