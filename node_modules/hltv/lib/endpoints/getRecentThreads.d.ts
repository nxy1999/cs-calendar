import { HLTVConfig } from '../config';
export declare enum ThreadCategory {
    CS = "cs",
    Match = "match",
    News = "news"
}
export interface Thread {
    title: string;
    link: string;
    replies: number;
    category: ThreadCategory;
}
export declare const getRecentThreads: (config: HLTVConfig) => () => Promise<Thread[]>;
