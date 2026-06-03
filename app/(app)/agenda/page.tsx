'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Lightbulb, TrendingUp, TrendingDown, Minus, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── Design tokens ─────────────────────────────────────── */

const MOOD_COLORS: Record<number, string> = {
  1: '#EF4444',
  2: '#F97316',
  3: '#F59E0B',
  4: '#22C55E',
  5: '#3B82F6',
}

const MOOD_EMOJI: Record<number, string> = {
  1: '😢', 2: '😟', 3: '😐', 4: '🙂', 5: '😊',
}

const MOOD_LABELS: Record<number, string> = {
  1: 'Muito mal', 2: 'Mal', 3: 'Neutro', 4: 'Bem', 5: 'Muito bem',
}

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const MONTHS_PT_SHORT = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']

/* ── Mock mood history ─────────────────────────────────── */

function buildMockData(): Record<string, number> {
  const data: Record<string, number> = {}
  const today = new Date()
  for (let i = 90; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    // ~80% chance of having a record, skip some days naturally
    if (Math.random() > 0.2) {
      // Seed mood from day number for deterministic output
      const seed = (d.getDate() * 7 + d.getMonth() * 3 + i) % 5
      data[d.toISOString().slice(0, 10)] = seed + 1
    }
  }
  return data
}

const MOOD_DATA = buildMockData()

/* ── Helpers ────────────────────────────────────────────── */

function toKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function firstWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function avg(values: number[]) {
  if (!values.length) return 0
  return values.reduce((a, b) => a + b, 0) / values.length
}

function isToday(y: number, m: number, d: number) {
  const t = new Date()
  return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d
}

/* ── Calendar grid ──────────────────────────────────────── */

function CalendarGrid({
  year,
  month,
  moodData,
  selectedDay,
  onSelectDay,
}: {
  year: number
  month: number
  moodData: Record<string, number>
  selectedDay: string | null
  onSelectDay: (key: string) => void
}) {
  const totalDays = daysInMonth(year, month)
  const startOffset = firstWeekday(year, month)
  const today = new Date()

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="text-center text-[11px] font-semibold text-[#9b92b8] py-1 font-[family-name:var(--font-plus-jakarta)]">
            {w}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const key = toKey(year, month, day)
          const mood = moodData[key]
          const isFuture = new Date(year, month, day) > today
          const isSelected = selectedDay === key
          const todayFlag = isToday(year, month, day)

          return (
            <button
              key={i}
              onClick={() => !isFuture && onSelectDay(key)}
              disabled={isFuture}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 h-10 rounded-xl mx-0.5 transition-all duration-150',
                isFuture ? 'opacity-25 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer',
                isSelected ? 'ring-2 ring-[#5b4cf5] bg-[#f5f0ff]' : '',
                todayFlag && !isSelected ? 'ring-1 ring-[#5b4cf5]/40' : '',
              )}
            >
              {/* Mood dot */}
              <div
                className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11px]"
                style={{
                  backgroundColor: mood ? MOOD_COLORS[mood] : 'transparent',
                  border: !mood && !isFuture ? '1.5px dashed #d1d5db' : 'none',
                }}
              >
                {mood ? (
                  <span className="leading-none">{MOOD_EMOJI[mood]}</span>
                ) : null}
              </div>
              {/* Day number */}
              <span
                className={cn(
                  'text-[10px] font-medium leading-none font-[family-name:var(--font-plus-jakarta)]',
                  todayFlag ? 'text-[#5b4cf5] font-bold' : 'text-[#6b7280]',
                  isSelected ? 'text-[#5b4cf5] font-bold' : ''
                )}
              >
                {day}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Insight cards ──────────────────────────────────────── */

function InsightCard({
  icon: Icon,
  title,
  text,
  type,
}: {
  icon: React.ElementType
  title: string
  text: string
  type: 'positive' | 'neutral' | 'warning' | 'tip'
}) {
  const styles = {
    positive: { bg: '#f0fdf4', border: 'rgba(34,197,94,0.2)', iconBg: '#dcfce7', iconColor: '#16a34a' },
    neutral:  { bg: '#f8f7ff', border: 'rgba(91,76,245,0.15)',iconBg: '#ede9fe', iconColor: '#5b4cf5' },
    warning:  { bg: '#fffbeb', border: 'rgba(245,158,11,0.2)', iconBg: '#fef3c7', iconColor: '#d97706' },
    tip:      { bg: '#f0f9ff', border: 'rgba(14,165,233,0.2)', iconBg: '#e0f2fe', iconColor: '#0284c7' },
  }[type]

  return (
    <div
      className="flex gap-3 p-4 rounded-[20px] border"
      style={{ backgroundColor: styles.bg, borderColor: styles.border }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: styles.iconBg }}
      >
        <Icon size={16} strokeWidth={1.8} style={{ color: styles.iconColor }} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[#1b1b22] text-[14px] font-bold font-[family-name:var(--font-plus-jakarta)]">{title}</span>
        <span className="text-[#484555] text-[13px] font-medium leading-[20px] font-[family-name:var(--font-plus-jakarta)]">{text}</span>
      </div>
    </div>
  )
}

