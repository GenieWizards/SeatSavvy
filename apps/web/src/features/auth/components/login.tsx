"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { TLoginUserBodyResponse } from "@seatsavvy/types";
import { LoginUserBodySchema } from "@seatsavvy/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormState } from "react-dom";
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

export function LoginForm() {
  const [loginState, loginFormAction] = useFormState(onLoginSubmitAction, {
    type: "",
    message: "",
  });

  const router = useRouter();

  const form = useForm<TLoginUserBodyResponse>({
    mode: "onBlur",
    resolver: zodResolver(LoginUserBodySchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginFormRef = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  if (loginState.type === "success") {
    router.push("/");
    toast(loginState.message);
  }
  // }, []);

  return (
    <Container>
      {loginState.type !== "" && <span>{loginState.message}</span>}
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
                onSubmit={(evt) => {
                  evt.preventDefault();
                  form.handleSubmit(() => {
                    loginFormAction(new FormData(loginFormRef.current!));
                  })(evt);
                }}
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
                <Button type="submit" className="w-full">
                  Login
                </Button>
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
