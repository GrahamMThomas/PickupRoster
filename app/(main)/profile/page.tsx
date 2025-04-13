"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  console.log("Session data:", session);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          This is your profile page. You can edit your profile information here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{session?.user?.name}</p>
      </CardContent>
    </Card>
  );
}
