"use client";

import { Player } from "@prisma/client";
import PlayerEntry from "./PlayerEntry";

export default function PlayerTeamDisplay({
  teamPlayerMapping,
}: {
  teamPlayerMapping: { [key: string]: Player[] };
}) {
  return (
    <div className="flex flex-row">
      {Object.keys(teamPlayerMapping).map((team) => {
        return (
          <div key={team}>
            <h1>Team {team}</h1>
            {teamPlayerMapping[team].map((player) => {
              return <PlayerEntry key={player.id} player={player} />;
            })}
          </div>
        );
      })}
      );
    </div>
  );
}
