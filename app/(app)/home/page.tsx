import { MoodSelector } from '@/components/home/MoodSelector'
import { StreakCard } from '@/components/home/StreakCard'
import { WeeklyCompletionCard } from '@/components/home/WeeklyCompletionCard'
import { HabitsList } from '@/components/home/HabitsList'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 px-5 py-5 pb-10">

      {/* Welcome Text & Mood Selector — Figma: 16:317 */}
      <MoodSelector defaultValue={5} />

      {/* Dashboard Bento Grid — Figma: 1:273 */}
      {/* Grid: 1 coluna, 2 rows, gap 16px, padding horizontal 0 (já vem do px-5 pai) */}
      <section className="flex flex-col gap-4">
        {/* Sequência Atual Card — Figma: 1:274 — 350×214px */}
        <StreakCard />

        {/* Conclusão Semanal Card — Figma: 1:338 — 350×140px */}
        <WeeklyCompletionCard />
      </section>

      {/* Section: Daily Habits List — Figma: 16:3 */}
      <HabitsList />

    </div>
  )
}
