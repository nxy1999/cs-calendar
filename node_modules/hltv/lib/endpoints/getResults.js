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
exports.getResults = exports.GameType = exports.ContentFilter = exports.ResultsMatchType = void 0;
var querystring_1 = require("querystring");
var scraper_1 = require("../scraper");
var GameMap_1 = require("../shared/GameMap");
var utils_1 = require("../utils");
var ResultsMatchType;
(function (ResultsMatchType) {
    ResultsMatchType["LAN"] = "Lan";
    ResultsMatchType["Online"] = "Online";
})(ResultsMatchType || (exports.ResultsMatchType = ResultsMatchType = {}));
var ContentFilter;
(function (ContentFilter) {
    ContentFilter["HasHighlights"] = "highlights";
    ContentFilter["HasDemo"] = "demo";
    ContentFilter["HadVOD"] = "vod";
    ContentFilter["HasStats"] = "stats";
})(ContentFilter || (exports.ContentFilter = ContentFilter = {}));
var GameType;
(function (GameType) {
    GameType["CSGO"] = "CSGO";
    GameType["CS16"] = "CS16";
})(GameType || (exports.GameType = GameType = {}));
var getResults = function (config) {
    return function (options) { return __awaiter(void 0, void 0, void 0, function () {
        var query, page, $, results, _loop_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    query = (0, querystring_1.stringify)(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (options.startDate ? { startDate: options.startDate } : {})), (options.endDate ? { endDate: options.endDate } : {})), (options.matchType ? { matchType: options.matchType } : {})), (options.maps ? { map: options.maps.map(GameMap_1.toMapFilter) } : {})), (options.bestOfX ? { bestOfX: options.bestOfX } : {})), (options.countries ? { country: options.countries } : {})), (options.contentFilters ? { content: options.contentFilters } : {})), (options.eventIds ? { event: options.eventIds } : {})), (options.playerIds ? { player: options.playerIds } : {})), (options.teamIds ? { team: options.teamIds } : {})), (options.game ? { gameType: options.game } : {})), (options.stars ? { stars: options.stars } : {})));
                    page = 0;
                    results = [];
                    _loop_1 = function () {
                        var _c, featuredResults;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, (0, utils_1.sleep)((_a = options.delayBetweenPageRequests) !== null && _a !== void 0 ? _a : 0)];
                                case 1:
                                    _d.sent();
                                    _c = scraper_1.HLTVScraper;
                                    return [4 /*yield*/, (0, utils_1.fetchPage)("https://www.hltv.org/results?".concat(query, "&offset=").concat(page * 100), config.loadPage)];
                                case 2:
                                    $ = _c.apply(void 0, [_d.sent()]);
                                    page++;
                                    featuredResults = $('.big-results .result-con')
                                        .toArray()
                                        .map(function (el) { return el.children().first().attrThen('href', (0, utils_1.getIdAt)(2)); });
                                    results.push.apply(results, $('.result-con')
                                        .toArray()
                                        .map(function (el) {
                                        var id = el.children().first().attrThen('href', (0, utils_1.getIdAt)(2));
                                        if (featuredResults.includes(id)) {
                                            featuredResults = featuredResults.filter(function (x) { return x !== id; });
                                            return null;
                                        }
                                        var stars = el.find('.stars i').length;
                                        var date = el.numFromAttr('data-zonedgrouping-entry-unix');
                                        var format = el.find('.map-text').text();
                                        var team1 = {
                                            name: el.find('div.team').first().text(),
                                            logo: el.find('img.team-logo').first().attr('src')
                                        };
                                        var team2 = {
                                            name: el.find('div.team').last().text(),
                                            logo: el.find('img.team-logo').last().attr('src')
                                        };
                                        var _a = el
                                            .find('.result-score')
                                            .text()
                                            .split(' - ')
                                            .map(Number), team1Result = _a[0], team2Result = _a[1];
                                        return __assign({ id: id, stars: stars, date: date, team1: team1, team2: team2, result: { team1: team1Result, team2: team2Result } }, (format.includes('bo')
                                            ? { format: format }
                                            : { map: (0, GameMap_1.fromMapSlug)(format), format: 'bo1' }));
                                    })
                                        .filter(utils_1.notNull));
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _b.label = 1;
                case 1: return [5 /*yield**/, _loop_1()];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    if ($('.result-con').exists()) return [3 /*break*/, 1];
                    _b.label = 4;
                case 4: return [2 /*return*/, results];
            }
        });
    }); };
};
exports.getResults = getResults;
