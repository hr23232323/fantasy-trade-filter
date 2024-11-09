export type Player = {
  playerName: string;            // Backend: playerName
  slug: string;                  // Backend: slug
  position: string;              // Backend: position
  team: string;                  // Backend: team
  age: number;                   // Backend: age
  heightFeet: number;            // Backend: heightFeet
  heightInches: number;          // Backend: heightInches
  weight: number;                // Backend: weight
  seasonsExperience: number;     // Backend: seasonsExperience
  byeWeek?: number;              // Backend: byeWeek (optional)
  draftYear?: number;            // Backend: draftYear (optional)
  teamLongName: string;          // Backend: teamLongName

  // Nested data for oneQB and superflex values
  oneQBValues: QBValues;         // Backend: oneQBValues
  superflexValues: QBValues;     // Backend: superflexValues

  // Injury report data
  injury: InjuryReport;          // Backend: injury
};

export type QBValues = {
  value: number;                 // Backend: value
  rank: number;                  // Backend: rank
  positionalRank: number;        // Backend: positionalRank
  overallTier: number;           // Backend: overallTier
  positionalTier: number;        // Backend: positionalTier
};

export type InjuryReport = {
  injuryCode: number;            // Backend: injury.injuryCode
  injuryName?: string;           // Backend: injury.injuryName (optional)
  injuryArea?: string;           // Backend: injury.injuryArea (optional)
  injuryReturn?: string;         // Backend: injury.injuryReturn (optional)
};
