import { HLTVConfig } from '../config';
import { Country } from '../shared/Country';
export interface NewsPreview {
    title: string;
    comments: number;
    date: number;
    country: Country;
    link: string;
}
export interface GetNewsArguments {
    year?: 2005 | 2006 | 2007 | 2008 | 2009 | 2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022;
    month?: 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december';
    eventIds?: number[];
}
export declare const getNews: (config: HLTVConfig) => ({ year, month, eventIds }?: GetNewsArguments) => Promise<NewsPreview[]>;
