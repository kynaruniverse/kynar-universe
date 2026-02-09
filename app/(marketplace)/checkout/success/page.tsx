/**
 * KYNAR UNIVERSE: Acquisition Success (v2.1)
 * Role: Post-purchase "Vault Opening" experience.
 */

import { ShieldCheck, Library } from "lucide-react";
import { CelebrationTrigger } from "@/components/marketplace/CelebrationTrigger";
import { StatePageLayout } from "@/components/checkout/StatePageLayout";

export default function CheckoutSuccessPage() {
  const title = "Acquisition Secured";
  
  const description =
    "Your technical assets have been successfully registered to your identity. The Kynar Vault is now synchronized.";
  
  const primaryAction = {
    label: "Enter My Library",
    icon: Library,
    href: "/library",
  };
  
  const secondaryAction = {
    label: "Return to Hub",
    href: "/",
  };
  
  return (
    <StatePageLayout
      icon={ShieldCheck}
      iconColor="text-kyn-green-600"
      iconBgColor="bg-kyn-green-500/10"
      title={title}
      description={description}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
    >
      <CelebrationTrigger />
    </StatePageLayout>
  );
}