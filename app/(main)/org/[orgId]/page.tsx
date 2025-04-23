import * as client from "@prisma/client";
import { Users } from "lucide-react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SessionCarousel from "./components/SessionCarousel";
import AdminEntrypoint from "./components/AdminEntrypoint";
import MemberManagement from "./components/MemberManagement";
import CreateSessionButton from "./components/CreateSessionButton";

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
      <div className="flex flex-row mx-3 gap-2">
        <img
          src={org.image || DEFAULT_ORG_IMAGE_PATH}
          alt={org.displayName}
          className="w-8 h-8 rounded"
        />
        <h1 className="text-2xl font-bold">{org.displayName}</h1>
      </div>
      <p className="text-gray-500">{org.description || ""}</p>

      <MemberManagement memberships={org.Memberships} />
      <div className="m-3" />
      <SessionCarousel />
      <div className="m-3" />
      <CreateSessionButton />
    </div>
  );
}
