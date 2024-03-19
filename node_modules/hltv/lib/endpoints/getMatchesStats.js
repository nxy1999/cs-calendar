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
exports.getMatchesStats = void 0;
var querystring_1 = require("querystring");
var scraper_1 = require("../scraper");
var GameMap_1 = require("../shared/GameMap");
var utils_1 = require("../utils");
var getMatchesStats = function (config) {
    return function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var query, page, $, matches, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = (0, querystring_1.stringify)(__assign(__assign(__assign(__assign(__assign({}, (options.startDate ? { startDate: options.startDate } : {})), (options.endDate ? { endDate: options.endDate } : {})), (options.matchType ? { matchType: options.matchType } : {})), (options.maps ? { maps: options.maps.map(GameMap_1.toMapFilter) } : {})), (options.rankingFilter ? { rankingFilter: options.rankingFilter } : {})));
                        page = 0;
                        matches = [];
                        _c.label = 1;
                    case 1: return [4 /*yield*/, (0, utils_1.sleep)((_b = options.delayBetweenPageRequests) !== null && _b !== void 0 ? _b : 0)];
                    case 2:
                        _c.sent();
                        _a = scraper_1.HLTVScraper;
                        return [4 /*yield*/, (0, utils_1.fetchPage)("https://www.hltv.org/stats/matches?".concat(query, "&offset=").concat(page * 50), config.loadPage)];
                    case 3:
                        $ = _a.apply(void 0, [_c.sent()]);
                        page++;
                        matches.push.apply(matches, $('.matches-table tbody tr')
                            .toArray()
                            .map(function (el) {
                            var mapStatsId = el
                                .find('.date-col a')
                                .attrThen('href', (0, utils_1.getIdAt)(4));
                            var date = el.find('.time').numFromAttr('data-unix');
                            var map = (0, GameMap_1.fromMapSlug)(el.find('.dynamic-map-name-short').text());
                            var team1 = {
                                id: el.find('.team-col a').first().attrThen('href', (0, utils_1.getIdAt)(3)),
                                name: el.find('.team-col a').first().text()
                            };
                            var team2 = {
                                id: el.find('.team-col a').last().attrThen('href', (0, utils_1.getIdAt)(3)),
                                name: el.find('.team-col a').last().text()
                            };
                            var event = {
                                id: Number(el
                                    .find('.event-col a')
                                    .attr('href')
                                    .split('event=')[1]
                                    .split('&')[0]),
                                name: el.find('.event-col a').text()
                            };
                            var result = {
                                team1: Number(el
                                    .find('.team-col .score')
                                    .first()
                                    .trimText()
                                    .replace(/\(|\)/g, '')),
                                team2: Number(el
                                    .find('.team-col .score')
                                    .last()
                                    .trimText()
                                    .replace(/\(|\)/g, ''))
                            };
                            return { mapStatsId: mapStatsId, date: date, map: map, team1: team1, team2: team2, event: event, result: result };
                        }));
                        _c.label = 4;
                    case 4:
                        if ($('.matches-table tbody tr').exists()) return [3 /*break*/, 1];
                        _c.label = 5;
                    case 5: return [2 /*return*/, matches];
                }
            });
        });
    };
};
exports.getMatchesStats = getMatchesStats;
