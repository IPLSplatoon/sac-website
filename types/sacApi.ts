export type SacLeaderboard = Array<SacLeaderboardTeam>;

export interface SacLeaderboardTeam {
    id: string
    name: string
    icon_url: string
    total_points: number
}
