"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerStats = void 0;
var querystring_1 = require("querystring");
var scraper_1 = require("../scraper");
var GameMap_1 = require("../shared/GameMap");
var utils_1 = require("../utils");
var getPlayerStats = function (config) {
    return function (options) { return __awaiter(void 0, void 0, void 0, function () {
        var query, _a, $, i$, m$, nameText, name, ign, imageUrl, image, age, country, team, getOverviewStats, overviewStatistics, getIndivialStats, individualStatistics, matches;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    query = (0, querystring_1.stringify)(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (options.startDate ? { startDate: options.startDate } : {})), (options.endDate ? { endDate: options.endDate } : {})), (options.matchType ? { matchType: options.matchType } : {})), (options.rankingFilter
                        ? { rankingFilter: options.rankingFilter }
                        : {})), (options.maps ? { maps: options.maps.map(GameMap_1.toMapFilter) } : {})), (options.bestOfX ? { bestOfX: options.bestOfX } : {})), (options.eventIds ? { event: options.eventIds } : {})));
                    return [4 /*yield*/, Promise.all([
                            (0, utils_1.fetchPage)("https://www.hltv.org/stats/players/".concat(options.id, "/").concat((0, utils_1.generateRandomSuffix)(), "?").concat(query), config.loadPage).then(scraper_1.HLTVScraper),
                            (0, utils_1.fetchPage)("https://www.hltv.org/stats/players/individual/".concat(options.id, "/").concat((0, utils_1.generateRandomSuffix)(), "?").concat(query), config.loadPage).then(scraper_1.HLTVScraper),
                            (0, utils_1.fetchPage)("https://www.hltv.org/stats/players/matches/".concat(options.id, "/").concat((0, utils_1.generateRandomSuffix)(), "?").concat(query), config.loadPage).then(scraper_1.HLTVScraper)
                        ])];
                case 1:
                    _a = _b.sent(), $ = _a[0], i$ = _a[1], m$ = _a[2];
                    nameText = $('.summaryRealname div').text();
                    name = nameText === '-' ? undefined : nameText;
                    ign = $('.context-item-name').text();
                    imageUrl = $('.summaryBodyshot').attr('src') || $('.summarySquare').attr('src');
                    image = imageUrl.includes('bodyshot/unknown.png')
                        ? undefined
                        : imageUrl;
                    age = $('.summaryPlayerAge').textThen(function (x) {
                        return (0, utils_1.parseNumber)(x.split(' ')[0]);
                    });
                    country = {
                        name: $('.summaryRealname .flag').attr('title'),
                        code: $('.summaryRealname .flag').attrThen('src', function (x) { var _a; return (_a = x.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0]; })
                    };
                    team = $('.SummaryTeamname').text() !== 'No team'
                        ? {
                            name: $('.SummaryTeamname a').text(),
                            id: $('.SummaryTeamname a').attrThen('href', (0, utils_1.getIdAt)(3))
                        }
                        : undefined;
                    getOverviewStats = function (label) {
                        var lbl = label.toLowerCase();
                        var row = $('.stats-row').filter(function (_, x) {
                            return x.text().toLowerCase().includes(lbl);
                        });
                        if (row.exists()) {
                            return Number(row.find('span').eq(1).text().replace('%', ''));
                        }
                    };
                    overviewStatistics = __assign({ kills: getOverviewStats('Total kills'), headshots: getOverviewStats('Headshot %'), deaths: getOverviewStats('Total deaths'), kdRatio: getOverviewStats('K/D Ratio'), damagePerRound: getOverviewStats('Damage / Round'), grenadeDamagePerRound: getOverviewStats('Grenade dmg / Round'), mapsPlayed: getOverviewStats('Maps played'), roundsPlayed: getOverviewStats('Rounds played'), killsPerRound: getOverviewStats('Kills / round'), assistsPerRound: getOverviewStats('Assists / round'), deathsPerRound: getOverviewStats('Deaths / round'), savedByTeammatePerRound: getOverviewStats('Saved by teammate'), savedTeammatesPerRound: getOverviewStats('Saved teammates') }, (getOverviewStats('Rating 1.0') !== undefined
                        ? { rating1: getOverviewStats('Rating 1.0') }
                        : { rating2: getOverviewStats('Rating 2.0') }));
                    getIndivialStats = function (label) {
                        var lbl = label.toLowerCase();
                        var row = i$('.stats-row').filter(function (_, x) {
                            return x.text().toLowerCase().includes(lbl);
                        });
                        return Number(row.find('span').eq(1).text().replace('%', ''));
                    };
                    individualStatistics = {
                        roundsWithKills: getIndivialStats('Rounds with kills'),
                        zeroKillRounds: getIndivialStats('0 kill rounds'),
                        oneKillRounds: getIndivialStats('1 kill rounds'),
                        twoKillRounds: getIndivialStats('2 kill rounds'),
                        threeKillRounds: getIndivialStats('3 kill rounds'),
                        fourKillRounds: getIndivialStats('4 kill rounds'),
                        fiveKillRounds: getIndivialStats('5 kill rounds'),
                        openingKills: getIndivialStats('Total opening kills'),
                        openingDeaths: getIndivialStats('Total opening deaths'),
                        openingKillRatio: getIndivialStats('Opening kill ratio'),
                        openingKillRating: getIndivialStats('Opening kill rating'),
                        teamWinPercentAfterFirstKill: getIndivialStats('Team win percent after first kill'),
                        firstKillInWonRounds: getIndivialStats('First kill in won rounds'),
                        rifleKills: getIndivialStats('Rifle kills'),
                        sniperKills: getIndivialStats('Sniper kills'),
                        smgKills: getIndivialStats('SMG kills'),
                        pistolKills: getIndivialStats('Pistol kills'),
                        grenadeKills: getIndivialStats('Grenade'),
                        otherKills: getIndivialStats('Other')
                    };
                    matches = m$('.stats-table tbody tr')
                        .toArray()
                        .map(function (el) {
                        var _a = el
                            .find('td')
                            .eq(4)
                            .text()
                            .split(' - ')
                            .map(Number), kills = _a[0], deaths = _a[1];
                        return {
                            mapStatsId: el
                                .find('td')
                                .first()
                                .find('a')
                                .attrThen('href', (0, utils_1.getIdAt)(4)),
                            date: el.find('.time').numFromAttr('data-unix'),
                            team1: {
                                id: el
                                    .find('td')
                                    .eq(1)
                                    .find('.gtSmartphone-only a')
                                    .attrThen('href', (0, utils_1.getIdAt)(3)),
                                name: el.find('td').eq(1).find('a span').text()
                            },
                            team2: {
                                id: el
                                    .find('td')
                                    .eq(2)
                                    .find('.gtSmartphone-only a')
                                    .attrThen('href', (0, utils_1.getIdAt)(3)),
                                name: el.find('td').eq(2).find('a span').text()
                            },
                            map: (0, GameMap_1.fromMapSlug)(el.find('.statsMapPlayed').text()),
                            kills: kills,
                            deaths: deaths,
                            rating: el.find('td').last().numFromText()
                        };
                    });
                    return [2 /*return*/, {
                            id: options.id,
                            name: name,
                            ign: ign,
                            image: image,
                            age: age,
                            country: country,
                            team: team,
                            overviewStatistics: overviewStatistics,
                            individualStatistics: individualStatistics,
                            matches: matches
                        }];
            }
        });
    }); };
};
exports.getPlayerStats = getPlayerStats;
