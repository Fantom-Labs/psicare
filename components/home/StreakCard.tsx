import { Check, Flame } from 'lucide-react'
import { cn } from '@/lib/utils'

const WEEK_DAYS = [
  { label: 'S', done: true,  today: false },
  { label: 'T', done: true,  today: false },
  { label: 'Q', done: true,  today: false },
  { label: 'Q', done: true,  today: false },
  { label: 'S', done: true,  today: false },
  { label: 'S', done: false, today: false },
  { label: 'D', done: false, today: true  },
]

const STREAK_DAYS = 12
const GOAL_PROGRESS = 86 // %

export function StreakCard() {
  return (
    <div className="bg-white rounded-[24px] border border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-4 relative overflow-hidden">

      {/* Decorative overlay — top-right quarter-circle (from Figma: Overlay, 128×128, 5% opacity) */}
      <div
        className="absolute -top-px -right-px w-32 h-32 bg-[#5B4CF5]/[0.05] pointer-events-none"
        style={{ borderBottomLeftRadius: '9999px' }}
      />

      {/* Streak info row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
          <Flame size={22} className="text-[#F97316]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#6B7280] text-[12px] font-medium leading-none mb-0.5">
            Sequência Atual
          </p>
          <p className="text-[#1A1A2E] text-[20px] font-bold leading-tight">
            {STREAK_DAYS} dias
          </p>
        </div>
        <div className="flex items-center gap-1 bg-[#FEF3C7] px-3 py-1.5 rounded-full flex-shrink-0">
          <Flame size={13} className="text-[#F97316]" />
          <span className="text-[#F97316] text-[12px] font-semibold">{STREAK_DAYS}</span>
        </div>
      </div>

      {/* Weekly checklist — S T Q Q S S D */}
      <div className="flex items-center justify-between mb-4">
        {WEEK_DAYS.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-[4px]">
            <span
              className={cn(
                'text-[11px] font-semibold leading-none',
                day.today ? 'text-[#5B4CF5]' : 'text-[#6B7280]'
              )}
            >
              {day.label}
            </span>
            <div
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center',
                day.today
                  ? 'bg-[#5B4CF5]'
                  : day.done
                  ? 'bg-[#5B4CF5]/15'
                  : 'bg-gray-100'
              )}
            >
              {day.done && !day.today && (
                <Check size={13} strokeWidth={2.5} className="text-[#5B4CF5]" />
              )}
              {day.today && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Goal progress */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[#6B7280] text-[12px]">Meta da semana: 6/7 dias</span>
          <span className="text-[#5B4CF5] text-[12px] font-semibold">{GOAL_PROGRESS}%</span>
        </div>
        <div className="w-full h-[8px] bg-[#F3F0FF] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5B4CF5] rounded-full transition-all duration-500"
            style={{ width: `${GOAL_PROGRESS}%` }}
          />
        </div>
      </div>

    </div>
  )
}
