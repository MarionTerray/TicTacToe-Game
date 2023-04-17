export type Player = {
    id: number,
    name: string,
    iconClass: string,
    colorClass: string,
};

export type Move = {
    squareId: number;
    player: Player;
};

export type GameStatus = {
    isComplete: boolean,
    winner: Player,
};

export type Game = {
    moves: Move[];
    status: GameStatus;
};

export type GameState = {
    currentGameMoves : Move[];
    history: {
        currentRoundGames: Game[];
        allGames: Game[];
    };
};