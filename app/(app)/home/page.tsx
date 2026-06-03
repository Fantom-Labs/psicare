import { MoodSelector } from '@/components/home/MoodSelector'
import { StreakCard } from '@/components/home/StreakCard'
import { WeeklyCompletionCard } from '@/components/home/WeeklyCompletionCard'
import { HabitsList } from '@/components/home/HabitsList'

export default function HomePage() {
  return (
    <div className="px-5 py-5 flex flex-col gap-4 lg:px-10 lg:py-8 lg:gap-6 lg:max-w-5xl lg:mx-0">

      {/* Mood Selector — largura total em ambos */}
      <MoodSelector defaultValue={5} />

      {/*
        Mobile:  coluna única
        Desktop: 2 colunas — [stats (1fr)] [hábitos (1.5fr)]
      */}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_1.5fr] lg:gap-6 lg:items-start">

        {/* Coluna esquerda: cards de estatísticas */}
        <div className="flex flex-col gap-4">
          <StreakCard />
          <WeeklyCompletionCard />
        </div>

        {/* Coluna direita: lista de hábitos */}
        <HabitsList />

      </div>
    </div>
  )
}
