export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F7FF] flex items-center justify-center">
      <div className="w-full max-w-[390px] mx-auto">
        {children}
      </div>
    </div>
  )
}
