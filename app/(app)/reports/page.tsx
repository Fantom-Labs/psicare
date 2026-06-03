'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus, Droplets, Moon, Dumbbell, Brain, BookOpen, Utensils, Lightbulb, Star, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── Types ─────────────────────────────────────────────── */

const MOOD_COLORS: Record<number, string> = {
  1: '#EF4444',
  2: '#F97316',
  3: '#F59E0B',
  4: '#22C55E',
  5: '#3B82F6',
}

const MOOD_LABELS: Record<number, string> = {
  1: 'Muito mal',
  2: 'Mal',
  3: 'Neutro',
  4: 'Bem',
  5: 'Muito bem',
}

/* ── Mock data ─────────────────────────────────────────── */

const WEEK_DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

const MOOD_DATA = [4, 3, 5, 4, 2, 4, 4] // score 1-5 por dia

const HABITS_DATA = [
  { name: 'Hidratação',  icon: Droplets, iconColor: '#2563eb', iconBg: '#eff6ff', done: 6, total: 7 },
  { name: 'Sono',        icon: Moon,     iconColor: '#4f46e5', iconBg: '#eef2ff', done: 5, total: 7 },
  { name: 'Exercício',   icon: Dumbbell, iconColor: '#ea580c', iconBg: '#fff7ed', done: 4, total: 7 },
  { name: 'Meditação',   icon: Brain,    iconColor: '#a855f7', iconBg: '#faf5ff', done: 7, total: 7 },
  { name: 'Leitura',     icon: BookOpen, iconColor: '#ec4899', iconBg: '#fdf2f8', done: 3, total: 7 },
  { name: 'Alimentação', icon: Utensils, iconColor: '#ef4444', iconBg: '#fef2f2', done: 5, total: 7 },
]

const INSIGHTS = [
  {
    type: 'positive' as const,
    icon: Star,
    title: 'Meditação perfeita!',
    text: 'Você completou meditação todos os 7 dias. Isso mostra consistência e disciplina. Continue assim!',
  },
  {
    type: 'warning' as const,
    icon: AlertCircle,
    title: 'Leitura precisa de atenção',
    text: 'Apenas 3 de 7 dias com leitura. Tente reservar 20 minutos antes de dormir para ler.',
  },
  {
    type: 'warning' as const,
    icon: AlertCircle,
    title: 'Quinta-feira difícil',
    text: 'Seu humor caiu para "Mal" na quinta. Identificar gatilhos pode ajudar a se preparar melhor.',
  },
  {
    type: 'tip' as const,
    icon: Lightbulb,
    title: 'Dica para a próxima semana',
    text: 'Aumente o exercício para 5 dias. Atividade física está diretamente ligada à melhora do humor.',
  },
]

/* ── Helpers ────────────────────────────────────────────── */

