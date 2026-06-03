'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'

const TEAM = [
  { name: 'Múcio Miranda',    img: '/images/integrante1.png' },
  { name: 'Ana Thereza',      img: '/images/integrante2.png' },
  { name: 'Celina Dornelas',  img: '/images/integrante3.png' },
  { name: 'Ludmila Martins',  img: '/images/integrante4.png' },
  { name: 'Pedro Vinicius',   img: '/images/integrante5.png' },
]

function MemberCard({ name, img }: { name: string; img: string }) {
  const [imgFailed, setImgFailed] = useState(false)

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')

  return (
    <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(123,92,250,0.08)] overflow-hidden flex flex-col items-center p-6 gap-3 border border-[rgba(228,225,236,0.3)]">

      {/* Avatar */}
      <div className="relative w-[88px] h-[88px] rounded-full overflow-hidden border-4 border-white shadow-[0_4px_12px_rgba(91,76,245,0.15)] bg-gradient-to-br from-[#a78bfa] to-[#5b21b6] shrink-0 flex items-center justify-center">
        {/* Iniciais — visíveis quando foto falha ou ainda não foi adicionada */}
        <span className="text-white text-xl font-bold font-[family-name:var(--font-plus-jakarta)] select-none z-0">
          {initials}
        </span>

        {/* Foto — sobrepõe as iniciais quando carregada com sucesso */}
        {!imgFailed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={name}
            onError={() => setImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}
      </div>

      {/* Nome */}
      <span className="text-[#1b1b22] text-[14px] font-bold leading-snug text-center font-[family-name:var(--font-plus-jakarta)]">
        {name}
      </span>
    </div>
  )
}

export default function SobrePage() {
  return (
    <div className="flex flex-col gap-8 pt-4 pb-32 px-5 lg:px-10 lg:py-8 lg:max-w-2xl">

      {/* ── Intro ── */}
      <section className="flex flex-col items-center gap-4 text-center pt-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6329E5] to-[#6459F7] flex items-center justify-center shadow-[0_8px_24px_rgba(99,41,229,0.30)]">
          <Heart size={28} strokeWidth={1.8} className="text-white" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[#1b1b22] text-[24px] font-bold leading-[30px] font-[family-name:var(--font-plus-jakarta)]">
            Sobre o Psicare
          </h1>
          <p className="text-[#484555] text-[15px] font-medium leading-[24px] font-[family-name:var(--font-plus-jakarta)] max-w-[320px]">
            Uma plataforma criada para transformar o autocuidado emocional em um hábito diário sustentável.
          </p>
        </div>

        <div className="w-full bg-gradient-to-br from-[#f5f0ff] to-[#eff6ff] rounded-2xl p-5 border border-[rgba(91,76,245,0.08)] text-left">
          <p className="text-[#5e3bdc] text-[13px] font-semibold uppercase tracking-wider mb-2 font-[family-name:var(--font-plus-jakarta)]">
            Nossa Missão
          </p>
          <p className="text-[#1b1b22] text-[14px] font-medium leading-[22px] font-[family-name:var(--font-plus-jakarta)]">
            Fortalecer o vínculo entre paciente e terapeuta com dados reais e contextualizados, promovendo saúde mental acessível e contínua.
          </p>
        </div>
      </section>

      {/* ── Equipe ── */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[#1b1b22] text-[18px] font-bold leading-[28px] font-[family-name:var(--font-plus-jakarta)]">
            Nossa Equipe
          </h2>
          <p className="text-[#6b7280] text-[13px] font-medium font-[family-name:var(--font-plus-jakarta)]">
            Junho 2026
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TEAM.map(member => (
            <MemberCard key={member.name} {...member} />
          ))}
        </div>
      </section>

      <p className="text-center text-[12px] text-[#9b92b8] font-medium font-[family-name:var(--font-plus-jakarta)]">
        Psicare v1.0 · 2026
      </p>
    </div>
  )
}
