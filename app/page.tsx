import { PrismaClient } from "@prisma/client";
import { Card } from "@/components/ui/card";

const prisma = new PrismaClient();

export default async function Home() {
  return (
    <div className="h-min w-min">
      <Card className="p-4 w-min h-min">
        <div className="flex flex-row gap-2"></div>
      </Card>
    </div>
  );
}
