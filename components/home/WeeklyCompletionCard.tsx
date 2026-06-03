const COMPLETION = 85 // %
const RADIUS = 40
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function WeeklyCompletionCard() {
  const strokeDashoffset = CIRCUMFERENCE * (1 - COMPLETION / 100)

  return (
    <div className="bg-white rounded-[24px] border border-[#E3E0EC]/50 shadow-[0_4px_20px_rgba(91,76,245,0.08)] p-4 flex items-center justify-between h-[140px]">

      {/* Left: text content */}
      <div className="flex flex-col gap-[4px] flex-1 pr-4 min-w-0">
        <p className="text-[#6B7280] text-[12px] font-medium leading-none">
          Conclusão Semanal
        </p>
        <p className="text-[#1A1A2E] text-[16px] font-bold leading-snug">
          Ótima semana!
        </p>
        <p className="text-[#6B7280] text-[12px] leading-relaxed">
          5 de 6 hábitos<br />concluídos
        </p>

        {/* Mini progress bar */}
        <div className="mt-1 w-full max-w-[140px] h-[6px] bg-[#F3F0FF] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5B4CF5] rounded-full transition-all duration-500"
            style={{ width: `${COMPLETION}%` }}
          />
        </div>
      </div>

      {/* Right: circular progress + trophy */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <svg
          viewBox="0 0 96 96"
          className="w-full h-full"
          style={{ transform: 'rotate(-90deg)' }}
          aria-label={`${COMPLETION}% de conclusão semanal`}
        >
          {/* Track */}
          <circle
            cx="48" cy="48" r={RADIUS}
            fill="none"
            stroke="#F3F0FF"
            strokeWidth="8"
          />
          {/* Progress */}
          <circle
            cx="48" cy="48" r={RADIUS}
            fill="none"
            stroke="#5B4CF5"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700"
          />
        </svg>

        {/* Trophy in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[26px] leading-none">🏆</span>
        </div>
      </div>

    </div>
  )
}
