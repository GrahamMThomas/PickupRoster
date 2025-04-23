"use client";

import { Organization } from "@prisma/client";
import { createContext, useContext } from "react";

const OrgContext = createContext<Organization | null>(null);

export function OrgContextProvider({
  children,
  org,
}: {
  children: React.ReactNode;
  org: Organization;
}) {
  return <OrgContext.Provider value={org}>{children}</OrgContext.Provider>;
}

export function useOrg() {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error("useOrg must be used within an OrgContextProvider");
  }
  return context;
}
