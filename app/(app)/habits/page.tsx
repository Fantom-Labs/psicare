'use client'

import { useState } from 'react'
import { ChevronRight, Check, Droplets, Moon, Dumbbell, Brain, BookOpen, Utensils } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── Data ─────────────────────────────────────────────── */

const DAYS_PT = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
const MONTHS_PT = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

function todayLabel() {
  const d = new Date()
  return `${d.getDate()} de ${MONTHS_PT[d.getMonth()]}, ${DAYS_PT[d.getDay()]} ☀️`
}

interface Habit {
  id: number
  name: string
  goal: string
  progress: string
  progressColor: string
  bgColor: string
  icon: React.ElementType
  iconColor: string
  defaultDone: boolean
  /* Water-specific: mini drop level (0-5) */
  waterDrops?: number
}

const HABITS: Habit[] = [
  {
    id: 1,
    name: 'Beba água',
    goal: 'Meta: 2 litros',
    progress: '1,6 / 2 litros',
    progressColor: '#2563eb',
    bgColor: '#eff6ff',
    icon: Droplets,
    iconColor: '#2563eb',
    defaultDone: true,
    waterDrops: 4,
  },
  {
    id: 2,
    name: 'Dormir bem',
    goal: 'Meta: 7-8 horas',
    progress: '7h 30m',
    progressColor: '#4f46e5',
    bgColor: '#eef2ff',
    icon: Moon,
    iconColor: '#4f46e5',
    defaultDone: true,
  },
  {
    id: 3,
    name: 'Exercício físico',
    goal: 'Meta: 30 minutos',
    progress: '30 min',
    progressColor: '#006c4f',
    bgColor: '#fff7ed',
    icon: Dumbbell,
    iconColor: '#ea580c',
    defaultDone: true,
  },
  {
    id: 4,
    name: 'Meditação',
    goal: 'Meta: 10 minutos',
    progress: '10 min',
    progressColor: '#006c4f',
    bgColor: '#faf5ff',
    icon: Brain,
    iconColor: '#a855f7',
    defaultDone: true,
  },
  {
    id: 5,
    name: 'Leitura',
    goal: 'Meta: 20 minutos',
    progress: '0 / 20 min',
    progressColor: '#ba1a1a',
    bgColor: '#fdf2f8',
    icon: BookOpen,
    iconColor: '#ec4899',
    defaultDone: false,
  },
  {
    id: 6,
    name: 'Alimentação Saudável',
    goal: 'Meta: 5 refeições',
    progress: '5 / 5 refeições',
    progressColor: '#006c4f',
    bgColor: '#fef2f2',
    icon: Utensils,
    iconColor: '#ef4444',
    defaultDone: true,
  },
]

/* ── Water drops indicator ───────────────────────────── */
function WaterDrops({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: total }).map((_, i) => (
        <Droplets
          key={i}
          size={12}
          strokeWidth={1.8}
          className={i < filled ? 'text-[#2563eb]' : 'text-[#cac3d8]'}
        />
      ))}
    </div>
  )
}

