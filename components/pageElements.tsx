import Link from 'next/link';
import { ReactNode } from 'react';
import Image from 'next/image'

interface ButtonProps {
    link: string;
    text: string;
    level: "primary" | "secondary"
}

interface PageImageProps {
    src: string;
    alt: string;
}

interface BulletProps {
    name: string;
    description: string;
}

function Title({ text, level = 1 }: { text: string, level?: number }) {
    return (
        level === 1 ? <h1 className="text-3xl md:text-4xl lg:text-5xl font-lato leading-tight text-foreground
        relative inline-block
        after:content-['']
        after:absolute
        after:left-0
        after:-bottom-1
        after:h-[1px]
        after:w-full
        after:bg-gray-400
        after:origin-left
        after:scale-x-0
        after:animate-[draw-line_2.5s_ease_forwards]">{text}</h1> :
            < h2 className="text-2xl md:text-3xl lg:text-4xl font-lato text-secondary-foreground leading-tight" > {text}</h2 >
    )
}

function Paragraph({ children }: { children: ReactNode }) {
    return (
        <p className="text-lg md:text-xl text-foreground mx-auto lg:mx-0 leading-relaxed">
            {children}
        </p>
    )
}

function Container({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={`space-y-8 text-left p-10 ${className || ''}`}>
            {children}
        </div>
    )
}

function ColumnLayout({ children }: { children: ReactNode }) {

    return (
        <div className="flex flex-col lg:flex-row gap-12">
            {children}
        </div>
    )
}

function Button({ link, text, level }: ButtonProps) {
    return (
        <Link
            href={link}
            className={level == "primary"
                ? "inline-block px-8 py-4 text-center bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 shadow-lg shadow-primary/20"
                : "inline-block px-8 py-4 text-center border border-primary text-primary rounded-lg font-medium hover:bg-primary/20 shadow-lg shadow-primary/20"
            }
        >
            {text}
        </Link>
    )
}

function Decoration() {
    return (
        <div className="absolute top-0 right-0 -translate-y-12 -translate-x-12 blur-3xl opacity-20 overflow-hidden">
            <div className="h-96 w-96 rounded-full bg-primary"></div>
        </div>
    )
}

function PageImage({ src, alt }: PageImageProps) {
    return (
        <div className="relative border rounded overflow-hidden shadow-lg h-full w-full aspect-square">
            <Image
                src={src}
                alt={alt}
                fill={true}
                className="object-cover"
            />
        </div>
    )
}

function Bullet({ name, description }: BulletProps) {
    return (
        <div className="flex items-start gap-5 p-5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                -
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-foreground text-lg">{name}</p>
                <p className="text-foreground/70 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

export { Title, Paragraph, Container, ColumnLayout as TwoColumn, Button, Decoration, PageImage, Bullet };


