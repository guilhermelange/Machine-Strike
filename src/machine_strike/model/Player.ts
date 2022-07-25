enum Player {
    Player1, Player2
}


export function getPlayerDesc(player: Player): string {
    const map = new Map<Player, string>();
    map.set(Player.Player1, "Jogador 1");
    map.set(Player.Player2, "Jogador 2");
    return map.get(player) as string;
}

export default Player