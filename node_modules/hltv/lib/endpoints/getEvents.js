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
exports.getEvents = void 0;
var querystring_1 = require("querystring");
var scraper_1 = require("../scraper");
var utils_1 = require("../utils");
var getEvents = function (config) {
    return function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var query, $, _a, featuredOngoingEvents, ongoingEvents, bigUpcomingEvents, smallUpcomingEvents;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = (0, querystring_1.stringify)(__assign(__assign(__assign(__assign(__assign({}, (options.eventType ? { eventType: options.eventType } : {})), (options.prizePoolMin ? { prizeMin: options.prizePoolMin } : {})), (options.prizePoolMax ? { prizeMax: options.prizePoolMax } : {})), (options.attendingTeamIds ? { team: options.attendingTeamIds } : {})), (options.attendingPlayerIds
                            ? { player: options.attendingPlayerIds }
                            : {})));
                        _a = scraper_1.HLTVScraper;
                        return [4 /*yield*/, (0, utils_1.fetchPage)("https://www.hltv.org/events?".concat(query), config.loadPage)];
                    case 1:
                        $ = _a.apply(void 0, [_b.sent()]);
                        featuredOngoingEvents = $('.tab-content[id="FEATURED"] a.ongoing-event')
                            .toArray()
                            .map(function (el) { return el.attrThen('href', (0, utils_1.getIdAt)(2)); });
                        ongoingEvents = $('.tab-content[id="ALL"] a.ongoing-event')
                            .toArray()
                            .map(function (el) {
                            var id = el.attrThen('href', (0, utils_1.getIdAt)(2));
                            var name = el.find('.event-name-small .text-ellipsis').text();
                            var dateStart = el
                                .find('tr.eventDetails span[data-unix]')
                                .first()
                                .numFromAttr('data-unix');
                            var dateEnd = el
                                .find('tr.eventDetails span[data-unix]')
                                .last()
                                .numFromAttr('data-unix');
                            var featured = featuredOngoingEvents.includes(id);
                            return { id: id, name: name, dateStart: dateStart, dateEnd: dateEnd, featured: featured };
                        });
                        bigUpcomingEvents = $('a.big-event')
                            .toArray()
                            .map(function (el) {
                            var id = el.attrThen('href', (0, utils_1.getIdAt)(2));
                            var name = el.find('.big-event-name').text();
                            var dateStart = el
                                .find('.additional-info .col-date span[data-unix]')
                                .first()
                                .numFromAttr('data-unix');
                            var dateEnd = el
                                .find('.additional-info .col-date span[data-unix]')
                                .last()
                                .numFromAttr('data-unix');
                            var locationName = el.find('.big-event-location').text();
                            var location = locationName !== 'TBA'
                                ? {
                                    name: locationName,
                                    code: el
                                        .find('.location-top-teams img.flag')
                                        .attr('src')
                                        .split('/')
                                        .pop()
                                        .split('.')[0]
                                }
                                : undefined;
                            var prizePool = el
                                .find('.additional-info tr')
                                .first()
                                .find('td')
                                .eq(1)
                                .text();
                            var numberOfTeams = (0, utils_1.parseNumber)(el.find('.additional-info tr').first().find('td').eq(2).text());
                            return {
                                id: id,
                                name: name,
                                dateStart: dateStart,
                                dateEnd: dateEnd,
                                location: location,
                                prizePool: prizePool,
                                numberOfTeams: numberOfTeams,
                                featured: true
                            };
                        });
                        smallUpcomingEvents = $('a.small-event')
                            .toArray()
                            .map(function (el) {
                            var id = el.attrThen('href', (0, utils_1.getIdAt)(2));
                            var name = el
                                .find('.table tr')
                                .first()
                                .find('td')
                                .first()
                                .find('.text-ellipsis')
                                .text();
                            var dateStart = el
                                .find('td span[data-unix]')
                                .first()
                                .numFromAttr('data-unix');
                            var dateEnd = el
                                .find('td span[data-unix]')
                                .last()
                                .numFromAttr('data-unix');
                            var location = {
                                name: el.find('.smallCountry .col-desc').text().replace(' | ', ''),
                                code: el
                                    .find('.smallCountry img.flag')
                                    .attr('src')
                                    .split('/')
                                    .pop()
                                    .split('.')[0]
                            };
                            var prizePool = el.find('.prizePoolEllipsis').text();
                            var numberOfTeams = (0, utils_1.parseNumber)(el.find('.prizePoolEllipsis').prev().text());
                            return {
                                id: id,
                                name: name,
                                dateStart: dateStart,
                                dateEnd: dateEnd,
                                location: location,
                                prizePool: prizePool,
                                numberOfTeams: numberOfTeams,
                                featured: false
                            };
                        });
                        return [2 /*return*/, ongoingEvents.concat(bigUpcomingEvents).concat(smallUpcomingEvents)];
                }
            });
        });
    };
};
exports.getEvents = getEvents;
