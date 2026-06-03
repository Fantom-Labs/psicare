'use client'

import Link from 'next/link'
import {
  User, Bell, Lock, HelpCircle, LogOut, Info,
  ChevronRight, Target, Calendar, Award, Camera,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── Stat card ────────────────────────────────────────── */
function StatCard({
  value,
  label,
  iconBg,
  icon: Icon,
  iconColor,
}: {
  value: string
  label: string
  iconBg: string
  icon: React.ElementType
  iconColor: string
}) {
  return (
    <div className="flex flex-col items-center justify-center p-[17px] rounded-[16px] gap-1 backdrop-blur-[6px] bg-[rgba(255,255,255,0.9)] border border-[rgba(255,255,255,0.4)] shadow-[0px_4px_20px_0px_rgba(123,92,250,0.08)]">
      <div className="mb-1 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: iconBg }}>
        <Icon size={20} strokeWidth={1.8} style={{ color: iconColor }} />
      </div>
      <span className="text-[#1b1b22] text-[24px] font-bold leading-[30px] font-[family-name:var(--font-plus-jakarta)]">
        {value}
      </span>
      <span className="text-[#484555] text-[12px] font-medium leading-[16px] text-center font-[family-name:var(--font-plus-jakarta)]">
        {label}
      </span>
    </div>
  )
}

/* ── Badge card ────────────────────────────────────────── */
function BadgeCard({
  emoji,
  label,
  gradientFrom,
}: {
  emoji: string
  label: string
  gradientFrom: string
}) {
  return (
    <div className="relative bg-white rounded-[12px] shadow-[0px_4px_20px_0px_rgba(123,92,250,0.08)] p-3 flex flex-col items-center overflow-hidden">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ background: `linear-gradient(138deg, ${gradientFrom} 0%, transparent 100%)` }}
      />
      <span className="text-[30px] leading-[36px] mb-2 relative z-10">{emoji}</span>
      <span className="text-[#1b1b22] text-[12px] font-bold leading-[15px] text-center relative z-10 font-[family-name:var(--font-plus-jakarta)]">
        {label}
      </span>
    </div>
  )
}

/* ── Settings row ──────────────────────────────────────── */
function SettingsRow({
  icon: Icon,
  label,
  iconBg,
  iconColor,
  danger = false,
  withBorder = true,
  href,
}: {
  icon: React.ElementType
  label: string
  iconBg: string
  iconColor: string
  danger?: boolean
  withBorder?: boolean
  href?: string
}) {
  const inner = (
    <>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={18} strokeWidth={1.8} style={{ color: iconColor }} />
        </div>
        <span
          className={cn(
            'text-[16px] leading-[24px] font-[family-name:var(--font-plus-jakarta)]',
            danger ? 'font-semibold text-[#ff6b6b]' : 'font-medium text-[#1b1b22]'
          )}
        >
          {label}
        </span>
      </div>
      {!danger && (
        <ChevronRight size={16} strokeWidth={1.8} className="text-[#9b92b8] shrink-0" />
      )}
    </>
  )

  const cls = cn(
    'flex items-center justify-between w-full py-[17px] px-4 text-left transition-colors hover:bg-gray-50/50',
    withBorder && 'border-b border-[rgba(228,225,236,0.5)]'
  )

  if (href) {
    return <Link href={href} className={cls}>{inner}</Link>
  }
  return <button className={cls}>{inner}</button>
}

