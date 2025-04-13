"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signupAction } from "./actions/signupAction";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    signupAction(username, password)
      .then((user) => {
        console.log("User created:", user);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  }

  const handleBackButton = () => {
    router.push("/login");
  };

  return (
    <Card className="h-[50vh] w-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        {/* <CardDescription>Login</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <Input type="text" placeholder="Name" required />
          <Input type="text" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
        </form>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline" onClick={handleBackButton}>
          Back
        </Button>
        <Button className="flex flex-grow" type="submit">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}
