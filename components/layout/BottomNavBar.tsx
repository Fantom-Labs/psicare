'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ListChecks, BarChart2, User, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Colors extracted from Figma node 53:468
   active text/icon  → #6541ED
   inactive text/icon→ #494455
   bar bg            → rgba(248,249,254,0.80)
   border-top        → rgba(202,195,216,0.10)
   bar shadow        → 0 -10px 30px rgba(124,77,255,0.08)
*/

function NavItem({
  href,
  icon: Icon,
  label,
  active,
}: {
  href: string
  icon: React.ElementType
  label: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-[4px] min-w-[40px] px-1"
      aria-current={active ? 'page' : undefined}
    >
      <Icon
        size={active ? 20 : 18}
        strokeWidth={active ? 2.2 : 1.8}
        className={cn(
          'transition-colors duration-200',
          active ? 'text-[#6541ED]' : 'text-[#494455]'
        )}
      />
      <span
        className={cn(
          'text-[10px] leading-[14px] font-medium transition-colors duration-200',
          'font-[family-name:var(--font-plus-jakarta)]',
          active ? 'text-[#6541ED]' : 'text-[#494455]'
        )}
      >
        {label}
      </span>
    </Link>
  )
}

/* Botão central — Início — visualmente destacado */
function HomeNavItem({ active }: { active: boolean }) {
  return (
    <Link
      href="/home"
      className="flex flex-col items-center gap-[4px] -mt-3"
      aria-current={active ? 'page' : undefined}
      aria-label="Início"
    >
      <div
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200',
          'shadow-[0_4px_12px_rgba(99,41,229,0.25)]',
          active
            ? 'bg-[#6329E5] scale-105'
            : 'bg-gradient-to-tr from-[#6329E5] to-[#6459F7]'
        )}
      >
        <Home
          size={22}
          strokeWidth={active ? 2.4 : 2}
          className="text-white"
        />
      </div>
      <span
        className={cn(
          'text-[10px] leading-[14px] font-medium',
          'font-[family-name:var(--font-plus-jakarta)]',
          active ? 'text-[#6541ED]' : 'text-[#494455]'
        )}
      >
        Início
      </span>
    </Link>
  )
}

export function BottomNavBar() {
  const pathname = usePathname()

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-[390px] mx-auto">
        <nav
          className={cn(
            'flex items-end justify-between',
            'px-4 pt-3 pb-8',
            'rounded-t-[32px]',
            'bg-[rgba(248,249,254,0.80)] backdrop-blur-[20px]',
            'border-t border-[rgba(202,195,216,0.10)]',
            'shadow-[0_-10px_30px_rgba(124,77,255,0.08)]'
          )}
          aria-label="Navegação principal"
        >
          {/* Agenda */}
          <NavItem
            href="/agenda"
            icon={Calendar}
            label="Agenda"
            active={pathname === '/agenda'}
          />

          {/* Hábitos */}
          <NavItem
            href="/habits"
            icon={ListChecks}
            label="Hábitos"
            active={pathname === '/habits'}
          />

          {/* Início — botão central em destaque */}
          <HomeNavItem active={pathname === '/home'} />

          {/* Relatórios */}
          <NavItem
            href="/reports"
            icon={BarChart2}
            label="Relatórios"
            active={pathname === '/reports'}
          />

          {/* Perfil */}
          <NavItem
            href="/profile"
            icon={User}
            label="Perfil"
            active={pathname === '/profile'}
          />
        </nav>
      </div>
    </div>
  )
}
