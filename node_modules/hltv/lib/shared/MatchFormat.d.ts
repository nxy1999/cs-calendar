export declare enum MatchFormat {
    BO1 = "bo1",
    BO3 = "bo3",
    BO5 = "bo5",
    BO7 = "bo7",
    Unknown = "unknown"
}
export declare enum MatchFormatLocation {
    LAN = "LAN",
    Online = "Online"
}
export declare const fromFullMatchFormat: (format: string) => MatchFormat;
