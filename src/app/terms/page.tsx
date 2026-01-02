import { Metadata } from 'next'
import { Section, SectionHeader } from '@/components/section'

export const metadata: Metadata = {
  title: 'Terms of Service - UOR Foundation',
  description: 'Terms of Service for UOR Foundation',
}

export default function TermsPage() {
  return (
    <Section>
      <SectionHeader title="Terms of Service" />
      <div className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using the UOR Foundation website, you agree to be bound by these Terms of Service
          and all applicable laws and regulations.
        </p>

        <h2>Use License</h2>
        <p>
          Permission is granted to temporarily access the materials on UOR Foundation's website for personal,
          non-commercial use only.
        </p>
        <p>This license shall automatically terminate if you violate any of these restrictions.</p>

        <h2>Open Source</h2>
        <p>
          UOR Foundation is committed to open source development. Our code and research are made available under
          open source licenses. Please refer to individual repositories for specific license information.
        </p>

        <h2>Disclaimer</h2>
        <p>
          The materials on UOR Foundation's website are provided on an 'as is' basis. UOR Foundation makes
          no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
        </p>

        <h2>Limitations</h2>
        <p>
          In no event shall UOR Foundation or its contributors be liable for any damages arising out of the
          use or inability to use the materials on our website.
        </p>

        <h2>Revisions</h2>
        <p>
          UOR Foundation may revise these Terms of Service at any time without notice. By using this website,
          you are agreeing to be bound by the current version of these Terms of Service.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of the jurisdiction where
          UOR Foundation is established.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about these Terms, please contact us at{' '}
          <a href="mailto:legal@uor.foundation">legal@uor.foundation</a>
        </p>
      </div>
    </Section>
  )
}
