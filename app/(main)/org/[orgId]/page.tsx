import { Organization } from "@prisma/client";

import * as client from "@prisma/client";

export default async function OrganizationPage({ params }: { params: { orgId: string } }) {
  const orgId = (await params).orgId;
  const prisma = new client.PrismaClient();
  let org: Organization | undefined | null;

  const LoadOrg = async () => {
    org = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
    });
  };

  await LoadOrg();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">{org.displayName}</h1>
      <p className="text-gray-500">{org.description}</p>
      <img src={org.image || ""} alt={org.displayName} className="w-32 h-32 rounded-full" />
      <p className="text-gray-500">ID: {org.id}</p>
    </div>
  );
}
