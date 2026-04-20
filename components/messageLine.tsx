import { format } from "date-fns"

interface MessageProps {
    date: Date,
    text: string
}

export function Message({date, text}: MessageProps){
    return(
        <div className="p-3 m-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 font-italic">
            {format(date, 'dd MMM yy')}: {text}
        </div>
    )

}