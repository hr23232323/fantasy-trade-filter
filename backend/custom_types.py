from pydantic import BaseModel
from typing import Optional

class OneQBValues(BaseModel):
    value: int
    rank: int
    positionalRank: Optional[int] = None  # Picks might not have positional ranks
    overallTier: int
    positionalTier: Optional[int] = None

class SuperflexValues(BaseModel):
    value: int
    rank: int
    positionalRank: Optional[int] = None  # Picks might not have positional ranks
    overallTier: int
    positionalTier: Optional[int] = None


class InjuryReport(BaseModel):
    injuryCode: int
    injuryName: Optional[str] = None
    injuryArea: Optional[str] = None
    injuryReturn: Optional[str] = None

    class Config:
        extra = "ignore"  # Allows extra fields or missing optional fields

 

class Player(BaseModel):
    playerName: str
    slug: str
    position: str
    team: str
    rookie: bool
    age: float
    heightFeet: Optional[int] = None  # Picks have no height
    heightInches: Optional[int] = None  # Picks have no height
    weight: Optional[int] = None  # Picks have no weight
    seasonsExperience: Optional[int] = None  # Picks may use the year here
    
    # Nested data
    oneQBValues: OneQBValues
    superflexValues: SuperflexValues
    injury: InjuryReport
    
    # Misc.
    teamLongName: str
    byeWeek: Optional[int] = None  # Picks have no bye week
    draftYear: Optional[int] = None  # Picks use 0 or are missing
    


def parse_player_data(raw_data: dict) -> Player:
    """
    Filters and validates raw player data using the Pydantic Player model.
    
    Args:
        raw_data (dict): Raw JSON data for a player.
    
    Returns:
        Player: Validated and filtered player data.
    """
    try:
        player = Player(**raw_data)
        return player
    except Exception as e:
        print(f"Validation error for player {raw_data.get('playerName')}: {e}")
        return None
