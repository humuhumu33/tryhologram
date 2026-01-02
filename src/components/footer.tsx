"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import footerData from "@/content/en/footer.json";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="relative z-10 border-t border-border/10 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Logo and tagline */}
          <div className="space-y-6">
            <Link href="/" className="group flex items-center gap-x-3">
              <div className="flex h-8 w-8 items-center justify-center transition-all group-hover:scale-105">
                <img
                  src="/hologram-icon.svg"
                  alt="Hologram"
                  className="h-full w-full"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight transition-all group-hover:text-cyan">
                Hologram
              </span>
            </Link>
            <p className="text-sm leading-6 text-muted-foreground max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="flex space-x-6">
              {footerData.social.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-sm font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/10 pt-8">
          <p className="text-xs leading-5 text-muted-foreground">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
