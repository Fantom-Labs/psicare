import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-12">
      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-[#5B4CF5] flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
        <h1 className="text-[#1A1A2E] text-2xl font-bold tracking-tight">Psicare</h1>
        <p className="text-[#6B7280] text-sm text-center">Monitoramento do bem-estar emocional</p>
      </div>

      <div className="flex flex-col gap-4">
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

        <button className="w-full py-3 rounded-xl bg-[#5B4CF5] text-white font-semibold text-sm shadow-[0_4px_12px_rgba(91,76,245,0.35)] hover:bg-[#4a3ce0] transition-colors mt-2">
          Entrar
        </button>

        <Link
          href="/home"
          className="w-full py-3 rounded-xl border-2 border-gray-200 text-[#1A1A2E] font-semibold text-sm text-center hover:border-[#5B4CF5]/30 transition-colors"
        >
          Continuar com Google
        </Link>
      </div>

      <p className="text-center text-sm text-[#6B7280]">
        Não tem conta?{' '}
        <Link href="/register" className="text-[#5B4CF5] font-medium">
          Cadastre-se
        </Link>
      </p>
    </div>
  )
}
