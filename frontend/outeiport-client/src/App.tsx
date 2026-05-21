import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from './shared/components/Header'
import Footer from './shared/components/Footer'
import HomePage from './features/home/HomePage'
import SimulatePage from './features/simulate/pages/SimulatePage'
import PropostaPage from './features/proposta/pages/PropostaPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 0 },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/simulador" element={<SimulatePage />} />
              <Route path="/proposta" element={<PropostaPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
