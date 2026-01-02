'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'

export function NewsletterSignup() {
  const { t } = useTranslation('common')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div>
      <h3 className="text-sm font-semibold">{t('footer.newsletter.title')}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {t('footer.newsletter.description')}
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('footer.newsletter.placeholder')}
          required
          disabled={status === 'loading'}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button type="submit" size="sm" disabled={status === 'loading'}>
          {status === 'loading'
            ? t('footer.newsletter.subscribing')
            : t('footer.newsletter.subscribe')}
        </Button>
      </form>
      {status === 'success' && (
        <p className="mt-2 text-sm text-accent">{t('footer.newsletter.success')}</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm text-destructive">{t('footer.newsletter.error')}</p>
      )}
    </div>
  )
}
