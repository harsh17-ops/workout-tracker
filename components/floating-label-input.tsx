"use client"
import { cn } from "@/lib/utils"
import type React from "react"

import { Input } from "@/components/ui/input"
import type { ReactNode } from "react"

type Props = {
  id: string
  label: string
  type?: string
  value?: string | number
  onChange?: (v: string) => void
  required?: boolean
  min?: number
  step?: number
  placeholder?: string
  suffix?: ReactNode
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
}

export function FloatingLabelInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  min,
  step,
  placeholder = " ",
  suffix,
  inputMode,
}: Props) {
  return (
    <div className="relative">
      <Input
        id={id}
        type={type}
        value={value as any}
        min={min}
        step={step}
        inputMode={inputMode}
        required={required}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "peer h-12 rounded-xl bg-background/60",
          "border-white/10 focus-visible:ring-emerald-500/60",
          suffix ? "pr-14" : "",
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
          "origin-left text-sm text-foreground/60 transition-all",
          "peer-focus:-top-2 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2",
          "peer-focus:text-foreground/70 peer-placeholder-shown:text-foreground/60",
          "peer-focus:text-xs peer-placeholder-shown:text-sm",
        )}
      >
        {label}
      </label>
      {suffix ? (
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground/60">
          {suffix}
        </div>
      ) : null}
    </div>
  )
}
