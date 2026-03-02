"use client"

import { useState, useCallback, useEffect } from "react"
import { Heart, Copy, Check, RefreshCcw } from "lucide-react"
import { v1 as uuidv1, v4 as uuidv4 } from "uuid"

export default function UUIDGenerator() {
    const [version, setVersion] = useState<"v1" | "v4">("v4")
    const [quantity, setQuantity] = useState(1)
    const [uuids, setUuids] = useState<string[]>([])
    const [isCopying, setIsCopying] = useState(false)

    const generateUUIDs = useCallback(() => {
        const newUuids = []
        for (let i = 0; i < quantity; i++) {
            newUuids.push(version === "v4" ? uuidv4() : uuidv1())
        }
        setUuids(newUuids)
    }, [version, quantity])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        generateUUIDs()
    }, [generateUUIDs])

    const copyToClipboard = () => {
        const text = uuids.join("\n")
        if (!text) return
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    setIsCopying(true)
                    setTimeout(() => setIsCopying(false), 2000)
                })
                .catch(() => fallbackCopy(text))
        } else {
            fallbackCopy(text)
        }
    }

    const fallbackCopy = (text: string) => {
        const textArea = document.createElement("textarea")
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            setIsCopying(true)
            setTimeout(() => setIsCopying(false), 2000)
        } catch { }
        textArea.remove()
    }

    return (
        <div className="max-w-4xl mx-auto py-8 text-cyan-100">
            <div className="flex justify-between items-start mb-6">
                <div className="relative w-full border-b border-[#00416a] pb-3">
                    <h1 className="text-4xl font-semibold text-white inline-block relative">
                        UUIDs generator
                        <div className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-cyan-500"></div>
                    </h1>
                    <button className="absolute right-0 top-2 text-cyan-300/50 hover:text-cyan-200 transition-colors">
                        <Heart className="w-5 h-5 fill-current" />
                    </button>
                </div>
            </div>

            <p className="text-cyan-200/70 mb-8 max-w-3xl text-[15px] leading-relaxed">
                A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems. Generate them easily.
            </p>

            <div className="bg-[#002b47] border border-[#00416a] rounded-md p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap gap-6 mb-8 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-[15px] text-cyan-100 mb-2">Version</label>
                        <select
                            value={version}
                            onChange={(e) => setVersion(e.target.value as "v1" | "v4")}
                            className="w-full bg-[#00416a] border border-transparent rounded-md px-4 py-3 text-cyan-100 focus:outline-none focus:border-[#4dbb9c] transition-colors"
                        >
                            <option value="v4">Version 4 (Random)</option>
                            <option value="v1">Version 1 (MAC & Time)</option>
                        </select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-[15px] text-cyan-100 mb-2">Quantity: {quantity}</label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full h-1 appearance-none rounded-lg cursor-pointer bg-[#006cae] mt-3"
                        />
                    </div>
                </div>

                <div className="bg-[#00416a] border border-transparent rounded-md p-4 mb-6 shadow-inner font-mono text-[14px]">
                    <textarea
                        value={uuids.join("\n")}
                        readOnly
                        rows={Math.min(10, Math.max(3, uuids.length))}
                        className="w-full bg-transparent text-cyan-100 focus:outline-none resize-none leading-relaxed"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={copyToClipboard}
                        className={`flex items-center px-6 py-2 rounded-md transition-colors text-sm font-medium ${isCopying ? 'bg-cyan-500 text-white' : 'bg-[#00558c] hover:bg-[#006cae] text-cyan-100 hover:text-cyan-200'}`}
                    >
                        {isCopying ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {isCopying ? "Copied!" : "Copy UUIDs"}
                    </button>
                    <button
                        onClick={generateUUIDs}
                        className="flex items-center px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-md transition-colors text-sm font-medium shadow-sm"
                    >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Generate new
                    </button>
                </div>
            </div>
        </div>
    )
}
