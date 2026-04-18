import Link from 'next/link';
import { ReactNode } from 'react';
import Image from 'next/image'

export function Title({ text }: { text: string }) {
    return (
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">{text}</h1>
    )
}

export function Paragraph({ text }: { text: string }) {
    return (
        <p className="text-lg md:text-xl text-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {text}
        </p>
    )
}

export function Container({ children }: { children: ReactNode }) {
    return (
        <div className="w-full space-y-8 text-center lg:text-left m-10">
            {children}
        </div>
    )
}

interface ButtonProps {
    link: string;
    text: string;
    level: "primary" | "secondary"
}

export function Button({ link, text, level }: ButtonProps) {
    return (
        <Link
            href={link}
            className={level == "primary"
                ? "px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 shadow-lg shadow-primary/20"
                : "px-8 py-4 border border-primary text-primary rounded-lg font-medium hover:bg-primary/20 shadow-lg shadow-primary/20"
            }
        >
            {text}
        </Link>
    )
}

export function Decoration() {
    return (
        <div className="absolute top-0 right-0 -translate-y-12 -translate-x-12 blur-3xl opacity-20 overflow-hidden">
            <div className="h-96 w-96 rounded-full bg-primary"></div>
        </div>
    )
}

interface PageImageProps {
    src: string;
    alt: string;
    width: number;
    height: number
}

export function PageImage({ src, alt, width, height }: PageImageProps) {
    return (
        <div className="border rounded-2xl overflow-hidden shadow-lg m-20">
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-auto object-cover"
            />
        </div>
    )
}
