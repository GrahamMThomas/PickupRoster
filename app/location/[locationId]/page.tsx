import SessionCreator from "@/app/components/SessionCreator";
import SessionSelector from "@/app/components/SessionSelector";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as client from "@prisma/client";

const prisma = new client.PrismaClient();

export default async function Location({ params }: { params: { locationId: string } }) {
  const locationId = parseInt(params.locationId);

  let sessions: client.Session[] = [];
  let location: client.Location | undefined | null;

  const LoadLocation = async () => {
    location = await prisma.location.findUnique({
      where: {
        id: locationId,
      },
    });
  };

  const LoadSessions = async () => {
    sessions = await prisma.session.findMany({
      where: {
        locationId: locationId,
      },
    });
  };

  await LoadLocation();
  await LoadSessions();

  return (
    <div className="flex flex-col">
      <Button variant="ghost">{location ? location.name : "Loading..."}</Button>
      <Label className="text-lg pt-4">Select a session</Label>
      {sessions.map((session) => {
        return <SessionSelector key={session.id} session={session} />;
      })}
      <SessionCreator locationId={locationId!} />
    </div>
  );
}
