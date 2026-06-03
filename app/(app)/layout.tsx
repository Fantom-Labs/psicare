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

        {/* Mobile: TopAppBar centrada em 390px — oculta no desktop */}
        <div className="max-w-[390px] mx-auto w-full lg:hidden">
          <TopAppBar />
        </div>

        {/* Conteúdo da página */}
        <main className="flex-1 pb-[120px] lg:pb-0">
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
