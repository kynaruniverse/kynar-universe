"use client";

/**
 * KYNAR UNIVERSE: Identity Registration (v2.0)
 * Refactored to use shared AuthPageLayout
 */

import { signup } from "../actions";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";

export default function SignupPage() {
  return (
    <AuthPageLayout
      mode="signup"
      title="Create Identity"
      subtitle="Begin your journey in the Kynar ecosystem."
      glowColor="bg-kyn-caramel-50/50"
      formAction={signup}
      submitButtonText={{
        idle: "Register Identity",
        loading: "Registering...",
      }}
      footerLink={{
        text: "Already have an identity?",
        linkText: "Login here",
        href: "/auth/login",
      }}
      showSecurityFootnote={false}
    />
  );
}