/* ── Habit Card ──────────────────────────────────────── */
function HabitCard({
  habit,
  done,
  onToggle,
}: {
  habit: Habit
  done: boolean
  onToggle: () => void
}) {
  const Icon = habit.icon

  return (
    <div className="bg-white border border-[rgba(99,44,229,0.05)] drop-shadow-[0px_10px_15px_rgba(124,77,255,0.08)] flex gap-4 items-center p-[17px] rounded-[24px] w-full">

      {/* Icon box — 48×48, cornerRadius 16 */}
      <div
        className="rounded-[16px] shrink-0 size-12 flex items-center justify-center"
        style={{ backgroundColor: habit.bgColor }}
      >
        <Icon size={20} strokeWidth={1.8} style={{ color: habit.iconColor }} />
      </div>

      {/* Title + goal */}
      <div className="flex-1 min-w-0 flex flex-col">
        <span
          className="text-[#191c1f] text-[16px] leading-[24px] font-bold font-[family-name:var(--font-plus-jakarta)] truncate"
        >
          {habit.name}
        </span>
        <span
          className="text-[#494455] text-[10px] leading-[14px] font-medium font-[family-name:var(--font-plus-jakarta)]"
        >
          {habit.goal}
        </span>
      </div>

      {/* Progress + optional water drops */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span
          className="text-[10px] leading-[14px] font-bold whitespace-nowrap font-[family-name:var(--font-plus-jakarta)]"
          style={{ color: habit.progressColor }}
        >
          {habit.progress}
        </span>
        {habit.waterDrops !== undefined && (
          <WaterDrops filled={habit.waterDrops} />
        )}
      </div>

      {/* Toggle button — 32×32 circle */}
      <button
        onClick={onToggle}
        aria-label={done ? `Desmarcar ${habit.name}` : `Marcar ${habit.name} como feito`}
        aria-pressed={done}
        className={cn(
          'shrink-0 size-8 rounded-full flex items-center justify-center transition-all duration-200',
          done
            ? 'bg-[#632ce5] shadow-[0_2px_8px_rgba(99,44,229,0.35)]'
            : 'border-2 border-[#cac3d8] bg-transparent hover:border-[#632ce5]/40'
        )}
      >
        {done && <Check size={14} strokeWidth={2.5} className="text-white" />}
      </button>
    </div>
  )
}

/* ══ Page ════════════════════════════════════════════════ */
export default function HabitsPage() {
  const [done, setDone] = useState<Set<number>>(
    new Set(HABITS.filter(h => h.defaultDone).map(h => h.id))
  )

  const toggle = (id: number) =>
    setDone(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const completedCount = done.size
  const totalCount = HABITS.length

  return (
    <div className="flex flex-col gap-4 pt-4 pb-32 px-5 lg:px-10 lg:py-8 lg:max-w-2xl">

      {/* ── Section header ── */}
      <div className="flex items-center justify-between">
        {/* Left: "Hoje • 3 de junho, terça-feira ☀️" */}
        <div className="flex items-center gap-2">
          <span className="text-[#191c1f] text-[18px] leading-[24px] font-semibold font-[family-name:var(--font-plus-jakarta)]">
            Hoje
          </span>
          <span className="text-[rgba(73,68,85,0.4)] text-[16px] leading-[24px] font-normal font-[family-name:var(--font-plus-jakarta)]">
            •
          </span>
          <span className="text-[#494455] text-[14px] leading-[20px] font-normal font-[family-name:var(--font-plus-jakarta)]">
            {todayLabel()}
          </span>
        </div>

        {/* Right: "Editar hábitos →" */}
        <button className="flex items-center gap-1 text-[#632ce5] hover:opacity-80 transition-opacity">
          <span className="text-[12px] leading-[16px] font-semibold tracking-[0.6px] font-[family-name:var(--font-plus-jakarta)]">
            Editar hábitos
          </span>
          <ChevronRight size={12} strokeWidth={2} className="text-[#632ce5]" />
        </button>
      </div>

      {/* ── Progress summary ── */}
      <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-[rgba(99,44,229,0.06)] shadow-[0_4px_12px_rgba(99,44,229,0.06)]">
        <div className="flex-1">
          <p className="text-[#191c1f] text-sm font-semibold font-[family-name:var(--font-plus-jakarta)]">
            {completedCount} de {totalCount} hábitos concluídos
          </p>
          <div className="mt-1.5 w-full h-1.5 bg-[#f3f0ff] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#632ce5] rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-[#632ce5] text-sm font-bold font-[family-name:var(--font-plus-jakarta)] shrink-0">
          {Math.round((completedCount / totalCount) * 100)}%
        </span>
      </div>

      {/* ── Habit list ── */}
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
        {HABITS.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            done={done.has(habit.id)}
            onToggle={() => toggle(habit.id)}
          />
        ))}
      </div>

    </div>
  )
}
