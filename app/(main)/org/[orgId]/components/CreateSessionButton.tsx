"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CreateSessionButton() {
  const router = useRouter();
  return <Button onClick={() => router.push("/org/[orgId]/create-session")}>Create Session</Button>;
}
