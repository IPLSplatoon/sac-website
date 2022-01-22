export interface BfyOrganizationTournaments {
    total: number
    tournaments: Array<BfyOrganizationTournament>
}

export interface BfyOrganizationTournament {
    _id: string
    startTime: string
    playersPerTeam: number
    name: string
    bannerUrl: string
    type: 'team'
    isPublished: boolean
    isPublic: boolean
    registrationEnabled: boolean
    slug: string
    gameID: string
    game: BfyGame
    teamsCount: number
    status: 'registration-open' | 'registration-closed'
}

export interface BfyGame {
    _id: string
    name: string
    iconUrl: string
    imageUrl: string
    backgroundUrl: string
    slug: string
}
