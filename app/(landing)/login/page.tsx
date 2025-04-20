"use client";

import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Spinner } from "@/app/components/spinner";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("Session data:", session);
    if (session) {
      router.push("/profile");
    }
    setLoaded(true);
  }, [session]);

  const handleSignUp = () => {
    router.push("/signup");
  };

  const loginContent = (
    <Fragment>
      <Button onClick={() => signIn()}>Sign In</Button>
      <Button variant="outline" onClick={handleSignUp}>
        Sign Up
      </Button>
    </Fragment>
  );

  const loadingWidget = <Spinner></Spinner>;

  return (
    <Fragment>
      <Card className=" w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {loaded ? loginContent : loadingWidget}
        </CardContent>
      </Card>
    </Fragment>
  );
}
