"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyDialogProps {
  children: React.ReactNode;
}

export function PrivacyPolicyDialog({ children }: PrivacyPolicyDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Last updated:</strong> December 2024
            </p>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                Information We Collect
              </h3>
              <p>
                When you contact us or subscribe to our newsletter, we collect your name,
                email address, organization (if provided), and any message content you submit.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                How We Use Your Information
              </h3>
              <p>
                We use your information to respond to your inquiries, send you updates
                about the UOR Foundation (if you opt in), and improve our services.
                We do not sell or share your personal information with third parties
                for marketing purposes.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                Data Security
              </h3>
              <p>
                We implement appropriate security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or
                destruction.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                Your Rights
              </h3>
              <p>
                You may request access to, correction of, or deletion of your personal
                information at any time by contacting us. You may also unsubscribe from
                our newsletter at any time.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-foreground mb-2">
                Contact Us
              </h3>
              <p>
                If you have questions about this privacy policy, please visit our{" "}
                <a href="/privacy" className="text-cyan hover:underline">
                  full privacy policy page
                </a>{" "}
                or contact us through our website.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
