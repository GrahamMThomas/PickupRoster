import { VolleyballPosition } from "@prisma/client";

class RosterByPosition {
  teams: TeamByPosition[];

  constructor(teams: TeamByPosition[]) {
    this.teams = teams;
  }
}

class TeamByPosition {
  outside: number;
  opposite: number;
  setter: number;
  middle: number;
  libero: number;

  constructor(outside: number, opposite: number, setter: number, middle: number, libero: number) {
    this.outside = outside;
    this.opposite = opposite;
    this.setter = setter;
    this.middle = middle;
    this.libero = libero;
  }

  toJSON() {
    return `O${this.outside}|Op${this.opposite}|S${this.setter}|M${this.middle}|L${this.libero}`;
  }
}

export { RosterByPosition, TeamByPosition };
