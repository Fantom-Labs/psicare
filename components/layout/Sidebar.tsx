'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ListChecks, BarChart2, User, Calendar, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/home',    icon: Home,       label: 'Início'     },
  { href: '/agenda',  icon: Calendar,   label: 'Agenda'     },
  { href: '/habits',  icon: ListChecks, label: 'Hábitos'    },
  { href: '/reports', icon: BarChart2,  label: 'Relatórios' },
  { href: '/profile', icon: User,       label: 'Perfil'     },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-gray-100/80 px-4 py-7 gap-6 overflow-y-auto">

      {/* Logo */}
      <div className="px-3 mb-2">
        <Image src="/logo.svg" alt="Psicare" width={120} height={30} priority />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1" aria-label="Navegação principal">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-[#F3F0FF] text-[#5B4CF5]'
                  : 'text-[#6B7280] hover:bg-gray-50 hover:text-[#1A1A2E]'
              )}
            >
              <Icon
                size={18}
                strokeWidth={active ? 2.2 : 1.8}
                className="shrink-0"
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: configurações + avatar */}
      <div className="flex flex-col gap-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-gray-50 hover:text-[#1A1A2E] transition-all"
        >
          <Settings size={18} strokeWidth={1.8} className="shrink-0" />
          Configurações
        </Link>

        <div className="flex items-center gap-3 px-3 py-3 mt-1 rounded-xl border border-gray-100 bg-gray-50/60">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6329E5] to-[#6459F7] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <div className="min-w-0">
            <p className="text-[#1A1A2E] text-xs font-semibold leading-tight truncate">Ana Silva</p>
            <p className="text-[#6B7280] text-[11px] leading-tight truncate">Paciente</p>
          </div>
        </div>
      </div>

    </aside>
  )
}
