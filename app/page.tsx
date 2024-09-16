import { PrismaClient, Location } from "@prisma/client";
import { LocationSelector } from "./components/LocationSelector";
import { Card } from "@/components/ui/card";
import LocationCreator from "./components/LocationCreator";

const prisma = new PrismaClient();

export default async function Home() {
  let locations: Location[] = [];

  locations = await prisma.location.findMany();

  return (
    <div className="h-min w-min">
      <Card className="p-4 w-min h-min">
        <div className="flex flex-row gap-2">
          <LocationSelector locations={locations} />
          <LocationCreator />
        </div>
      </Card>
    </div>
  );
}
