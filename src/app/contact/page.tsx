'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Section, SectionHeader } from '@/components/section'

// FormSubmit - free & unlimited (using hashed email for privacy)
const FORMSUBMIT_ID = '8ea792d49b70c7d4ab16463f04480f8f'

export default function ContactPage() {
  const { t } = useTranslation('contact')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New contact from ${formData.name}`,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <Section>
      <SectionHeader title={t('title')} description={t('description')} />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('form.send')}</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('form.name')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('form.namePlaceholder')}
                  required
                  disabled={status === 'loading'}
                  className="w-full rounded-md border border-purple/30 bg-surface-dark/60 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('form.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('form.emailPlaceholder')}
                  required
                  disabled={status === 'loading'}
                  className="w-full rounded-md border border-purple/30 bg-surface-dark/60 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('form.messagePlaceholder')}
                  required
                  disabled={status === 'loading'}
                  rows={6}
                  className="w-full rounded-md border border-purple/30 bg-surface-dark/60 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Button type="submit" className="w-full" disabled={status === 'loading'}>
                {status === 'loading' ? t('form.sending') : t('form.send')}
              </Button>
              {status === 'success' && (
                <p className="text-sm text-cyan">{t('form.success')}</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-destructive">{t('form.error')}</p>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('info.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">{t('info.email')}</h4>
                <a
                  href="mailto:contact@uor.foundation"
                  className="text-sm text-muted-foreground hover:text-cyan transition-colors"
                >
                  {t('info.emailAddress')}
                </a>
              </div>
              <div>
                <h4 className="font-medium">{t('info.discord')}</h4>
                <a
                  href="https://discord.gg/uor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-cyan transition-colors"
                >
                  Join our Discord →
                </a>
              </div>
              <div>
                <h4 className="font-medium">{t('info.github')}</h4>
                <a
                  href="https://github.com/UOR-Foundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-cyan transition-colors"
                >
                  {t('info.github')} →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  )
}
