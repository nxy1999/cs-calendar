export declare enum EventType {
    Major = "MAJOR",
    InternationalLAN = "INTLLAN",
    RegionalLAN = "REGIONALLAN",
    LocalLAN = "LOCALLAN",
    Online = "ONLINE",
    Other = "OTHER"
}
export declare const fromText: (str: string) => EventType | undefined;
