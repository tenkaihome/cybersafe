"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    RefreshCcw,
    Hash,
    Lock,
    Database,
    ArrowDownUp,
    Unlock,
    KeySquare,
    Menu,
    Key,
    ShieldCheck,
    FileBadge,
    ChevronDown
} from "lucide-react"

const cryptoTools = [
    { name: "Token generator", href: "/token-generator", icon: RefreshCcw },
    { name: "Hash text", href: "/hash-text", icon: Hash },
    { name: "Bcrypt", href: "/bcrypt", icon: Lock },
    { name: "UUIDs generator", href: "/uuid-generator", icon: Database },
    { name: "ULID generator", href: "/ulid-generator", icon: ArrowDownUp },
    { name: "Encrypt / decrypt text", href: "/encrypt-decrypt", icon: Unlock },
    { name: "BIP39 passphrase gener...", href: "/bip39-generator", icon: KeySquare },
    { name: "Hmac generator", href: "/hmac-generator", icon: Menu },
    { name: "RSA key pair generator", href: "/rsa-generator", icon: Key },
    { name: "Password strength analy...", href: "/", icon: ShieldCheck },
    { name: "PDF signature checker", href: "/pdf-signature", icon: FileBadge },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-[280px] h-full bg-[#002b47]/60 backdrop-blur-xl border border-[#00416a] rounded-3xl text-cyan-100 flex flex-col flex-shrink-0 shadow-2xl overflow-hidden">
            <div className="relative overflow-hidden h-36 flex flex-col justify-center px-6 border-b border-[#00416a]">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-[#00558c] opacity-20 z-0 pointer-events-none" />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-black/20 z-0 pointer-events-none" />
                <div className="absolute -top-12 -left-4 w-24 h-24 rounded-full bg-white/5 z-0 pointer-events-none" />

                <div className="relative z-10 text-white">
                    <h1 className="text-3xl font-bold tracking-wider mb-1 drop-shadow-md">CyberSafe</h1>
                    <p className="text-sm text-cyan-200">ZeroTrust Utilities</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 custom-scrollbar px-3 relative z-10">
                <div className="px-3 mb-3">
                    <button className="flex items-center text-[13px] uppercase tracking-widest font-bold w-full text-left py-2 text-cyan-400">
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Crypto
                    </button>
                </div>

                <nav className="flex flex-col space-y-1">
                    {cryptoTools.map((tool) => {
                        const isActive = pathname === tool.href
                        const Icon = tool.icon

                        return (
                            <Link
                                key={tool.name}
                                href={tool.href}
                                className={cn(
                                    "flex items-center px-4 py-3 text-sm transition-all rounded-xl",
                                    isActive
                                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-900/20 font-medium"
                                        : "border border-transparent hover:bg-[#00416a] hover:text-white"
                                )}
                            >
                                <Icon className="w-4 h-4 mr-3" />
                                <span className="truncate">{tool.name}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}
