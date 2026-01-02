"use client";

import type React from "react";

import { useState, useCallback, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { PrivacyPolicyDialog } from "@/components/privacy-policy-dialog";

interface ContactFormData {
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
  getUpdates: boolean;
}

async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    }

    const result = await response.json();
    return { success: false, message: result.message || 'Failed to submit' };
  } catch {
    return { success: false, message: 'Network error' };
  }
}

interface ContactDialogProps {
  children: React.ReactNode;
}

export function ContactDialog({ children }: ContactDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    organization: "",
    interest: "",
    message: "",
  });
  const [getUpdates, setGetUpdates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle contact form submission
  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData: ContactFormData = {
        ...contactForm,
        getUpdates,
      };

      const result = await submitContactForm(formData);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        // Create an error message element
        const errorContainer = document.createElement("div");
        errorContainer.className =
          "mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm";
        errorContainer.textContent =
          result.message || "Failed to send message. Please try again.";

        // Find the form and append the error message
        const form = e.target as HTMLFormElement;
        // Remove any existing error messages
        const existingError = form.querySelector(".bg-red-50");
        if (existingError) {
          form.removeChild(existingError);
        }
        form.appendChild(errorContainer);

        // Remove the error message after 5 seconds
        setTimeout(() => {
          if (form.contains(errorContainer)) {
            form.removeChild(errorContainer);
          }
        }, 5000);
      }
    } catch (error) {
      // Create an error message element
      const errorContainer = document.createElement("div");
      errorContainer.className =
        "mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm";
      errorContainer.textContent = "An unexpected error occurred. Please try again.";

      // Find the form and append the error message
      const form = (e.target as HTMLFormElement).closest("form");
      if (form) {
        // Remove any existing error messages
        const existingError = form.querySelector(".bg-red-50");
        if (existingError) {
          form.removeChild(existingError);
        }
        form.appendChild(errorContainer);

        // Remove the error message after 5 seconds
        setTimeout(() => {
          if (form.contains(errorContainer)) {
            form.removeChild(errorContainer);
          }
        }, 5000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle contact form input changes
  const handleContactChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setContactForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Handle interest selection change
  const handleInterestChange = useCallback((value: string) => {
    setContactForm((prev) => ({ ...prev, interest: value }));
  }, []);

  // Reset contact form
  const resetContactForm = useCallback(() => {
    setContactForm({
      name: "",
      email: "",
      organization: "",
      interest: "",
      message: "",
    });
    setGetUpdates(true);
    setIsSubmitted(false);
  }, []);

  // Handle dialog close
  const handleDialogClose = useCallback(() => {
    setIsOpen(false);
    // Reset form when dialog closes if not submitted
    if (!isSubmitted) {
      resetContactForm();
    }
  }, [isSubmitted, resetContactForm]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Get involved</DialogTitle>
          <DialogDescription>
            The UOR Framework, related concepts, and use cases are currently
            being cultivated in the open source community. Join us in building
            the foundation of sovereign data infrastructure.
          </DialogDescription>
        </DialogHeader>
        {!isSubmitted ? (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="dialog-name">Name</Label>
              <Input
                id="dialog-name"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dialog-email">Email</Label>
              <Input
                id="dialog-email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="your.email@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dialog-organization">Organization</Label>
              <Input
                id="dialog-organization"
                name="organization"
                value={contactForm.organization}
                onChange={handleContactChange}
                placeholder="Your organization (optional)"
                autoComplete="organization"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dialog-interest">Interest</Label>
              <Select
                value={contactForm.interest}
                onValueChange={handleInterestChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your area of interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Math</SelectItem>
                  <SelectItem value="protocols">Protocols</SelectItem>
                  <SelectItem value="applications">Applications</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dialog-message">Message</Label>
              <Textarea
                id="dialog-message"
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                placeholder="How would you like to get involved?"
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="dialog-get-updates"
                checked={getUpdates}
                onCheckedChange={(checked) => setGetUpdates(checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="dialog-get-updates"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Get email updates
                </Label>
                <p className="text-xs text-muted-foreground">
                  Sign up for Community & Project Updates, Educational
                  Resources, and Event Invitations from the
                  <strong> UOR Foundation</strong>.
                </p>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-all duration-200 hover:shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Joining subscribes you to the <strong>UOR Foundation</strong>{" "}
              Newsletter and confirms you agree with our{" "}
              <PrivacyPolicyDialog>
                <button
                  type="button"
                  className="text-brand hover:underline"
                >
                  privacy policy
                </button>
              </PrivacyPolicyDialog>
              .
            </p>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              Thank you for reaching out!
            </h3>
            <p className="mb-6 text-muted-foreground">
              We've received your message and will get back to you shortly.
            </p>
            <div className="flex gap-2">
              <Button onClick={resetContactForm} variant="outline">
                Send another message
              </Button>
              <Button onClick={handleDialogClose}>Close</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
