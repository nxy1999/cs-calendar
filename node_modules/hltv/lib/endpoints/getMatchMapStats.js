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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerformanceOverview = exports.getPlayerStats = exports.getStatsOverview = exports.getOverviewPropertyFromLabel = exports.getMatchMapStats = exports.Outcome = void 0;
var scraper_1 = require("../scraper");
var GameMap_1 = require("../shared/GameMap");
var utils_1 = require("../utils");
var Outcome;
(function (Outcome) {
    Outcome["CTWin"] = "ct_win";
    Outcome["TWin"] = "t_win";
    Outcome["BombDefused"] = "bomb_defused";
    Outcome["BombExploded"] = "bomb_exploded";
    Outcome["TimeRanOut"] = "stopwatch";
})(Outcome || (exports.Outcome = Outcome = {}));
var getMatchMapStats = function (config) {
    return function (_a) {
        var id = _a.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var _b, m$, p$, matchId, halfsString, result, map, date, team1, team2, event, roundHistory, overview, playerStats, performanceOverview;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            (0, utils_1.fetchPage)("https://www.hltv.org/stats/matches/mapstatsid/".concat(id, "/-"), config.loadPage).then(scraper_1.HLTVScraper),
                            (0, utils_1.fetchPage)("https://www.hltv.org/stats/matches/performance/mapstatsid/".concat(id, "/-"), config.loadPage).then(scraper_1.HLTVScraper)
                        ])];
                    case 1:
                        _b = _c.sent(), m$ = _b[0], p$ = _b[1];
                        matchId = m$('.match-page-link').attrThen('href', (0, utils_1.getIdAt)(2));
                        halfsString = m$('.match-info-row .right').eq(0).text();
                        result = {
                            team1TotalRounds: m$('.team-left .bold').numFromText(),
                            team2TotalRounds: m$('.team-right .bold').numFromText(),
                            halfResults: halfsString
                                .match(/(?!\() \d+ : \d+ (?=\))/g)
                                .map(function (x) { return x.trim().split(' : '); })
                                .map(function (_a) {
                                var t1 = _a[0], t2 = _a[1];
                                return ({
                                    team1Rounds: Number(t1),
                                    team2Rounds: Number(t2)
                                });
                            })
                        };
                        map = (0, GameMap_1.fromMapName)(m$('.match-info-box').contents().eq(3).trimText());
                        date = m$('.match-info-box span[data-time-format]').numFromAttr('data-unix');
                        team1 = {
                            id: m$('.team-left a').attrThen('href', (0, utils_1.getIdAt)(3)),
                            name: m$('.team-left .team-logo').attr('title')
                        };
                        team2 = {
                            id: m$('.team-right a').attrThen('href', (0, utils_1.getIdAt)(3)),
                            name: m$('.team-right .team-logo').attr('title')
                        };
                        event = {
                            id: Number(m$('.match-info-box .text-ellipsis')
                                .first()
                                .attr('href')
                                .split('event=')
                                .pop()),
                            name: m$('.match-info-box .text-ellipsis').first().text()
                        };
                        roundHistory = getRoundHistory(m$, team1, team2);
                        overview = getStatsOverview(m$);
                        playerStats = getPlayerStats(m$, p$);
                        performanceOverview = getPerformanceOverview(p$);
                        // TODO: kill matrix
                        // TODO: equipment value
                        return [2 /*return*/, {
                                id: id,
                                matchId: matchId,
                                result: result,
                                map: map,
                                date: date,
                                team1: team1,
                                team2: team2,
                                event: event,
                                overview: overview,
                                roundHistory: roundHistory,
                                playerStats: playerStats,
                                performanceOverview: performanceOverview
                            }];
                }
            });
        });
    };
};
exports.getMatchMapStats = getMatchMapStats;
function getOverviewPropertyFromLabel(label) {
    switch (label) {
        case 'Team rating':
            return 'rating';
        case 'First kills':
            return 'firstKills';
        case 'Clutches won':
            return 'clutchesWon';
        case 'Most kills':
            return 'mostKills';
        case 'Most damage':
            return 'mostDamage';
        case 'Most assists':
            return 'mostAssists';
        case 'Most AWP kills':
            return 'mostAWPKills';
        case 'Most first kills':
            return 'mostFirstKills';
        case 'Best rating 1.0':
            return 'bestRating1';
        case 'Best rating 2.0':
            return 'bestRating2';
    }
}
exports.getOverviewPropertyFromLabel = getOverviewPropertyFromLabel;
function getRoundHistory($, team1, team2) {
    var getOutcome = function (el) {
        var _a;
        return ({
            outcome: (_a = el.attr('src').split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0],
            score: el.attr('title')
        });
    };
    var team1Outcomes = $('.round-history-team-row')
        .first()
        .find('.round-history-outcome')
        .toArray()
        .map(getOutcome);
    var team2Outcomes = $('.round-history-team-row')
        .last()
        .find('.round-history-outcome')
        .toArray()
        .map(getOutcome);
    var doesTeam1StartAsCt = team1Outcomes[0].outcome.includes('ct');
    var separatorIndex = $('.round-history-team-row .round-history-bar').last().index() - 2;
    return Array.from(Array(team1Outcomes.length))
        .map(function (_, i) {
        if (team1Outcomes[i].outcome === 'emptyHistory' &&
            team2Outcomes[i].outcome === 'emptyHistory') {
            return null;
        }
        var outcome = team1Outcomes[i].outcome === 'emptyHistory'
            ? team2Outcomes[i].outcome
            : team1Outcomes[i].outcome;
        var score = team1Outcomes[i].outcome === 'emptyHistory'
            ? team2Outcomes[i].score
            : team1Outcomes[i].score;
        var tTeam;
        var ctTeam;
        if (i < separatorIndex) {
            if (doesTeam1StartAsCt) {
                tTeam = team2.id;
                ctTeam = team1.id;
            }
            else {
                tTeam = team1.id;
                ctTeam = team2.id;
            }
        }
        else {
            if (doesTeam1StartAsCt) {
                tTeam = team1.id;
                ctTeam = team2.id;
            }
            else {
                tTeam = team2.id;
                ctTeam = team1.id;
            }
        }
        return {
            outcome: outcome,
            score: score,
            tTeam: tTeam,
            ctTeam: ctTeam
        };
    })
        .filter(utils_1.notNull);
}
function getStatsOverview($) {
    var teamStats = $('.match-info-row')
        .toArray()
        .slice(1)
        .reduce(function (res, el, i) {
        var prop = getOverviewPropertyFromLabel(el.find('.bold').text());
        if (!prop) {
            return res;
        }
        var _a = el.find('.right').text().split(' : ').map(Number), team1 = _a[0], team2 = _a[1];
        res[prop] = { team1: team1, team2: team2 };
        return res;
    }, {});
    var mostX = $('.most-x-box')
        .toArray()
        .reduce(function (res, el, i) {
        var prop = getOverviewPropertyFromLabel(el.find('.most-x-title').text());
        if (!prop) {
            return res;
        }
        var playerHref = el.find('.name > a').attr('href');
        res[prop] = {
            id: playerHref ? (0, utils_1.getIdAt)(3, playerHref) : undefined,
            name: $('.most-x-box').eq(i).find('.name > a').text(),
            value: $('.most-x-box').eq(i).find('.valueName').numFromText()
        };
        return res;
    }, {});
    return __assign(__assign({}, teamStats), mostX);
}
exports.getStatsOverview = getStatsOverview;
function getPlayerStats(m$, p$) {
    var playerPerformanceStats = p$('.highlighted-player')
        .toArray()
        .reduce(function (map, el) {
        var graphData = el.find('.graph.small').attr('data-fusionchart-config');
        var _a = {
            playerId: Number(el.find('.headline span a').attr('href').split('/')[2]),
            killsPerRound: Number(graphData.split('Kills per round: ')[1].split('"')[0]),
            deathsPerRound: Number(graphData.split('Deaths / round: ')[1].split('"')[0]),
            impact: Number(graphData.split('Impact rating: ')[1].split('"')[0])
        }, playerId = _a.playerId, data = __rest(_a, ["playerId"]);
        map[playerId] = data;
        return map;
    }, {});
    var getPlayerOverviewStats = function (el) {
        var id = el.find('.st-player a').attrThen('href', (0, utils_1.getIdAt)(3));
        var performanceStats = playerPerformanceStats[id];
        var rating = el.find('.st-rating').numFromText();
        return __assign(__assign({ player: {
                id: id,
                name: el.find('.st-player a').text()
            }, kills: el.find('.st-kills').contents().first().numFromText(), hsKills: Number(el.find('.st-kills .gtSmartphone-only').text().replace(/\(|\)/g, '')), assists: el.find('.st-assists').contents().first().numFromText(), flashAssists: Number(el.find('.st-assists .gtSmartphone-only').text().replace(/\(|\)/g, '')), deaths: el.find('.st-deaths').numFromText(), KAST: el
                .find('.st-kdratio')
                .textThen(function (x) { return (0, utils_1.parseNumber)(x.replace('%', '')); }), killDeathsDifference: el.find('.st-kddiff').numFromText(), ADR: el.find('.st-adr').numFromText(), firstKillsDifference: el.find('.st-fkdiff').numFromText() }, (el.find('.st-rating .ratingDesc').text() === '2.0'
            ? { rating2: rating }
            : { rating1: rating })), performanceStats);
    };
    return {
        team1: m$('.stats-table.totalstats')
            .first()
            .find('tbody tr')
            .toArray()
            .map(getPlayerOverviewStats),
        team2: m$('.stats-table.totalstats')
            .last()
            .find('tbody tr')
            .toArray()
            .map(getPlayerOverviewStats)
    };
}
exports.getPlayerStats = getPlayerStats;
function getPerformanceOverview(p$) {
    return p$('.overview-table tr')
        .toArray()
        .slice(1)
        .reduce(function (res, el) {
        var property = el
            .find('.name-column')
            .text()
            .toLowerCase();
        res.team1[property] = el.find('.team1-column').numFromText();
        res.team2[property] = el.find('.team2-column').numFromText();
        return res;
    }, { team1: {}, team2: {} });
}
exports.getPerformanceOverview = getPerformanceOverview;
