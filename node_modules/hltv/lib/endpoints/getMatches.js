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
exports.getMatches = exports.MatchFilter = exports.MatchEventType = void 0;
var querystring_1 = require("querystring");
var scraper_1 = require("../scraper");
var utils_1 = require("../utils");
var MatchEventType;
(function (MatchEventType) {
    MatchEventType["All"] = "All";
    MatchEventType["LAN"] = "Lan";
    MatchEventType["Online"] = "Online";
})(MatchEventType || (exports.MatchEventType = MatchEventType = {}));
var MatchFilter;
(function (MatchFilter) {
    MatchFilter["LanOnly"] = "lan_only";
    MatchFilter["TopTier"] = "top_tier";
})(MatchFilter || (exports.MatchFilter = MatchFilter = {}));
var getMatches = function (config) {
    return function (_a) {
        var _b = _a === void 0 ? {} : _a, eventIds = _b.eventIds, eventType = _b.eventType, filter = _b.filter, teamIds = _b.teamIds;
        return __awaiter(void 0, void 0, void 0, function () {
            var query, $, _c, events;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        query = (0, querystring_1.stringify)(__assign(__assign(__assign(__assign({}, (eventIds ? { event: eventIds } : {})), (eventType ? { eventType: eventType } : {})), (filter ? { predefinedFilter: filter } : {})), (teamIds ? { team: teamIds } : {})));
                        _c = scraper_1.HLTVScraper;
                        return [4 /*yield*/, (0, utils_1.fetchPage)("https://www.hltv.org/matches?".concat(query), config.loadPage)];
                    case 1:
                        $ = _c.apply(void 0, [_d.sent()]);
                        events = $('.event-filter-popup a')
                            .toArray()
                            .map(function (el) { return ({
                            id: el.attrThen('href', function (x) { return Number(x.split('=').pop()); }),
                            name: el.find('.event-name').text()
                        }); })
                            .concat($('.events-container a')
                            .toArray()
                            .map(function (el) { return ({
                            id: el.attrThen('href', function (x) { return Number(x.split('=').pop()); }),
                            name: el.find('.featured-event-tooltip-content').text()
                        }); }));
                        return [2 /*return*/, $('.liveMatch-container')
                                .toArray()
                                .concat($('.upcomingMatch').toArray())
                                .map(function (el) {
                                var id = el.find('.a-reset').attrThen('href', (0, utils_1.getIdAt)(2));
                                var stars = 5 - el.find('.matchRating i.faded').length;
                                var live = el.find('.matchTime.matchLive').text() === 'LIVE';
                                var title = el.find('.matchInfoEmpty').text() || undefined;
                                var date = el.find('.matchTime').numFromAttr('data-unix');
                                var team1;
                                var team2;
                                if (!title) {
                                    team1 = {
                                        name: el.find('.matchTeamName').first().text() ||
                                            el.find('.team1 .team').text(),
                                        id: el.numFromAttr('team1')
                                    };
                                    team2 = {
                                        name: el.find('.matchTeamName').eq(1).text() ||
                                            el.find('.team2 .team').text(),
                                        id: el.numFromAttr('team2')
                                    };
                                }
                                var format = el.find('.matchMeta').text();
                                var eventName = el.find('.matchEventLogo').attr('title');
                                var event = events.find(function (x) { return x.name === eventName; });
                                return { id: id, date: date, stars: stars, title: title, team1: team1, team2: team2, format: format, event: event, live: live };
                            })];
                }
            });
        });
    };
};
exports.getMatches = getMatches;
