"use client";

/**
 * KYNAR UNIVERSE: Checkout Error (v2.1)
 * Role: Grounded recovery and technical reassurance.
 */

import { useRouter } from "next/navigation";
import { RefreshCw, LifeBuoy } from "lucide-react";
import { StatePageLayout } from "@/components/checkout/StatePageLayout";

export default function CheckoutErrorPage() {
  const router = useRouter();
  
  const primaryAction = {
    label: "Try Connection Again",
    icon: RefreshCw,
    onClick: () => router.refresh(),
  };
  
  const secondaryAction = {
    label: "Back to Selection",
    href: "/cart",
  };
  
  const title = (
    <>
      Connection <span className="italic">Interrupted.</span>
    </>
  );
  
  const description =
    "We couldn't establish a secure link to the gateway. Your selection remains safely stored in your vault.";
  
  return (
    <StatePageLayout
      icon={LifeBuoy}
      iconColor="text-kyn-caramel-600"
      iconBgColor="bg-kyn-caramel-50"
      title={title}
      description={description}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
    />
  );
}