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
exports.getPlayer = void 0;
var scraper_1 = require("../scraper");
var utils_1 = require("../utils");
var getPlayer = function (config) {
    return function (_a) {
        var id = _a.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var $, _b, nameText, name, ign, imageUrl, image, age, twitter, twitch, facebook, instagram, country, hasTeam, team, getMapStat, statistics, achievements, teams, news;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = scraper_1.HLTVScraper;
                        return [4 /*yield*/, (0, utils_1.fetchPage)("https://www.hltv.org/player/".concat(id, "/").concat((0, utils_1.generateRandomSuffix)()), config.loadPage)];
                    case 1:
                        $ = _b.apply(void 0, [_c.sent()]);
                        nameText = $('.playerRealname').trimText();
                        name = nameText === '-' ? undefined : nameText;
                        ign = $('.playerNickname').text();
                        imageUrl = $('.profile-img').attr('src') || $('.bodyshot-img').attr('src');
                        image = imageUrl.includes('bodyshot/unknown.png') ||
                            imageUrl.includes('static/player/player_silhouette.png')
                            ? undefined
                            : imageUrl;
                        age = $('.playerAge .listRight').textThen(function (x) {
                            return (0, utils_1.parseNumber)(x.split(' ')[0]);
                        });
                        twitter = $('.twitter').parent().attr('href');
                        twitch = $('.twitch').parent().attr('href');
                        facebook = $('.facebook').parent().attr('href');
                        instagram = $('.instagram').parent().attr('href');
                        country = {
                            name: $('.playerRealname .flag').attr('alt'),
                            code: $('.playerRealname .flag').attrThen('src', function (x) { var _a; return (_a = x.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0]; })
                        };
                        hasTeam = $('.playerTeam .listRight').trimText() !== 'No team';
                        if (hasTeam) {
                            team = {
                                name: $('.playerTeam a').trimText(),
                                id: $('.playerTeam a').attrThen('href', (0, utils_1.getIdAt)(2))
                            };
                        }
                        getMapStat = function (i) {
                            return Number($('.playerpage-container')
                                .find('.player-stat')
                                .eq(i)
                                .find('.statsVal')
                                .text()
                                .replace('%', ''));
                        };
                        statistics = $('.playerpage-container.empty-state').exists()
                            ? undefined
                            : {
                                rating: getMapStat(0),
                                killsPerRound: getMapStat(1),
                                headshots: getMapStat(2),
                                mapsPlayed: getMapStat(3),
                                deathsPerRound: getMapStat(4),
                                roundsContributed: getMapStat(5)
                            };
                        achievements = $('.achievement-table .team')
                            .toArray()
                            .map(function (el) { return ({
                            place: el.find('.achievement').text(),
                            event: {
                                name: el.find('.tournament-name-cell a').text(),
                                id: el.find('.tournament-name-cell a').attrThen('href', (0, utils_1.getIdAt)(2))
                            }
                        }); });
                        teams = $('.team-breakdown .team')
                            .toArray()
                            .map(function (el) { return ({
                            id: el.find('.team-name-cell a').attrThen('href', (0, utils_1.getIdAt)(2)),
                            name: el.find('.team-name').text(),
                            startDate: el
                                .find('.time-period-cell [data-unix]')
                                .first()
                                .numFromAttr('data-unix'),
                            leaveDate: el
                                .find('.time-period-cell [data-unix]')
                                .eq(1)
                                .numFromAttr('data-unix'),
                            trophies: el
                                .find('.trophy-row-trophy a')
                                .toArray()
                                .map(function (trophyEl) { return ({
                                id: trophyEl.attrThen('href', (0, utils_1.getIdAt)(2)),
                                name: trophyEl.find('img').attr('title')
                            }); })
                        }); });
                        news = $('#newsBox a')
                            .toArray()
                            .map(function (el) { return ({
                            name: el.contents().eq(1).text(),
                            link: el.attr('href')
                        }); });
                        return [2 /*return*/, {
                                id: id,
                                name: name,
                                ign: ign,
                                image: image,
                                age: age,
                                twitter: twitter,
                                twitch: twitch,
                                facebook: facebook,
                                instagram: instagram,
                                country: country,
                                team: team,
                                statistics: statistics,
                                achievements: achievements,
                                teams: teams,
                                news: news
                            }];
                }
            });
        });
    };
};
exports.getPlayer = getPlayer;
