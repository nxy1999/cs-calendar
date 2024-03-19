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
exports.getEvent = void 0;
var scraper_1 = require("../scraper");
var utils_1 = require("../utils");
var GameMap_1 = require("../shared/GameMap");
var getEvent = function (config) {
    return function (_a) {
        var id = _a.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var $, _b, name, logo, prizePool, dateStart, dateEnd, location, relatedEvents, prizeDistribution, numberOfTeams, teams, formats, mapPool, highlights, news;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = scraper_1.HLTVScraper;
                        return [4 /*yield*/, (0, utils_1.fetchPage)("https://www.hltv.org/events/".concat(id, "/").concat((0, utils_1.generateRandomSuffix)()), config.loadPage)];
                    case 1:
                        $ = _b.apply(void 0, [_c.sent()]);
                        name = $('.event-hub-title').text();
                        logo = $('.sidebar-first-level').find('.event-logo').attr('src');
                        prizePool = $('td.prizepool').text();
                        dateStart = $('td.eventdate span[data-unix]')
                            .first()
                            .numFromAttr('data-unix');
                        dateEnd = $('td.eventdate span[data-unix]')
                            .last()
                            .numFromAttr('data-unix');
                        location = {
                            name: $('.location span.text-ellipsis').text(),
                            code: $('img.flag').attr('src').split('/').pop().split('.')[0]
                        };
                        relatedEvents = $('.related-event')
                            .toArray()
                            .map(function (el) { return ({
                            name: el.find('.event-name').text(),
                            id: el.find('a').attrThen('href', (0, utils_1.getIdAt)(2))
                        }); });
                        prizeDistribution = $('.placements .placement')
                            .toArray()
                            .map(function (el) {
                            var otherPrize = el.find('.spot-prize').text() ||
                                el.find('.prize').first().next().text() ||
                                undefined;
                            var qualifiesFor = !!otherPrize
                                ? relatedEvents.find(function (event) { return event.name === otherPrize; })
                                : undefined;
                            return {
                                place: el.children().eq(1).text(),
                                prize: el.find('.prize').first().text() || undefined,
                                qualifiesFor: qualifiesFor,
                                otherPrize: !qualifiesFor ? otherPrize : undefined,
                                team: el.find('.team').children().exists()
                                    ? {
                                        name: el.find('.team a').text(),
                                        id: el.find('.team a').attrThen('href', (0, utils_1.getIdAt)(2))
                                    }
                                    : undefined
                            };
                        });
                        numberOfTeams = $('td.teamsNumber').numFromText();
                        teams = $('.team-box')
                            .toArray()
                            .map(function (el) {
                            if (!el.find('.team-name a').exists()) {
                                return null;
                            }
                            return {
                                name: el.find('.logo').attr('title'),
                                id: el.find('.team-name a').attrThen('href', (0, utils_1.getIdAt)(2)),
                                reasonForParticipation: el.find('.sub-text').trimText(),
                                rankDuringEvent: (0, utils_1.parseNumber)(el.find('.event-world-rank').text().replace('#', ''))
                            };
                        })
                            .filter(utils_1.notNull);
                        formats = $('.formats tr')
                            .toArray()
                            .map(function (el) { return ({
                            type: el.find('.format-header').text(),
                            description: el.find('.format-data').text().split('\n').join(' ').trim()
                        }); });
                        mapPool = $('.map-pool-map-holder')
                            .toArray()
                            .map(function (el) { return (0, GameMap_1.fromMapName)(el.find('.map-pool-map-name').text()); });
                        highlights = $('.highlight-video')
                            .toArray()
                            .map(function (el) {
                            var _a, _b;
                            var name = el.find('.video-discription-text').text();
                            var link = el.data('mp4-url');
                            var thumbnailBase = el.data('thumbnail').split('-preview-')[0];
                            var thumbnail = "".concat(thumbnailBase, "-preview.jpg");
                            var team1Name = el
                                .find('.video-team')
                                .first()
                                .find('.video-team-img')
                                .first()
                                .attr('title');
                            var team1 = teams.find(function (x) { return x.name === team1Name; });
                            var team2Name = el
                                .find('.video-team')
                                .last()
                                .find('.video-team-img')
                                .first()
                                .attr('title');
                            var team2 = teams.find(function (x) { return x.name === team2Name; });
                            var views = Number(el.find('.thumbnail-view-count').text().split(' ')[0]);
                            return {
                                name: name,
                                link: link,
                                thumbnail: thumbnail,
                                team1: { id: team1 === null || team1 === void 0 ? void 0 : team1.id, name: (_a = team1 === null || team1 === void 0 ? void 0 : team1.name) !== null && _a !== void 0 ? _a : team1Name },
                                team2: { id: team2 === null || team2 === void 0 ? void 0 : team2.id, name: (_b = team2 === null || team2 === void 0 ? void 0 : team2.name) !== null && _b !== void 0 ? _b : team2Name },
                                views: views
                            };
                        });
                        news = $('.news .item')
                            .toArray()
                            .map(function (el) { return ({
                            name: el.find('.flag-align .text-ellipsis').text(),
                            link: el.find('a').attr('href')
                        }); });
                        return [2 /*return*/, {
                                id: id,
                                name: name,
                                logo: logo,
                                dateStart: dateStart,
                                dateEnd: dateEnd,
                                prizePool: prizePool,
                                location: location,
                                numberOfTeams: numberOfTeams,
                                teams: teams,
                                prizeDistribution: prizeDistribution,
                                relatedEvents: relatedEvents,
                                formats: formats,
                                mapPool: mapPool,
                                highlights: highlights,
                                news: news
                            }];
                }
            });
        });
    };
};
exports.getEvent = getEvent;
