"use client";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

export default function CreateSessionButton() {
  const router = useRouter();
  const params = useParams();

  return (
    <Button onClick={() => router.push(`/org/${params.orgId}/create-session`)}>
      Create Session
    </Button>
  );
}
