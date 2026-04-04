"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PremiumToggleProps {
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export function PremiumToggle({
  defaultChecked = false,
  checked,
  onChange,
}: PremiumToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const [isPressed, setIsPressed] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => setHasMounted(true), [])

  const isChecked = checked !== undefined ? checked : internalChecked

  const handleToggle = () => {
    const newValue = !isChecked
    setInternalChecked(newValue)
    onChange?.(newValue)
  }

  if (!hasMounted) return null

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={cn(
        "group relative flex items-center h-8 w-[60px] md:w-[80px] md:h-10 rounded-xl cursor-pointer p-1 transition-all duration-500 overflow-hidden",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "border backdrop-blur-xl",
        // Sleek recessed track
        isChecked
          ? "bg-black/60 border-orange-500/30 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]"
          : "bg-black/30 border-white/10 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]",
      )}
    >
      {/* Background ambient glow when ON */}
      <div 
        className={cn(
          "absolute inset-0 rounded-xl transition-opacity duration-700 pointer-events-none mix-blend-screen",
          isChecked ? "opacity-100 bg-orange-500/20 blur-md" : "opacity-0"
        )}
      />

      {/* Track indicator line */}
      <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 rounded-full bg-white/5 shadow-inner" />

      {/* Thumb / Slider Block */}
      <div
        className={cn(
          "relative h-6 rounded-[8px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center pointer-events-none z-10",
          isChecked ? "translate-x-[28px] md:translate-x-[38px]" : "translate-x-0",
          isPressed ? "w-8 md:w-10" : "w-6 md:w-8",
          isPressed && isChecked && "translate-x-2"
        )}
      >
        {/* Thumb Body */}
        <div
          className={cn(
            "absolute inset-0 rounded-[8px] transition-all duration-500",
            isChecked
              ? "bg-linear-to-br from-yellow-300 to-orange-500 border border-orange-300/50"
              : "bg-linear-to-br from-white to-white/70 border border-white/50",
          )}
          style={{
            boxShadow: isChecked
              ? "0 2px 10px rgba(249,115,22,0.6), inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.2)"
              : "0 2px 8px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.1)",
          }}
        />
        
        {/* Thumb tactile ridges */}
        <div className="relative flex gap-[2px] opacity-70">
          <div className={cn("w-[1.5px] h-3 rounded-full transition-colors", isChecked ? "bg-orange-800/40" : "bg-black/20")} />
          <div className={cn("w-[1.5px] h-3 rounded-full transition-colors", isChecked ? "bg-orange-800/40" : "bg-black/20")} />
        </div>
      </div>
    </button>
  )
}

