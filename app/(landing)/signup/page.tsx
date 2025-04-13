"use client";

import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signupAction } from "./actions/signupAction";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

enum FormStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export default function SignupPage() {
  const router = useRouter();
  //
  //   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     const name = formData.get("name") as string;
  //     const email = formData.get("email") as string;
  //     const password = formData.get("password") as string;
  //     signupAction(name, email, password)
  //       .then((user) => {
  //         console.log("User created:", user);
  //       })
  //       .catch((error) => {
  //         console.error("Error creating user:", error);
  //       });
  //   }
  //
  // const handleBackButton = () => {
  //   router.push("/login");
  // };

  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(6, {
      message: "Email must be at least 6 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus(FormStatus.LOADING);
    signupAction(values)
      .then((user) => {
        console.log("User created:", user);
        setStatus(FormStatus.SUCCESS);
        setStatusMessage("User created successfully!");
        // wait for 1 second before redirecting
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setStatus(FormStatus.ERROR);
        setStatusMessage(error.message);
      });
  }

  return (
    <Card className="h-[50vh] w-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        {/* <CardDescription>Login</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Name</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <CardFooter className="flex gap-4"> */}
            {/* <Button variant="outline" type="button" onClick={handleBackButton}>
                Back
              </Button> */}
            <Button type="submit" className="flex flex-grow" disabled={status !== FormStatus.IDLE}>
              {status === FormStatus.LOADING ? "Loading..." : "Sign Up"}
            </Button>

            {status === FormStatus.SUCCESS && <p className="text-green-500">{statusMessage}</p>}
            {status === FormStatus.ERROR && <p className="text-red-500">{statusMessage}</p>}

            {/* </CardFooter> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
