import { Label } from "@/components/ui/label";
import * as client from "@prisma/client";
import OrganizationCard from "./components/OrganizationCard";
import OrganizationCreator from "./components/OrganzationCreator";

const prisma = new client.PrismaClient();

export default async function OrgRootPage() {
  const orgs = await prisma.organization.findMany();

  return (
    <div className="flex flex-col">
      <Label className="text-lg pt-4">Select a session</Label>
      {orgs.map((org) => {
        return <OrganizationCard org={org} key={org.id} />;
      })}
      <OrganizationCreator />
    </div>
  );
}
