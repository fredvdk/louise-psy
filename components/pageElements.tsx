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
    width: number;
    height: number
}

interface BulletProps {
    name: string;
    description: string;
}

function Title({ text, level = 1 }: { text: string, level?: number }) {
    return (
        level === 1 ? <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">{text}</h1> :
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground leading-tight">{text}</h2>
    )
}

function Paragraph({ text }: { text: string }) {
    return (
        <p className="text-lg md:text-xl text-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {text}
        </p>
    )
}

function Container({ children }: { children: ReactNode }) {
    return (
        <div className="w-full space-y-8 text-left p-10 border">
            {children}
        </div>
    )
}

function ColumnLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col lg:flex-row gap-12 border">
            {children}
        </div>
    )
}

function Button({ link, text, level }: ButtonProps) {
    return (
        <Link
            href={link}
            className={level == "primary"
                ? "inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 shadow-lg shadow-primary/20"
                : "inline-block px-8 py-4 border border-primary text-primary rounded-lg font-medium hover:bg-primary/20 shadow-lg shadow-primary/20"
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

function PageImage({ src, alt, width, height }: PageImageProps) {
    return (
        <div className="border rounded overflow-hidden shadow-lg m-20">
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

function Bullet({ name, description }: BulletProps) {
    return (
        <div className="flex items-start gap-5 p-5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-foreground text-lg">{name}</p>
                <p className="text-foreground/70 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

export { Title, Paragraph, Container, ColumnLayout as TwoColumn, Button, Decoration, PageImage, Bullet };


