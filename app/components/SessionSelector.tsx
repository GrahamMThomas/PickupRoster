"use client";

import { Button } from "@/components/ui/button";
import { Session } from "@prisma/client";
import { useRouter } from "next/navigation";

const SessionSelector = ({ session }: { session: Session }) => {
  const router = useRouter();

  function GoToSession() {
    router.push(`/location/${session.locationId}/session/${session.id}`);
  }

  return (
    <div className="flex flex-row py-2">
      <Button variant="ghost" onClick={GoToSession}>
        {session.name}
      </Button>
    </div>
  );
};

export default SessionSelector;
