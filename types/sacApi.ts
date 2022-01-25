export type SacLeaderboard = Array<SacLeaderboardTeam>;

export interface SacLeaderboardTeam {
    id: string
    name: string
    icon_url: string
    total_points: number
}

export type SacSearchResult = Array<SacSearchResultTeam>

export interface SacSearchResultTeam {
    id: string
    name: string
    icon_url: string
    total_points: number
    players: Array<string>
    search_score: number
    sets_won: number
    sets_played: number
}
