'use client'

import { useState, useId } from 'react'
import {
  Check, Droplets, Moon, Dumbbell, Brain,
  BookOpen, Utensils, Plus, Trash2, X, AlertTriangle,
  HeartPulse, Coffee, Music, Flame, Wind, Star, Target, Pill,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── Types ─────────────────────────────────────────────── */

interface IconOption {
  id: string
  icon: React.ElementType
  label: string
  goal: string
  bgColor: string
  iconColor: string
}

interface Habit {
  id: number
  name: string
  goal: string
  bgColor: string
  iconId: string
  icon: React.ElementType
  iconColor: string
  defaultDone: boolean
}

/* ── Icon options (palette do modal) ───────────────────── */

const ICON_OPTIONS: IconOption[] = [
  { id: 'water',      icon: Droplets,   label: 'Hidratação',   goal: '2 litros',      bgColor: '#eff6ff', iconColor: '#2563eb' },
  { id: 'sleep',      icon: Moon,       label: 'Sono',         goal: '7-8 horas',     bgColor: '#eef2ff', iconColor: '#4f46e5' },
  { id: 'exercise',   icon: Dumbbell,   label: 'Exercício',    goal: '30 minutos',    bgColor: '#fff7ed', iconColor: '#ea580c' },
  { id: 'meditation', icon: Brain,      label: 'Meditação',    goal: '10 minutos',    bgColor: '#faf5ff', iconColor: '#a855f7' },
  { id: 'reading',    icon: BookOpen,   label: 'Leitura',      goal: '20 minutos',    bgColor: '#fdf2f8', iconColor: '#ec4899' },
  { id: 'food',       icon: Utensils,   label: 'Alimentação',  goal: '5 refeições',   bgColor: '#fef2f2', iconColor: '#ef4444' },
  { id: 'health',     icon: HeartPulse, label: 'Saúde',        goal: 'diariamente',   bgColor: '#fff0f3', iconColor: '#e11d48' },
  { id: 'coffee',     icon: Coffee,     label: 'Pausa',        goal: '15 minutos',    bgColor: '#fef9ee', iconColor: '#b45309' },
  { id: 'music',      icon: Music,      label: 'Música',       goal: '30 minutos',    bgColor: '#f0f9ff', iconColor: '#0284c7' },
  { id: 'flame',      icon: Flame,      label: 'Desafio',      goal: 'diariamente',   bgColor: '#fff7ed', iconColor: '#f97316' },
  { id: 'breath',     icon: Wind,       label: 'Respiração',   goal: '5 minutos',     bgColor: '#f0fdfa', iconColor: '#0d9488' },
  { id: 'goal',       icon: Target,     label: 'Meta',         goal: 'diariamente',   bgColor: '#f5f3ff', iconColor: '#7c3aed' },
  { id: 'star',       icon: Star,       label: 'Conquista',    goal: 'diariamente',   bgColor: '#fefce8', iconColor: '#ca8a04' },
  { id: 'medicine',   icon: Pill,       label: 'Medicação',    goal: '1x ao dia',     bgColor: '#fff1f2', iconColor: '#f43f5e' },
  { id: 'custom',     icon: Plus,       label: 'Personalizado',goal: '',              bgColor: '#f8f7ff', iconColor: '#5b4cf5' },
]

/* ── Initial habits ────────────────────────────────────── */

let nextId = 7
const INITIAL_HABITS: Habit[] = [
  { id: 1, name: 'Beba água',         goal: 'Meta: 2 litros',     bgColor: '#eff6ff', iconId: 'water',      icon: Droplets,   iconColor: '#2563eb', defaultDone: true  },
  { id: 2, name: 'Dormir bem',        goal: 'Meta: 7-8 horas',    bgColor: '#eef2ff', iconId: 'sleep',      icon: Moon,       iconColor: '#4f46e5', defaultDone: true  },
  { id: 3, name: 'Exercício físico',  goal: 'Meta: 30 minutos',   bgColor: '#fff7ed', iconId: 'exercise',   icon: Dumbbell,   iconColor: '#ea580c', defaultDone: true  },
  { id: 4, name: 'Meditação',         goal: 'Meta: 10 minutos',   bgColor: '#faf5ff', iconId: 'meditation', icon: Brain,      iconColor: '#a855f7', defaultDone: true  },
  { id: 5, name: 'Leitura',           goal: 'Meta: 20 minutos',   bgColor: '#fdf2f8', iconId: 'reading',    icon: BookOpen,   iconColor: '#ec4899', defaultDone: false },
  { id: 6, name: 'Alimentação Saudável', goal: 'Meta: 5 refeições', bgColor: '#fef2f2', iconId: 'food',    icon: Utensils,   iconColor: '#ef4444', defaultDone: true  },
]

/* ── Days ──────────────────────────────────────────────── */
const DAYS_PT = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
const MONTHS_PT = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
function todayLabel() {
  const d = new Date()
  return `${d.getDate()} de ${MONTHS_PT[d.getMonth()]}, ${DAYS_PT[d.getDay()]} ☀️`
}

/* ══ Add Habit Modal ═════════════════════════════════════ */

function AddHabitModal({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (habit: Omit<Habit, 'id' | 'defaultDone'>) => void
}) {
  const nameId = useId()
  const goalId = useId()
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

  const selected = ICON_OPTIONS.find(o => o.id === selectedIconId)

  function handleIconSelect(opt: IconOption) {
    setSelectedIconId(opt.id)
    if (!name || name === ICON_OPTIONS.find(o => o.id === selectedIconId)?.label) {
      setName(opt.id === 'custom' ? '' : opt.label)
    }
    if (!goal || goal === ICON_OPTIONS.find(o => o.id === selectedIconId)?.goal) {
      setGoal(opt.goal)
    }
  }

  function handleConfirm() {
    if (!selectedIconId || !name.trim()) return
    const opt = ICON_OPTIONS.find(o => o.id === selectedIconId)!
    onAdd({
      name: name.trim(),
      goal: goal.trim() ? `Meta: ${goal.trim()}` : '',
      bgColor: opt.bgColor,
      iconId: opt.id,
      icon: opt.icon,
      iconColor: opt.iconColor,
    })
    onClose()
  }

  const canConfirm = !!selectedIconId && name.trim().length > 0

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-[80] flex items-end lg:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div className="relative z-10 w-full max-w-[420px] bg-white rounded-t-[28px] lg:rounded-[28px] shadow-2xl flex flex-col max-h-[90dvh] overflow-hidden">

        {/* Handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 lg:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-[#1b1b22] text-[18px] font-bold font-[family-name:var(--font-plus-jakarta)]">
            Novo hábito
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Fechar"
          >
            <X size={18} strokeWidth={2} className="text-[#6b7280]" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-5">

          {/* Icon picker */}
          <div className="flex flex-col gap-3">
            <p className="text-[#1b1b22] text-[14px] font-semibold font-[family-name:var(--font-plus-jakarta)]">
              Escolha um ícone
            </p>
            <div className="grid grid-cols-5 gap-2">
              {ICON_OPTIONS.map(opt => {
                const Icon = opt.icon
                const isSelected = selectedIconId === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleIconSelect(opt)}
                    title={opt.label}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-2 rounded-2xl border-2 transition-all duration-150',
                      isSelected
                        ? 'border-[#5b4cf5] shadow-[0_0_0_3px_rgba(91,76,245,0.15)]'
                        : 'border-transparent hover:border-gray-200'
                    )}
                  >
                    <div
                      className="w-10 h-10 rounded-[14px] flex items-center justify-center"
                      style={{ backgroundColor: opt.bgColor }}
                    >
                      <Icon size={18} strokeWidth={1.8} style={{ color: opt.iconColor }} />
                    </div>
                    <span className="text-[9px] font-medium text-[#6b7280] font-[family-name:var(--font-plus-jakarta)] leading-tight text-center">
                      {opt.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Name input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor={nameId}
              className="text-[14px] font-semibold text-[#1b1b22] font-[family-name:var(--font-plus-jakarta)]"
            >
              Nome do hábito <span className="text-[#ef4444]">*</span>
            </label>
            <input
              id={nameId}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ex: Beber água"
              maxLength={40}
              className="w-full px-4 py-3 rounded-[16px] border border-gray-200 bg-[#faf8ff] text-[#1b1b22] text-[15px] font-medium outline-none focus:border-[#5b4cf5] focus:ring-2 focus:ring-[#5b4cf5]/10 transition-all font-[family-name:var(--font-plus-jakarta)] placeholder:text-[#b0a8c8]"
            />
            {/* Sugestões rápidas */}
            {selected && selected.id !== 'custom' && (
              <div className="flex flex-wrap gap-2">
                {['Diariamente', '1x por dia', 'Toda manhã', 'Toda noite'].map(s => (
                  <button
                    key={s}
                    onClick={() => setName(selected.label + ' — ' + s.toLowerCase())}
                    className="text-[11px] font-medium text-[#5b4cf5] bg-[#f3f0ff] px-3 py-1 rounded-full hover:bg-[#ede9fe] transition-colors font-[family-name:var(--font-plus-jakarta)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Goal input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor={goalId}
              className="text-[14px] font-semibold text-[#1b1b22] font-[family-name:var(--font-plus-jakarta)]"
            >
              Meta <span className="text-[#6b7280] font-normal text-[12px]">(opcional)</span>
            </label>
            <input
              id={goalId}
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="ex: 2 litros, 30 minutos…"
              maxLength={40}
              className="w-full px-4 py-3 rounded-[16px] border border-gray-200 bg-[#faf8ff] text-[#1b1b22] text-[15px] font-medium outline-none focus:border-[#5b4cf5] focus:ring-2 focus:ring-[#5b4cf5]/10 transition-all font-[family-name:var(--font-plus-jakarta)] placeholder:text-[#b0a8c8]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-[16px] border-2 border-gray-200 text-[#6b7280] font-semibold text-[14px] hover:border-gray-300 transition-colors font-[family-name:var(--font-plus-jakarta)]"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="flex-1 py-3 rounded-[16px] bg-gradient-to-tr from-[#6329E5] to-[#6459F7] text-white font-semibold text-[14px] shadow-[0_4px_12px_rgba(99,41,229,0.35)] disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all font-[family-name:var(--font-plus-jakarta)]"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══ Delete Confirm Modal ════════════════════════════════ */

function DeleteConfirmModal({
  habits,
  ids,
  onCancel,
  onConfirm,
}: {
  habits: Habit[]
  ids: Set<number>
  onCancel: () => void
  onConfirm: () => void
}) {
  const toDelete = habits.filter(h => ids.has(h.id))
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onCancel} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-[360px] bg-white rounded-[24px] shadow-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fee2e2] flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-[#ef4444]" strokeWidth={2} />
          </div>
          <h3 className="text-[#1b1b22] text-[17px] font-bold font-[family-name:var(--font-plus-jakarta)]">
            Apagar {toDelete.length} hábito{toDelete.length > 1 ? 's' : ''}?
          </h3>
        </div>

        <ul className="flex flex-col gap-2">
          {toDelete.map(h => {
            const Icon = h.icon
            return (
              <li key={h.id} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[10px] flex items-center justify-center shrink-0" style={{ backgroundColor: h.bgColor }}>
                  <Icon size={14} strokeWidth={1.8} style={{ color: h.iconColor }} />
                </div>
                <span className="text-[#484555] text-[14px] font-medium font-[family-name:var(--font-plus-jakarta)]">{h.name}</span>
              </li>
            )
          })}
        </ul>

        <p className="text-[#6b7280] text-[13px] font-medium font-[family-name:var(--font-plus-jakarta)]">
          Esta ação não pode ser desfeita.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-[14px] border-2 border-gray-200 text-[#6b7280] font-semibold text-[14px] hover:border-gray-300 transition-colors font-[family-name:var(--font-plus-jakarta)]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-[14px] bg-[#ef4444] text-white font-semibold text-[14px] shadow-[0_4px_12px_rgba(239,68,68,0.35)] hover:bg-[#dc2626] transition-colors font-[family-name:var(--font-plus-jakarta)]"
          >
            Apagar
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══ Habit Card ══════════════════════════════════════════ */

function HabitCard({
  habit,
  done,
  deleteMode,
  selected,
  onToggleDone,
  onToggleSelect,
}: {
  habit: Habit
  done: boolean
  deleteMode: boolean
  selected: boolean
  onToggleDone: () => void
  onToggleSelect: () => void
}) {
  const Icon = habit.icon

  return (
    <div
      onClick={deleteMode ? onToggleSelect : undefined}
      className={cn(
        'bg-white border drop-shadow-[0px_10px_15px_rgba(124,77,255,0.08)] flex gap-4 items-center p-[17px] rounded-[24px] w-full transition-all duration-150',
        deleteMode ? 'cursor-pointer' : '',
        selected
          ? 'border-[#ef4444] bg-red-50/30'
          : 'border-[rgba(99,44,229,0.05)]'
      )}
    >
      {/* Selection checkbox (delete mode) */}
      {deleteMode && (
        <div className={cn(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
          selected ? 'bg-[#ef4444] border-[#ef4444]' : 'border-gray-300 bg-white'
        )}>
          {selected && <Check size={13} strokeWidth={3} className="text-white" />}
        </div>
      )}

      {/* Icon */}
      <div
        className="rounded-[16px] shrink-0 size-12 flex items-center justify-center"
        style={{ backgroundColor: habit.bgColor }}
      >
        <Icon size={20} strokeWidth={1.8} style={{ color: habit.iconColor }} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 flex flex-col">
        <span className="text-[#191c1f] text-[16px] leading-[24px] font-bold font-[family-name:var(--font-plus-jakarta)] truncate">
          {habit.name}
        </span>
        {habit.goal && (
          <span className="text-[#494455] text-[10px] leading-[14px] font-medium font-[family-name:var(--font-plus-jakarta)]">
            {habit.goal}
          </span>
        )}
      </div>

      {/* Toggle button (normal mode only) */}
      {!deleteMode && (
        <button
          onClick={onToggleDone}
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
      )}
    </div>
  )
}

/* ══ Page ════════════════════════════════════════════════ */

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS)
  const [done, setDone] = useState<Set<number>>(
    new Set(INITIAL_HABITS.filter(h => h.defaultDone).map(h => h.id))
  )
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [selectedToDelete, setSelectedToDelete] = useState<Set<number>>(new Set())
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  function toggleDone(id: number) {
    setDone(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleSelect(id: number) {
    setSelectedToDelete(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleAddHabit(data: Omit<Habit, 'id' | 'defaultDone'>) {
    const newHabit: Habit = { ...data, id: nextId++, defaultDone: false }
    setHabits(prev => [...prev, newHabit])
  }

  function handleDeleteConfirm() {
    setHabits(prev => prev.filter(h => !selectedToDelete.has(h.id)))
    setDone(prev => {
      const next = new Set(prev)
      selectedToDelete.forEach(id => next.delete(id))
      return next
    })
    setSelectedToDelete(new Set())
    setDeleteMode(false)
    setShowDeleteConfirm(false)
  }

  function exitDeleteMode() {
    setDeleteMode(false)
    setSelectedToDelete(new Set())
  }

  return (
    <>
      <div className="flex flex-col gap-4 pt-4 pb-32 px-5 lg:px-10 lg:py-8 lg:max-w-2xl">

        {/* ── Header ── */}
        <div className="flex flex-col gap-2">
          {/* Linha 1: data */}
          <div className="flex items-center gap-2">
            <span className="text-[#191c1f] text-[18px] leading-[24px] font-semibold font-[family-name:var(--font-plus-jakarta)]">
              Hoje
            </span>
            <span className="text-[rgba(73,68,85,0.4)] text-[16px] font-normal font-[family-name:var(--font-plus-jakarta)]">•</span>
            <span className="text-[#494455] text-[14px] leading-[20px] font-normal font-[family-name:var(--font-plus-jakarta)]">
              {todayLabel()}
            </span>
          </div>

          {/* Linha 2: botões alinhados à direita */}
          <div className="flex justify-between gap-2">
            {!deleteMode ? (
              <>
                {/* Apagar — outline cinza */}
                <button
                  onClick={() => setDeleteMode(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-300 text-[#6b7280] text-[12px] font-semibold hover:border-gray-400 hover:text-[#374151] transition-all font-[family-name:var(--font-plus-jakarta)]"
                  aria-label="Apagar hábitos"
                >
                  <Trash2 size={13} strokeWidth={2} />
                  Apagar hábito
                </button>

                {/* Novo hábito — filled roxo */}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#632ce5] text-white text-[12px] font-semibold shadow-[0_2px_8px_rgba(99,44,229,0.30)] hover:brightness-110 active:scale-95 transition-all font-[family-name:var(--font-plus-jakarta)]"
                >
                  <Plus size={13} strokeWidth={2.5} />
                  Novo hábito
                </button>
              </>
            ) : (
              <button
                onClick={exitDeleteMode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-300 text-[#6b7280] text-[12px] font-semibold hover:border-gray-400 transition-all font-[family-name:var(--font-plus-jakarta)]"
              >
                <X size={13} strokeWidth={2} />
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Delete mode banner */}
        {deleteMode && (
          <div className="flex items-center gap-2 bg-[#fff5f5] border border-[#fecaca] rounded-2xl px-4 py-3">
            <Trash2 size={15} className="text-[#ef4444] shrink-0" strokeWidth={2} />
            <span className="text-[#ef4444] text-[13px] font-medium font-[family-name:var(--font-plus-jakarta)]">
              Selecione os hábitos que deseja apagar
            </span>
          </div>
        )}

        {/* ── Habit list ── */}
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
          {habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              done={done.has(habit.id)}
              deleteMode={deleteMode}
              selected={selectedToDelete.has(habit.id)}
              onToggleDone={() => toggleDone(habit.id)}
              onToggleSelect={() => toggleSelect(habit.id)}
            />
          ))}
        </div>

        {habits.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-5xl">🌱</span>
            <p className="text-[#1b1b22] text-[16px] font-bold font-[family-name:var(--font-plus-jakarta)]">
              Nenhum hábito ainda
            </p>
            <p className="text-[#6b7280] text-[14px] font-medium font-[family-name:var(--font-plus-jakarta)]">
              Toque em "Novo hábito" para começar.
            </p>
          </div>
        )}
      </div>

      {/* ── Floating delete bar ── */}
      {deleteMode && selectedToDelete.size > 0 && (
        <div className="fixed bottom-[90px] left-0 right-0 z-50 flex justify-center px-5 lg:bottom-8">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 bg-[#ef4444] text-white px-6 py-3.5 rounded-full shadow-[0_8px_24px_rgba(239,68,68,0.40)] hover:bg-[#dc2626] active:scale-95 transition-all font-[family-name:var(--font-plus-jakarta)] font-semibold text-[14px]"
          >
            <Trash2 size={16} strokeWidth={2} />
            Apagar {selectedToDelete.size} hábito{selectedToDelete.size > 1 ? 's' : ''}
          </button>
        </div>
      )}

      {/* ── Add modal ── */}
      {showAddModal && (
        <AddHabitModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddHabit}
        />
      )}

      {/* ── Delete confirm ── */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          habits={habits}
          ids={selectedToDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  )
}
