'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ListChecks, BarChart2, User, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Colors from Figma 53:468
   active  → #6541ED
   inactive→ #494455
   bar bg  → rgba(248,249,254,0.80) + backdrop-blur(20px)
   border  → rgba(202,195,216,0.10)
   shadow  → 0 -10px 30px rgba(124,77,255,0.08)
   selected circle gradient → from-[#6329E5] to-[#6459F7]
*/

const NAV_ITEMS = [
  { href: '/agenda',  icon: Calendar,   label: 'Agenda'     },
  { href: '/habits',  icon: ListChecks, label: 'Hábitos'    },
  { href: '/home',    icon: Home,       label: 'Início'     },
  { href: '/reports', icon: BarChart2,  label: 'Relatórios' },
  { href: '/profile', icon: User,       label: 'Perfil'     },
]

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
      aria-current={active ? 'page' : undefined}
      className="flex flex-col items-center gap-[4px] flex-1 min-w-0"
    >
      {/* Ícone — círculo gradiente quando ativo, ícone simples quando inativo */}
      <div
        className={cn(
          'flex items-center justify-center rounded-full transition-all duration-200',
          active
            ? 'w-14 h-14 -mt-5 bg-gradient-to-tr from-[#6329E5] to-[#6459F7] shadow-[0_4px_12px_rgba(99,41,229,0.35)]'
            : 'w-6 h-6'
        )}
      >
        <Icon
          size={active ? 22 : 18}
          strokeWidth={active ? 2.2 : 1.8}
          className={active ? 'text-white' : 'text-[#494455]'}
        />
      </div>

      {/* Label */}
      <span
        className={cn(
          'text-[10px] leading-[14px] font-medium truncate font-[family-name:var(--font-plus-jakarta)]',
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-[390px] mx-auto">
        <nav
          className={cn(
            'flex items-end justify-between',
            'px-2 pt-2 pb-8',
            'rounded-t-[32px]',
            'bg-[rgba(248,249,254,0.80)] backdrop-blur-[20px]',
            'border-t border-[rgba(202,195,216,0.10)]',
            'shadow-[0_-10px_30px_rgba(124,77,255,0.08)]'
          )}
          aria-label="Navegação principal"
        >
          {NAV_ITEMS.map(({ href, icon, label }) => (
            <NavItem
              key={href}
              href={href}
              icon={icon}
              label={label}
              active={pathname === href}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}
