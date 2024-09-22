import { redirect } from "next/navigation";

import { RegisterForm } from "@/features/auth/components/register";
import { verifySession } from "@/lib/auth.lib";

export default async function Register() {
  const user = await verifySession();

  if (user) {
    redirect("/");
  }

  return (
    <section className="grid place-items-center">
      <RegisterForm />
    </section>
  );
}
