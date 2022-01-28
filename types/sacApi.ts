export type SacLeaderboard = Array<SacLeaderboardTeam>;

export interface SacLeaderboardTeam {
    id: string
    name: string
    icon_url: string
    total_points: number
    season_placement: number
}

export type SacSearchResult = Array<SacSearchResultTeam>

export interface SacSearchResultTeam {
    id: string
    name: string
    icon_url: string
    total_points: number
    search_score: number
    sets_won: number
    sets_played: number
}

export interface SacTeam {
    id: string
    name: string
    icon_url: string
    total_points: number
    players: Array<SacPlayer>
    battlefy_ids: Array<string>
    sets_won: number
    sets_played: number
    tournaments: Array<SacTeamTournament>
    sendou_team: TeamSendouProfile
    season_placement: number
}

export interface SacTeamTournament {
    tournament: {
        id: string
        name: string
        battlefy_id: string
        start_time: string
        battlefy_org_slug: string
        battlefy_tournament_slug: string
    }
    sets_won: number
    sets_played: number
    placement: number | null
    points: number
}

export interface SacPlayer {
    id: string
    name: string
    battlefy_ids: Array<string>
    discord_id: string
    tournament_count: number
    sendou_profile: PlayerSendouProfile
}

export interface PlayerSendouProfile {
    discord_avatar: string
    username: string
    discriminator: string
    profile: {
        twitch_name: string
        twitter_name: string
        youtube_id: string
        weapon_pool: Array<string>
        sens_motion: number
        sens_stick: number
        country: string
    }
    team: {
        name: string
        name_for_url: string
        twitter_name: string
    }
    player: {
        switch_account_id: string
    }
}

export interface TeamSendouProfile {
    bio: string
    id: number
    name: string
    url: string
    twitter_name: string
}
