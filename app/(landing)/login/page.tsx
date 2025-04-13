"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <Card className="h-[50vh] w-full">
      <CardHeader>
        <CardTitle>Welcome!</CardTitle>
        <CardDescription>Login</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input type="text" placeholder="Username" required />
          <Input type="password" placeholder="Password" required />
        </form>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline" onClick={handleSignUp}>
          Sign Up
        </Button>
        <Button className="flex flex-grow" type="submit">
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
