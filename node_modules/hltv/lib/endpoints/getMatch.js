"use strict";
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
exports.getMatch = exports.MatchStatus = void 0;
var scraper_1 = require("../scraper");
var GameMap_1 = require("../shared/GameMap");
var utils_1 = require("../utils");
var MatchFormat_1 = require("../shared/MatchFormat");
var MatchStatus;
(function (MatchStatus) {
    MatchStatus["Live"] = "Live";
    MatchStatus["Postponed"] = "Postponed";
    MatchStatus["Over"] = "Over";
    MatchStatus["Scheduled"] = "Scheduled";
    MatchStatus["Deleted"] = "Deleted";
})(MatchStatus || (exports.MatchStatus = MatchStatus = {}));
var getMatch = function (config) {
    return function (_a) {
        var id = _a.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var $, _b, title, date, format, significance, status, hasScorebot, statsId, team1, team2, vetoes, event, odds, oddsCommunity, maps, players, streams, demos, highlightedPlayers, headToHead, highlights, playerOfTheMatch, winnerTeam;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = scraper_1.HLTVScraper;
                        return [4 /*yield*/, (0, utils_1.fetchPage)("https://www.hltv.org/matches/".concat(id, "/").concat((0, utils_1.generateRandomSuffix)()), config.loadPage)];
                    case 1:
                        $ = _b.apply(void 0, [_c.sent()]);
                        title = $('.timeAndEvent .text').trimText();
                        date = $('.timeAndEvent .date').numFromAttr('data-unix');
                        format = getFormat($);
                        significance = getMatchSignificance($);
                        status = getMatchStatus($);
                        hasScorebot = $('#scoreboardElement').exists();
                        statsId = getStatsId($);
                        team1 = getTeam($, 1);
                        team2 = getTeam($, 2);
                        vetoes = getVetoes($, team1, team2);
                        event = getEvent($);
                        odds = getOdds($);
                        oddsCommunity = getCommunityOdds($);
                        maps = getMaps($);
                        players = getPlayers($);
                        streams = getStreams($);
                        demos = getDemos($);
                        highlightedPlayers = getHighlightedPlayers($);
                        headToHead = getHeadToHead($);
                        highlights = getHighlights($, team1, team2);
                        playerOfTheMatch = getPlayerOfTheMatch($, players);
                        winnerTeam = getWinnerTeam($, team1, team2);
                        return [2 /*return*/, {
                                id: id,
                                statsId: statsId,
                                significance: significance,
                                team1: team1,
                                team2: team2,
                                winnerTeam: winnerTeam,
                                date: date,
                                format: format,
                                event: event,
                                maps: maps,
                                players: players,
                                streams: streams,
                                status: status,
                                title: title,
                                hasScorebot: hasScorebot,
                                highlightedPlayers: highlightedPlayers,
                                playerOfTheMatch: playerOfTheMatch,
                                headToHead: headToHead,
                                vetoes: vetoes,
                                highlights: highlights,
                                demos: demos,
                                odds: odds.concat(oddsCommunity ? [oddsCommunity] : [])
                            }];
                }
            });
        });
    };
};
exports.getMatch = getMatch;
function getMatchStatus($) {
    var status = MatchStatus.Scheduled;
    switch ($('.countdown').trimText()) {
        case 'LIVE':
            status = MatchStatus.Live;
            break;
        case 'Match postponed':
            status = MatchStatus.Postponed;
            break;
        case 'Match deleted':
            status = MatchStatus.Deleted;
            break;
        case 'Match over':
            status = MatchStatus.Over;
            break;
    }
    return status;
}
function getTeam($, n) {
    return $(".team".concat(n, "-gradient")).exists()
        ? {
            name: $(".team".concat(n, "-gradient .teamName")).text(),
            id: $(".team".concat(n, "-gradient a")).attrThen('href', function (href) {
                return href ? (0, utils_1.getIdAt)(2, href) : undefined;
            }),
            rank: $('.teamRanking a')
                .eq(n - 1)
                .contents()
                .eq(1)
                .textThen(function (x) { return (0, utils_1.parseNumber)(x.replace(/#/g, '')); })
        }
        : undefined;
}
function getVetoes($, team1, team2) {
    var getVeto = function (text) {
        var _a = text.replace(/^\d. /, '').split(/removed|picked/), teamName = _a[0], map = _a[1];
        if (!map || !teamName) {
            return {
                map: (0, GameMap_1.fromMapName)(text.split(' ')[1]),
                type: 'leftover'
            };
        }
        return {
            team: [team1, team2].find(function (t) { return t.name === teamName.trim(); }),
            map: (0, GameMap_1.fromMapName)(map.trim()),
            type: text.includes('picked') ? 'picked' : 'removed'
        };
    };
    if (!team1 || !team2) {
        return [];
    }
    // New format
    if ($('.veto-box').length > 1) {
        return $('.veto-box')
            .last()
            .find('.padding div')
            .toArray()
            .map(function (el) { return getVeto(el.text()); });
    }
    //Old format
    if ($('.veto-box').first().exists()) {
        var lines = $('.veto-box').first().lines();
        var vetoIndex = lines.findIndex(function (x) { return x.includes('Veto process'); });
        if (vetoIndex !== -1) {
            return lines.slice(vetoIndex + 2, lines.length - 1).map(getVeto);
        }
    }
    return [];
}
function getEvent($) {
    return {
        name: $('.timeAndEvent .event a').text(),
        id: $('.timeAndEvent .event a').attrThen('href', (0, utils_1.getIdAt)(2))
    };
}
function getOdds($) {
    return $('tr.provider:not(.hidden)')
        .toArray()
        .filter(function (el) { return el.find('.noOdds').length === 0; })
        .map(function (oddElement) {
        var convertOdds = oddElement.find('.odds-cell').first().text().indexOf('%') >= 0;
        var oddTeam1 = Number(oddElement.find('.odds-cell').first().find('a').text().replace('%', ''));
        var oddTeam2 = Number(oddElement.find('.odds-cell').last().find('a').text().replace('%', ''));
        return {
            provider: oddElement
                .find('td')
                .first()
                .find('a img')
                .first()
                .attr('title'),
            team1: convertOdds ? (0, utils_1.percentageToDecimalOdd)(oddTeam1) : oddTeam1,
            team2: convertOdds ? (0, utils_1.percentageToDecimalOdd)(oddTeam2) : oddTeam2
        };
    });
}
function getCommunityOdds($) {
    if ($('.pick-a-winner').exists()) {
        return {
            provider: 'community',
            team1: (0, utils_1.percentageToDecimalOdd)(Number($('.pick-a-winner-team.team1 > .percentage')
                .first()
                .text()
                .replace('%', ''))),
            team2: (0, utils_1.percentageToDecimalOdd)(Number($('.pick-a-winner-team.team2 > .percentage')
                .first()
                .text()
                .replace('%', '')))
        };
    }
}
function getMaps($) {
    return $('.mapholder')
        .toArray()
        .map(function (mapEl) {
        var team1TotalRounds = Number(mapEl.find('.results-left .results-team-score').trimText());
        var team2TotalRounds = Number(mapEl.find('.results-right .results-team-score').trimText());
        var statsId = mapEl.find('.results-stats').exists()
            ? mapEl
                .find('.results-stats')
                .attrThen('href', function (x) { return Number(x.split('/')[4]); })
            : undefined;
        var result;
        if (!isNaN(team1TotalRounds) && !isNaN(team2TotalRounds)) {
            var halfsString = mapEl.find('.results-center-half-score').trimText();
            var halfs = [
                { team1Rounds: 0, team2Rounds: 0 },
                { team1Rounds: 0, team2Rounds: 0 }
            ];
            if (halfsString) {
                halfs = halfsString
                    .split(' ')
                    .map(function (x) { return x.replace(/\(|\)|;/g, ''); })
                    .map(function (half) { return ({
                    team1Rounds: Number(half.split(':')[0]),
                    team2Rounds: Number(half.split(':')[1])
                }); });
            }
            result = {
                team1TotalRounds: team1TotalRounds,
                team2TotalRounds: team2TotalRounds,
                halfResults: halfs
            };
        }
        return {
            name: (0, GameMap_1.fromMapName)(mapEl.find('.mapname').text()),
            result: result,
            statsId: statsId
        };
    });
}
function getPlayers($) {
    var getMatchPlayer = function (playerEl) {
        return {
            name: playerEl.find('.text-ellipsis').text(),
            id: playerEl.data('player-id')
        };
    };
    return {
        team1: $('div.players')
            .first()
            .find('tr')
            .last()
            .find('.flagAlign')
            .toArray()
            .map(getMatchPlayer),
        team2: $('div.players')
            .eq(1)
            .find('tr')
            .last()
            .find('.flagAlign')
            .toArray()
            .map(getMatchPlayer)
    };
}
function getStreams($) {
    return $('.stream-box')
        .toArray()
        .filter(function (el) { return el.find('.stream-flag').exists(); })
        .map(function (streamEl) {
        var _a;
        return ({
            name: streamEl.find('.stream-box-embed').text() || 'VOD',
            link: streamEl.data('stream-embed') ||
                streamEl.find('.stream-box-embed').attr('data-stream-embed'),
            viewers: (_a = streamEl.find('.viewers.gtSmartphone-only').numFromText()) !== null && _a !== void 0 ? _a : -1
        });
    })
        .concat($('.stream-box.hltv-live').exists()
        ? [
            {
                name: 'HLTV Live',
                link: $('.stream-box.hltv-live a').attr('href'),
                viewers: -1
            }
        ]
        : [])
        .concat($('[data-demo-link-button]').exists()
        ? [
            {
                name: 'GOTV',
                link: "https://www.hltv.org".concat($('[data-demo-link-button]').data('demo-link')),
                viewers: -1
            }
        ]
        : []);
}
function getDemos($) {
    return $('[class="stream-box"]:not(:has(.stream-box-embed))')
        .toArray()
        .map(function (demoEl) {
        if (demoEl.attr('data-demo-link')) {
            return { name: 'GOTV Demo', link: demoEl.attr('data-demo-link') };
        }
        return {
            name: demoEl.text(),
            link: demoEl.attr('data-stream-embed')
        };
    })
        .filter(function (x) { return !!x.link; });
}
function getHighlightedPlayers($) {
    var highlightedPlayer1 = $('.lineups-compare-left .lineups-compare-player-links a').first();
    var highlightedPlayer2 = $('.lineups-compare-right .lineups-compare-player-links a').first();
    return highlightedPlayer1.exists() && highlightedPlayer2.exists()
        ? {
            team1: {
                name: $('.lineups-compare-left .lineups-compare-playername').text(),
                id: $('.lineups-compare-left .lineups-compare-player-links a')
                    .first()
                    .attrThen('href', (0, utils_1.getIdAt)(2))
            },
            team2: {
                name: $('.lineups-compare-right .lineups-compare-playername').text(),
                id: $('.lineups-compare-right .lineups-compare-player-links a')
                    .first()
                    .attrThen('href', (0, utils_1.getIdAt)(2))
            }
        }
        : undefined;
}
function getHeadToHead($) {
    return $('.head-to-head-listing tr')
        .toArray()
        .map(function (matchEl) {
        var date = Number(matchEl.find('.date a span').attr('data-unix'));
        var map = matchEl.find('.dynamic-map-name-short').text();
        var isDraw = !matchEl.find('.winner').exists();
        var winner;
        if (!isDraw) {
            winner = {
                name: matchEl.find('.winner .flag').next().text(),
                id: matchEl.find('.winner .flag').next().attrThen('href', (0, utils_1.getIdAt)(2))
            };
        }
        var event = {
            name: matchEl.find('.event a').text(),
            id: matchEl.find('.event a').attrThen('href', (0, utils_1.getIdAt)(2))
        };
        var result = matchEl.find('.result').text();
        return { date: date, map: map, winner: winner, event: event, result: result };
    });
}
function getHighlights($, team1, team2) {
    return team1 && team2
        ? $('.highlight')
            .toArray()
            .map(function (highlightEl) { return ({
            link: highlightEl.attr('data-highlight-embed'),
            title: highlightEl.text()
        }); })
        : [];
}
function getStatsId($) {
    var statsEl = $('.stats-detailed-stats a');
    if (statsEl.exists() && !statsEl.attr('href').includes('mapstats')) {
        return (0, utils_1.getIdAt)(3, $('.stats-detailed-stats a').attr('href'));
    }
}
function getPlayerOfTheMatch($, players) {
    var playerName = $('.highlighted-player .player-nick').text();
    if (playerName) {
        return (players.team1.find(function (x) { return x.name === playerName; }) ||
            players.team2.find(function (x) { return x.name === playerName; }));
    }
}
function getWinnerTeam($, team1, team2) {
    if ($('.team1-gradient .won').exists()) {
        return team1;
    }
    if ($('.team2-gradient .won').exists()) {
        return team2;
    }
}
function getFormat($) {
    if (!$('.preformatted-text').exists()) {
        return;
    }
    var _a = $('.preformatted-text')
        .lines()[0]
        .split(' (')
        .map(function (x) { return x.trim(); }), format = _a[0], location = _a[1];
    return {
        type: (0, MatchFormat_1.fromFullMatchFormat)(format),
        location: location === null || location === void 0 ? void 0 : location.substring(0, location.length - 1)
    };
}
function getMatchSignificance($) {
    var _a;
    var additionalInfo = $('.preformatted-text').lines();
    return (_a = additionalInfo
        .find(function (x) { return x.startsWith('*'); })) === null || _a === void 0 ? void 0 : _a.slice(1).trim();
}
