import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface OrganizationCardProps {
  imageUrl: string | null;
  title: string;
  description: string | null;
  location: string;
}

export default function OrganizationCard({
  imageUrl,
  title,
  description,
  location,
}: OrganizationCardProps) {
  return (
    <Card className="w-full max-w-md rounded-2xl overflow-hidden shadow-md">
      <div className="relative h-48 w-full">
        <Image src={imageUrl || ""} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
          <Badge variant="secondary" className="mt-2 w-fit flex items-center gap-1">
            <MapPin size={14} className="text-muted-foreground" />
            <span>{location}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
