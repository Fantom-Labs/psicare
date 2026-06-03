'use client'

import { useState } from 'react'
import { Check, ChevronRight, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Habit {
  id: number
  emoji: string
  bgColor: string
  title: string
  subtitle: string
  streak: string
  progress: string
  defaultDone?: boolean
}

const HABITS: Habit[] = [
  {
    id: 1,
    emoji: '💧',
    bgColor: '#EBF5FF',
    title: 'Hidratação',
    subtitle: 'Beber 2L de água por dia',
    streak: '5 dias',
    progress: '1.5L / 2L',
    defaultDone: false,
  },
  {
    id: 2,
    emoji: '🌙',
    bgColor: '#EDE9FE',
    title: 'Sono',
    subtitle: '8 horas de sono',
    streak: '3 dias',
    progress: '7h de ontem',
    defaultDone: false,
  },
  {
    id: 3,
    emoji: '🏃',
    bgColor: '#DCFCE7',
    title: 'Exercício',
    subtitle: '30 min de atividade física',
    streak: '0 dias',
    progress: 'Não feito hoje',
    defaultDone: false,
  },
  {
    id: 4,
    emoji: '🧘',
    bgColor: '#F3F0FF',
    title: 'Meditação',
    subtitle: '10 min de meditação',
    streak: '7 dias',
    progress: '✓ Feito!',
    defaultDone: true,
  },
  {
    id: 5,
    emoji: '📚',
    bgColor: '#FEF3C7',
    title: 'Leitura',
    subtitle: '20 páginas por dia',
    streak: '3 dias',
    progress: '✓ Feito!',
    defaultDone: true,
  },
  {
    id: 6,
    emoji: '🥗',
    bgColor: '#DCFCE7',
    title: 'Alimentação',
    subtitle: 'Comer de forma saudável',
    streak: '4 dias',
    progress: '2 refeições',
    defaultDone: false,
  },
]

export function HabitsList() {
  const [done, setDone] = useState<Set<number>>(
    new Set(HABITS.filter((h) => h.defaultDone).map((h) => h.id))
  )

  const toggle = (id: number) =>
    setDone((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <section className="flex flex-col gap-4">

      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target size={17} strokeWidth={2} className="text-[#5B4CF5]" />
          <span className="text-[#1A1A2E] text-[16px] font-semibold leading-[24px]">
            Hábitos diários
          </span>
        </div>
        <button className="flex items-center gap-[4px] text-[#5B4CF5] text-[14px] font-medium hover:opacity-80 transition-opacity">
          Editar hábitos
          <ChevronRight size={14} strokeWidth={2} />
        </button>
      </div>

      {/* Habits list — 1 col mobile, 2 cols desktop */}
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
        {HABITS.map((habit) => {
          const isDone = done.has(habit.id)
          return (
            <div
              key={habit.id}
              className="bg-white rounded-[24px] border border-black/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-4 flex items-center gap-4"
            >
              {/* Icon box — 48×48, cornerRadius 16 */}
              <div
                className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: habit.bgColor }}
              >
                <span className="text-[22px] leading-none">{habit.emoji}</span>
              </div>

              {/* Text content — fills remaining space */}
              <div className="flex-1 min-w-0">
                <p className="text-[#1A1A2E] text-[14px] font-semibold leading-tight truncate">
                  {habit.title}
                </p>
                <p className="text-[#6B7280] text-[12px] leading-tight mt-[2px] truncate">
                  {habit.subtitle}
                </p>
              </div>

              {/* Right: streak + progress */}
              <div className="flex flex-col items-end gap-[2px] flex-shrink-0">
                <span
                  className={cn(
                    'text-[12px] font-semibold leading-tight',
                    isDone ? 'text-[#22C55E]' : 'text-[#6B7280]'
                  )}
                >
                  {habit.streak}
                </span>
                <span className="text-[10px] text-[#6B7280] leading-tight">
                  {habit.progress}
                </span>
              </div>

              {/* Toggle button — 32×32 circle, cornerRadius 9999 */}
              <button
                onClick={() => toggle(habit.id)}
                aria-label={isDone ? `Desmarcar ${habit.title}` : `Marcar ${habit.title} como feito`}
                aria-pressed={isDone}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200',
                  isDone
                    ? 'bg-[#5B4CF5] shadow-[0_2px_8px_rgba(91,76,245,0.4)]'
                    : 'border-2 border-gray-200 bg-white hover:border-[#5B4CF5]/40'
                )}
              >
                {isDone && (
                  <Check size={14} strokeWidth={2.5} className="text-white" />
                )}
              </button>
            </div>
          )
        })}
      </div>

    </section>
  )
}
