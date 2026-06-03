'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import {
  User, Bell, Lock, HelpCircle, Info, LogOut, ChevronRight, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const MENU_ITEMS = [
  { icon: User,        label: 'Configurações de Perfil', href: '/profile',   iconBg: 'rgba(230,222,255,0.4)', iconColor: '#5e3bdc' },
  { icon: Bell,        label: 'Notificações',             href: '/settings',  iconBg: 'rgba(235,220,255,0.4)', iconColor: '#7c3aed' },
  { icon: Lock,        label: 'Privacidade',              href: '/privacy',   iconBg: 'rgba(107,255,143,0.3)', iconColor: '#006c4f' },
  { icon: HelpCircle,  label: 'Ajuda',                    href: '/help',      iconBg: '#dbeafe',               iconColor: '#2563eb' },
  { icon: Info,        label: 'Sobre',                    href: '/sobre',     iconBg: 'rgba(230,222,255,0.4)', iconColor: '#5e3bdc' },
]

interface DrawerMenuProps {
  open: boolean
  onClose: () => void
}

export function DrawerMenu({ open, onClose }: DrawerMenuProps) {
  const pathname = usePathname()

  /* Fechar ao trocar de rota */
  useEffect(() => { onClose() }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  /* Bloquear scroll do body quando aberto */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          'fixed top-0 left-0 z-[70] h-full w-[280px] bg-white flex flex-col',
          'shadow-[4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header do drawer */}
        <div className="flex items-center justify-between px-5 pt-12 pb-6 border-b border-gray-100">
          <Image src="/logo.svg" alt="Psicare" width={100} height={25} />
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X size={18} strokeWidth={2} className="text-[#1A1A2E]" />
          </button>
        </div>

        {/* Avatar + nome */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#a78bfa] to-[#5b21b6] flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold font-[family-name:var(--font-plus-jakarta)]">A</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[#1b1b22] text-[14px] font-semibold leading-tight font-[family-name:var(--font-plus-jakarta)] truncate">
              Ana Carolina
            </span>
            <span className="text-[#6b7280] text-[12px] font-medium leading-tight font-[family-name:var(--font-plus-jakarta)]">
              Paciente
            </span>
          </div>
        </div>

        {/* Menu items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {MENU_ITEMS.map(({ icon: Icon, label, href, iconBg, iconColor }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between px-5 py-[14px] hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: iconBg }}
                >
                  <Icon size={16} strokeWidth={1.8} style={{ color: iconColor }} />
                </div>
                <span className="text-[#1b1b22] text-[15px] font-medium font-[family-name:var(--font-plus-jakarta)]">
                  {label}
                </span>
              </div>
              <ChevronRight size={15} strokeWidth={1.8} className="text-[#9b92b8]" />
            </Link>
          ))}
        </nav>

        {/* Sair */}
        <div className="border-t border-gray-100 p-5">
          <button className="flex items-center gap-3 w-full py-3 px-4 rounded-xl hover:bg-red-50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-[#fee2e2] flex items-center justify-center shrink-0">
              <LogOut size={16} strokeWidth={1.8} className="text-[#ff6b6b]" />
            </div>
            <span className="text-[#ff6b6b] text-[15px] font-semibold font-[family-name:var(--font-plus-jakarta)]">
              Sair
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}
