"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { TLoginUserBodyResponse } from "@seatsavvy/types";
import { LoginUserBodySchema } from "@seatsavvy/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { onLoginSubmitAction } from "../actions/login.action";

const LoginSubmitButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={!isValid || pending}>
      {pending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          <span>Please wait...</span>
        </div>
      ) : (
        "Login"
      )}
    </Button>
  );
};

export function LoginForm() {
  const [loginState, loginFormAction] = useFormState(onLoginSubmitAction, {
    type: "",
    message: "",
  });

  const router = useRouter();

  const form = useForm<TLoginUserBodyResponse>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(LoginUserBodySchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginFormRef = useRef<HTMLFormElement>(null);

  if (loginState.type === "success") {
    router.push("/");
    toast(loginState.message);
  }

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <FormProvider {...form}>
              <form
                ref={loginFormRef}
                action={loginFormAction}
                className="max-w-sm space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username or Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="seat_savvy or book@seatsavvy.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <LoginSubmitButton isValid={form.formState.isValid} />
              </form>
            </FormProvider>
            <Button variant="outline" className="w-full" disabled>
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
