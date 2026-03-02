"use client"

import { useState } from "react"
import { Search, Github, Info, Sun, Menu, Home, SquareStack } from "lucide-react"
import { DonateModal } from "./donate-modal"
export function Header() {
    const [isDonateOpen, setIsDonateOpen] = useState(false)

    return (
        <>
            <header className="h-[72px] flex items-center justify-between px-6 bg-transparent border-b border-[#00416a]/50 text-cyan-100 rounded-t-3xl">
                <div className="flex items-center space-x-3 flex-1">
                    <button className="p-2.5 text-cyan-200/70 hover:text-cyan-200 transition-colors rounded-xl hover:bg-white/5">
                        <Menu className="w-5 h-5" />
                    </button>

                    <button className="p-2 text-cyan-200/70 hover:text-cyan-200 transition-colors rounded-md hover:bg-[#2e323b]/50">
                        <Home className="w-5 h-5" />
                    </button>

                    <button className="p-2 text-cyan-200/70 hover:text-cyan-200 transition-colors rounded-md hover:bg-[#2e323b]/50">
                        <SquareStack className="w-5 h-5" />
                    </button>

                    <div className="hidden md:flex items-center space-x-2 w-full max-w-[280px] ml-4">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-300/50 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-[#001524]/40 border border-[#00416a] outline-none rounded-xl pl-10 pr-16 py-2 text-sm focus:border-cyan-500/50 transition-colors placeholder:text-cyan-300/30 text-white shadow-inner"
                            />
                            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex space-x-1.5">
                                <span className="text-[10px] text-cyan-200/50 bg-[#002b47]/50 px-1.5 py-0.5 rounded border border-[#00416a]">Ctrl</span>
                                <span className="text-[10px] text-cyan-200/50 bg-[#002b47]/50 px-1.5 py-0.5 rounded border border-[#00416a]">K</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="relative group cursor-pointer hidden md:block mr-2">
                        <div className="flex items-center space-x-1 text-sm text-cyan-200/80 hover:bg-white/5 transition-colors bg-transparent rounded-lg px-3 py-2">
                            <span>English</span>
                            <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1 border-l border-[#00416a]/50 pl-2">
                        <a href="#" className="p-2 text-cyan-200/70 hover:text-cyan-200 transition-colors rounded-xl hover:bg-white/5"><Github className="w-5 h-5" /></a>
                        <button className="p-2 text-cyan-200/70 hover:text-cyan-200 transition-colors rounded-xl hover:bg-white/5"><Info className="w-5 h-5" /></button>
                        <button className="p-2 text-cyan-200/70 hover:text-cyan-200 transition-colors rounded-xl hover:bg-white/5"><Sun className="w-5 h-5" /></button>
                    </div>

                    <button
                        onClick={() => setIsDonateOpen(true)}
                        className="hidden md:flex items-center bg-cyan-500 hover:bg-cyan-400 text-[#001524] text-sm font-bold px-5 py-2 rounded-xl transition-colors ml-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] shadow-cyan-500/50"
                    >
                        Support Us
                        <svg viewBox="0 0 24 24" className="w-4 h-4 ml-2 fill-[#001524]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                </div>
            </header>

            <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
        </>
    )
}
