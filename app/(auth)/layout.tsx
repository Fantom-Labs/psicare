export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      {/*
        Mobile  → card centralizado (max 390px, rounded, shadow)
        Desktop → passthrough sem restrição (children controlam o layout)
      */}
      <div className="flex items-center justify-center min-h-screen p-4 lg:block lg:p-0 lg:min-h-0">
        <div
          className="
            w-full max-w-[390px] relative overflow-hidden rounded-[32px]
            bg-[#F8F7FF] shadow-[0_20px_60px_rgba(91,76,245,0.10)]
            lg:max-w-none lg:rounded-none lg:shadow-none
            lg:overflow-visible lg:bg-transparent
          "
        >
          {children}
        </div>
      </div>
    </div>
  )
}
