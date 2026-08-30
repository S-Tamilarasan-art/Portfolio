"use client"

import { useEffect, useRef } from "react"
import { motion, type Variants } from "framer-motion"
import { gsap } from "@/lib/gsap"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  splitWords = false,
}: {
  eyebrow: string
  title: string
  description?: string
  /** Animate the title word-by-word with GSAP instead of a plain fade. */
  splitWords?: boolean
}) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!splitWords) return
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-heading-word]", titleRef.current)
      gsap.set(words, { opacity: 0, y: 30 })
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "top 40%",
        },
      })
    })
    return () => ctx.revert()
  }, [splitWords])

  return (
    <motion.div
      className="mx-auto mb-14 max-w-2xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <motion.p variants={fadeUp} className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </motion.p>
      {splitWords ? (
        <h2
          ref={titleRef}
          className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
        >
          {title.split(" ").map((word, i, arr) => (
            <span key={i} data-heading-word className="inline-block will-change-transform">
              {word}
              {i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
      ) : (
        <motion.h2
          variants={fadeUp}
          className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
        >
          {title}
        </motion.h2>
      )}
      {description ? (
        <motion.p variants={fadeUp} className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
