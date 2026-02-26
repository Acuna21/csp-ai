"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Layers, Lightbulb, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/requirements", label: "Requerimientos", icon: Users },
  { href: "/architecture", label: "Arquitectura", icon: Layers },
  { href: "/collaboration", label: "Colaboración", icon: Lightbulb },
  { href: "/admin", label: "Admin", icon: LayoutGrid },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border md:hidden z-40">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 text-xs transition-colors relative group",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.label}
            >
              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-1 w-full"
                  style={{ backgroundColor: "#D31219" }}
                />
              )}

              <Icon className={cn("h-5 w-5", isActive && "text-red-600")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
