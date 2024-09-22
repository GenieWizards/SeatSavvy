import { redirect } from "next/navigation";

import { LoginForm } from "@/features/auth/components/login";
import { verifySession } from "@/lib/auth.lib";

export default async function Login() {
  const user = await verifySession();

  if (user) {
    redirect("/");
  }

  return (
    <section className="grid place-items-center">
      <LoginForm />
    </section>
  );
}
