import { Metadata } from 'next'
import { Section, SectionHeader } from '@/components/section'

export const metadata: Metadata = {
  title: 'Privacy Policy - UOR Foundation',
  description: 'Privacy Policy for UOR Foundation',
}

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeader title="Privacy Policy" />
      <div className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Introduction</h2>
        <p>
          UOR Foundation ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the
          website includes:
        </p>
        <ul>
          <li>Personal Data: Name, email address, and contact information you voluntarily provide</li>
          <li>Usage Data: Information about how you use our website</li>
          <li>Analytics Data: Information collected through Google Analytics</li>
        </ul>

        <h2>Use of Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Send you newsletters and updates (with your consent)</li>
          <li>Improve our website and services</li>
          <li>Analyze usage trends and preferences</li>
        </ul>

        <h2>Disclosure of Your Information</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share information
          with:
        </p>
        <ul>
          <li>Service providers who assist us in operating our website</li>
          <li>Law enforcement when required by law</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We use administrative, technical, and physical security measures to protect your personal information.
          However, no method of transmission over the Internet is 100% secure.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Unsubscribe from our newsletters</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:privacy@uor.foundation">privacy@uor.foundation</a>
        </p>
      </div>
    </Section>
  )
}
