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
          <DialogTitle>Nieuwe Message</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="validFrom">Valid from</Label>
            <Input
              id="validFrom"
              type="datetime-local"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="validTill">Valid until</Label>
            <Input
              id="validTill"
              type="datetime-local"
              value={validTill}
              onChange={(e) => setValidTill(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here..."
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
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
