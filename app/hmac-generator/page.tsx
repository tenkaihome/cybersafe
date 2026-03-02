"use client"

import { useState } from "react"
import { Heart, Copy, Check, Key } from "lucide-react"
import CryptoJS from "crypto-js"

export default function HMACGenerator() {
    const [text, setText] = useState("")
    const [secret, setSecret] = useState("")
    const [algorithm, setAlgorithm] = useState("MD5")
    const [encoding, setEncoding] = useState<"hex" | "base64">("hex")
    const [copiedHash, setCopiedHash] = useState(false)

    const handleCopy = (hashValue: string) => {
        if (!hashValue) return
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(hashValue).then(() => {
                setCopiedHash(true)
                setTimeout(() => setCopiedHash(false), 2000)
            }).catch(() => fallbackCopy(hashValue))
        } else {
            fallbackCopy(hashValue)
        }
    }

    const fallbackCopy = (hashValue: string) => {
        try {
            const textArea = document.createElement("textarea")
            textArea.value = hashValue
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand("copy")
            textArea.remove()
            setCopiedHash(true)
            setTimeout(() => setCopiedHash(false), 2000)
        } catch { }
    }

    const algorithms = [
        { name: "MD5", method: CryptoJS.HmacMD5 },
        { name: "SHA1", method: CryptoJS.HmacSHA1 },
        { name: "SHA256", method: CryptoJS.HmacSHA256 },
        { name: "SHA224", method: CryptoJS.HmacSHA224 },
        { name: "SHA512", method: CryptoJS.HmacSHA512 },
        { name: "SHA384", method: CryptoJS.HmacSHA384 },
        { name: "SHA3", method: CryptoJS.HmacSHA3 },
        { name: "RIPEMD160", method: CryptoJS.HmacRIPEMD160 },
    ]

    const getHash = () => {
        if (!text || !secret) return ""
        const algoEntry = algorithms.find(a => a.name === algorithm)
        if (!algoEntry) return ""

        try {
            const hash = algoEntry.method(text, secret)
            if (encoding === "hex") {
                return hash.toString(CryptoJS.enc.Hex)
            } else {
                return hash.toString(CryptoJS.enc.Base64)
            }
        } catch {
            return "Error calculating HMAC"
        }
    }

    const result = getHash()

    return (
        <div className="max-w-4xl mx-auto py-8 text-cyan-100">
            <div className="flex justify-between items-start mb-6">
                <div className="relative w-full border-b border-[#00416a] pb-3">
                    <h1 className="text-4xl font-semibold text-white inline-block relative">
                        HMAC generator
                        <div className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-cyan-500"></div>
                    </h1>
                    <button className="absolute right-0 top-2 text-cyan-300/50 hover:text-cyan-200 transition-colors">
                        <Heart className="w-5 h-5 fill-current" />
                    </button>
                </div>
            </div>

            <p className="text-cyan-200/70 mb-8 max-w-3xl text-[15px] leading-relaxed">
                Compute a Hash-based Message Authentication Code (HMAC) using a secret key.
            </p>

            <div className="bg-[#002b47] border border-[#00416a] rounded-md p-6 sm:p-8 shadow-sm">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-[15px] text-cyan-100 mb-2">Algorithm</label>
                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            className="w-full bg-[#00416a] border border-transparent rounded-md px-4 py-3 text-cyan-100 focus:outline-none focus:border-[#4dbb9c] transition-colors"
                        >
                            {algorithms.map(a => (
                                <option key={a.name} value={a.name}>{a.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-[15px] text-cyan-100 mb-2">Digest encoding</label>
                        <select
                            value={encoding}
                            onChange={(e) => setEncoding(e.target.value as "hex" | "base64")}
                            className="w-full bg-[#00416a] border border-transparent rounded-md px-4 py-3 text-cyan-100 focus:outline-none focus:border-[#4dbb9c] transition-colors"
                        >
                            <option value="hex">Hexadecimal (base 16)</option>
                            <option value="base64">Base64</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-6 mb-6">
                    <div>
                        <label className="block text-[15px] text-cyan-100 mb-2">Message</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Plain text message..."
                            className="w-full bg-[#00416a] border border-transparent outline-none rounded-md px-4 py-3 text-white placeholder:text-cyan-300/50 min-h-[100px] resize-y focus:border-[#4dbb9c] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-[15px] text-cyan-100 mb-2">Secret Key</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                placeholder="Your secret key..."
                                className="w-full bg-[#00416a] border border-transparent outline-none rounded-md px-4 py-3 pr-10 text-white placeholder:text-cyan-300/50 focus:border-[#4dbb9c] transition-colors"
                            />
                            <Key className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-300/50" />
                        </div>
                    </div>
                </div>

                {result && text && secret && !result.startsWith("Error") && (
                    <div className="mt-8 border-t border-[#00416a] pt-6">
                        <label className="block text-[15px] text-cyan-100 mb-3">HMAC Result:</label>
                        <div className="flex border border-[#00416a] rounded-md overflow-hidden shadow-inner bg-[#00416a]">
                            <div className="flex-1 px-4 py-4 text-[14px] text-cyan-100 font-mono break-all min-h-[50px] flex items-center selection:bg-cyan-500/30">
                                {result}
                            </div>
                            <button
                                onClick={() => handleCopy(result)}
                                className={`w-12 shrink-0 flex items-center justify-center border-l border-[#00416a] transition-colors ${copiedHash ? 'text-[#4dbb9c] bg-cyan-500/10' : 'bg-[#00558c] text-cyan-200/70 hover:text-cyan-200 hover:bg-[#006cae]'}`}
                                title={copiedHash ? "Copied" : "Copy to clipboard"}
                            >
                                {copiedHash ? <Check className="w-[18px] h-[18px]" /> : <Copy className="w-[18px] h-[18px]" />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
