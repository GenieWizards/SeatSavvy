import { redirect } from "next/navigation";
import React from "react";

import { Container } from "@/components/ui/container";
import { CardSection } from "@/features/cards/components/card-section";
import { verifySession } from "@/lib/auth.lib";

export default async function Home() {
  const user = await verifySession();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="">
      <Container>
        <h2 className="px-2 text-xl font-bold">Recommended</h2>
        {/* TODO: Remove the below line */}
        {user && JSON.stringify(user)}
        <CardSection />
      </Container>
    </main>
  );
}
