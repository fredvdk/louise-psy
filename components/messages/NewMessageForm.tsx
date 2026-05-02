'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog'
import { createMessageAction } from '@/actions/messages'

interface NewMessageFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function NewMessageForm({ open, onOpenChange, onSuccess }: NewMessageFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [validFrom, setValidFrom] = useState('')
  const [validTill, setValidTill] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await createMessageAction({
        valid_from: new Date(validFrom).toISOString(),
        valid_till: new Date(validTill).toISOString(),
        message,
      })

      if (result.success) {
        setValidFrom('')
        setValidTill('')
        setMessage('')
        onOpenChange(false)
        onSuccess?.()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nieuw bericht</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="validFrom">Geldig vanaf</Label>
            <Input
              id="validFrom"
              type="date"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="validTill">Geldig tot</Label>
            <Input
              id="validTill"
              type="date"
              value={validTill}
              onChange={(e) => setValidTill(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Bericht</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Voer hier uw bericht in..."
              required
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Annuleren
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Bezig met aanmaken...' : 'Aanmaken'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
