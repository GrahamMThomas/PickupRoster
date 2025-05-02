"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PositionIncrementer from "./PositionIncrementer";
import { useState } from "react";
import { RosterByPosition, TeamByPosition } from "@/app/models/Team";
import RosterByPositionView from "./RosterByPositionView";

interface TeamConfigurerProps {
  setRoster: (roster: RosterByPosition) => void;
}

export default function RosterConfigurer({ setRoster }: TeamConfigurerProps) {
  const [open, setOpen] = useState(false);

  const [team, setCurrentTeam] = useState<TeamByPosition>(new TeamByPosition(2, 1, 1, 1, 1));
  const [roster, setStateRoster] = useState<RosterByPosition>({ teams: [] });

  function handleAddTeam() {
    setStateRoster((prev) => ({
      teams: [...prev.teams, team],
    }));
  }

  function handleRosterCreation() {
    if (!roster) {
      return;
    }

    setRoster(roster);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Configure
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded w-[85%]">
        <DialogHeader className="text-left">
          <DialogTitle>Team Configuration</DialogTitle>
          <DialogDescription>
            Configure your team settings here. You can set the roster strategy and other options.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4 justify-center">
          <div className="flex flex-col justify-between">
            <PositionIncrementer
              label="Outside"
              initialValue={team.outside}
              onChange={(v) =>
                setCurrentTeam(
                  (prev) =>
                    new TeamByPosition(v, team.opposite, team.setter, team.middle, team.libero)
                )
              }
            />
            <PositionIncrementer
              label="Opposite"
              initialValue={team.opposite}
              onChange={(v) =>
                setCurrentTeam(
                  (prev) =>
                    new TeamByPosition(team.outside, v, team.setter, team.middle, team.libero)
                )
              }
            />
            <PositionIncrementer
              label="Setter"
              initialValue={team.setter}
              onChange={(v) =>
                setCurrentTeam(
                  (prev) =>
                    new TeamByPosition(team.outside, team.opposite, v, team.middle, team.libero)
                )
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <PositionIncrementer
              label="Middle"
              initialValue={team.middle}
              onChange={(v) =>
                setCurrentTeam(
                  (prev) =>
                    new TeamByPosition(team.outside, team.opposite, team.setter, v, team.libero)
                )
              }
            />
            <PositionIncrementer
              label="Libero"
              initialValue={team.libero}
              onChange={(v) =>
                setCurrentTeam(
                  (prev) =>
                    new TeamByPosition(team.outside, team.opposite, team.setter, team.middle, v)
                )
              }
            />
            <Button size="sm" variant="secondary" onClick={handleAddTeam}>
              Add Team
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-lg">Teams</h2>
          <RosterByPositionView roster={roster} />
        </div>
        <DialogFooter>
          <Button
            onClick={handleRosterCreation}
            className="w-full"
            disabled={roster.teams.length === 0}
          >
            Finished
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
