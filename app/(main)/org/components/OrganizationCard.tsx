"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Organization } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface OrganizationCardProps {
  org: Organization;
}

export default function OrganizationCard({ org }: OrganizationCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/org/${org.id}`);
  };

  return (
    <Card className="w-full max-w-md rounded-2xl overflow-hidden shadow-md">
      <div className="relative max-h-48 w-full">
        {org.image ? (
          <Image src={org.image} alt="org image" fill className="object-cover" priority />
        ) : (
          <div />
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{org.displayName}</h2>
          <p className="text-sm text-muted-foreground">{org.description}</p>
          <div className="flex flex-row justify-between items-center">
            <Badge variant="secondary" className="mt-2 w-fit flex items-center gap-1">
              <MapPin size={14} className="text-muted-foreground" />
              <span>{"null"}</span>
            </Badge>
            <Button onClick={handleClick} size="icon">
              <ArrowRight />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
