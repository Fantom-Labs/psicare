import { TopAppBar } from '@/components/layout/TopAppBar'
import { BottomNavBar } from '@/components/layout/BottomNavBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <div className="max-w-[390px] mx-auto relative min-h-screen">
        <TopAppBar />
        {/* pb-[120px] = bar height (105px) + FAB overflow (31px) - some overlap */}
        <main className="pb-[120px]">{children}</main>
        <BottomNavBar />
      </div>
    </div>
  )
}
