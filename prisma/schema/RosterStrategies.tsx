export class OpenRosterStrategy {
  totalSlots: number;

  constructor(totalSlots: number) {
    this.totalSlots = totalSlots;
  }
}

enum VolleyballPosition {
  Setter = "Setter",
  OutsideHitter = "Outside Hitter",
  MiddleBlocker = "Middle Blocker",
  Opposite = "Opposite",
  Libero = "Libero",
}

class VolleyballTeam {
  setter: number = 0;
  outsideHitters: number = 0;
  middleBlockers: number = 0;
  opposites: number = 0;
  liberos: number = 0;
}

export class PositionRosterStrategy {
  teams: VolleyballTeam[] = [];
}
