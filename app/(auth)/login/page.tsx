'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Smile, ShieldCheck, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── Google "G" icon ──────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

/* ── Apple icon ───────────────────────────────────────── */
function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

/* ── Input field com ícone e foco ─────────────────────── */
function InputField({
  type, placeholder, icon: Icon, rightSlot, className,
}: {
  type: string
  placeholder: string
  icon: React.ElementType
  rightSlot?: React.ReactNode
  className?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 h-[56px] rounded-[20px] transition-all duration-200',
        'bg-[#FAF8FF] shadow-[0_4px_20px_rgba(123,92,250,0.08)]',
        focused && 'ring-2 ring-[#5B4CF5]/30 shadow-[0_4px_20px_rgba(123,92,250,0.18)]',
        className
      )}
    >
      <Icon size={18} strokeWidth={1.8} className="text-[#9B92B8] shrink-0" />
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent text-[#1A1A2E] text-[15px] font-medium placeholder:text-[#B0A8C8] outline-none font-[family-name:var(--font-plus-jakarta)]"
      />
      {rightSlot}
    </div>
  )
}

/* ── Formulário compartilhado ─────────────────────────── */
function LoginFormFields({ compact = false }: { compact?: boolean }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn('flex flex-col', compact ? 'gap-4' : 'gap-6')}>
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-semibold text-[#1A1A2E] pl-1 font-[family-name:var(--font-plus-jakarta)]">
          E-mail
        </label>
        <InputField type="email" placeholder="seu@email.com" icon={Mail} />
      </div>

      {/* Senha */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-semibold text-[#1A1A2E] pl-1 font-[family-name:var(--font-plus-jakarta)]">
          Senha
        </label>
        <InputField
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          icon={Lock}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              className="text-[#9B92B8] hover:text-[#5B4CF5] transition-colors shrink-0"
            >
              {showPassword
                ? <Eye size={18} strokeWidth={1.8} />
                : <EyeOff size={18} strokeWidth={1.8} />}
            </button>
          }
        />
        <div className="flex justify-end pr-1 pt-1">
          <Link
            href="/forgot-password"
            className="text-[12px] font-medium text-[#5B4CF5] hover:text-[#4a3ce0] transition-colors font-[family-name:var(--font-plus-jakarta)]"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </div>

      {/* Botão Entrar */}
      <Link
        href="/home"
        className="flex items-center justify-center gap-2 h-[56px] rounded-[20px] w-full bg-gradient-to-tr from-[#6329E5] to-[#6459F7] shadow-[0_8px_24px_rgba(99,41,229,0.35)] text-white text-[14px] font-semibold hover:brightness-110 active:scale-[0.98] transition-all duration-150 font-[family-name:var(--font-plus-jakarta)]"
      >
        Entrar
        <ArrowRight size={16} strokeWidth={2.5} />
      </Link>

      {/* Divisor */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[rgba(200,196,215,0.50)]" />
        <span className="text-[12px] font-medium text-[#9B92B8] whitespace-nowrap font-[family-name:var(--font-plus-jakarta)]">
          Ou entrar com
        </span>
        <div className="flex-1 h-px bg-[rgba(200,196,215,0.50)]" />
      </div>

      {/* Social */}
      <div className="flex items-center justify-center gap-4">
        {[
          { label: 'Entrar com Google', Icon: GoogleIcon },
          { label: 'Entrar com Apple', Icon: AppleIcon },
        ].map(({ label, Icon }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#1A1A2E] shadow-[0_4px_20px_rgba(123,92,250,0.08)] hover:shadow-[0_6px_24px_rgba(123,92,250,0.18)] active:scale-95 transition-all duration-150"
          >
            <Icon />
          </button>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-[14px] font-medium text-[#484457] font-[family-name:var(--font-plus-jakarta)]">
        Não tem conta?{' '}
        <Link href="/register" className="text-[#5B4CF5] font-semibold hover:text-[#4a3ce0] transition-colors">
          Criar conta
        </Link>
      </p>
    </div>
  )
}

/* ════════════════════════════════════════════════════════
   PÁGINA
   ════════════════════════════════════════════════════════ */
export default function LoginPage() {
  return (
    <>
      {/* ══ MOBILE — design original do Figma ══════════════ */}
      <div className="lg:hidden relative min-h-[700px] flex flex-col px-5 py-10 gap-8 overflow-hidden">

        {/* Blobs decorativos */}
        <div aria-hidden="true" className="absolute -top-12 -right-12 w-[300px] h-[300px] rounded-[150px] pointer-events-none" style={{ background: 'rgba(179,136,255,0.24)', filter: 'blur(60px)' }} />
        <div aria-hidden="true" className="absolute -bottom-10 -left-12 w-[250px] h-[250px] rounded-[125px] pointer-events-none" style={{ background: 'rgba(123,92,250,0.18)', filter: 'blur(60px)' }} />

        {/* Header */}
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Image src="/favicon.svg" alt="" width={30} height={30} priority aria-hidden="true" />
            <span className="text-[28px] font-bold leading-none tracking-tight text-[#1B1B22] font-[family-name:var(--font-plus-jakarta)]">
              Psicare
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-[24px] font-bold leading-[30px] text-[#1B1B22] font-[family-name:var(--font-plus-jakarta)]">
              Bom te ver de novo! 👋
            </h1>
            <p className="text-[16px] font-medium leading-[24px] text-[#484457] max-w-[280px] font-[family-name:var(--font-plus-jakarta)]">
              Faça login para continuar sua jornada de bem-estar.
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="relative z-10">
          <LoginFormFields />
        </div>
      </div>

      {/* ══ DESKTOP — split screen full-height ═════════════ */}
      <div className="hidden lg:flex min-h-screen">

        {/* ── Painel esquerdo: branding ── */}
        <div className="w-[46%] relative flex flex-col items-center justify-center p-16 overflow-hidden bg-gradient-to-br from-[#3D2DB5] via-[#5B4CF5] to-[#7C6FF7]">

          {/* Blobs decorativos brancos */}
          <div aria-hidden="true" className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.07)', filter: 'blur(60px)' }} />
          <div aria-hidden="true" className="absolute -bottom-32 -right-16 w-[380px] h-[380px] rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.06)', filter: 'blur(80px)' }} />
          <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.03)', filter: 'blur(100px)' }} />

          {/* Conteúdo do branding */}
          <div className="relative z-10 flex flex-col items-center text-center gap-10 max-w-[420px]">

            {/* Logo branca */}
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.svg"
                alt="Psicare"
                width={40}
                height={40}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="text-[32px] font-bold text-white leading-none tracking-tight font-[family-name:var(--font-plus-jakarta)]">
                Psicare
              </span>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[36px] font-bold text-white leading-[1.15] font-[family-name:var(--font-plus-jakarta)]">
                Cuide do seu bem-estar emocional, todos os dias.
              </h2>
              <p className="text-[16px] font-medium leading-[26px] text-white/70 font-[family-name:var(--font-plus-jakarta)]">
                Registre seu humor, acompanhe seus hábitos e fortaleça o vínculo com seu terapeuta com dados reais.
              </p>
            </div>

            {/* Feature bullets */}
            <div className="flex flex-col gap-4 w-full">
              {[
                { icon: Smile,        text: 'Check-in diário de humor em menos de 10 segundos' },
                { icon: TrendingUp,   text: 'Visualize sua evolução emocional ao longo do tempo' },
                { icon: ShieldCheck,  text: 'Compartilhe dados com seu terapeuta de forma segura' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-white" strokeWidth={1.8} />
                  </div>
                  <span className="text-[14px] font-medium text-white/90 text-left leading-snug font-[family-name:var(--font-plus-jakarta)]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Painel direito: formulário ── */}
        <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
          <div className="w-full max-w-[420px] flex flex-col gap-8">

            {/* Header */}
            <div className="flex flex-col gap-3">
              <Image src="/logo.svg" alt="Psicare" width={120} height={30} priority />
              <div className="flex flex-col gap-1 mt-2">
                <h1 className="text-[28px] font-bold text-[#1B1B22] leading-tight font-[family-name:var(--font-plus-jakarta)]">
                  Bom te ver de novo! 👋
                </h1>
                <p className="text-[15px] font-medium text-[#484457] leading-[24px] font-[family-name:var(--font-plus-jakarta)]">
                  Faça login para continuar sua jornada de bem-estar.
                </p>
              </div>
            </div>

            {/* Formulário (sem blobs — fundo branco limpo) */}
            <LoginFormFields />
          </div>
        </div>

      </div>
    </>
  )
}
