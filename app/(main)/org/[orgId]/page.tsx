import * as client from "@prisma/client";
import { Users } from "lucide-react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SessionCarousel from "./components/SessionCarousel";

const DEFAULT_ORG_IMAGE_PATH = "/images/org_default_logo.png";

type OrganizationWithMemberships = client.Prisma.OrganizationGetPayload<{
  include: {
    Memberships: true;
  };
}>;

export default async function OrganizationPage({ params }: { params: { orgId: string } }) {
  const orgId = (await params).orgId;
  const prisma = new client.PrismaClient();
  let org: OrganizationWithMemberships | undefined | null;

  const LoadOrg = async () => {
    org = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
      include: {
        Memberships: true,
      },
    });
  };

  const session = await getServerSession(authOptions);

  await LoadOrg();

  if (!org) {
    return <div className="flex flex-col">Organization not found</div>;
  }

  return (
    <div className="flex flex-col h-full w-full items-start justify-start">
      <h1 className="text-2xl font-bold">{org.displayName}</h1>
      <p className="text-gray-500">{org.description}</p>
      <img
        src={org.image || DEFAULT_ORG_IMAGE_PATH}
        alt={org.displayName}
        className="w-32 h-32 rounded-full"
      />
      <div className="flex flex-row gap-2 items-center">
        <Users />
        <h2 className="text-xl font-semibold">Members: {org.Memberships.length}</h2>
      </div>
      <div className="m-3" />
      <SessionCarousel />
    </div>
  );
}
