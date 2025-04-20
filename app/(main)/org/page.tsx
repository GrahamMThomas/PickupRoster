"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as client from "@prisma/client";
import { useState } from "react";
import OrganizationCard from "./components/OrganizationCard";
import OrganizationCreator from "./components/OrganzationCreator";

const prisma = new client.PrismaClient();

export default async function OrgRootPage() {
  const [orgs, setOrgs] = useState([] as client.Organization[]);

  const LoadOrgs = async () => {
    setOrgs(await prisma.organization.findMany());
  };

  return (
    <div className="flex flex-col">
      <Button variant="ghost">{"Loading..."}</Button>
      <Label className="text-lg pt-4">Select a session</Label>
      {orgs.map((org) => {
        return (
          <OrganizationCard
            imageUrl={org.image}
            title={org.displayName}
            description={org.description}
            location={"Amsterdams"}
          />
        );
      })}
      <OrganizationCreator />
    </div>
  );
}
