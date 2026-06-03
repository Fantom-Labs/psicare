import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-12">
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-[#1A1A2E] text-2xl font-bold tracking-tight">Criar conta</h1>
        <p className="text-[#6B7280] text-sm">Comece a monitorar seu bem-estar</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[#1A1A2E] text-sm font-medium">Nome completo</label>
          <input
            type="text"
            placeholder="Ana Silva"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1A1A2E] text-sm outline-none focus:border-[#5B4CF5] focus:ring-2 focus:ring-[#5B4CF5]/10 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#1A1A2E] text-sm font-medium">E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1A1A2E] text-sm outline-none focus:border-[#5B4CF5] focus:ring-2 focus:ring-[#5B4CF5]/10 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#1A1A2E] text-sm font-medium">Senha</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1A1A2E] text-sm outline-none focus:border-[#5B4CF5] focus:ring-2 focus:ring-[#5B4CF5]/10 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <p className="text-[#6B7280] text-xs font-medium">Você é:</p>
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl border-2 border-[#5B4CF5] bg-[#F5EDFF] text-[#5B4CF5] font-semibold text-sm">
              Paciente
            </button>
            <button className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-[#6B7280] font-semibold text-sm hover:border-[#5B4CF5]/30 transition-colors">
              Profissional
            </button>
          </div>
        </div>

        <button className="w-full py-3 rounded-xl bg-[#5B4CF5] text-white font-semibold text-sm shadow-[0_4px_12px_rgba(91,76,245,0.35)] hover:bg-[#4a3ce0] transition-colors mt-2">
          Criar conta
        </button>
      </div>

      <p className="text-center text-sm text-[#6B7280]">
        Já tem conta?{' '}
        <Link href="/login" className="text-[#5B4CF5] font-medium">
          Entrar
        </Link>
      </p>
    </div>
  )
}
