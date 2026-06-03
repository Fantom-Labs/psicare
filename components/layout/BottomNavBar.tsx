'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ListChecks, BarChart2, User, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/home',    icon: Home,       label: 'Início'    },
  { href: '/habits',  icon: ListChecks, label: 'Hábitos'   },
  null, // FAB placeholder
  { href: '/reports', icon: BarChart2,  label: 'Relatórios' },
  { href: '/profile', icon: User,       label: 'Perfil'    },
] as const

/* Colors extracted from Figma node 53:468
   active text/icon  → #6541ED  (rgba 101,65,237)
   inactive text/icon→ #494455  (rgba 73,68,85)
   bar bg            → rgba(248,249,254,0.80)
   border-top        → rgba(202,195,216,0.10)
   bar shadow        → 0 -10px 30px rgba(124,77,255,0.08)
   FAB gradient from → #6329E5
   FAB gradient to   → #6459F7
   FAB shadow        → 0 4px 6px -4px rgba(99,41,229,0.25)
                       0 10px 15px -3px rgba(99,41,229,0.25)
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

export function BottomNavBar() {
  const pathname = usePathname()

  return (
    /* Outer wrapper — max-width matches the app shell */
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-[390px] mx-auto relative pointer-events-auto">

        {/* FAB — floats 31px above the bar surface */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10">
          <button
            aria-label="Novo registro"
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              'bg-gradient-to-tr from-[#6329E5] to-[#6459F7]',
              'shadow-[0_4px_6px_-4px_rgba(99,41,229,0.25),0_10px_15px_-3px_rgba(99,41,229,0.25)]',
              'active:scale-95 hover:brightness-110 transition-all duration-150'
            )}
          >
            <Plus size={22} strokeWidth={2.5} className="text-white" />
          </button>
        </div>

        {/* Bar surface */}
        <nav
          className={cn(
            'flex items-center justify-between',
            'px-6 pt-4 pb-8',   /* pb-8 ≈ safe area on iPhone */
            'rounded-t-[32px]',
            'bg-[rgba(248,249,254,0.80)] backdrop-blur-[20px]',
            'border-t border-[rgba(202,195,216,0.10)]',
            'shadow-[0_-10px_30px_rgba(124,77,255,0.08)]'
          )}
          aria-label="Navegação principal"
        >
          {/* Início */}
          <NavItem
            href="/home"
            icon={Home}
            label="Início"
            active={pathname === '/home'}
          />

          {/* Hábitos */}
          <NavItem
            href="/habits"
            icon={ListChecks}
            label="Hábitos"
            active={pathname === '/habits'}
          />

          {/* Center spacer — FAB sits here visually */}
          <div className="w-16 flex-shrink-0" aria-hidden="true" />

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
