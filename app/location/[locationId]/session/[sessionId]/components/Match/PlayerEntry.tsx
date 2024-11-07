import { Player } from "@prisma/client";

export default function PlayerEntry({ player }: { player: Player }) {
  return (
    <div className="flex flex-row">
      <div>
        <h1>{player.name}</h1>
      </div>
    </div>
  );
}
