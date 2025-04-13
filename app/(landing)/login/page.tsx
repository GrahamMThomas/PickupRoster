"use client";

import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const { data: session } = useSession();
  console.log("Session data:", session);

  if (session) {
    router.push("/profile");
  }

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <Card className=" w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button onClick={() => signIn()}>Sign In</Button>
        <Button variant="outline" onClick={handleSignUp}>
          Sign Up
        </Button>
      </CardContent>
    </Card>
  );
}
