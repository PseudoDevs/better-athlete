import { useId, type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

type DotPatternProps = ComponentPropsWithoutRef<"svg"> & {
    width?: number
    height?: number
    x?: number
    y?: number
    cx?: number
    cy?: number
    cr?: number
    glow?: boolean
}

export function DotPattern({
    width = 16,
    height = 16,
    x = 0,
    y = 0,
    cx = 1,
    cy = 1,
    cr = 1,
    glow = false,
    className,
    ...props
}: DotPatternProps) {
    const id = useId()
    const glowId = useId()

    return (
        <svg
            aria-hidden="true"
            data-slot="dot-pattern"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/40",
                className
            )}
            {...props}
        >
            {glow && (
                <defs>
                    <filter id={glowId}>
                        <feGaussianBlur stdDeviation="5.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            )}
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    x={x}
                    y={y}
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                >
                    <circle
                        cx={cx}
                        cy={cy}
                        r={cr}
                        filter={glow ? `url(#${glowId})` : undefined}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
        </svg>
    )
}
