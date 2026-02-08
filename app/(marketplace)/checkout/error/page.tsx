"use client";

/**
 * KYNAR UNIVERSE: Checkout Error (v2.0)
 * Role: Grounded recovery and technical reassurance.
 */

import { useRouter } from "next/navigation";
import { RefreshCw, LifeBuoy } from "lucide-react";
import { StatePageLayout } from "@/components/checkout/StatePageLayout";

export default function CheckoutErrorPage() {
  const router = useRouter();
  
  return (
    <StatePageLayout
      icon={LifeBuoy}
      iconColor="text-kyn-caramel-600"
      iconBgColor="bg-kyn-caramel-50"
      title={
        <>
          Connection <span className="italic">Interrupted.</span>
        </>
      }
      description="We couldn't establish a secure link to the gateway. Your selection remains safely stored in your vault."
      primaryAction={{
        label: "Try Connection Again",
        icon: RefreshCw,
        onClick: () => router.refresh(),
      }}
      secondaryAction={{
        label: "Back to Selection",
        href: "/cart",
      }}
    />
  );
}