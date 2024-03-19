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
exports.getTeamStats = void 0;
var querystring_1 = require("querystring");
var scraper_1 = require("../scraper");
var GameMap_1 = require("../shared/GameMap");
var utils_1 = require("../utils");
var getTeamStats = function (config) {
    return function (options) { return __awaiter(void 0, void 0, void 0, function () {
        var query, $, _a, name, currentTeam, currentLineup, currentRosterQuery, _b, historicPlayers, substitutes, standins, _c, m$, e$, mp$, overviewStats, _d, wins, draws, losses, overview, matches, events, getMapStat, mapStats;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    query = (0, querystring_1.stringify)(__assign(__assign(__assign(__assign(__assign(__assign({}, (options.startDate ? { startDate: options.startDate } : {})), (options.endDate ? { endDate: options.endDate } : {})), (options.matchType ? { matchType: options.matchType } : {})), (options.rankingFilter
                        ? { rankingFilter: options.rankingFilter }
                        : {})), (options.maps ? { maps: options.maps.map(GameMap_1.toMapFilter) } : {})), (options.bestOfX ? { bestOfX: options.bestOfX } : {})));
                    _a = scraper_1.HLTVScraper;
                    return [4 /*yield*/, (0, utils_1.fetchPage)("https://www.hltv.org/stats/teams/".concat(options.id, "/-?").concat(query), config.loadPage)];
                case 1:
                    $ = _a.apply(void 0, [_e.sent()]);
                    name = $('.context-item-name').last().text();
                    currentTeam = { id: options.id, name: name };
                    currentLineup = getPlayersByContainer(getContainerByText($, 'Current lineup'));
                    currentRosterQuery = (0, querystring_1.stringify)({
                        lineup: currentLineup.map(function (x) { return x.id; }),
                        minLineupMatch: 0
                    });
                    if (!options.currentRosterOnly) return [3 /*break*/, 3];
                    _b = scraper_1.HLTVScraper;
                    return [4 /*yield*/, (0, utils_1.fetchPage)("https://www.hltv.org/stats/lineup?".concat(currentRosterQuery), config.loadPage)];
                case 2:
                    $ = _b.apply(void 0, [_e.sent()]);
                    _e.label = 3;
                case 3:
                    historicPlayers = getPlayersByContainer(getContainerByText($, 'Historic players'));
                    substitutes = getPlayersByContainer(getContainerByText($, 'Substitutes'));
                    standins = getPlayersByContainer(getContainerByText($, 'Standins'));
                    return [4 /*yield*/, Promise.all([
                            (0, utils_1.fetchPage)(options.currentRosterOnly
                                ? "https://www.hltv.org/stats/lineup/matches?".concat(currentRosterQuery, "&").concat(query)
                                : "https://www.hltv.org/stats/teams/matches/".concat(options.id, "/").concat((0, utils_1.generateRandomSuffix)(), "?").concat(query), config.loadPage).then(scraper_1.HLTVScraper),
                            (0, utils_1.fetchPage)(options.currentRosterOnly
                                ? "https://www.hltv.org/stats/lineup/events?".concat(currentRosterQuery, "&").concat(query)
                                : "https://www.hltv.org/stats/teams/events/".concat(options.id, "/").concat((0, utils_1.generateRandomSuffix)(), "?").concat(query), config.loadPage).then(scraper_1.HLTVScraper),
                            (0, utils_1.fetchPage)(options.currentRosterOnly
                                ? "https://www.hltv.org/stats/lineup/maps?".concat(currentRosterQuery, "&").concat(query)
                                : "https://www.hltv.org/stats/teams/maps/".concat(options.id, "/").concat((0, utils_1.generateRandomSuffix)(), "?").concat(query), config.loadPage).then(scraper_1.HLTVScraper)
                        ])];
                case 4:
                    _c = _e.sent(), m$ = _c[0], e$ = _c[1], mp$ = _c[2];
                    overviewStats = $('.standard-box .large-strong');
                    _d = overviewStats
                        .eq(1)
                        .text()
                        .split('/')
                        .map(Number), wins = _d[0], draws = _d[1], losses = _d[2];
                    overview = {
                        mapsPlayed: overviewStats.eq(0).numFromText(),
                        totalKills: overviewStats.eq(2).numFromText(),
                        totalDeaths: overviewStats.eq(3).numFromText(),
                        roundsPlayed: overviewStats.eq(4).numFromText(),
                        kdRatio: overviewStats.eq(5).numFromText(),
                        wins: wins,
                        draws: draws,
                        losses: losses
                    };
                    matches = m$('.stats-table tbody tr')
                        .toArray()
                        .map(function (el) {
                        var _a = el
                            .find('.statsDetail')
                            .text()
                            .split(' - '), team1Result = _a[0], team2Result = _a[1];
                        return {
                            date: getTimestamp(el.find('.time a').text()),
                            event: {
                                id: Number(el
                                    .find('.image-and-label')
                                    .attr('href')
                                    .split('event=')[1]
                                    .split('&')[0]),
                                name: el.find('.image-and-label img').attr('title')
                            },
                            team1: currentTeam,
                            team2: {
                                id: el.find('img.flag').parent().attrThen('href', (0, utils_1.getIdAt)(3)),
                                name: el.find('img.flag').parent().trimText()
                            },
                            map: (0, GameMap_1.fromMapName)(el.find('.statsMapPlayed').text()),
                            mapStatsId: el.find('.time a').attrThen('href', (0, utils_1.getIdAt)(4)),
                            result: { team1: Number(team1Result), team2: Number(team2Result) }
                        };
                    });
                    events = e$('.stats-table tbody tr')
                        .toArray()
                        .map(function (el) {
                        var eventEl = el.find('.image-and-label').first();
                        return {
                            place: el.find('.statsCenterText').text(),
                            event: {
                                id: Number(eventEl.attr('href').split('event=')[1].split('&')[0]),
                                name: eventEl.text()
                            }
                        };
                    });
                    getMapStat = function (mapEl, i) {
                        return mapEl.find('.stats-row').eq(i).children().last().text();
                    };
                    mapStats = mp$('.two-grid .col .stats-rows')
                        .toArray()
                        .reduce(function (stats, mapEl) {
                        var mapName = (0, GameMap_1.fromMapName)(mapEl.prev().find('.map-pool-map-name').text());
                        var _a = getMapStat(mapEl, 0)
                            .split(' / ')
                            .map(Number), wins = _a[0], draws = _a[1], losses = _a[2];
                        stats[mapName] = {
                            wins: wins,
                            draws: draws,
                            losses: losses,
                            winRate: Number(getMapStat(mapEl, 1).split('%')[0]),
                            totalRounds: Number(getMapStat(mapEl, 2)),
                            roundWinPAfterFirstKill: Number(getMapStat(mapEl, 3).split('%')[0]),
                            roundWinPAfterFirstDeath: Number(getMapStat(mapEl, 4).split('%')[0])
                        };
                        return stats;
                    }, {});
                    return [2 /*return*/, {
                            id: options.id,
                            name: name,
                            overview: overview,
                            matches: matches,
                            currentLineup: currentLineup,
                            historicPlayers: historicPlayers,
                            standins: standins,
                            substitutes: substitutes,
                            events: events,
                            mapStats: mapStats
                        }];
            }
        });
    }); };
};
exports.getTeamStats = getTeamStats;
function getContainerByText($, text) {
    return $('.standard-headline')
        .filter(function (_, el) { return el.text() === text; })
        .parent()
        .next();
}
function getPlayersByContainer(container) {
    return container
        .find('.image-and-label')
        .toArray()
        .map(function (el) { return ({
        id: el.attrThen('href', (0, utils_1.getIdAt)(3)),
        name: el.find('.text-ellipsis').text()
    }); });
}
function getTimestamp(source) {
    var _a = source.split('/'), day = _a[0], month = _a[1], year = _a[2];
    return new Date([month, day, year].join('/')).getTime();
}
