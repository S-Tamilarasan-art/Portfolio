import Image from "next/image"
import type { Skill } from "@/lib/data"

// Brand logos render as-is; single-color artwork is drawn in the current
// text color so it stays visible in both themes.
export function Logo({ item, size = 20 }: { item: Skill; size?: number }) {
  if (item.mono) {
    return (
      <span
        aria-hidden
        className="logo-mask inline-block shrink-0 text-foreground"
        style={{ width: size, height: size, ["--logo" as string]: `url(${item.logo})` }}
      />
    )
  }
  return (
    <Image
      src={item.logo}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  )
}
