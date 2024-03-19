import * as cheerio from 'cheerio';
export declare const fetchPage: (url: string, loadPage: (url: string) => Promise<string>) => Promise<cheerio.Root>;
export declare const generateRandomSuffix: () => `${string}-${string}-${string}-${string}-${string}`;
export declare const percentageToDecimalOdd: (odd: number) => number;
export declare function getIdAt(index: number, href: string): number | undefined;
export declare function getIdAt(index: number): (href: string) => number | undefined;
export declare const notNull: <T>(x: T | null) => x is T;
export declare const parseNumber: (str: string | undefined) => number | undefined;
export declare const sleep: (ms: number) => Promise<void>;
