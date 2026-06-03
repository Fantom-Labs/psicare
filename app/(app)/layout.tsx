import { TopAppBar } from '@/components/layout/TopAppBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <div className="max-w-[390px] mx-auto relative min-h-screen">
        <TopAppBar />
        <main>{children}</main>
      </div>
    </div>
  )
}
