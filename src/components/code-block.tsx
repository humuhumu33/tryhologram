'use client'

import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

interface CodeBlockProps {
  code: string
  language: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language, showLineNumbers = false }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    async function highlight() {
      const highlighted = await codeToHtml(code.trim(), {
        lang: language,
        theme: 'github-dark',
      })
      setHtml(highlighted)
    }
    highlight()
  }, [code, language])

  if (!html) {
    return (
      <pre className="overflow-x-auto rounded-lg bg-code-bg p-4 text-sm">
        <code className="text-muted-foreground">{code}</code>
      </pre>
    )
  }

  return (
    <div
      className="code-block overflow-x-auto rounded-lg text-sm [&_pre]:!bg-code-bg [&_pre]:p-4 [&_pre]:m-0"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