/* ══ Page ════════════════════════════════════════════════ */

export default function AgendaPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState<string | null>(
    today.toISOString().slice(0, 10)
  )

  /* Month navigation */
  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    const n = new Date(); n.setDate(1)
    if (year > n.getFullYear() || (year === n.getFullYear() && month >= n.getMonth())) return
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()

  /* Month stats */
  const monthStats = useMemo(() => {
    const vals: number[] = []
    for (let d = 1; d <= daysInMonth(year, month); d++) {
      const mood = MOOD_DATA[toKey(year, month, d)]
      if (mood) vals.push(mood)
    }
    if (!vals.length) return null
    const average = avg(vals)
    const best = Math.max(...vals)
    const worst = Math.min(...vals)
    const streak = (() => {
      let s = 0, max = 0
      for (let d = 1; d <= daysInMonth(year, month); d++) {
        if (MOOD_DATA[toKey(year, month, d)]) { s++; max = Math.max(max, s) }
        else s = 0
      }
      return max
    })()
    return { average, best, worst, count: vals.length, streak }
  }, [year, month])

  /* Insights based on month stats */
  const insights = useMemo(() => {
    if (!monthStats) return []
    const { average, worst, streak, count } = monthStats
    const result = []

    if (average >= 4) result.push({ icon: TrendingUp, title: 'Mês positivo!', text: `Humor médio de ${average.toFixed(1)}/5. Você está indo muito bem — mantenha os hábitos que estão funcionando.`, type: 'positive' as const })
    else if (average >= 3) result.push({ icon: Minus, title: 'Mês equilibrado', text: `Humor médio de ${average.toFixed(1)}/5. Alguns altos e baixos, mas a tendência está estável.`, type: 'neutral' as const })
    else result.push({ icon: TrendingDown, title: 'Mês desafiador', text: `Humor médio de ${average.toFixed(1)}/5. Considere conversar com seu terapeuta sobre os momentos difíceis.`, type: 'warning' as const })

    if (streak >= 7) result.push({ icon: CalendarDays, title: `${streak} dias seguidos!`, text: 'Sequência incrível de check-ins. Consistência é a chave para identificar padrões emocionais.', type: 'positive' as const })
    else if (streak >= 3) result.push({ icon: CalendarDays, title: `Sequência de ${streak} dias`, text: 'Bom ritmo! Tente registrar diariamente para obter insights mais precisos.', type: 'neutral' as const })

    if (worst === 1 || worst === 2) result.push({ icon: Lightbulb, title: 'Dias difíceis identificados', text: 'Você registrou dias com humor baixo. Anote o que aconteceu nesses dias — padrões ajudam muito.', type: 'tip' as const })

    const daysInMo = daysInMonth(year, month)
    const coverage = Math.round((count / Math.min(daysInMo, today.getDate() + (isCurrentMonth ? 0 : daysInMo))) * 100)
    if (coverage < 60) result.push({ icon: Lightbulb, title: 'Registre mais dias', text: `Você registrou ${count} de ~${Math.min(daysInMo, today.getDate())} dias. Quanto mais registros, mais precisos os insights.`, type: 'tip' as const })

    return result
  }, [monthStats, year, month, today, isCurrentMonth])

  /* Selected day info */
  const selectedMood = selectedDay ? MOOD_DATA[selectedDay] : undefined
  const selectedDate = selectedDay ? new Date(selectedDay + 'T12:00:00') : null

  return (
    <div className="flex flex-col gap-5 pt-4 pb-32 px-5 lg:px-10 lg:py-8 lg:max-w-2xl">

      {/* ── Month navigator ── */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Mês anterior"
        >
          <ChevronLeft size={18} strokeWidth={2} className="text-[#1b1b22]" />
        </button>
        <h1 className="text-[#1b1b22] text-[18px] font-bold font-[family-name:var(--font-plus-jakarta)]">
          {MONTHS_PT[month]} {year}
        </h1>
        <button
          onClick={nextMonth}
          disabled={isCurrentMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
          aria-label="Próximo mês"
        >
          <ChevronRight size={18} strokeWidth={2} className="text-[#1b1b22]" />
        </button>
      </div>

      {/* ── Calendar card ── */}
      <div className="bg-white rounded-[24px] border border-[rgba(99,44,229,0.05)] shadow-[0px_4px_20px_rgba(123,92,250,0.08)] p-4">
        <CalendarGrid
          year={year}
          month={month}
          moodData={MOOD_DATA}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        {/* Mood legend */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4 pt-4 border-t border-gray-100">
          {[1,2,3,4,5].map(s => (
            <div key={s} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: MOOD_COLORS[s] }} />
              <span className="text-[10px] text-[#6b7280] font-medium font-[family-name:var(--font-plus-jakarta)]">{MOOD_LABELS[s]}</span>
            </div>
          ))}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full border-[1.5px] border-dashed border-gray-300" />
            <span className="text-[10px] text-[#6b7280] font-medium font-[family-name:var(--font-plus-jakarta)]">Sem registro</span>
          </div>
        </div>
      </div>

      {/* ── Selected day detail ── */}
      {selectedDay && (
        <div className="bg-white rounded-[24px] border border-[rgba(99,44,229,0.05)] shadow-[0px_4px_20px_rgba(123,92,250,0.08)] p-4 flex items-center gap-4">
          {selectedMood ? (
            <>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-[28px] shrink-0"
                style={{ backgroundColor: MOOD_COLORS[selectedMood] + '20' }}
              >
                {MOOD_EMOJI[selectedMood]}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[#6b7280] text-[12px] font-medium font-[family-name:var(--font-plus-jakarta)]">
                  {selectedDate?.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
                <span className="text-[#1b1b22] text-[16px] font-bold font-[family-name:var(--font-plus-jakarta)]">
                  {MOOD_LABELS[selectedMood]}
                </span>
                <span className="text-[12px] font-medium font-[family-name:var(--font-plus-jakarta)]" style={{ color: MOOD_COLORS[selectedMood] }}>
                  Nível {selectedMood}/5
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-[24px] shrink-0">😶</div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[#6b7280] text-[12px] font-medium font-[family-name:var(--font-plus-jakarta)]">
                  {selectedDate?.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
                <span className="text-[#1b1b22] text-[15px] font-bold font-[family-name:var(--font-plus-jakarta)]">
                  Sem registro de humor
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Month stats ── */}
      {monthStats && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Média', value: monthStats.average.toFixed(1), sub: '/5', color: MOOD_COLORS[Math.round(monthStats.average)] },
            { label: 'Registros', value: String(monthStats.count), sub: ' dias', color: '#5b4cf5' },
            { label: 'Sequência', value: String(monthStats.streak), sub: ' dias', color: '#22C55E' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="bg-white rounded-[20px] border border-[rgba(99,44,229,0.05)] shadow-[0px_4px_20px_rgba(123,92,250,0.08)] p-3 flex flex-col items-center gap-1">
              <span className="text-[#6b7280] text-[11px] font-medium font-[family-name:var(--font-plus-jakarta)]">{label}</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[22px] font-bold font-[family-name:var(--font-plus-jakarta)]" style={{ color }}>{value}</span>
                <span className="text-[11px] text-[#6b7280] font-medium font-[family-name:var(--font-plus-jakarta)]">{sub}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Insights ── */}
      {insights.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-[#1b1b22] text-[18px] font-bold leading-[28px] font-[family-name:var(--font-plus-jakarta)]">
              Insights de {MONTHS_PT_SHORT[month]}
            </h2>
            <p className="text-[#6b7280] text-[13px] font-medium font-[family-name:var(--font-plus-jakarta)]">
              Baseados no seu histórico de humor
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {insights.map(ins => (
              <InsightCard key={ins.title} {...ins} />
            ))}
          </div>
        </section>
      )}

      {!monthStats && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <span className="text-5xl">📭</span>
          <p className="text-[#1b1b22] text-[16px] font-bold font-[family-name:var(--font-plus-jakarta)]">
            Nenhum registro neste mês
          </p>
          <p className="text-[#6b7280] text-[14px] font-medium font-[family-name:var(--font-plus-jakarta)]">
            Registre seu humor diariamente na tela Início para ver o histórico aqui.
          </p>
        </div>
      )}
    </div>
  )
}
