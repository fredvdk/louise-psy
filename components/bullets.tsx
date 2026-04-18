
interface bulletProps {
    name: string;
    description: string;
}

export function Bullet(prop: bulletProps) {
    return (
        <div className="flex items-start gap-5 p-5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-foreground text-lg">{prop.name}</p>
                <p className="text-foreground/70 text-sm leading-relaxed">{prop.description}</p>
            </div>
        </div>
    );
}