/* ══ Page ════════════════════════════════════════════════ */
export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 pt-4 pb-32 px-5 lg:px-10 lg:py-8 lg:max-w-2xl">

      {/* ── Profile Header ── */}
      <section className="flex flex-col items-center gap-3 pt-2">

        {/* Avatar */}
        <div className="relative">
          <div className="w-[96px] h-[96px] rounded-full border-4 border-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] bg-gradient-to-br from-[#a78bfa] via-[#7c3aed] to-[#5b21b6] flex items-center justify-center">
            <span className="text-white text-[32px] font-bold font-[family-name:var(--font-plus-jakarta)]">A</span>
          </div>
          {/* Edit button */}
          <button
            aria-label="Editar foto de perfil"
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#5e3bdc] flex items-center justify-center shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] hover:bg-[#4e2db5] transition-colors"
          >
            <Camera size={12} strokeWidth={2} className="text-white" />
          </button>
        </div>

        {/* Name */}
        <h1 className="text-[#1b1b22] text-[24px] font-bold leading-[30px] font-[family-name:var(--font-plus-jakarta)]">
          Ana Carolina
        </h1>

        {/* Level badge */}
        <div className="flex items-center gap-1.5 bg-[rgba(230,222,255,0.5)] px-3 py-1 rounded-full">
          <Award size={14} strokeWidth={1.8} className="text-[#5e3bdc]" />
          <span className="text-[#5e3bdc] text-[14px] font-semibold leading-[20px] font-[family-name:var(--font-plus-jakarta)]">
            Nível 5
          </span>
        </div>
      </section>

      {/* ── Stats grid ── */}
      <section className="grid grid-cols-2 gap-4 relative">
        {/* Subtle background tint so glassmorphism renders */}
        <div className="absolute inset-0 -inset-x-4 -z-10 bg-gradient-to-br from-[#f5f0ff] to-[#eff6ff] rounded-2xl opacity-60" />
        <StatCard
          value="342"
          label="Hábitos Concluídos"
          iconBg="rgba(235,220,255,0.5)"
          iconColor="#5e3bdc"
          icon={Target}
        />
        <StatCard
          value="45"
          label="Dias de Jornada"
          iconBg="rgba(107,255,143,0.3)"
          iconColor="#006c4f"
          icon={Calendar}
        />
      </section>

      {/* ── Conquistas ── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[#1b1b22] text-[18px] font-bold leading-[28px] font-[family-name:var(--font-plus-jakarta)]">
            Suas Conquistas
          </h2>
          <button className="text-[#5e3bdc] text-[14px] font-semibold leading-[20px] hover:opacity-80 transition-opacity font-[family-name:var(--font-plus-jakarta)]">
            Ver todas
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <BadgeCard emoji="🔥" label={'10 dias\nsequidos'}          gradientFrom="rgb(255,237,213)" />
          <BadgeCard emoji="🧘‍♀️" label={'Mestre da\nMeditação'}    gradientFrom="rgb(243,232,255)" />
          <BadgeCard emoji="💧" label={'Hidratação\nOK'}             gradientFrom="rgb(219,234,254)" />
        </div>
      </section>

      {/* ── Configurações ── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[#1b1b22] text-[18px] font-bold leading-[28px] font-[family-name:var(--font-plus-jakarta)]">
          Configurações
        </h2>

        <div className="bg-white rounded-[16px] shadow-[0px_4px_20px_0px_rgba(123,92,250,0.08)] overflow-hidden">
          <SettingsRow
            icon={User}
            label="Configurações de Perfil"
            iconBg="rgba(230,222,255,0.4)"
            iconColor="#5e3bdc"
          />
          <SettingsRow
            icon={Bell}
            label="Notificações"
            iconBg="rgba(235,220,255,0.4)"
            iconColor="#7c3aed"
          />
          <SettingsRow
            icon={Lock}
            label="Privacidade"
            iconBg="rgba(107,255,143,0.3)"
            iconColor="#006c4f"
          />
          <SettingsRow
            icon={HelpCircle}
            label="Ajuda"
            iconBg="#dbeafe"
            iconColor="#2563eb"
          />
          <SettingsRow
            icon={Info}
            label="Sobre"
            iconBg="rgba(230,222,255,0.4)"
            iconColor="#5e3bdc"
            href="/sobre"
          />
          <SettingsRow
            icon={LogOut}
            label="Sair"
            iconBg="#fee2e2"
            iconColor="#ff6b6b"
            danger
            withBorder={false}
          />
        </div>
      </section>

    </div>
  )
}
