'use client'

import { format } from "date-fns"
import { useState } from "react"

interface MessageProps {
    date: Date,
    text: string
}

export function Message({ date, text }: MessageProps) {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    return (isVisible &&
        <div className="flex justify-between p-1 m-1 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30">
            <div className="text-sm font-light">
                {format(date, 'dd MMM yy')}: {text}
            </div>
            <button onClick={() => setIsVisible(false)}>
                X
            </button>
        </div >
    )

}