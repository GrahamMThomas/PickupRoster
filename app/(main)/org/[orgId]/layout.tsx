import { notFound } from "next/navigation";
import * as client from "@prisma/client";
import { OrgContextProvider } from "./components/OrgContextProvider";

export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { orgId: string };
}) {
  const prisma = new client.PrismaClient();
  let cookedParams = await params;

  const org = await prisma.organization.findUnique({
    where: {
      id: cookedParams.orgId,
    },
  });

  if (!org) notFound(); // 404 if org not found

  return <OrgContextProvider org={org}>{children}</OrgContextProvider>;
}
