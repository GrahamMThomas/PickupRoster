import { RosterByPosition } from "@/app/models/Team";

interface RosterByPositionViewProps {
  roster: RosterByPosition;
}

export default function RosterByPositionView({ roster }: RosterByPositionViewProps) {
  let rosterDict: { [key: string]: number } = {};
  roster.teams.forEach((team, index) => {
    console.log("Team", index, team);

    if (rosterDict[team.toJSON()]) {
      rosterDict[team.toJSON()] += 1;
    } else {
      rosterDict[team.toJSON()] = 1;
    }
  });

  return (
    <div>
      <h2 className="text-lg font-semibold">Roster by Position</h2>
      <div className="flex flex-col gap-2">
        {Object.entries(rosterDict).map(([key, value]) => {
          const [outside, opposite, setter, middle, libero] = key
            .split("|")
            .map((item) => parseInt(item.slice(-1)));
          return (
            <div key={key} className="flex flex-row gap-2">
              <span>O: {outside}</span>
              <span>Op: {opposite}</span>
              <span>S: {setter}</span>
              <span>M: {middle}</span>
              <span>L: {libero}</span>
              <span>x{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
