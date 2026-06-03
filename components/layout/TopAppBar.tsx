'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bell, Menu } from 'lucide-react'
import { DrawerMenu } from './DrawerMenu'

export function TopAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="lg:hidden sticky top-0 z-50 bg-white/90 backdrop-blur-[12px] border-b border-gray-100/60">
        <div className="flex items-center justify-between px-4 h-[71px]">

          {/* Left: Menu button (abre o drawer) */}
          <button
            aria-label="Abrir menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            className="flex items-center justify-center w-[37px] h-[30px] rounded-full hover:bg-gray-100/80 transition-colors"
          >
            <Menu size={20} strokeWidth={1.8} className="text-[#1A1A2E]" />
          </button>

          {/* Center: Logo */}
          <Link href="/home" aria-label="Ir para Início">
            <Image
              src="/logo.svg"
              alt="Psicare"
              width={110}
              height={27}
              priority
              className="select-none"
            />
          </Link>

          {/* Right: Notification button */}
          <button
            aria-label="Notificações"
            className="relative flex items-center justify-center w-[35px] h-[35px] rounded-full border-2 border-[#5B4CF5]/25 hover:border-[#5B4CF5]/50 transition-colors"
          >
            <Bell size={17} strokeWidth={1.8} className="text-[#1A1A2E]" />
            <span className="absolute top-0.5 right-0.5 w-[8px] h-[8px] bg-[#5B4CF5] rounded-full border-[1.5px] border-white" />
          </button>

        </div>
      </header>

      {/* Drawer (renderizado fora do header para ficar em full-screen) */}
      <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
