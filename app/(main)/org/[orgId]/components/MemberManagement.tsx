"use client";

import { Button } from "@/components/ui/button";
import { Membership } from "@prisma/client";
import { Users } from "lucide-react";

export default function MemberManagement({ memberships }: { memberships: Membership[] }) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-row">
        <Users />
        <h2 className="text-xl font-semibold">Members: {memberships.length}</h2>
      </div>

      <div className="flex">
        <Button size="sm" variant="outline">
          Manage
        </Button>
      </div>
    </div>
  );
}
