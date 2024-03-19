import * as cheerio from 'cheerio';
export interface HLTVPage extends cheerio.Root {
    (selector: string): HLTVPageElement;
}
export interface HLTVPageElement {
    length: number;
    trimText(): string | undefined;
    numFromAttr(attr: string): number | undefined;
    numFromText(): number | undefined;
    lines(): string[];
    exists(): boolean;
    find(selector: string): HLTVPageElement;
    attr(attr: string): string;
    text(): string;
    textThen<T>(then: (value: string) => T): T;
    first(): HLTVPageElement;
    last(): HLTVPageElement;
    toArray(): HLTVPageElement[];
    data(name: string): any;
    attrThen<T>(attr: string, then: (value: string) => T): T;
    next(selector?: string): HLTVPageElement;
    eq(index: number): HLTVPageElement;
    parent(): HLTVPageElement;
    children(selector?: string): HLTVPageElement;
    prev(selector?: string): HLTVPageElement;
    contents(): HLTVPageElement;
    index(): number;
    filter(func: (index: number, element: HLTVPageElement) => boolean): HLTVPageElement;
}
export declare const HLTVScraper: (root: cheerio.Root) => HLTVPage;
