import { TopAppBar } from '@/components/layout/TopAppBar'
import { BottomNavBar } from '@/components/layout/BottomNavBar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F7FF] lg:flex">

      {/* Desktop: sidebar fixa à esquerda */}
      <Sidebar />

      {/* Coluna principal */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Mobile: TopAppBar fixa — renderizada fora do fluxo via fixed */}
        <TopAppBar />

        {/* Conteúdo da página */}
        {/* pt-[71px] mobile: compensa o header fixo | lg:pt-0: desktop não tem header fixo */}
        <main className="flex-1 pt-[71px] pb-[120px] lg:pt-0 lg:pb-0">
          {/* Mobile: centralizado em 390px | Desktop: sem restrição de largura */}
          <div className="max-w-[390px] mx-auto w-full lg:max-w-none">
            {children}
          </div>
        </main>

      </div>

      {/* Mobile: bottom nav — oculta no desktop */}
      <BottomNavBar />

    </div>
  )
}
