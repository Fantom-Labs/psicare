'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const MOODS = [
  { emoji: '😢', label: 'Muito\nmal', value: 1 },
  { emoji: '😟', label: 'Mal',       value: 2 },
  { emoji: '😐', label: 'Neutro',    value: 3 },
  { emoji: '🙂', label: 'Bem',       value: 4 },
  { emoji: '😊', label: 'Muito\nbem',value: 5 },
]

interface MoodSelectorProps {
  defaultValue?: number
}

export function MoodSelector({ defaultValue = 5 }: MoodSelectorProps) {
  const [selected, setSelected] = useState<number>(defaultValue)

  return (
    <section className="flex flex-col gap-4">
      {/* Welcome heading */}
      <div className="flex flex-col gap-[4px]">
        <h1 className="text-[#1A1A2E] text-[24px] font-bold tracking-tight leading-[34px]">
          Olá, Ana! 👋
        </h1>
        <p className="text-[#6B7280] text-[16px] leading-[24px]">
          Como você está hoje?
        </p>
      </div>

      {/* Mood card */}
      <div className="bg-white rounded-[24px] border border-[#F2F2F2] overflow-hidden">
        <div className="flex items-center justify-between px-3 py-[6px]">
          {MOODS.map((mood) => {
            const isSelected = selected === mood.value
            return (
              <button
                key={mood.value}
                onClick={() => setSelected(mood.value)}
                aria-label={`Humor: ${mood.label.replace('\n', ' ')}`}
                aria-pressed={isSelected}
                className={cn(
                  'flex flex-col items-center justify-center gap-[4px] w-[64px] h-[98px] rounded-[20px] transition-all duration-200 select-none',
                  isSelected
                    ? 'bg-[#F5EDFF] border-2 border-[#5B4CF5] shadow-[0_4px_30px_rgba(91,76,245,0.25)]'
                    : 'bg-white border-2 border-transparent hover:bg-gray-50'
                )}
              >
                <span className="text-[30px] leading-none">{mood.emoji}</span>
                <span
                  className={cn(
                    'text-[11px] font-medium text-center leading-tight whitespace-pre-line',
                    isSelected ? 'text-[#5B4CF5]' : 'text-[#6B7280]'
                  )}
                >
                  {mood.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
