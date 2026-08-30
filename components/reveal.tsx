"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

// Scroll-triggered fade + slide-in.
// Only opacity/transform are animated so there is zero layout shift.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