function avg(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

function getWeekRange(offset = 0) {
  const now = new Date()
  const day = now.getDay() === 0 ? 6 : now.getDay() - 1
  const mon = new Date(now)
  mon.setDate(now.getDate() - day + offset * 7)
  const sun = new Date(mon)
  sun.setDate(mon.getDate() + 6)
  const fmt = (d: Date) =>
    `${d.getDate()} de ${['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'][d.getMonth()]}`
  return `${fmt(mon)} – ${fmt(sun)}`
}

/* ── Sub-components ─────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[#1b1b22] text-[18px] font-bold leading-[28px] font-[family-name:var(--font-plus-jakarta)]">
      {children}
    </h2>
  )
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('bg-white rounded-[24px] border border-[rgba(99,44,229,0.05)] shadow-[0px_4px_20px_rgba(123,92,250,0.08)] p-5', className)}>
      {children}
    </div>
  )
}

/* Mood bar chart — 7 days */
function MoodChart({ data }: { data: number[] }) {
  const average = avg(data)
  const trend = data[data.length - 1] - data[0]

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[#6b7280] text-[12px] font-medium font-[family-name:var(--font-plus-jakarta)]">Humor médio</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[#1b1b22] text-[24px] font-bold leading-tight font-[family-name:var(--font-plus-jakarta)]">
              {average.toFixed(1)}
            </span>
            <span className="text-[14px]">{average >= 4 ? '😊' : average >= 3 ? '😐' : '😟'}</span>
            {trend > 0
              ? <TrendingUp size={16} className="text-[#22C55E]" />
              : trend < 0
              ? <TrendingDown size={16} className="text-[#EF4444]" />
              : <Minus size={16} className="text-[#6b7280]" />}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[#6b7280] text-[12px] font-medium font-[family-name:var(--font-plus-jakarta)]">Melhor dia</p>
          <p className="text-[#1b1b22] text-[14px] font-bold font-[family-name:var(--font-plus-jakarta)]">
            {WEEK_DAYS[data.indexOf(Math.max(...data))]}
          </p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end justify-between gap-1.5 h-[80px]">
        {data.map((score, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
            <div
              className="w-full rounded-t-lg rounded-b-sm transition-all duration-500"
              style={{
                height: `${(score / 5) * 64}px`,
                backgroundColor: MOOD_COLORS[score],
                opacity: 0.85,
              }}
              title={MOOD_LABELS[score]}
            />
            <span className="text-[10px] text-[#6b7280] font-medium font-[family-name:var(--font-plus-jakarta)]">
              {WEEK_DAYS[i]}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        {[1,2,3,4,5].map(score => (
          <div key={score} className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: MOOD_COLORS[score] }} />
            <span className="text-[10px] text-[#6b7280] font-[family-name:var(--font-plus-jakarta)]">{MOOD_LABELS[score]}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* Habit progress bars */
function HabitsChart({ data }: { data: typeof HABITS_DATA }) {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        {data.map(({ name, icon: Icon, iconColor, iconBg, done, total }) => {
          const pct = Math.round((done / total) * 100)
          return (
            <div key={name} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
                <Icon size={16} strokeWidth={1.8} style={{ color: iconColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-semibold text-[#1b1b22] font-[family-name:var(--font-plus-jakarta)]">{name}</span>
                  <span
                    className="text-[12px] font-bold font-[family-name:var(--font-plus-jakarta)]"
                    style={{ color: pct >= 80 ? '#006c4f' : pct >= 50 ? '#ea580c' : '#ba1a1a' }}
                  >
                    {done}/{total} dias
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct >= 80 ? '#22C55E' : pct >= 50 ? '#F97316' : '#EF4444',
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

/* Insight card */
function InsightCard({ insight }: { insight: typeof INSIGHTS[number] }) {
  const Icon = insight.icon
  const styles = {
    positive: { bg: '#f0fdf4', border: 'rgba(34,197,94,0.2)', iconBg: '#dcfce7', iconColor: '#16a34a' },
    warning:  { bg: '#fffbeb', border: 'rgba(245,158,11,0.2)', iconBg: '#fef3c7', iconColor: '#d97706' },
    tip:      { bg: '#f5f3ff', border: 'rgba(91,76,245,0.15)', iconBg: '#ede9fe', iconColor: '#5b4cf5' },
  }[insight.type]

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
      <div className="flex flex-col gap-1">
        <span className="text-[#1b1b22] text-[14px] font-bold font-[family-name:var(--font-plus-jakarta)]">
          {insight.title}
        </span>
        <span className="text-[#484555] text-[13px] font-medium leading-[20px] font-[family-name:var(--font-plus-jakarta)]">
          {insight.text}
        </span>
      </div>
    </div>
  )
}

/* ══ Page ════════════════════════════════════════════════ */
export default function ReportsPage() {
  const [weekOffset, setWeekOffset] = useState(0)
  const habitsCompleted = HABITS_DATA.filter(h => h.done === h.total).length
  const moodAverage = avg(MOOD_DATA)
  const overallScore = Math.round(
    ((HABITS_DATA.reduce((s, h) => s + h.done / h.total, 0) / HABITS_DATA.length) * 0.5 +
     (moodAverage / 5) * 0.5) * 100
  )

  return (
    <div className="flex flex-col gap-6 pt-4 pb-32 px-5 lg:px-10 lg:py-8 lg:max-w-2xl">

      {/* ── Semana seletor ── */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWeekOffset(o => o - 1)}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Semana anterior"
        >
          <ChevronLeft size={18} strokeWidth={2} className="text-[#1b1b22]" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[#1b1b22] text-[16px] font-bold font-[family-name:var(--font-plus-jakarta)]">
            {weekOffset === 0 ? 'Esta semana' : weekOffset === -1 ? 'Semana passada' : `${Math.abs(weekOffset)} semanas atrás`}
          </span>
          <span className="text-[#6b7280] text-[12px] font-medium font-[family-name:var(--font-plus-jakarta)]">
            {getWeekRange(weekOffset)}
          </span>
        </div>
        <button
          onClick={() => setWeekOffset(o => Math.min(o + 1, 0))}
          disabled={weekOffset === 0}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Próxima semana"
        >
          <ChevronRight size={18} strokeWidth={2} className="text-[#1b1b22]" />
        </button>
      </div>

      {/* ── Score geral ── */}
      <div className="rounded-[24px] overflow-hidden bg-gradient-to-br from-[#5b4cf5] to-[#7c6ff7] p-6 flex flex-col items-center gap-4 shadow-[0_8px_24px_rgba(91,76,245,0.30)]">

        {/* Círculo de progresso */}
        <div className="relative w-[120px] h-[120px]">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallScore / 100)}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-[28px] font-bold leading-none font-[family-name:var(--font-plus-jakarta)]">
              {overallScore}%
            </span>
            <span className="text-white/70 text-[11px] font-medium font-[family-name:var(--font-plus-jakarta)]">
              score
            </span>
          </div>
        </div>

        {/* Título */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-white text-[22px] font-bold leading-tight font-[family-name:var(--font-plus-jakarta)]">
            {overallScore >= 80 ? 'Excelente! 🎉' : overallScore >= 60 ? 'Boa semana 👍' : 'Pode melhorar 💪'}
          </p>
          <p className="text-white/70 text-[13px] font-medium font-[family-name:var(--font-plus-jakarta)]">
            Score da semana
          </p>
        </div>

        {/* Pills de stats */}
        <div className="flex gap-3">
          <div className="bg-white/15 rounded-full px-4 py-2 flex flex-col items-center">
            <span className="text-white text-[16px] font-bold leading-tight font-[family-name:var(--font-plus-jakarta)]">
              {habitsCompleted}
            </span>
            <span className="text-white/70 text-[10px] font-medium font-[family-name:var(--font-plus-jakarta)]">
              hábitos perfeitos
            </span>
          </div>
          <div className="w-px bg-white/20" />
          <div className="bg-white/15 rounded-full px-4 py-2 flex flex-col items-center">
            <span className="text-white text-[16px] font-bold leading-tight font-[family-name:var(--font-plus-jakarta)]">
              {moodAverage.toFixed(1)}/5
            </span>
            <span className="text-white/70 text-[10px] font-medium font-[family-name:var(--font-plus-jakarta)]">
              humor médio
            </span>
          </div>
        </div>
      </div>

      {/* ── Humor da semana ── */}
      <section className="flex flex-col gap-3">
        <SectionTitle>Humor da semana</SectionTitle>
        <MoodChart data={MOOD_DATA} />
      </section>

      {/* ── Hábitos ── */}
      <section className="flex flex-col gap-3">
        <SectionTitle>Conclusão de hábitos</SectionTitle>
        <HabitsChart data={HABITS_DATA} />
      </section>

      {/* ── Insights & melhorias ── */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <SectionTitle>O que melhorar na próxima semana</SectionTitle>
          <p className="text-[#6b7280] text-[13px] font-medium font-[family-name:var(--font-plus-jakarta)]">
            Análise baseada no seu histórico desta semana
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {INSIGHTS.map(insight => (
            <InsightCard key={insight.title} insight={insight} />
          ))}
        </div>
      </section>

    </div>
  )
}
