'use client'

import { ReactNode } from 'react'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative bg-white rounded-lg shadow-lg z-50 max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  )
}

export function DialogContent({ children }: { children: ReactNode }) {
  return <div className="p-6">{children}</div>
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return <div className="flex justify-end gap-2 mt-6 pt-4 border-t">{children}</div>
}
