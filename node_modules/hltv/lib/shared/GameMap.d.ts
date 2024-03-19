export declare enum GameMap {
    TBA = "tba",
    Train = "de_train",
    Cobblestone = "de_cbble",
    Inferno = "de_inferno",
    Cache = "de_cache",
    Mirage = "de_mirage",
    Overpass = "de_overpass",
    Dust2 = "de_dust2",
    Nuke = "de_nuke",
    Tuscan = "de_tuscan",
    Vertigo = "de_vertigo",
    Season = "de_season",
    Ancient = "de_ancient",
    Anubis = "de_anubis",
    Default = "default"
}
export declare const fromMapSlug: (slug: string) => GameMap;
export declare const fromMapName: (name: string) => GameMap;
export declare const toMapFilter: (map: GameMap) => string;
