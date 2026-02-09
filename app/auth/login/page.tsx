"use client";

/**
 * KYNAR UNIVERSE: Authentication Gateway (v2.0)
 * Refactor: Streamlined usage of shared AuthPageLayout
 */

import { login } from "../actions";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";

export default function LoginPage() {
  return (
    <AuthPageLayout
      mode="login"
      title="Access Portal"
      subtitle="Enter your credentials to access the Vault."
      glowColor="bg-kyn-green-50/50"
      formAction={login}
      submitButtonText={{
        idle: "Initialize Session",
        loading: "Authenticating...",
      }}
      footerLink={{
        text: "Don't have an identity record?",
        linkText: "Register here",
        href: "/auth/signup",
      }}
      showSecurityFootnote
    />
  );
}